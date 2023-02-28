import { createContext, useEffect, useState } from "react";
import { iCartContext, iContextProvider, iProduct } from "../interfaces/@types";
import { api } from "../services/api";

export const CartContext = createContext({} as iCartContext);

function CartProvider({children}: iContextProvider) {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<iProduct[]>([])
    const [currentSale, setCurrentSale] = useState<iProduct[]>([])

    const openModal = () => (
        setIsOpen(true)
    )
    const closeModal = () => {
        setIsOpen(false)
    }

    // Efeito de montagem: Lista de Produtos
    useEffect(() => {
        async function getAllProducts() {
            const token = localStorage.getItem('@TOKEN');
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
                const response = await api.get('/products', config);
                setProducts(response.data);
            } catch (error) {
                console.log(error);
                
            }
        }
        getAllProducts();
    }, [])

    // Função Callback: Adicionar Produtos
    // function addProductToCart(productId: number) {
    //     if (!currentSale.some(product => product.id === productId)) {
    //         const addProductFounded = products.find(item => item.id === productId)
    //         setCurrentSale([...currentSale, addProductFounded])
    //         // toast de sucesso
    //         console.log('Produto adicionado');
            
    //     } else {
    //         // toast de erro
    //         console.log('Produto já foi adicionado')
    //     }
    // }

    return (
        <CartContext.Provider value={{
            isOpen,
            setIsOpen,
            openModal,
            closeModal,
            products
        }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;