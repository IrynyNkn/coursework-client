export const authTokenName = 'GamelyAuthToken';

export const saveTokenToLocalStorage = (token: string) => {
  let now = new Date();
  let time = now.getTime();
  let expireTime = time + 3600 * 1000;
  now.setTime(expireTime);
  document.cookie = `${authTokenName}=${token};expires='${now.toUTCString()}';path=/`;
};
