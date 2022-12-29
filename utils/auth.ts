export const authTokenName = 'GamelyAuthToken';

export const saveTokenToCookies = (token: string) => {
  let now = new Date();
  let time = now.getTime();
  let expireTime = time + 3600 * 1000;
  now.setTime(expireTime);
  document.cookie = `${authTokenName}=${token};expires='${now.toUTCString()}';path=/`;
};

export const eraseCookie = (name: string) => {
  document.cookie = name + '=; Max-Age=-99999999;';
};
