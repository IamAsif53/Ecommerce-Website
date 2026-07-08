import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";

import { createOrder, initiatePayment } from "../Services/orderService";
import CheckoutForm from "../Components/CheckoutForm";
import OrderSummary from "../Components/OrderSummary";
import PaymentMethod from "../Components/PaymentMethod";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useContext(CartContext);

  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    customerName: user?.name || "",
    user: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Full Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal Code is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        user: formData.user,

        customerName: formData.customerName,

        phone: formData.phone,

        address: formData.address,

        city: formData.city,

        postalCode: formData.postalCode,

        country: formData.country,

        paymentMethod,

        items: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),

        totalPrice,
      };

      //--------------------------------------------------
      // Cash On Delivery
      //--------------------------------------------------

      if (paymentMethod === "Cash On Delivery") {
        const response = await createOrder(orderData);

        clearCart();

        toast.success("Order Placed Successfully!");

        navigate("/order-success", {
          state: {
            order: response.order,
          },
        });

        return;
      }

      //--------------------------------------------------
      // SSLCommerz
      //--------------------------------------------------

      if (paymentMethod === "SSLCommerz") {
        const response = await initiatePayment(orderData);

        window.location.href = response.paymentUrl;

        return;
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Failed to process payment",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111214] text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}

        <div className="mb-10">
          <span className="uppercase tracking-[4px] text-[#EF4444] font-semibold text-sm">
            Checkout
          </span>

          <h1 className="text-5xl font-extrabold mt-3">Complete Your Order</h1>

          <p className="text-gray-400 mt-4 max-w-2xl">
            Complete your shipping information and review your order before
            placing it.
          </p>
        </div>

        {/* Content */}

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left */}

          <div className="lg:col-span-2 space-y-8">
            <CheckoutForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>

          {/* Right */}

          <div className="sticky top-24">
            <OrderSummary
              cartItems={cartItems}
              handleOrder={handleOrder}
              loading={loading}
              paymentMethod={paymentMethod}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
