const getAuthHeader = (headers, { getState }) => {
  const token = getState().auth.token;

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}

export default getAuthHeader;