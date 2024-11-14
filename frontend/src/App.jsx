import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorPage from './components/pages/errorPage.jsx';
import ChatPage from './components/pages/chatPage.jsx';
import LoginPage from './components/pages/loginPage.jsx';
import Navbar from './components/pages/navbar.jsx';
import routes from './utils/routes.js';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Navbar />
    <BrowserRouter>
        <Routes>
          <Route path={routes.auth} element={<LoginPage />} />
          <Route path={routes.chat} element={<ChatPage />} />
          <Route path={routes.error} element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
  </div>
);

export default App;
