import { useContext } from 'react';
import CartProductCard from './CartProductCard';

import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../providers/CartContext';

function CartProductList() {
  const { currentSale, cartTotal, removeAllProductsFromCart } = useContext(CartContext);

  return (
    <StyledCartProductList>
      <ul>
        {currentSale.map(item => (
        <CartProductCard 
          key={item.id}
          id={item.id}
          name={item.name}
          category={item.category}
          price={item.price}
          img={item.img}
        />))}
      </ul>

      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>R$ {cartTotal.toFixed(2)}</StyledParagraph>
      </div>
      <StyledButton
        $buttonSize='default'
        $buttonStyle='gray'
        onClick={removeAllProductsFromCart}
      >
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  )
};

export default CartProductList;
