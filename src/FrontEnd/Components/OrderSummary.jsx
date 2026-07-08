import { useContext } from "react";
import { SettingsContext } from "../Context/SettingsContext";

function OrderSummary({ cartItems, handleOrder, loading, paymentMethod }) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const { settings } = useContext(SettingsContext);

  const shipping =
    subtotal === 0
      ? 0
      : settings?.freeShipping
        ? 0
        : Number(settings?.shippingFee || 0);

  const tax = subtotal * (Number(settings?.taxRate || 0) / 100);

  const total = subtotal + shipping + tax;

  return (
    <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-7 sticky top-24 text-white">
      <h2 className="text-3xl font-bold mb-8">Order Summary</h2>

      {/* Products */}

      <div className="space-y-5 max-h-96 overflow-y-auto pr-2">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 border-b border-[#2A2F36] pb-5"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-xl border border-[#2A2F36] bg-[#111214]"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>

              <p className="text-gray-400 text-sm mt-1">{item.category}</p>

              <p className="text-gray-400 mt-2">
                Quantity :
                <span className="font-semibold ml-2 text-white">
                  {item.quantity}
                </span>
              </p>

              <div className="flex justify-between mt-3">
                <span className="text-gray-400">
                  ${item.price} × {item.quantity}
                </span>

                <span className="font-bold text-[#EF4444]">
                  ${item.price * item.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price Details */}

      <div className="mt-8 space-y-5">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>

          <span>${subtotal}</span>
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

      {/* Checkout Button */}

      <button
        onClick={handleOrder}
        disabled={loading}
        className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 mt-8 ${
          loading
            ? "bg-[#2A2F36] cursor-not-allowed text-gray-400"
            : "bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
        }`}
      >
        {loading
          ? paymentMethod === "SSLCommerz"
            ? "Redirecting..."
            : "Placing Order..."
          : paymentMethod === "SSLCommerz"
            ? "🔒 Pay Securely"
            : "📦 Place Order"}
      </button>

      {/* Features */}

      <div className="mt-8 bg-[#111214] border border-[#2A2F36] rounded-2xl p-5">
        <h3 className="font-bold text-lg mb-4">Why Shop With Us?</h3>

        <div className="space-y-3 text-gray-300">
          <div>✅ 100% Secure Checkout</div>
          <div>🚚 Free Shipping</div>
          <div>↩️ 7 Days Easy Return</div>
          <div>📞 24/7 Customer Support</div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
