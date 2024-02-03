# c flag
CFLAG=-std=c99 -Wall
# delete files
RM=rm -rf

# make build
build:
	@echo compiling codes...
	$(CC) $(CFLAG) udp_client.c -ledit -o udp_client
	$(CC) $(CFLAG) udp_server.c -ledit -o udp_server
.PHONY: clean

clean:
	$(RM) udp_client udp_server