const routes = {
  chat: '/',
  login: '/login',
  error: '*',
}

const serverPath = '/api/v1';

export const paths = {
  signup: () => [serverPath, 'signup'].join('/'), 
  login: () => [serverPath, 'login'].join('/'),
  channels: () => [serverPath, 'channels'].join('/'),
  messages: () => [serverPath, 'messages'].join('/'),
}

export default routes;