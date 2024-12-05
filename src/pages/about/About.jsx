import React from "react";

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans mt-[8ch] overflow-hidden scroll-smooth">
      {/* Hero Section */}
      <header className="text-center py-16 bg-gradient-to-br from-purple-700 to-blue-700 relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 relative">
          Welcome to GBUS!
        </h1>
        <p className="mt-4 text-lg md:text-xl relative">
          Redefining travel with comfort, convenience, and reliability.
        </p>
      </header>

      {/* Services Section */}
      <section className="py-12 px-6 md:px-16 relative">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-blue-900 to-transparent pointer-events-none"></div>
        <h2 className="text-4xl font-bold text-center text-yellow-400 drop-shadow-lg">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {[
            {
              title: "Easy Online Booking",
              description: "Real-time availability, secure payments, and instant confirmations.",
              icon: "🛒",
            },
            {
              title: "Comfortable Travel",
              description: "Modern buses with reclining seats, air conditioning, and ample legroom.",
              icon: "🚌",
            },
            {
              title: "Extensive Network",
              description: "Connecting cities and towns across the nation.",
              icon: "🌐",
            },
            {
              title: "24/7 Customer Support",
              description: "Assistance just a call or chat away.",
              icon: "📞",
            },
            {
              title: "Transparent Pricing",
              description: "No hidden charges, ensuring value for money.",
              icon: "💸",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-6 text-center hover:scale-105 transition-transform shadow-lg"
            >
              <div className="text-4xl">{service.icon}</div>
              <h3 className="text-xl font-semibold text-blue-400 mt-4">{service.title}</h3>
              <p className="mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-12 px-6 md:px-16 bg-gray-800">
        <h2 className="text-4xl font-bold text-center text-yellow-400 drop-shadow-lg">
          Facilities Onboard
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {[
            { title: "Wi-Fi Connectivity", icon: "📶" },
            { title: "Entertainment Systems", icon: "🎥" },
            { title: "Charging Points", icon: "🔌" },
            { title: "Clean Restrooms", icon: "🚻" },
          ].map((facility, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-600 transition-colors shadow-md"
            >
              <span className="text-3xl text-blue-400">{facility.icon}</span>
              <p className="text-lg font-medium">{facility.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12 px-6 md:px-16">
        <h2 className="text-4xl font-bold text-center text-yellow-400 drop-shadow-lg">
          Our Vision
        </h2>
        <p className="mt-4 text-center max-w-2xl mx-auto text-gray-300">
          At GBUS, we aim to revolutionize bus travel by combining technology, comfort,
          and efficiency. Our goal is to make every journey memorable while ensuring
          safety and satisfaction.
        </p>
      </section>

      {/* Contact Section */}
      <footer className="py-16 bg-gradient-to-br from-blue-700 to-purple-700 text-center relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://source.unsplash.com/1920x1080/?travel,road')] bg-cover"></div>
        <h2 className="text-4xl font-bold text-yellow-400 relative">Get in Touch</h2>
        <p className="mt-6 relative">
          📞 <strong>Contact Number:</strong> +91 9931122072 <br />
          ✉️ <strong>Email:</strong> sandeep.cnct404@gmail.com
        </p>
        <div className="mt-8 flex justify-center space-x-4 relative">
          <a
            href="/#"
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
          >
            Contact Us
          </a>
          <a
            href="/#"
            className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 hover:text-gray-900 transition"
          >
            Learn More
          </a>
        </div>
      </footer>
    </div>
  );
};

export default About;
