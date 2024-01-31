/*
Simple udp server
*/
#include<stdio.h>	//printf
#include<string.h> //memset
#include<stdlib.h> //exit(0);
#include<arpa/inet.h>
#include<sys/socket.h>

#define BUFLEN 512	//Max length of buffer
#define PORT 8888	//The port on which to listen for incoming data

void die(char *s) {
  perror(s);
  exit(1);
}

int main(void) {
  struct sockaddr_in si_me, si_other;

  int s, recv_len;
  socklen_t slen = sizeof(si_other);
  char buf[BUFLEN];

  //create a UDP socket
  if ((s = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP)) == -1) {
    die("socket");
  }

  // zero out the structure
  memset((char *) &si_me, 0, sizeof(si_me));

  si_me.sin_family = AF_INET;
  si_me.sin_port = htons(PORT);
  si_me.sin_addr.s_addr = htonl(INADDR_ANY);

  //bind socket to port
  if (bind(s, (struct sockaddr*)&si_me, sizeof(si_me)) == -1) {
    die("bind");
  }

  //keep listening for data
  while (1) {
    printf("Waiting for data...\n");
    fflush(stdout);

    //try to receive some data, this is a blocking call
    if ((recv_len = recvfrom(s, buf, BUFLEN, 0, (struct sockaddr *) &si_other, &slen)) == -1) {
      die("recvfrom()");
    }

    //print details of the client/peer and the data received
    printf("\e[1;34mReceived packet from:\e[0m %s:%d\n", inet_ntoa(si_other.sin_addr), ntohs(si_other.sin_port));
    printf("\e[1;31mReceived Client Data:\e[0m %s\n" , buf);
    // printf("\e[1;34m This is a blue text. \e[0m");

    //now reply the client with the same data
    if (sendto(s, buf, recv_len, 0, (struct sockaddr*) &si_other, slen) == -1) {
      die("sendto()");
    }
  }

  // close(s);
  return 0;
}