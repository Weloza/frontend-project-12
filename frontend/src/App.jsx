import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './utils';
import { routes } from './utils';
import { LoginPage } from './pages';
import { ChatPage } from './pages';
import { ErrorPage } from './pages';
import { SignupPage } from './pages/signupPage';

export const App = () => (
  <BrowserRouter>
      <Routes>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.signup} element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={routes.chat} element={<ChatPage />} />
        </Route>
        <Route path={routes.error} element={<ErrorPage />} />
      </Routes>
  </BrowserRouter>
);
