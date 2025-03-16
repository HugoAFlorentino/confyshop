import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import { logoutUser } from '../features/user/userSlice';
import { useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const user = useSelector((state) => state.userState.user);

  const handleLogout = async () => {
    await queryClient.cancelQueries(); //  Ensure all queries are canceled first
    queryClient.clear(); // Properly clears the cache before state updates
    dispatch(clearCart());
    dispatch(logoutUser());
    navigate('/'); //  Navigate AFTER everything is reset
  };

  return (
    <header className='bg-neutral py-2 text-neutral-content'>
      <div className='align-element flex justify-center sm:justify-end'>
        {user ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm capitalize'>
              Hello, {user.username}
            </p>
            <button
              className='btn btn-xs btn-outline btn-accent rounded-md'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center'>
            <Link to='/login' className='link link-hover text-xs sm:text-sm'>
              Sign in / GUEST
            </Link>
            <Link
              to='/register'
              className='link link-hover text-xs sm:text-sm capitalize'
            >
              Create account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
