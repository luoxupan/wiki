# c flag
CFLAG=-std=c99 -Wall
# delete files
RM=rm -rf

# make build
build:
	@echo compiling codes...
	$(CC) $(CFLAG) client.c -ledit -o client
	$(CC) $(CFLAG) server.c -ledit -o server
.PHONY: clean

clean:
	$(RM) client server