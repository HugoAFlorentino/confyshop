import { Filters, ProductsContainer, PaginationContainer } from '../components';
import { customFetch } from '../utils';
import { useEffect, useState } from 'react';

const url = '/products';

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } =
    queryParams;

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => {
      return customFetch(url, { params: queryParams });
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );
    const products = response.data.data;
    const meta = response.data.meta;
    return { products, meta, params };
  };

const Products = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      {/* Button for Small Screens */}
      <div className='sm:hidden mb-4'>
        <button
          className='btn btn-accent rounded-md w-full'
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filters */}
      <div className={`sm:block ${showFilters ? 'block' : 'hidden'}`}>
        <Filters />
      </div>

      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
