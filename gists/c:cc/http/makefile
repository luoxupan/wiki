# c flag
CFLAG=-std=c99 -Wall
# delete files
RM=rm -rf

# make build
build:
	@echo compiling codes...
	$(CC) $(CFLAG) http.c -ledit -o http
.PHONY: clean

clean:
	$(RM) http