import { useFormik } from 'formik';
 
const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">Войти</h1>
              <div className="form-floating mb-3">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Ваш ник"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                <label htmlFor="username">Ваш ник</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Пароль"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <label htmlFor="password">Пароль</label>
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
  );
};

export default LoginPage;