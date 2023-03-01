import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';

import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { CartContext } from '../../../../providers/CartContext';
import { iProduct } from '../../../../interfaces/@types';

function CartProductCard({id, name, img}: iProduct) {
  const { removeProductFromCart } = useContext(CartContext);

  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={img} alt={name} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {name}
        </StyledTitle>
        <button
          type='button'
          aria-label='Remover'
          onClick={() => removeProductFromCart(id)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  )
};

export default CartProductCard;
