function WhyChooseUs() {
  const features = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description:
        "Fast and secure delivery on all eligible orders across the country.",
    },
    {
      icon: "🛡️",
      title: "Official Warranty",
      description:
        "Every product comes with genuine manufacturer warranty support.",
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description:
        "Your payments are protected with trusted and encrypted checkout.",
    },
    {
      icon: "🎧",
      title: "24/7 Support",
      description:
        "Our support team is always ready to help whenever you need us.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0F1114] py-24">
      {/* Background Glow */}

      <div className="absolute -top-32 -left-24 w-80 h-80 bg-red-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-red-600/10 blur-[150px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#181B20] border border-[#2A2F36] text-[#EF4444] text-sm font-semibold">
            ⭐ WHY CHOOSE US
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold text-white mt-6">
            Why Choose <span className="text-[#EF4444]">Tech IT</span>
          </h2>

          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto leading-8">
            We don't just sell technology. We deliver quality, trust and an
            exceptional shopping experience for every customer.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-[#181B20] border border-[#2A2F36] rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#EF4444] hover:shadow-lg hover:shadow-red-500/10"
            >
              {/* Icon */}

              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#EF4444] to-[#B91C1C] flex items-center justify-center text-4xl shadow-lg shadow-red-500/20 transition-all duration-300 group-hover:scale-110">
                {feature.icon}
              </div>

              {/* Title */}

              <h3 className="text-2xl font-bold text-white mt-8 group-hover:text-[#EF4444] transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}

              <p className="text-gray-400 mt-4 leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
