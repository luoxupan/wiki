/**
 * Simple udp server
*/
#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<arpa/inet.h>
#include<sys/socket.h>

#define BUFLEN 512	// Max length of buffer
#define PORT 8888	// The port on which to listen for incoming data

int main(void) {
  struct sockaddr_in si_me, si_other;
  socklen_t slen = sizeof(si_other);
  char buf[BUFLEN];

  // create a UDP socket
  int listen_socket = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
  if (listen_socket == -1) {
    return -1;
  }

  // zero out the structure
  memset((char *) &si_me, 0, sizeof(si_me));

  si_me.sin_family = AF_INET;
  si_me.sin_port = htons(PORT);
  si_me.sin_addr.s_addr = htonl(INADDR_ANY);

  // bind socket to port
  if (bind(listen_socket, (struct sockaddr*)&si_me, sizeof(si_me)) == -1) {
    return -1;
  }

  // keep listening for data
  while (1) {
    printf("Waiting for data...\n");
    fflush(stdout);

    // try to receive some data, this is a blocking call
    int recv_len = recvfrom(listen_socket, buf, BUFLEN, 0, (struct sockaddr *) &si_other, &slen);
    if (recv_len == -1) {
      exit(1);
    }

    printf("\e[1;34mReceived packet from:\e[0m %s:%d\n", inet_ntoa(si_other.sin_addr), ntohs(si_other.sin_port));
    printf("\e[1;31mReceived Client Data:\e[0m %s\n" , buf);

    // now reply the client with the same data
    if (sendto(listen_socket, buf, recv_len, 0, (struct sockaddr*) &si_other, slen) == -1) {
      exit(1);
    }
  }

  return 0;
}