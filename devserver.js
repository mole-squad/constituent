const childProc = require('child_process');

// Some glue to start/restart all the servers
const children = [
  { name: 'Constituency', proc: childProc.spawn('node', ['./dist/constituencyService.js']) }
];

children.forEach(aChild => {
  aChild.proc.stdout.on('data', (data) => console.log(`[${aChild.name}] ${data.toString()}`));
  aChild.proc.stderr.on('data', (data) => console.error(`[${aChild.name}] ${data.toString()}`));
});

process.on('SIGTERM', () => {
  children.forEach(aChild => aChild.proc.kill('SIGINT'));
});