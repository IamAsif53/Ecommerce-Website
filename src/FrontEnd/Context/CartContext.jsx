import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AuthContext } from "./AuthContext";

import {
  getCart,
  addToCart as addToCartAPI,
  increaseQuantity as increaseQuantityAPI,
  decreaseQuantity as decreaseQuantityAPI,
  removeFromCart as removeFromCartAPI,
  clearCart as clearCartAPI,
} from "../Services/cartService";

export const CartContext = createContext();

function CartProvider({ children }) {
  const { user } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }

    try {
      const data = await getCart();

      setCartItems(data.cart);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    try {
      const data = await addToCartAPI(product._id);

      setCartItems(data.cart);

      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  const increaseQuantity = async (_id) => {
    try {
      const data = await increaseQuantityAPI(_id);

      setCartItems(data.cart);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  const decreaseQuantity = async (_id) => {
    try {
      const data = await decreaseQuantityAPI(_id);

      setCartItems(data.cart);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  const removeFromCart = async (_id) => {
    try {
      const data = await removeFromCartAPI(_id);

      setCartItems(data.cart);

      toast.success("Product removed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove product");
    }
  };

  const clearCart = async () => {
    try {
      await clearCartAPI();

      setCartItems([]);

      toast.success("Cart cleared");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
