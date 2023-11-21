const client = require('scp2');
const { NodeSSH } = require('node-ssh');
const chalk = require('chalk');

const HOST = '127.0.0.1:8000';
const USERNAME = 'admin';
const PASSWORD = 'admin';
const PATH = '/home/mhs/frontend/edge-platform/';

client.scp('build/', {
  host: HOST,
  username: USERNAME,
  password: PASSWORD,
  path: PATH,
}, function(err) {
  if ( err !== null ) {
    const ssh = new NodeSSH();
    ssh.connect({
      host: HOST,
      username: USERNAME,
      password: PASSWORD,
    }).then( () => {
      ssh.execCommand(`echo ${PASSWORD} | sudo -S nginx -s reload`, ['--json'] ).then( (result) => {
        console.log( chalk.greenBright(`Task Completed!`) );
        ssh.dispose();
      });
    });
  }
});
