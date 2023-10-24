import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  return (
    <section>
      <h1>Oops! an error occured</h1>
      <p>Error: {error.message}</p>
    </section>
  );
};

export default Error;
