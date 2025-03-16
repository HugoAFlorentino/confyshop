import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils/index';

const ProductsList = () => {
  const { products } = useLoaderData();

  return (
    <div className='mt-12 grid gap-y-8 '>
      {products.map((product) => {
        const { title, price, image, company } = product.attributes;
        const currencyAmount = formatPrice(price);
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className='p-8 rounded-lg flex flex-row sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-transform ease-in-out duration-100 min-h-[200px]'
          >
            <img
              src={image}
              alt={title}
              className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover mr-4 sm:mr-0'
            />
            <div className='ml-0 sm:ml-16 flex flex-col flex-1 justify-between'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='capitalize font-medium text-lg'>{title}</h3>
                  <h4 className='capitalize text-md text-neutral dark:text-accent'>
                    {company}
                  </h4>
                </div>
                <p className='text-accent font-medium text-lg ml-auto'>
                  {currencyAmount}
                </p>
              </div>
              <div className='mt-4 text-sm text-gray-600 dark:text-slate-400'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                error alias ad quibusdam sapiente nihil optio assumenda illo
                accusantium fugiat magni natus odio quod, omnis fugit autem
                harum mollitia iusto quo numquam tenetur placeat consequuntur.
                Perspiciatis iusto optio praesentium officiis?
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsList;
