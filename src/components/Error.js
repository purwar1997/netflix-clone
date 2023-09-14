import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops! an error occured</h1>
      <p>Error: {error.message}</p>
    </div>
  );
};

export default Error;
