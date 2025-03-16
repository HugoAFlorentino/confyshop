import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ErrorElement = () => {
  const error = useRouteError();
  console.log('🚀 ~ ErrorElement ~ error:', error);

  return (
    <>
      <h4 className='font-bold text-4xl'>There was an error...</h4>
      <div className='mt-10'>
        <Link to='/' className='btn btn-secondary'>
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default ErrorElement;
