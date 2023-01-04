import {Outlet} from '@remix-run/react';
import styles from '~/styles/products.css';

export const links = () => [{rel: 'stylesheet', href: styles}];

export default function Products() {
  return (
    <main>
      <h1>Products</h1>
      <Outlet />
    </main>
  );
}
