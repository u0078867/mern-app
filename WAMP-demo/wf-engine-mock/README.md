Little workflow engine mock to play with the workflow client.

It performs the following:
- it connect so a WAMP router at *ws://127.0.0.1:8002/ws*, with realm *realm1*;
- it fetches all forms information, from *http://localhost:8000/api/forms*;
- when the user submits a form, the mock picks another random form and propose it to the user;

you can run both WAMP router and guest worker by typing:
```
crossbar start
```

##### Prerequisites:
- install a [WAMP router](http://crossbar.io/) first;
- in the mern app, WAMP connection and work-flow clients must be checked;
