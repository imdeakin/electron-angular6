const waitOn = require('wait-on');

let opts = {
  resources: [
    'http-get://localhost:4200/'
  ]
};

waitOn(opts, function (err) {
  if (err) {
    throw err;
  }
  // once here, all resources are available
});
