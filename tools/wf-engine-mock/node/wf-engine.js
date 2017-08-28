

var autobahn = require('autobahn');
var chance = new require('chance')();
var fetch = require('isomorphic-fetch');


let urls = [];

var connection = new autobahn.Connection({
  url: 'ws://127.0.0.1:8002/ws',
  realm: 'realm1'}
);

connection.onopen = function (session) {

  session.subscribe('wf-task-exit', (args) => {
    console.log('received');
    console.log(args[0]);

    let msg = args[0];

    if (msg == 'exited') {
      let pckg = {
        data: {
          url: urls[chance.integer({min: 0, max: urls.length-1})],
        }
      };
      console.log(pckg);

      session.publish('wf-task-enter', [pckg]);
      console.log("published to 'wf-task-enter'");
    }

  })

};

fetch('http://localhost:8000/api/forms', {
    headers: { 'content-type': 'application/json' },
    method: 'get',
  })
.then(response => response.json())
.then(res => {
  urls = res.forms.map(form => `${form.slug}-${form.cuid}`),
  console.log(urls);
})
.then(() => connection.open());
