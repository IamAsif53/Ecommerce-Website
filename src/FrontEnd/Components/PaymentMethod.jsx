import { FaMoneyBillWave, FaLock, FaCheckCircle } from "react-icons/fa";

function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 mt-8 text-white">
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-3xl font-bold">Payment Method</h2>

        <p className="text-gray-400 mt-2">
          Choose your preferred payment option.
        </p>
      </div>

      {/* Cash On Delivery */}

      <div
        onClick={() => setPaymentMethod("Cash On Delivery")}
        className={`cursor-pointer border rounded-3xl p-6 transition-all duration-300 mb-5 ${
          paymentMethod === "Cash On Delivery"
            ? "border-[#EF4444] bg-[#111214]"
            : "border-[#2A2F36] bg-[#111214] hover:border-[#EF4444]"
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex gap-5">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition ${
                paymentMethod === "Cash On Delivery"
                  ? "bg-[#EF4444] text-white"
                  : "bg-[#2A2F36] text-gray-300"
              }`}
            >
              <FaMoneyBillWave />
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-xl font-bold text-white">
                  Cash On Delivery
                </h3>

                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-semibold">
                  Available
                </span>
              </div>

              <p className="text-gray-400 mt-3 leading-7">
                Pay only after your order is delivered to your doorstep. No
                advance payment required.
              </p>
            </div>
          </div>

          {paymentMethod === "Cash On Delivery" ? (
            <FaCheckCircle size={26} className="text-[#EF4444]" />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-[#2A2F36]" />
          )}
        </div>
      </div>

      {/* SSLCommerz */}

      <div
        onClick={() => setPaymentMethod("SSLCommerz")}
        className={`cursor-pointer border rounded-3xl p-6 transition-all duration-300 ${
          paymentMethod === "SSLCommerz"
            ? "border-[#EF4444] bg-[#111214]"
            : "border-[#2A2F36] bg-[#111214] hover:border-[#EF4444]"
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex gap-5">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition ${
                paymentMethod === "SSLCommerz"
                  ? "bg-[#EF4444] text-white"
                  : "bg-[#2A2F36] text-gray-300"
              }`}
            >
              <FaLock />
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-xl font-bold text-white">SSLCommerz</h3>

                <span className="px-3 py-1 rounded-full bg-[#EF4444] text-white text-xs font-semibold">
                  Recommended
                </span>
              </div>

              <p className="text-gray-400 mt-3 leading-7">
                Continue to the official SSLCommerz secure payment page to
                complete your payment safely.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="bg-[#181B20] border border-[#2A2F36] px-3 py-1 rounded-full text-sm">
                  Secure Checkout
                </span>

                <span className="bg-[#181B20] border border-[#2A2F36] px-3 py-1 rounded-full text-sm">
                  Instant Confirmation
                </span>

                <span className="bg-[#181B20] border border-[#2A2F36] px-3 py-1 rounded-full text-sm">
                  SSL Protected
                </span>
              </div>
            </div>
          </div>

          {paymentMethod === "SSLCommerz" ? (
            <FaCheckCircle size={26} className="text-[#EF4444]" />
          ) : (
            <div className="w-6 h-6 rounded-full border-2 border-[#2A2F36]" />
          )}
        </div>
      </div>

      {/* Security */}

      <div className="mt-8 bg-[#111214] border border-[#2A2F36] rounded-3xl p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400 text-xl">
            🔒
          </div>

          <div>
            <h4 className="font-bold text-xl">Secure Payment Guarantee</h4>

            <p className="text-gray-400 text-sm">
              Your payment information is always protected.
            </p>
          </div>
        </div>

        <ul className="space-y-4 text-gray-300">
          <li className="flex items-start gap-3">
            <FaCheckCircle className="text-green-400 mt-1" />

            <span>
              All online transactions are processed through the official
              SSLCommerz payment gateway.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <FaCheckCircle className="text-green-400 mt-1" />

            <span>Tech IT never stores your card or payment credentials.</span>
          </li>

          <li className="flex items-start gap-3">
            <FaCheckCircle className="text-green-400 mt-1" />

            <span>
              After clicking{" "}
              <strong className="text-white">Pay Securely</strong>, you'll be
              redirected to SSLCommerz to complete your payment.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PaymentMethod;
