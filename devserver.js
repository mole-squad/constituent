const childProc = require('child_process');

// grep.stdout.on('data', (data) => {
//   console.log(data.toString());
// });

const children = [
  { name: 'API', proc: childProc.spawn('node', ['./dist/api.js']) },
  { name: 'Constituency', proc: childProc.spawn('node', ['./dist/constituencyService.js']) }
];

children.forEach(aChild => {
  aChild.proc.stdout.on('data', (data) => console.log(`[${aChild.name}] ${data.toString()}`));
  aChild.proc.stderr.on('data', (data) => console.error(`[${aChild.name}] ${data.toString()}`));
});

process.on('SIGTERM', () => {
  children.forEach(aChild => aChild.proc.kill('SIGINT'));
});