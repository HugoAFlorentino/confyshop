import { formatPrice, generateAmountOptions } from '../utils';
import { removeItem, editItem } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({ CartItem }) => {
  const dispatch = useDispatch();

  const { cartId, title, price, image, amount, company, productColor } =
    CartItem;

  const removeItemFromTheCart = () => {
    dispatch(removeItem({ cartId }));
  };

  const handleAmount = (e) => {
    dispatch(editItem({ cartId, amount: parseInt(e.target.value) }));
  };

  return (
    <article
      key={cartId}
      className='mb-12 flex flex-col gapy-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0'
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover'
      />

      {/* INFO */}
      <div className='sm:ml-16 sm:w-48'>
        {/* TITLE */}
        <h3 className='capitalize font-medium'>{title}</h3>
        {/* COMPANY */}
        <h4 className='mt-2 capitalize text-sm text-accent'>{company}</h4>
        {/* COLOR */}
        <p className='mt-2 text-sm capitalize flex items-center gap-x-2'>
          color:
          <span
            className='badge badge-sm rounded-md'
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>

      <div className='sm:ml-12'>
        {/* AMOUNT */}
        <div className='form-control max-w-xs'>
          <label htmlFor='label-text' className='label p-0'>
            Amount
          </label>
          <select
            name='amount'
            id='amount'
            className='mt-2 select select-base select-bordered select-xs rounded-md'
            value={amount}
            onChange={handleAmount}
          >
            {generateAmountOptions(amount + 5)}
          </select>
        </div>
        {/* REMOVE */}
        <button
          className='mt-2 link link-accent link-hover text-sm'
          onClick={removeItemFromTheCart}
        >
          remove
        </button>
      </div>

      {/* PRICE */}
      <p className='font-medium sm:ml-auto'>{formatPrice(price)}</p>
    </article>
  );
};

export default CartItem;
