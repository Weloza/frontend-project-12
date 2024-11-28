import axios, { isAxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUsername } from "../../../slices/authSlice";
import { paths, routes } from "../../../utils";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

export const AuthForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const input = useRef(null);

  useEffect(() => {
    if (error) {
      input.current.focus();
    }
  }, [error]);

  const handleSubmit = async (values, { setSubmitting }) => {

    await axios.post(paths.login, values)
      .then(({ data }) => {
        if (data.token) {
          const token = data.token;
          const username = data.username;

          dispatch(setToken(token));
          dispatch(setUsername(username));

          redirect(routes.chat);
        } else {
          setError('AuthError');
        }
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          if (err.response.status === 401) {
            setError('AuthError');
          }
        } else {
          console.log(err)
          //toast networkerror
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
      <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
      <div className="form-floating mb-3">
        <input
          id="username"
          name="username"
          type="text"
          className={`form-control ${error ? 'is-invalid' : null}`}
          placeholder={t('loginPage.yourNick')}
          onChange={formik.handleChange}
          value={formik.values.username}
          ref={input}
          autoFocus
        />
        <label htmlFor="username">{t('loginPage.yourNick')}</label>
      </div>
      <div className="form-floating mb-4">
        <input
          id="password"
          name="password"
          type="password"
          className={`form-control ${error ? 'is-invalid' : null}`}
          placeholder={t('loginPage.password')}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label htmlFor="password">{t('loginPage.password')}</label>
        {error && (<div className="invalid-tooltip">{t('errors.authError')}</div>)}
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
        {t('loginPage.enter')}
      </button>
    </form>
  );
};