import { Link, useLocation, useSearchParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "../Services/orderService";
import { useContext } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";

function OrderSuccess() {
  const location = useLocation();

  const [searchParams] = useSearchParams();

  const [order, setOrder] = useState(location.state?.order || null);

  const [loading, setLoading] = useState(!location.state?.order);

  const orderId = searchParams.get("orderId");
  const { clearCart } = useContext(CartContext);

  //--------------------------------------------------
  // Load Order (SSLCommerz)
  //--------------------------------------------------

  useEffect(() => {
    const handleSuccess = async () => {
      try {
        //--------------------------------------------------
        // COD Order
        //--------------------------------------------------

        if (location.state?.order) {
          await clearCart();

          toast.success("Your order has been placed successfully!");

          setLoading(false);

          return;
        }

        //--------------------------------------------------
        // SSLCommerz Order
        //--------------------------------------------------

        if (!orderId) {
          setLoading(false);
          return;
        }

        const response = await getOrderById(orderId);

        setOrder(response.order);

        await clearCart();

        // Show success toast only once for each order
        const currentOrderId = response.order._id;

        if (sessionStorage.getItem("payment-toast") !== currentOrderId) {
          toast.success("Payment completed successfully!");

          sessionStorage.setItem("payment-toast", currentOrderId);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handleSuccess();
  }, []);

  //--------------------------------------------------
  // Loading
  //--------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading Order...
      </div>
    );
  }

  //--------------------------------------------------
  // Invalid Access
  //--------------------------------------------------

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const orderNumber = "ORD-" + order._id.slice(-6).toUpperCase();

  return (
    <div className="min-h-screen bg-[#111214] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl bg-[#181B20] border border-[#2A2F36] rounded-[32px] shadow-2xl overflow-hidden">
        {/* Header */}

        <div className="text-center px-10 pt-12 pb-8">
          <div className="w-28 h-28 mx-auto rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
            <span className="text-6xl">✅</span>
          </div>

          <h1 className="text-5xl font-extrabold text-white mt-8">
            Order Confirmed
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Thank you for shopping with
            <span className="text-[#EF4444] font-semibold ml-2">Techit.</span>
            Your order has been placed successfully.
          </p>
        </div>

        {/* Order Details */}

        <div className="mx-8 bg-[#111214] border border-[#2A2F36] rounded-3xl p-8 space-y-5">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Order ID</span>

            <span className="font-semibold text-white">{orderNumber}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Customer</span>

            <span className="font-semibold text-white">
              {order.customerName}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Payment Method</span>

            <span className="font-semibold text-white">
              {order.paymentMethod}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Payment Status</span>

            <span className="font-semibold text-green-400">
              {order.paymentStatus}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Order Status</span>

            <span className="font-semibold text-yellow-400">
              {order.status}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Amount</span>

            <span className="text-2xl font-bold text-[#EF4444]">
              ৳{order.totalPrice}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">Estimated Delivery</span>

            <span className="font-semibold text-white">
              3 - 5 Business Days
            </span>
          </div>
        </div>

        {/* Information */}

        <div className="mx-8 mt-8 rounded-3xl bg-[#111214] border border-[#2A2F36] p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            What happens next?
          </h3>

          <div className="space-y-3 text-gray-400">
            <div>📦 Your order is now being processed.</div>

            <div>📞 We'll contact you before delivery if needed.</div>

            <div>🚚 You'll receive your package within 3–5 business days.</div>
          </div>
        </div>

        {/* Buttons */}

        <div className="grid md:grid-cols-2 gap-5 p-8">
          <Link
            to="/products"
            className="h-14 rounded-2xl flex items-center justify-center font-semibold bg-[#EF4444] hover:bg-red-600 text-white transition-all duration-300 hover:scale-[1.02]"
          >
            Continue Shopping
          </Link>

          <Link
            to="/my-orders"
            className="h-14 rounded-2xl flex items-center justify-center font-semibold border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-all duration-300 hover:scale-[1.02]"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
