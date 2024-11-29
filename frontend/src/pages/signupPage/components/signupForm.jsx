import axios, { isAxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUsername } from "../../../slices/authSlice";
import { getValidationSchema, paths, routes } from "../../../utils";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";


export const SignupForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const schema = getValidationSchema(t);
  const input = useRef(null);

  useEffect(() => {
    if (error) {
      input.current.focus();
    }
  }, [error]);

  const handleSubmit = async (values, { setSubmitting }) => {

    await axios.post(paths.signup, values)
      .then(({ data }) => {
        if (data.token) {
          const token = data.token;
          const username = data.username;

          dispatch(setToken(token));
          dispatch(setUsername(username));

          redirect(routes.chat);
        } else {
          setError('SignupError');
        }
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          if (err.response.status === 409) {
            setError(t('errors.sugnupError'));
          } else {
          setError(err.message);
          }
        } else {
          setError(t('errors.networkError'))
        }
        setSubmitting(false);
      })
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('signupPage.registration')}</h1>
      <div className="form-floating mb-3">
        <input
          id="username"
          name="username"
          type="text"
          className={`
            form-control 
            ${formik.errors.username ? 'is-invalid' : null}
            ${error ? 'is-invalid' : null}
            `}
          placeholder={t('validationSchema.length')}
          onChange={formik.handleChange}
          value={formik.values.username}
          ref={input}
          autoFocus
        />
        <label htmlFor="username">{t('signupPage.username')}</label>
        {formik.errors.username && (<div className="invalid-tooltip">{formik.errors.username}</div>)}
      </div>
      <div className="form-floating mb-3">
        <input
          id="password"
          name="password"
          type="password"
          className={`
            form-control 
            ${formik.errors.password ? 'is-invalid' : null}
            ${error ? 'is-invalid' : null}
            `}
          placeholder={t('validationSchema.minLength')}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label htmlFor="password">{t('')}</label>
        {formik.errors.password && (<div className="invalid-tooltip">{formik.errors.password}</div>)}
      </div>
      <div className="form-floating mb-4">
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className={`
            form-control 
            ${formik.errors.confirmPassword ? 'is-invalid' : null}
            ${error ? 'is-invalid' : null}
            `}
          placeholder={t('validationSchema.passwordsMatch')}
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        <label htmlFor="confirmPassword">{t('signupPage.confirmPassword')}</label>
        {formik.errors.confirmPassword && (<div className="invalid-tooltip">{formik.errors.confirmPassword}</div>)}
        {error && (<div className="invalid-tooltip">{error}</div>)}
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
        {t('signupPage.signup')}
      </button>
    </form>
  );
}