import React from 'react';
import MetaData from '../../layout/MetaData';

const Contact = () => {
    return (
        <>
        <MetaData title={"Contact Us"}/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="container mx-auto px-6 py-12 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="text-center pb-6">
                    <h1 className="font-bold text-2xl text-gray-800">Contact Us</h1>
                    <p className="text-gray-600">We're here to help and answer any question you might have. We look forward to hearing from you.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                    First Name
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="Your First Name" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Your Last Name" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="you@example.com" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="3" placeholder="Your message"></textarea>
                            </div>
                            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Send Message
                            </button>
                        </form>
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">Our Office</p>
                        <p className="mb-4 text-gray-600">123 Example Rd, City, Country 12345</p>
                        <p className="font-bold text-gray-800">Phone</p>
                        <p className="mb-4 text-gray-600">(123) 456-7890</p>
                        <p className="font-bold text-gray-800">Email</p>
                        <p className="text-gray-600">support@example.com</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Contact;
