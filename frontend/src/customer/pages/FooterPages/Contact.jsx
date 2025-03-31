import React from "react";
import {
    Place as PlaceIcon,
    Mail as MailIcon,
    Phone as PhoneIcon,
    Chat as ChatIcon,
    Send as SendIcon,
} from "@mui/icons-material";
import Textarea from '@mui/joy/Textarea';
import { Button, TextField } from "@mui/material";

const Contact = () => {
    const storeLocations = [
        { city: "New York, NY", address: "5th Avenue Flagship Store" },
        { city: "Los Angeles, CA", address: "Sunset Boulevard Boutique" },
        { city: "Chicago, IL", address: "Magnificent Mile Fashion Hub" },
        { city: "Miami, FL", address: "Ocean Drive Trend Center" },
        { city: "San Francisco, CA", address: "Downtown Style Studio" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9155fd] to-[#563295]">
                            Get in Touch
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Have questions? We’d love to hear from you! Reach out to our team
                        and we'll be happy to assist.
                    </p>
                </div>

                {/* Contact Form */}
                <section className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                        Contact Us
                    </h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            
                        />
                        <TextField
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <Textarea
                            className="w-full md:col-span-2 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Your Message"
                            variant="outlined"
                            minRows={4}
                        />
                        <Button
                            type="submit"
                            className="md:col-span-2 bg-[#9155fd] text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                            sx={{
                                ":hover": {
                                    bgcolor: "#563295",
                                },
                                ":active": {
                                    transform: "scale(0.98)",
                                },
                                backgroundColor: "#9155fd",
                                color: "white",
                                fontSize: "md",
                                fontWeight: "bold",
                                padding: "12px 24px",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                transition: "background-color 0.3s, transform 0.1s",

                            }}
                        >
                            <SendIcon /> Send Message
                        </Button>
                    </form>
                </section>

                {/* Store Locations */}
                <section className="mb-20">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                            Visit Our Stores
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <ul className="space-y-4">
                                    {storeLocations.map((store, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                        >
                                            <PlaceIcon className="text-purple-600 mt-1 mr-4 flex-shrink-0 h-6 w-6" />
                                            <div>
                                                <p className="font-semibold text-gray-900">
                                                    {store.city}
                                                </p>
                                                <p className="text-gray-600">{store.address}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl overflow-hidden shadow-lg h-96">
                                <iframe
                                    title="OutfitOasis Store Locations"
                                    src="https://www.google.com/maps/embed?..."
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    className="rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Customer Support */}
                <section className="bg-gray-100 rounded-2xl p-8 md:p-12 text-center mb-20">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Need Help? Contact Support
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700 font-medium">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <MailIcon className="text-purple-600 text-4xl mb-3" />
                            <p>Email Support</p>
                            <p className="text-purple-600 font-semibold">
                                support@outfitoasis.com
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <PhoneIcon className="text-purple-600 text-4xl mb-3" />
                            <p>Call Us</p>
                            <p className="text-purple-600 font-semibold">+1 (800) 123-4567</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <ChatIcon className="text-purple-600 text-4xl mb-3" />
                            <p>Live Chat</p>
                            <p className="text-purple-600 font-semibold">
                                Available 24/7 on our website
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
