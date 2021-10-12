export const getCookie = (cookies: string, cookieName: string) => {
  const cArr = cookies.split(';');
  for (let i = 0; i < cArr.length; i++) {
    const cookie = cArr[i].split('=', 2);
    cookie[0] = cookie[0].replace(/^\s+/, '');
    if (cookie[0] == cookieName) {
      return cookie[1];
    }
  }
};
