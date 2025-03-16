import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: '/about', text: 'about' },
  { id: 3, url: '/products', text: 'products' },
  { id: 4, url: '/cart', text: 'cart' },
  { id: 5, url: '/checkout', text: 'checkout' },
  { id: 6, url: '/orders', text: 'orders' },
];

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);

  return (
    <>
      {links.map(({ id, url, text }) => {
        if ((url === '/checkout' || url === '/orders') && !user) return null;
        return (
          <NavLink
            key={id}
            to={url}
            className={({ isActive }) =>
              `capitalize px-4 py-2 rounded-lg transition duration-300 ${
                isActive
                  ? 'bg-accent font-medium'
                  : 'bg-transparent text-base-content'
              } hover:bg-accent`
            }
          >
            {text}
          </NavLink>
        );
      })}
    </>
  );
};

export default NavLinks;
