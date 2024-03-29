import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../providers/CartContext';

function ProductList() {
  const { filteredProducts } = useContext(CartContext);

  return (
    <StyledProductList>
      {filteredProducts.map(product =>
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          category={product.category}
          price={product.price}
          img={product.img}
          quantity={product.quantity}
        />)}
    </StyledProductList>
  )
};

export default ProductList;
