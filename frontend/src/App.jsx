import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, routes } from './utils';
import { LoginPage, ChatPage, ErrorPage, SignupPage } from './pages';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ru } from './locales/ru';

export const App = () => {
  i18next
    .use(initReactI18next)
    .init({
      resources: {
        ru: {
          translation: ru,
        },
      },
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  return (
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
}