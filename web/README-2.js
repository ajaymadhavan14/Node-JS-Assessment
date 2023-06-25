import http from "http"

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    const epochTime = Math.floor(Date.now() / 1000); // Server's epoch time
    const localTime = new Date().toLocaleString(); // Client's local time

    const html = `
      <html>
        <head>
          <title>2nd Challenge</title>
        </head>
        <body>
          <h1>2nd challenge</h1>
          <p>Current Epoch on Server: ${epochTime}</p>
          <p id="localTime">Local time: ${localTime}</p>
          <script>
            // Client-side JavaScript to show the local time in the browser
            var localTimeElement = document.getElementById('localTime');
            var localTime = new Date().toLocaleString();
            localTimeElement.innerHTML = 'Local time: ' + localTime;
          </script>
        </body>
      </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
