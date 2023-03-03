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
        localStorage.setItem("@HamburgueriaKenzie", JSON.stringify(currentSale));
        const totalValue = currentSale.reduce((previousValue, currentValue) => previousValue + currentValue.price * currentValue.quantity, 0);
        setCartTotal(totalValue);
    }, [currentSale]);

    function addProductToCart(productId: number) {
        const addProductFounded = products.find((item) => item.id === productId);
        if (addProductFounded) {
            const productAlreadyInCart = currentSale.find((product) => product.id === productId);
            if (productAlreadyInCart) {
                const updatedCart = currentSale.map((product) => product.id === productId ? { ...product, quantity: product.quantity + 1 } : product);
                setCurrentSale(updatedCart);
                toast.success("Quantidade do produto atualizada");
            } else {
                setCurrentSale([...currentSale, { ...addProductFounded, quantity: 1 }]);
                toast.success("Produto adicionado");
            };
        };
    };

    function removeProductFromCart(productId: number) {
        const productToRemove = currentSale.find((item) => item.id === productId) as iProduct;
        if (productToRemove.quantity > 1) {
            const updatedCart = currentSale.map((product) => product.id === productId ? { ...product, quantity: product.quantity - 1 } : product);
            setCurrentSale(updatedCart);
            toast.warning("Quantidade do produto atualizada");
        } else {
            const filteredCurrentSale = currentSale.filter((item) => item.id !== productId);
            setCurrentSale(filteredCurrentSale);
            toast.warning("Produto removido");
        };
    };

    function removeAllProductsFromCart() {
        if (currentSale.length === 1 && currentSale[0].quantity === 1) {
            const resetCurrentSale: [] = [];
            setCurrentSale(resetCurrentSale);
            toast.success('Produto removido');
        } else {
            const resetCurrentSale: [] = [];
            setCurrentSale(resetCurrentSale);
            toast.success('Produtos removidos');
        };
    };

    const filteredProducts = products.filter(item => {
        const nameMatch = (item.name.toLowerCase()).includes(search.toLowerCase());
        const categoryMatch = (item.category.toLowerCase()).includes(search.toLowerCase());
        return search === '' ? true : (nameMatch || categoryMatch);
    })

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