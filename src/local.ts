const hostname = window.location.hostname;

const local = 'http://localhost/stam/logger-api';
const test = 'http://test.cyberair.co/logger-api';
const live = 'https://stambridgesecurity.co.uk/logger-api';

const api = url => `${url}/`;

const settings: any = {};

settings.local = hostname === 'localhost';
settings.test = hostname === 'test.cyberair.co';
settings.live = hostname === 'stambridgesecurity.co.uk';

settings.api = {
  local: api(local),
  staging: api(test),
  live: api(live)
};

export { settings };
