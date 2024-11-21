import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUsername } from "../../../slices/authSlice";
import { routes } from "../../../utils";
import { useFormik } from "formik";

export const AuthForm = () => {
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
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  return (
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
  );
};