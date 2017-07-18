

var autobahn = require('autobahn');
var chance = new require('chance')();

let urls = [
  'test-file-cj49uvnkr00009ck84jxyuu18',
  'test-cj48jklxa0001sgk8yermcozg',
  'test-device-cj48ih39y0000sgk8qjuqcdh8',
];

var connection = new autobahn.Connection({
  url: 'ws://127.0.0.1:8002/ws',
  realm: 'realm1'}
);

connection.onopen = function (session) {

  setInterval(function () {

    let pckg = {
      data: urls[chance.integer({min: 0, max: urls.length-1})],
    };

    session.publish('wf-task', [pckg]);
	//session.publish('ws-status', [pckg]);
    console.log("published to 'wf-task'");

  }, 3000);

  session.subscribe('wf-test', (args) => {
    console.log('received');
    console.log(args[0]);
  })

};

connection.open();
