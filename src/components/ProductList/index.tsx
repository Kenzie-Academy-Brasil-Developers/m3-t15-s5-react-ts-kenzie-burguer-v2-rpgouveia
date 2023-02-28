import { useContext, useEffect } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../providers/CartContext';

function ProductList() {
  const { filteredProducts } = useContext(CartContext);

  // Efeito de Atualização: Monitoramento da Lista de Produtos
  useEffect(() => {
    console.log(filteredProducts);

  }, [filteredProducts])

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
        />)}
    </StyledProductList>
  )
};

export default ProductList;
