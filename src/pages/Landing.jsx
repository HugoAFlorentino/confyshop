import { FeaturedProducts, Hero } from '../components';
import { customFetch } from '../utils/index';

const url = '/products?featured=true';

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  try {
    const response = await queryClient.ensureQueryData(featuredProductsQuery);
    const products = response.data.data;
    return { products: products || [] }; //  Return an empty array instead of throwing
  } catch (error) {
    if (error.name === 'CanceledError') {
      console.warn('Query was canceled:', error);
      return { products: [] }; //  Gracefully return empty data
    }
    console.error('Loader error:', error);
    return { products: [] }; //  Instead of throwing a response error, return an empty state
  }
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
