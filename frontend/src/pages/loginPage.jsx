import { useFormik } from 'formik';
import axios, { isAxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUsername } from '../slices/authSlice';
import routes from '../utils/routes';
import LoginImage from '../images/login.jpg'

const LoginPage = () => {
  const [error, setError] = useState(null);
  const redirect = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      console.log('hook effect');
    }
}, [error]);

  const handleSubmit = async (values, { setSubmitting }) => {

    await axios.post('/api/v1/login', values)
      .then(({ data }) => {
        if (data.token) {
          const token = data.token;
          const username = data.username;

          dispatch(setToken(token));
          dispatch(setUsername(username));

          redirect(routes.chat);
        } else {
          setError('authError');
          alert('authError');
        }
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          setError('authError');
          alert('authError');
        } else {
          alert('networkError')
        }
        setSubmitting(false);
      })
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={LoginImage} className="rounded-circle" alt="Войти" />
              </div>
              <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className={`form-control ${error ? 'is-invalid' : null}`}
                    placeholder="Ваш ник"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    autoFocus
                  />
                  <label htmlFor="username">Ваш ник</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`form-control ${error ? 'is-invalid' : null}`}
                    placeholder="Пароль"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <label htmlFor="password">Пароль</label>
                  {error && (<div className="invalid-tooltip">Authorization Error</div>)}
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;