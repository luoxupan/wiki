[HTTP会话消息格式](https://developer.mozilla.org/en-US/docs/Web/HTTP/Session)

### HTTP/1.x 请求报头格式
```
GET /index.html HTTP/1.1
Accept-Encoding: gzip, deflate, br
Cache-Control: no-cache
Connection: keep-alive
Host: 127.0.0.1:7001
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
```


### HTTP/1.x 响应200格式
```
HTTP/1.1 200 OK
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Sun, 14 Jan 2024 12:19:56 GMT
Server: Apache

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>A simple webpage</title>
</head>
<body>
  <h1>Simple HTML webpage</h1>
  <p>Hello, world!</p>
</body>
</html>
```


### HTTP/1.x 响应404格式
```
HTTP/1.1 404 Not Found
Content-Encoding: gzip
Content-Type: application/json; charset=UTF-8
Date: Sun, 14 Jan 2024 12:19:56 GMT
Server: Apache

{
  "errmsg": "reosurce not exit",
  "status_code": 404
}
```
