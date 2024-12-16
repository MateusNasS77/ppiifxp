import { createContext, useState, useEffect, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    products: [],
    loading: false,
    error: "",
    addItemToCart: () => { },
    updateItemQuantity: () => { },
});

export default function CartContextProvider({ children }) {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                // Fetch veículos
                const responseVehicle = await fetch("https://dummyjson.com/products/category/vehicle?limit=12&select=id,thumbnail,title,price,description");
                const responseMotorcycle = await fetch("https://dummyjson.com/products/category/motorcycle?limit=12&select=id,thumbnail,title,price,description");

                if (responseVehicle.ok && responseMotorcycle.ok) {
                    const vehicleData = await responseVehicle.json();
                    const motorcycleData = await responseMotorcycle.json();

                    // Combine os produtos das duas categorias
                    const combinedProducts = [...vehicleData.products, ...motorcycleData.products];

                    setProducts(combinedProducts);
                } else {
                    setError("Fetch FAILED for one or more categories!");
                }
            } catch (error) {
                setError("An unexpected error occurred!");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    // SHOPPING CART

    function cartReducer(state, action) {

        if (action.type === "ADD_ITEM") {
            const updatedItems = [...state.items];

            const existingCartItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.id
            );

            const existingCartItem = updatedItems[existingCartItemIndex];

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity + 1,
                }
                updatedItems[existingCartItemIndex] = updatedItem;
            }  else {
                const product = action.payload.products.find(
                    (product) => product.id === action.payload.id
                );
                updatedItems.push({
                    id: action.payload.id,
                    thumbnail: product.thumbnail,
                    title: product.title,
                    price: product.price,
                    quantity: 1,
                });
            }

            return { items: updatedItems };
        }

        if (action.type === "UPDATE_ITEM") {
            const updatedItems = [...state.items];

            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.id === action.payload.id
            );

            const updatedItem = { ...updatedItems[updatedItemIndex] };

            updatedItem.quantity += action.payload.amount;

            if (updatedItem.quantity < 1) {
                updatedItems.splice(updatedItemIndex, 1);
            } else {
                updatedItems[updatedItemIndex] = updatedItem;
            }

            return { ...state, items: updatedItems };
        }
        if (action.type === "CLEAR_CART") {
            return { items: [] };
        }

        return state;
    }

    const [cartState, cartDispatch] = useReducer(
        cartReducer,
        { items: [] }
    );

    function handleAddItemToCart(id) {
        cartDispatch({
            type: "ADD_ITEM",
            payload: { id, products }
        });
    }

    function handleUpdateCartItemQuantity(id, amount) {
        cartDispatch({
            type: "UPDATE_ITEM",
            payload: { id, amount }
        });
    }

    function handleClearCart() {
        cartDispatch({
            type: "CLEAR_CART"
        });
    }

    const ctx = {
        items: cartState.items,
        products: products,
        loading: loading,
        error: error,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
        clearCart: handleClearCart,
    };

    return <CartContext.Provider value={ctx}>
        {children}
    </CartContext.Provider>

}