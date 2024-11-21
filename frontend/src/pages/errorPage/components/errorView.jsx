import { PageNotFound } from "../../../images/pageNotFound";

export const ErrorView = () => (
  <div className="text-center">
    <PageNotFound className="img-fluid h-25"/>
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      Но вы можете перейти <a href="/">на главную страницу</a>
    </p>
  </div>
)