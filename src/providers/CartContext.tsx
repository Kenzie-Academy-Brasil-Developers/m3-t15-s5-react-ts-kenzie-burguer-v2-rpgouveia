import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
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

    useEffect(() => {
        async function getAllProducts() {
            const token = localStorage.getItem('@TOKEN');
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                };
                const response = await api.get<iProduct[]>('/products', config);
                setProducts(response.data);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            };
        };
        getAllProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem('@HamburgueriaKenzie', JSON.stringify(currentSale))
        const totalValue = currentSale.reduce((previousValue, currentValue) => (previousValue + currentValue.price), 0)
        setCartTotal(totalValue)
    }, [currentSale]);

    function addProductToCart(productId: number) {
        if (!currentSale.some(product => product.id === productId)) {
            const addProductFounded = products.find(item => item.id === productId)
            if (addProductFounded) {
                setCurrentSale([...currentSale, addProductFounded]);
                toast.success('Produto adicionado'); // Funciona
            } else {
                toast.error('Produto já foi adicionado'); // Não funciona
            }
        };
    };

    function removeProductFromCart(productId: number) {
        const filteredCurrentSale = currentSale.filter(item => (item.id !== productId));
        setCurrentSale(filteredCurrentSale);
        toast.warning('Produto removido');
    }

    function removeAllProductsFromCart() {
        if (currentSale.length === 1) {
            const resetCurrentSale: [] = [];
            setCurrentSale(resetCurrentSale);
            toast.success('Produto removido');
        } else {
            const resetCurrentSale: [] = [];
            setCurrentSale(resetCurrentSale);
            toast.success('Produtos removidos');
        };
    };

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
            setSearch,
            filteredProducts,
            currentSale,
            cartTotal
        }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;