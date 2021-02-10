import * as Taco from '@tacopie/taco';
import {Product} from '../types';
import {Table} from './base/Table';

import {Mptr} from '@tacopie/taco';

export const Cart = ({products = [] as Mptr<Product[]>}) => {
  return (
    <div className="cart-container">
      <Table datasource={products} />
    </div>
  );
};
