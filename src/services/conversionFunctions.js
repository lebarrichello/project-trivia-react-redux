import { MD5 } from 'crypto-js';

export function getGravatar(email) {
  const emailMD5 = MD5(email).toString();
  const URL = `https://www.gravatar.com/avatar/${emailMD5}`;
  return URL;
}
