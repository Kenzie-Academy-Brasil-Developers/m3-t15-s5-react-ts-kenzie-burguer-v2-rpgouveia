import { MdClose } from 'react-icons/md';
import { useContext } from 'react';
import CartProductList from './CartProductList';

import { StyledCartModalBox } from './style';
import { StyledParagraph, StyledTitle } from '../../styles/typography';
import { CartContext } from '../../providers/CartContext';

function CartModal() {
  const { closeModal, currentSale } = useContext(CartContext)

  return (
    <StyledCartModalBox>
      <dialog onClose={closeModal}>
        <header>
          <StyledTitle tag='h2' $fontSize='three'>
            Carrinho de compras
          </StyledTitle>
          <button
            type='button'
            aria-label='Fechar'
            onClick={closeModal}
          >
            <MdClose size={21} />
          </button>
        </header>
        <div className='cartBox'>
          {currentSale.length ? (<CartProductList />) : (
            <div className='emptyBox'>
              <StyledTitle tag='h3' $fontSize='three' textAlign='center'>
                Sua sacola está vazia
              </StyledTitle>
              <StyledParagraph textAlign='center'>Adicione itens</StyledParagraph>
            </div>
          )}
        </div>
      </dialog>
    </StyledCartModalBox>
  )
};

export default CartModal;
