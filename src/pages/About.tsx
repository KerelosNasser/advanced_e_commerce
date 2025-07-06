
import { Users, Award, Globe, Heart } from 'lucide-react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            About AliMart
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to connect millions of buyers and sellers around the world, 
            creating opportunities and making commerce more accessible for everyone.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-aliblue-600 mb-2">10M+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-aliblue-600 mb-2">500K+</div>
            <div className="text-gray-600">Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-aliblue-600 mb-2">200+</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-aliblue-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 rounded-lg glass-effect">
            <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community First</h3>
            <p className="text-gray-600">
              Building a global community of buyers and sellers who trust and support each other.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg glass-effect">
            <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
            <p className="text-gray-600">
              Every product goes through our quality assurance process to ensure customer satisfaction.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg glass-effect">
            <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-600">
              Connecting businesses and consumers across continents with seamless logistics.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg glass-effect">
            <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer Love</h3>
            <p className="text-gray-600">
              Passionate about creating exceptional shopping experiences that delight our customers.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="text-lg mb-4">
              Founded in 2020, AliMart started with a simple vision: to make global commerce 
              accessible to everyone, everywhere. What began as a small team with big dreams 
              has grown into one of the world's leading e-commerce platforms.
            </p>
            <p className="text-lg mb-4">
              Today, we serve millions of customers across 200+ countries, offering everything 
              from everyday essentials to unique finds from small businesses around the world. 
              Our platform empowers entrepreneurs to reach global markets while providing 
              consumers with unparalleled choice and value.
            </p>
            <p className="text-lg">
              As we continue to grow, our commitment remains the same: to create a world where 
              anyone can buy from anywhere, and anyone can sell to everywhere.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
