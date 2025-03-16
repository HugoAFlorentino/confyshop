import { useSelector } from 'react-redux';
import { CheckoutForm, SectionTitle, CartTotals } from '../components';
import { toast } from 'react-toastify';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const loader = (store) => () => {
  const user = store.getState().userState.user;

  if (!user) {
    return { message: 'You must be logged in to checkout' };
  }
  return null;
};

const Checkout = () => {
  const data = useLoaderData();

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.message) {
      toast.warn(data.message);
      navigate('/login');
    }
  }, [data, navigate]);

  const cartTotal = useSelector((state) => state.cartState.cartTotal);

  if (cartTotal === 0) {
    return <SectionTitle text='Your cart is empty' />;
  }

  return (
    <>
      <SectionTitle text='Place your order' />
      <div className='mt-8 grid gap-8 md:grid-cols-2 items-start'>
        <CheckoutForm />
        <div className='mt-6 '>
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default Checkout;
