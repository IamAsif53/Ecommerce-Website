function CheckoutForm({ formData, setFormData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <div className="bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 text-white">
      <h2 className="text-3xl font-bold mb-8">Shipping Information</h2>

      <div className="grid md:grid-cols-2 gap-5 mb-5">
        {/* Full Name */}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full bg-[#111214] border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition ${
              errors.customerName ? "border-red-500" : "border-[#2A2F36]"
            }`}
          />

          {errors.customerName && (
            <p className="text-red-400 text-sm mt-2">{errors.customerName}</p>
          )}
        </div>

        {/* Phone */}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="01XXXXXXXXX"
            className={`w-full bg-[#111214] border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition ${
              errors.phone ? "border-red-500" : "border-[#2A2F36]"
            }`}
          />

          {errors.phone && (
            <p className="text-red-400 text-sm mt-2">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Email */}

      <div className="mb-5">
        <label className="block font-medium text-gray-300 mb-2">Email</label>

        <input
          type="email"
          value={formData.user}
          disabled
          className="w-full bg-[#0F1114] border border-[#2A2F36] rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed"
        />
      </div>

      {/* Address */}

      <div className="mb-5">
        <label className="block font-medium text-gray-300 mb-2">
          Street Address
        </label>

        <textarea
          rows="3"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="House, Road, Area"
          className={`w-full bg-[#111214] border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition ${
            errors.address ? "border-red-500" : "border-[#2A2F36]"
          }`}
        />

        {errors.address && (
          <p className="text-red-400 text-sm mt-2">{errors.address}</p>
        )}
      </div>

      {/* City + Postal */}

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block font-medium text-gray-300 mb-2">City</label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Dhaka"
            className={`w-full bg-[#111214] border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition ${
              errors.city ? "border-red-500" : "border-[#2A2F36]"
            }`}
          />

          {errors.city && (
            <p className="text-red-400 text-sm mt-2">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-gray-300 mb-2">
            Postal Code
          </label>

          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="1207"
            className={`w-full bg-[#111214] border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition ${
              errors.postalCode ? "border-red-500" : "border-[#2A2F36]"
            }`}
          />

          {errors.postalCode && (
            <p className="text-red-400 text-sm mt-2">{errors.postalCode}</p>
          )}
        </div>
      </div>

      {/* Country */}

      <div className="mt-5">
        <label className="block font-medium text-gray-300 mb-2">Country</label>

        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full bg-[#111214] border border-[#2A2F36] rounded-xl px-4 py-3 text-white focus:border-[#EF4444] focus:ring-2 focus:ring-red-500/20 outline-none transition"
        >
          <option value="Bangladesh">Bangladesh</option>
          <option value="India">India</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Nepal">Nepal</option>
          <option value="Sri Lanka">Sri Lanka</option>
        </select>
      </div>
    </div>
  );
}

export default CheckoutForm;
