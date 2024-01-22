#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <pthread.h>
#include <sys/wait.h>
#include <signal.h>
#include <errno.h>
#include <unistd.h>

#define BUFFER_SIZE 1024
#define MAX_FILE_SIZE 5*1024
#define MAX_CONNECTIONS 3
#define TRUE 1
#define FALSE 0
#define EXIT_SUCCESS 0
#define EXIT_FAILURE 1

int deamon = FALSE;
typedef struct {
  int port;
  char *webroot;
  char *conf_file;
  char *mime_file;
} conf_t;
conf_t conf;
typedef struct {
  int clientfd;
  char read_buffer[BUFFER_SIZE];
  char method[5];
  char scheme[20];
  char path[100];
} http_request_t;

static void sigchld_handler(int s) {
  int saved_errno = errno;
  while(waitpid(-1, NULL, WNOHANG) > 0);
  errno = saved_errno;
}

static void setup_sigchld_handler() {
  struct sigaction sa;
  sa.sa_handler = sigchld_handler; // reap all dead processes
  sigemptyset(&sa.sa_mask);
  sa.sa_flags = SA_RESTART;
  if (sigaction(SIGCHLD, &sa, NULL) == -1) {
    perror("sigaction");
    exit(1);
  }
}

static void daemonize(void) {
  pid_t pid, sid;

  /* already a daemon */
  if (getppid() == 1) return;

  /* Fork off the parent process */
  pid = fork();
  if (pid < 0) {
    exit(EXIT_FAILURE);
  }
  /* If we got a good PID, then we can exit the parent process. */
  if (pid > 0) {
    exit(EXIT_SUCCESS);
  }

  /* At this point we are executing as the child process */

  /* Change the file mode mask */
  umask(0);

  /* Create a new SID for the child process */
  sid = setsid();
  if (sid < 0) {
    exit(EXIT_FAILURE);
  }

  /* Change the current working directory.  This prevents the current
  directory from being locked; hence not being able to remove it. */
  if ((chdir("/")) < 0) {
    exit(EXIT_FAILURE);
  }
}

int send_body_s(char *message, http_request_t* request) {
  int length = strlen(message);
  int bytes_sent = send(request->clientfd, message, length, 0);
  return bytes_sent;
}

int send_header(char *status, char *content_type, int content_length, http_request_t* request) {
  time_t rawtime;
  time(&rawtime);

  char *message = malloc(1024);
  memset(message, '\0', 1024);
  
  if (message != NULL) {
    char *dst = message;
    dst += sprintf(dst, "\r\nHTTP/1.1 %s", status);
    dst += sprintf(dst, "\r\n%s %s", "Content-Type: ", content_type);
    dst += sprintf(dst, "\r\n%s", "Server: Http Server");
    dst += sprintf(dst, "\r\n%s %i", "Content-Length: ", content_length);
    dst += sprintf(dst, "\r\n%s %s", "Date: ", (char*)ctime(&rawtime));
    dst += sprintf(dst, "\r\n"); // new line

    send(request->clientfd, message, strlen(message), 0);

    free(message);
    return 1;
  }
  return -1;
}

void send_body_f(FILE *fp, http_request_t* request) {
  int cur_char = 0;
  do {
    cur_char = fgetc(fp);
    send(request->clientfd, &cur_char, sizeof(char), 0);
  } while (cur_char != EOF);
}

int scan(char *input, char *output, int cur_idx) {
  while (cur_idx < strlen(input)) {
    char cur_char = *(input + cur_idx);
    if (cur_char != '\t' && cur_char != ' ' && cur_char != '\n' && cur_char != '\r') {
      break;
    }
    cur_idx++;
  }

  if (cur_idx >= strlen(input)) {
    return -1;
  }

  int append_char_idx = 0;
  while (cur_idx < strlen(input)) {
    char cur_char = *(input + cur_idx);
    if (cur_char != '\t' && cur_char != ' ' && cur_char != '\n' && cur_char != '\r') {
      *(output + append_char_idx) = cur_char;
      append_char_idx += 1;
      cur_idx++;
    } else {
      *(output + append_char_idx) = '\0';
      break;
    }
  }

  return cur_idx;
}

int get_mime(char *extension, char *mime) {
  char *word_holder = malloc(600);
  char *line = malloc(200);
  int startline = 0;

  FILE *mimeFile = fopen(conf.mime_file, "r");

  while (fgets(line, 200, mimeFile) != NULL) { 
    if (line[0] != '#') {
      startline = scan(line, mime, 0);
      while (1) {
        startline = scan(line, word_holder, startline);
        if (startline != -1) {
          if (strcmp(word_holder, extension) == 0) {
            free(word_holder);
            free(line);
            return 0;
          }
        } else {
          break;
        }
      }
    }
    memset (line, '\0', 200);
  }

  free(word_holder);
  free(line);

  return -1;
}

int get_extension(char *input, char *output, int max) {
  int in_position = 0;
  int appended_position = 0;
  int i = 0;
  int count = 0;

  for (; i < strlen(input); i++) {		
    if (input[i] == '?') {
      break;
    }
    if (in_position == 1) {
      if (count < max) {
        output[appended_position] = input[i];
        appended_position += 1;
        count++;
      }
    }
    if (input[i] == '.') {
      in_position = 1;
    }
  }

  output[appended_position + 1] = '\0';

  if (strlen(output) > 0) {
    return 1;
  }
  return -1;
}

int get_file_size(FILE *fp) {
  int filesize = 0;
  fseek(fp, 0, SEEK_END);
  filesize = ftell(fp);
  rewind(fp);
  return filesize;
}

int handle_http_get(http_request_t* request) {
  char *static_path = (char *)malloc(1000 * sizeof(char));
  char *extension = (char *)malloc(10 * sizeof(char));

  memset(static_path, '\0', 1000);
  memset(extension, '\0', 10);

  if (strlen(request->path) > 0) {

    if (get_extension(request->path, extension, 10) == -1) {
      printf("File extension not existing");
      goto End;
    }

    char mime[100] = {0};
    if (get_mime(extension, mime) == -1) {
      printf("Mime not supported: %s\n", mime);

      char *mimeNotSp = "{\"status_code\": 404, \"errmsg\": \"mime not supported\"}";
      send_header("404 Not Found", "application/json;charset=UTF-8", strlen(mimeNotSp), request);
      send_body_s(mimeNotSp, request);

      goto End;
    }

    // Open the requesting file as binary
    strcpy(static_path, conf.webroot);
    if (strchr(request->path, '?') == NULL) {
      strcat(static_path, request->path);
    } else {
      strncat(static_path, request->path, strlen(request->path) - strlen(strchr(request->path, '?')));
    }

    FILE *fp = fopen(static_path, "rb");

    if (fp == NULL) {
      printf("Unable to open file: %s\n", request->path);

      char *s404 = "{\"status_code\": 404, \"errmsg\": \"reosurce not exit\"}";
      send_header("404 Not Found", "application/json;charset=UTF-8", strlen(s404), request);
      send_body_s(s404, request);

      goto End;
    }

    // Calculate Content Length
    int file_size = get_file_size(fp);
    if (file_size < 0 ) {
      printf("File size is zero\n");
      fclose(fp);
      goto End;
    }

    // Send File Content
    send_header("200 OK", mime, file_size, request);
    send_body_f(fp, request);

    fclose(fp);
    goto End;
  }
End:
  free(extension);
  free(static_path);
  return 0;
}

int parse_request(http_request_t* request) {
  scan(request->read_buffer, request->method, 0);

  // 解析文件路径和http协议
  int start = scan(request->read_buffer, request->path, 4);
  if (start > 0) {
    scan(request->read_buffer, request->scheme, start);
  }
  return 0;
}

int accept_handle(http_request_t* request) {
  if (recv(request->clientfd, request->read_buffer, BUFFER_SIZE, 0) == -1) {
    printf("Error handling incoming request");
    return -1;
  }

  parse_request(request);

  if (strcmp("HTTP/1.1" , request->scheme) != 0 && strcmp("HTTP/1.0" , request->scheme) != 0) {
    return -1;
  }

  if (strcmp(request->method, "GET") == 0) {
    handle_http_get(request);
  }

  if (strcmp(request->method, "POST") == 0) {
    // 处理
    return -1;
  }

  return 0;
}

int start_server() {
  int listen_socket = socket(AF_INET, SOCK_STREAM, 0);
  struct sockaddr_in address;

  if (listen_socket == -1) {
    perror("create socket");
    return -1;
  }

  address.sin_family = AF_INET;
  address.sin_addr.s_addr = INADDR_ANY;
  address.sin_port = htons(conf.port);

  int on = 1;
  if (setsockopt(listen_socket, SOL_SOCKET, SO_REUSEADDR, (char *) &on, sizeof(on)) == -1) {
    return -1;
  }

  if (bind(listen_socket, (struct sockaddr *)&address, sizeof(address)) < 0) {
    perror("bind to port");
    return -1;
  }

  // Start listening for connections and accept no more than MAX_CONNECTIONS in the Quee
  if (listen(listen_socket, MAX_CONNECTIONS) < 0 ) {
    perror("listen on port");
    return -1;
  }

  // reap zombie processes
  setup_sigchld_handler();

  while (1) {
    struct sockaddr_storage connector;
    socklen_t addr_size = sizeof(connector);
    int accept_socket = accept(listen_socket, (struct sockaddr *)&connector, &addr_size);

    int pid = fork();
    if (pid == 0) {
      if (accept_socket < 0) {
        perror("accepting sockets");
        exit(-1);
      }
      http_request_t request = { .clientfd = accept_socket };
      accept_handle(&request);
      printf("\n\n%s\n\n", request.read_buffer);
      close(accept_socket);
      exit(0);
    } else if (pid == -1) {
      perror("fork failed");
      close(accept_socket);
    }
  }
  return 0;
}

int load_conf() {
  char cur_line[100];
  conf.webroot = malloc(100);
  conf.conf_file = malloc(100);
  conf.mime_file = malloc(600);

  // Setting default values
  conf.conf_file = "http.conf";
  strcpy(conf.mime_file, "mime.types");

  // Set deamon to FALSE
  deamon = FALSE;

  FILE *filePointer = fopen(conf.conf_file, "r");

  // Ensure that the configuration file is open
  if (filePointer == NULL) {
    fprintf(stderr, "Can't open configuration file!\n");
    goto Error;
  }

  // get server root directory from configuration file
  if (fscanf(filePointer, "%s %s", cur_line, conf.webroot) != 2) {
    fprintf(stderr, "Error in configuration file on line 1!\n");
    goto Error;
  }

  // get default port from configuration file
  if (fscanf(filePointer, "%s %i", cur_line, &conf.port) != 2) {
    fprintf(stderr, "Error in configuration file on line 2!\n");
    goto Error;
  }

  fclose(filePointer);
  return 0;
Error:
  fclose(filePointer);
  return -1;
}

int main(int argc, char* argv[]) {
  int parameterCount;

  load_conf();

  for (parameterCount = 1; parameterCount < argc; parameterCount++) {
    // If flag -p is used, set port
    if (strcmp(argv[parameterCount], "-p") == 0) {
      // Indicate that we want to jump over the next parameter
      parameterCount++;
      printf("setting port to %i\n", atoi(argv[parameterCount]));
      conf.port = atoi(argv[parameterCount]);
    } else if (strcmp(argv[parameterCount], "-d") == 0) {
      // If flag -d is used, set deamon to TRUE;
      printf("setting deamon = TRUE");
      deamon = TRUE;
    } else {
      printf("usage: %s [-p port] [-d]\n", argv[0]);
      printf("\t\t-p port\t\tWhich port to listen to.\n");
      printf("\t\t-d\t\tEnables deamon mode.\n");
      return -1;
    }
  }

  printf("port:\t\t\t%i\n", conf.port);
  printf("webroot:\t\t%s\n", conf.webroot);
  printf("conf file:\t\t%s\n", conf.conf_file);
  printf("deamon:\t\t\t%s\n\n", deamon == TRUE ? "true" : "false");

  if (deamon == TRUE) {
    daemonize();
  }

  start_server();
  return 0;
}
