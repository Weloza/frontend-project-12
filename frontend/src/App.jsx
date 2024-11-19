import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/errorPage.jsx';
import ChatPage from './pages/chatPage.jsx';
import LoginPage from './pages/loginPage.jsx';
import Navbar from './components/navbar.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import routes from './utils/routes.js';

const App = () => {
  return (
  <div className="d-flex flex-column h-100">
    <Navbar />
    <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path={routes.chat} element={<ChatPage />} />
          </Route>
          <Route path={routes.error} element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
  </div>
);
}

export default App;
