import React from 'react';
import { 
  Place as PlaceIcon,
  ShoppingBag as ShoppingBagIcon,
  Security as SecurityIcon,
  Favorite as FavoriteIcon,
  Star as StarIcon
} from '@mui/icons-material';

const About = () => {
    
  const storeLocations = [
    { city: 'New York, NY', address: '5th Avenue Flagship Store' },
    { city: 'Los Angeles, CA', address: 'Sunset Boulevard Boutique' },
    { city: 'Chicago, IL', address: 'Magnificent Mile Fashion Hub' },
    { city: 'Miami, FL', address: 'Ocean Drive Trend Center' },
    { city: 'San Francisco, CA', address: 'Downtown Style Studio' },
  ];

  const features = [
    { 
      icon: <ShoppingBagIcon className="w-8 h-8 text-purple-600" />, 
      title: 'Curated Collections', 
      text: 'Handpicked selections from emerging designers and established brands' 
    },
    { 
      icon: <SecurityIcon className="w-8 h-8 text-purple-600" />, 
      title: 'Secure Shopping', 
      text: 'Bank-level encryption and multiple payment options' 
    },
    { 
      icon: <FavoriteIcon className="w-8 h-8 text-purple-600" />, 
      title: 'Sustainable Fashion', 
      text: 'Ethically sourced materials and eco-friendly packaging' 
    },
    { 
      icon: <StarIcon className="w-8 h-8 text-purple-600" />, 
      title: 'Style Profiles', 
      text: 'AI-powered recommendations based on your preferences' 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9155fd] to-[#563295]">
              OutfitOasis
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Redefining modern fashion through innovation, sustainability, and inclusive style
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 lg:flex lg:items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At OutfitOasis, we're committed to transforming the fashion industry by bridging the gap between 
                high-style and sustainability. Our platform empowers conscious consumers to look great while 
                making environmentally responsible choices.
              </p>
              <div className="bg-purple-100 p-6 rounded-xl">
                <p className="font-semibold text-purple-800">
                  "Fashion should empower both the wearer and the planet."<br />
                  <span className="text-purple-600">- OutfitOasis Core Philosophy</span>
                </p>
              </div>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-12">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b" 
                alt="Sustainable fashion" 
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-purple-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.text}</p>
            </div>
          ))}
        </section>

        {/* Store Locations */}
        <section className="mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Stores</h2>
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
                        <p className="font-semibold text-gray-900">{store.city}</p>
                        <p className="text-gray-600">{store.address}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg h-96">
                <iframe
                  title="OutfitOasis Store Locations"
                  src="https://www.google.com/maps/embed/..."
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

        {/* Sustainability Commitment */}
        <section className="bg-green-100 rounded-2xl p-8 md:p-12 text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Green Initiative</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              For every purchase made, we contribute to environmental causes and plant 5 trees through our 
              partnership with the Global Reforestation Alliance. Together, we've planted over 1 million trees 
              since 2020.
            </p>
            <div className="grid grid-cols-3 gap-4 text-green-800 font-semibold">
              <div className="bg-white p-4 rounded-xl">🌱 100% Organic Cotton</div>
              <div className="bg-white p-4 rounded-xl">♻️ Recycled Packaging</div>
              <div className="bg-white p-4 rounded-xl">🌍 Carbon Neutral Shipping</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;