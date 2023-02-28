import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { iProduct } from '../../../interfaces/@types';
import { CartContext } from '../../../providers/CartContext';

function ProductCard({id, name, price, category, img}: iProduct) {
  const { addProductToCart } = useContext(CartContext)

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <StyledParagraph className='category'>{category}</StyledParagraph>
        <StyledParagraph className='price'>R$ {price}</StyledParagraph>
        <StyledButton 
          $buttonSize='medium' 
          $buttonStyle='green'
          onClick={() => addProductToCart(id)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  )
};

export default ProductCard;
