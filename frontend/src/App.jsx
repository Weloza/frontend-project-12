import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './utils';
import { routes } from './utils';
import { LoginPage } from './pages';
import { ChatPage } from './pages';
import { ErrorPage } from './pages';

export const App = () => (
  <BrowserRouter>
      <Routes>
        <Route path={routes.login} element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={routes.chat} element={<ChatPage />} />
        </Route>
        <Route path={routes.error} element={<ErrorPage />} />
      </Routes>
  </BrowserRouter>
);
