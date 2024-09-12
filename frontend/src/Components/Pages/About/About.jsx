import React, { useEffect } from 'react';
import MetaData from '../../layout/MetaData';

const About = () => {
  useEffect(() => {
    // Function to start automatic scrolling
    const scroll = () => {
      window.scrollBy({
        top: 1, // Scroll down by 1 pixel
        behavior: 'smooth', // Smooth scrolling
      });
    };

    // Set interval to scroll the page every 10 milliseconds
    const interval = setInterval(scroll, 10);

    // Clean up interval when component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <MetaData title={"About"}/>
    <section className="min-h-screen bg-white flex flex-col justify-center items-center p-8">
      <div className="max-w-5xl text-center">
        <h1 className="text-5xl font-bold text-black mb-6">About BuyIt</h1>

        {/* Introduction */}
        <p className="text-lg text-gray-700 mb-8">
          Welcome to <strong>BuyIt</strong>, your ultimate destination for a wide range of quality products, spanning electronics, fashion, home essentials, and much more. We're proud to bring a seamless and enjoyable shopping experience to our customers, ensuring that every purchase is backed by reliability, affordability, and exceptional customer service.
        </p>

        {/* Our Story */}
        <h2 className="text-3xl font-semibold text-black mb-4">Our Story</h2>
        <p className="text-lg text-gray-700 mb-8">
          Founded in 2024 by <strong>Saransh Gupta</strong>, BuyIt was born out of a simple idea—to create a digital marketplace where people can find exactly what they need, when they need it, without the hassle of traditional shopping. Starting as a small business in India, BuyIt has quickly grown into one of the country's fastest-growing eCommerce platforms, catering to thousands of customers every day.
        </p>

        {/* Mission Statement */}
        <h2 className="text-3xl font-semibold text-black mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-8">
          At BuyIt, our mission is to make shopping as convenient and efficient as possible for our users. We aim to provide a carefully curated selection of products from top brands, while continually striving to keep our prices competitive. We believe that shopping should be a delightful experience, and we are committed to ensuring that every interaction with our platform reflects our core values of trust, simplicity, and innovation.
        </p>

        {/* What Sets Us Apart */}
        <h2 className="text-3xl font-semibold text-black mb-4">What Sets Us Apart</h2>
        <ul className="list-disc list-inside text-left text-lg text-gray-700 mb-8">
          <li className="mb-4">
            <strong>Quality Products:</strong> Every item available on BuyIt is carefully vetted to ensure that it meets our high standards for quality and durability. Whether you're purchasing the latest smartphone or upgrading your home decor, you can trust that you're receiving the best.
          </li>
          <li className="mb-4">
            <strong>Exceptional Customer Support:</strong> Our customer service team is available around the clock to assist you with any queries or issues. We value our customers and prioritize their satisfaction.
          </li>
          <li className="mb-4">
            <strong>Secure Shopping:</strong> We invest in the latest security technology to ensure that every transaction is protected. Your personal information is handled with the utmost care, making your shopping experience safe and secure.
          </li>
          <li className="mb-4">
            <strong>Fast and Reliable Delivery:</strong> We work with top logistics providers to ensure that your orders are delivered promptly, no matter where you are in the country.
          </li>
        </ul>

        {/* Future Vision */}
        <h2 className="text-3xl font-semibold text-black mb-4">Our Future Vision</h2>
        <p className="text-lg text-gray-700 mb-8">
          As we continue to grow, our goal is to expand BuyIt's reach across international markets, while staying true to our core values. We plan to integrate new technologies like AI-driven recommendations and advanced tracking systems to enhance our customers’ shopping experiences even further. With innovation and customer satisfaction as our driving forces, we look forward to shaping the future of eCommerce in India and beyond.
        </p>

        {/* Commitment to Sustainability */}
        <h2 className="text-3xl font-semibold text-black mb-4">Commitment to Sustainability</h2>
        <p className="text-lg text-gray-700 mb-8">
          At BuyIt, we understand the importance of sustainability in today’s world. We are taking steps to reduce our carbon footprint by embracing eco-friendly packaging options and working with suppliers who share our commitment to responsible sourcing. We believe in doing our part for the planet and empowering our customers to make sustainable choices.
        </p>

        {/* Closing Statement */}
        <p className="text-lg text-gray-900 font-semibold">
          Thank you for choosing BuyIt for all your shopping needs. We look forward to serving you and making your online shopping experience as enjoyable and seamless as possible.
        </p>
        <p className="text-lg font-semibold text-gray-900 mt-4">
          Sincerely,<br />Saransh Gupta, Founder of BuyIt
        </p>
      </div>
    </section>
    </>
  );
};

export default About;
