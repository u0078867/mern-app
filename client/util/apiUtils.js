
export function getAccessTokenHeaders(accessToken) {
  let token = null;
  if (typeof window === 'undefined') {
    token = accessToken;
  } else {
    token = accessToken ? accessToken : sessionStorage.getItem('access_token');
  }
  let headers = {}
  if (token) {
    headers = { 'Authorization': `Bearer ${token}` };
  }
  else {
    throw new Error("Access token needed");
  }
  return headers;
}
