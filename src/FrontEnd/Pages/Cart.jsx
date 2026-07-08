import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { SettingsContext } from "../Context/SettingsContext";

function Cart() {
  const { settings } = useContext(SettingsContext);

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping =
    subtotal === 0
      ? 0
      : settings?.freeShipping
        ? 0
        : Number(settings?.shippingFee || 0);
  const tax = subtotal * (Number(settings?.taxRate || 0) / 100);
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#111214] flex items-center justify-center px-6">
        <div className="max-w-2xl w-full bg-[#181B20] border border-[#2A2F36] rounded-[32px] shadow-2xl p-12 text-center">
          <div className="w-28 h-28 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-6xl">
            🛒
          </div>

          <h1 className="text-5xl font-extrabold text-white mt-8">
            Your Cart is Empty
          </h1>

          <p className="text-gray-400 text-lg mt-5 max-w-md mx-auto leading-8">
            Looks like you haven't added anything yet. Discover our premium
            collection and find something you'll love.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center justify-center mt-10 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white font-semibold text-lg hover:shadow-xl hover:shadow-red-500/20 hover:scale-[1.02] transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 text-white">
      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Shopping <span className="text-[#EF4444]">Cart</span>
        </h1>

        <p className="text-gray-400 mt-3">
          Review your selected items before checkout.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT SIDE */}

        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row gap-6 bg-[#181B20] border border-[#2A2F36] rounded-3xl p-6 hover:border-[#EF4444] transition-all duration-300"
            >
              {/* Product Image */}

              <img
                src={item.image}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-2xl border border-[#2A2F36] bg-[#111214]"
              />

              {/* Product Info */}

              <div className="flex-1">
                <h2 className="text-2xl font-bold">{item.name}</h2>

                <p className="text-gray-400 mt-2">{item.category}</p>

                <p className="text-green-400 font-medium mt-3">✓ In Stock</p>

                <p className="text-3xl font-bold text-[#EF4444] mt-5">
                  ${item.price}
                </p>

                {/* Quantity */}

                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="w-11 h-11 rounded-xl bg-[#111214] border border-[#2A2F36] hover:border-[#EF4444] hover:text-[#EF4444] transition"
                  >
                    −
                  </button>

                  <span className="text-xl font-bold w-8 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="w-11 h-11 rounded-xl bg-[#111214] border border-[#2A2F36] hover:border-[#EF4444] hover:text-[#EF4444] transition"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="ml-auto bg-[#EF4444] hover:bg-[#DC2626] px-5 py-2 rounded-xl text-white font-medium transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}

        <div>
          <div className="sticky top-24 bg-[#181B20] border border-[#2A2F36] rounded-3xl p-7">
            <h2 className="text-3xl font-bold mb-8">Order Summary</h2>

            <div className="space-y-5">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>

                <span className="font-semibold">${subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>

                <span className="text-green-400 font-semibold">
                  {settings?.freeShipping ? "FREE" : `$${shipping}`}
                </span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Tax</span>

                <span>${tax.toFixed(2)}</span>
              </div>

              <hr className="border-[#2A2F36]" />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>

                <span className="text-[#EF4444]">${total}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full text-center bg-[#EF4444] hover:bg-[#DC2626] text-white py-4 rounded-xl mt-8 font-semibold transition-all duration-300 shadow-lg shadow-red-500/20"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/products"
              className="block w-full text-center mt-4 py-4 rounded-xl border border-[#2A2F36] bg-[#111214] hover:border-[#EF4444] hover:text-[#EF4444] transition-all duration-300"
            >
              Continue Shopping
            </Link>

            <button
              onClick={clearCart}
              className="w-full mt-4 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
