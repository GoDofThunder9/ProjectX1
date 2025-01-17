// start.jsx
import React, { useEffect } from 'react';
import serve from 'serve';
const StartServer = () => {
  useEffect(() => {
    const server = serve('./Build', {
      port: 5173,  // Port where the server will run
      open: true,  // Optional: open the browser automatically
    });

    console.log('Serving React build on port 5173');

    return () => {
      // Clean up the server when the component unmounts
      server.close();
    };
  }, []);

  return (
    <div>
      <h1>React App is Running</h1>
      <p>Serving the app on port 5173</p>
    </div>
  );
};

export default StartServer;
