var cp = require('child_process');

var worker;

function spawn(server, config) {
  console.log("Server process spawned", server);
  console.log("CONFIG:", config);
  worker = cp.spawn('node', [server, config]);
  worker.on('exit', function(code) {
    if (code !== 0) {
      // The server may exit with none 0 status code 
      spawn(server, config);
    }
  });
}

function main(argv) {
  console.log("argv[0]", argv[0].port)
  spawn('server.js', argv[0]);
  process.on('SIGTERM', function() {
    worker.kill();
    process.exit(0);
  });
}

main(process.argv.slice(2));