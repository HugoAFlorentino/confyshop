import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils/index';

const ProductsGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className='pt-12 grid gap-4  md:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        const currencyAmount = formatPrice(price);
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className='card w-full shadow-xl hover:shadow-2xl hover:scale-105 transition-transform duration-300'
          >
            <figure className='px-4 pt-4'>
              <img
                src={image}
                alt={title}
                className='rounded-xl h-64 md:h-48 w-full object-cover'
              />
            </figure>
            <div className='card-body items-center text-center'>
              <h2 className='card-title capitalize tracking-wider'>{title}</h2>
              <span className='text-neutral dark:text-accent'>
                {currencyAmount}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
