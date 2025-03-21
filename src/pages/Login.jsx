import { FormInput, SubmitBtn } from '../components';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Validate inputs before sending request
    if (!data.identifier || !data.password) {
      toast.error('Email and password are required!');
      return null; // Stop the form submission
    }

    try {
      const response = await customFetch.post('/auth/local', data);
      store.dispatch(loginUser(response.data));
      const userName = response.data.user.username;
      toast.success(`Welcome back, ${userName}!`);
      return redirect('/');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        'Please double-check your credentials';
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      });
      dispatch(loginUser(response.data));
      toast.success('Welcome, Demo User!');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Guest user login error. Please try again.');
    }
  };

  return (
    <section className='h-screen grid place-items-center'>
      <Form
        method='post'
        className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
      >
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <FormInput type='email' label='Email' name='identifier' />
        <FormInput type='password' label='Password' name='password' />
        <div className='mt-4'>
          <SubmitBtn text='Login' />
        </div>
        <button
          type='button'
          className='btn btn-neutral btn-block rounded-md'
          onClick={loginAsGuestUser}
        >
          Guest User
        </button>
        <p className='text-center'>
          Not a member yet?
          <Link
            to='/register'
            className='ml-2 link link-hover link-accent capitalize'
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
