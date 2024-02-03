/**
 * Simple udp client
*/
#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<arpa/inet.h>
#include<sys/socket.h>

#define SERVER "127.0.0.1"
#define BUFLEN 512	// Max length of buffer
#define PORT 8888	// The port on which to send data

int main(void) {
  struct sockaddr_in si_other;
  socklen_t slen = sizeof(si_other);
  char buf[BUFLEN];
  char message[BUFLEN];

  int s_fd = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
  if (s_fd == -1) {
    return -1;
  }

  memset((char *) &si_other, 0, sizeof(si_other));
  si_other.sin_family = AF_INET;
  si_other.sin_port = htons(PORT);

  if (inet_aton(SERVER , &si_other.sin_addr) == 0) {
    fprintf(stderr, "inet_aton() failed\n");
    return -1;
  }

  while (1) {
    printf("Enter message: ");
    fgets(message, BUFLEN, stdin);

    // send the message
    if (sendto(s_fd, message, strlen(message) , 0 , (struct sockaddr *) &si_other, slen)==-1) {
      exit(1);
    }

    // receive a reply and print it
    // clear the buffer by filling null, it might have previously received data
    memset(buf,'\0', BUFLEN);
    // try to receive some data, this is a blocking call
    if (recvfrom(s_fd, buf, BUFLEN, 0, (struct sockaddr *) &si_other, &slen) == -1) {
      exit(1);
    }

    printf("\e[1;31mReceived Server Data:\e[0m %s\n" , buf);
  }

  return 0;
}