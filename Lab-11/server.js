const http = require("http");

const PORT = 3000;

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "text/html; charset=utf-8");

  response.write("<h1>Welcome to Node.js HTTP Server</h1>");
  response.write("<p>Server is handling your request successfully.</p>");
  response.end();
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

