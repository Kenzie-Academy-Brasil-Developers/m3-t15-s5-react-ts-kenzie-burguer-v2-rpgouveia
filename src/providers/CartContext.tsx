import { createContext, useState } from "react";
import { iCartContext, iContextProvider } from "../interfaces/@types";

export const CartContext = createContext({} as iCartContext);

function CartProvider({children}: iContextProvider) {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => (
        setIsOpen(true)
    )
    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <CartContext.Provider value={{
            isOpen,
            setIsOpen,
            openModal,
            closeModal
        }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;