const hostname = window.location.hostname;

const local = 'http://localhost/stam/vnc-api';
const test = 'http://localhost/stam/vnc-api';
const live = 'http://localhost/stam/vnc-api';

const api = url => `${url}/`;

const settings: any = {};

settings.local = hostname === 'localhost';
settings.test = hostname === 'localhost';
settings.live = hostname === 'localhost';

settings.api = {
  local: api(local),
  staging: api(test),
  live: api(live)
};

export { settings };
