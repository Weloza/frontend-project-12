import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, routes } from './utils';
import { LoginPage, ChatPage, ErrorPage, SignupPage } from './pages';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ru } from './locales/ru';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Provider as MainProvider } from 'react-redux';
import store from './store/store.js';


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

  const rollbarConfig = {
    accessToken: import.meta.env.POST_CLIENT_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  }

  return (
    <MainProvider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path={routes.login} element={<LoginPage />} />
              <Route path={routes.signup} element={<SignupPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path={routes.chat} element={<ChatPage />} />
              </Route>
              <Route path={routes.error} element={<ErrorPage />} />
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        </ErrorBoundary>
      </RollbarProvider>
    </MainProvider>
  );
};
