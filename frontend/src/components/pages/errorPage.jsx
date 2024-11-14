const ErrorPage = () => (
  <div className="text-center">
    <img src='/images/404pageNotFound.svg' alt="Страница не найдена" className="img-fluid h-25" />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти <a href="/">на главную страницу</a>
    </p>
  </div>
);

export default ErrorPage;
