import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUsername } from "../../../slices/authSlice";
import { getValidationSchema2, routes } from "../../../utils";
import { useFormik } from "formik";


export const SignupForm = () => {
  const [error, setError] = useState(null);
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const schema = getValidationSchema2();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  const handleSubmit = async (values, { setSubmitting }) => {

    await axios.post('/api/v1/signup', values)
      .then(({ data }) => {
        if (data.token) {
          const token = data.token;
          const username = data.username;

          dispatch(setToken(token));
          dispatch(setUsername(username));

          redirect(routes.chat);
        } else {
          setError('unknown error');
          alert('unknown error');
        }
      })
      .catch((err) => {
        if (isAxiosError(err)) {
          if (err.response.status === 409) {
            setError('Пользователь уже существует');
          } else {
          setError(err.message);
          alert('axios error');
          }
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
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <form className="w-50" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Регистрация</h1>
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
          placeholder="От 3 до 20 символов"
          onChange={formik.handleChange}
          value={formik.values.username}
          autoFocus
        />
        <label htmlFor="username">Имя пользователя</label>
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
          placeholder="Не менее 6 символов"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <label htmlFor="password">Пароль</label>
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
          placeholder="Пароли должны совпадать"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        <label htmlFor="confirmPassword">Подтвердите пароль</label>
        {formik.errors.confirmPassword && (<div className="invalid-tooltip">{formik.errors.confirmPassword}</div>)}
        {error && (<div className="invalid-tooltip">{error}</div>)}
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Зарегистрироваться</button>
    </form>
  );
}