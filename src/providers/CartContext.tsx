import { createContext, useEffect, useState } from "react";
import { iCartContext, iContextProvider, iProduct } from "../interfaces/@types";
import { api } from "../services/api";

export const CartContext = createContext({} as iCartContext);

function CartProvider({ children }: iContextProvider) {
    const localCurrentSale = localStorage.getItem('@HamburgueriaKenzie')

    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState<iProduct[]>([])
    const [currentSale, setCurrentSale] = useState<iProduct[]>(localCurrentSale ? JSON.parse(localCurrentSale) : [])
    const [cartTotal, setCartTotal] = useState(0)
    const [search, setSearch] = useState('')

    const openModal = () => (
        setIsOpen(true)
    )
    const closeModal = () => {
        setIsOpen(false)
    }

    // Efeito de Montagem: Lista de Produtos
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
    }, []);

    // Efeito de Atualização: Valor Total da Lista do Carrinho de Compras
    useEffect(() => {
        localStorage.setItem('@HamburgueriaKenzie', JSON.stringify(currentSale))
        const totalValue = currentSale.reduce((previousValue, currentValue) => (previousValue + currentValue.price), 0)
        setCartTotal(totalValue)
    }, [currentSale]);

    // Função Callback: Adicionar Produto, reavaliar no modal
    function addProductToCart(productId: number) {
        if (!currentSale.some(product => product.id === productId)) {
            const addProductFounded = products.find(item => item.id === productId)
            if (addProductFounded) {
                setCurrentSale([...currentSale, addProductFounded])
                // Futuro toast de sucesso
                console.log('Produto adicionado');
            } else {
                // Futuro toast de erro
                console.log('Produto já foi adicionado')
            };
        };
    };

    // Função Callback: Remover Produto, reavaliar no modal
    function removeProductFromCart(productId: number) {
        const filteredCurrentSale = currentSale.filter(item => (item.id !== productId));
        setCurrentSale(filteredCurrentSale);
        console.log('Produto removido');
        // toast.warning('Produto removido')
    }

    // Função Callback: Remover TODOS os Produtos, reavaliar no modal
    function removeAllProductsFromCart() {
        if (currentSale.length === 1) {
            const resetCurrentSale: [] = [];
            setCurrentSale(resetCurrentSale);
            console.log('Produto removido');
            // toast.success('Produto removido')
        } else {
            const resetCurrentSale: [] = [];
            setCurrentSale(resetCurrentSale);
            console.log('Produtos removidos');
            // toast.success('Produtos removidos')
        };
    };

    // Função Callback: Filtrar Lista de Produtos
    const filteredProducts = products.filter(item => ( search === '' ? true : (item.name.toLowerCase()).includes(search.toLowerCase())))

    return (
        <CartContext.Provider value={{
            isOpen,
            setIsOpen,
            openModal,
            closeModal,
            addProductToCart,
            removeProductFromCart,
            removeAllProductsFromCart,
            filteredProducts
        }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;