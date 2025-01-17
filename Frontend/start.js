// start.js
import serve from 'serve';

const server = serve('./Build', {
  port: 5173,  // Port where the server will run
  open: true,  // Optional: open the browser automatically
});

console.log('Serving React build on port 5173');
