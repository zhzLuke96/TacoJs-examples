import * as Taco from '@tacopie/taco';
import {Logo} from './components/tiny/Logo';
import {Cart} from './components/Cart';
import {Product} from './types';

const {useRef, useMemo, useEffect} = Taco;

const App = () => {
  const products = useRef([] as Product[]);
  setTimeout(() => {
    products.value.push({
      name: 'A',
      price: 100,
      description: 'This is...',
      productId: 'xxx',
      previewUrl: 'https://dummyimage.com/200x200/000/fff',
    });
  }, 1000);
  return (
    <div>
      <Logo className="logo" style={{width: '64px', height: '64px'}} />
      <Cart products={products} />
    </div>
  );
};

Taco.render(<App />, document.querySelector('#app'));
