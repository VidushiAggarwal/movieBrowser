import "./ErrorPage.css";

const ErrorPage = ({ error }) => {
  return (
    <div className="error">
      {error === "Too many results." &&
        <h3>Please use more than 2 characters for search.</h3>}
        {error === "Movie not found!" &&
        <h3>{error} Please try to search for some other movie.</h3>}
    </div>
  );
};

export default ErrorPage;
