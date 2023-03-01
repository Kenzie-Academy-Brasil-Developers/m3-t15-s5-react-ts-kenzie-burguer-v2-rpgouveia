import { useContext } from 'react';
import { StyledShopPage } from './style';
import CartModal from '../../components/CartModal';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';

import { StyledContainer } from '../../styles/grid';
import { CartContext } from '../../providers/CartContext';

function ShopPage() {
  const { isOpen } = useContext(CartContext);

  return (
    <StyledShopPage>
      {isOpen && <CartModal />}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  )
};

export default ShopPage;
