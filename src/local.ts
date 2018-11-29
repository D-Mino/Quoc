const hostname = window.location.hostname;

const local = 'https://motell.baoloc.fun/api';
const test = 'https://motell.baoloc.fun/api';
const live = 'https://motell.baoloc.fun/api';

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
