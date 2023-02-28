import { useContext, useEffect } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../providers/CartContext';

function ProductList() {
  const { products } = useContext(CartContext);


  // Efeito de Atualização: Monitoramento da Lista de Produtos
  useEffect(() => {
    console.log(products);
    
  }, [products])

  return (
    <StyledProductList>
      {products.map(product => <ProductCard key={product.id} product={product}/>)}
    </StyledProductList>
  )
};

export default ProductList;
