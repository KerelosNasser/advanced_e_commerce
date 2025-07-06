
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';

// Mock product detail (in a real app, this would be fetched based on the ID)
const mockProduct = {
  id: 1,
  title: "Wireless Bluetooth Headphones Premium Quality",
  price: 29.99,
  originalPrice: 59.99,
  rating: 4.8,
  reviews: 1234,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop"
  ],
  category: "Electronics",
  discount: 50,
  description: "Experience premium sound quality with these wireless Bluetooth headphones. Featuring advanced noise cancellation technology, comfortable over-ear design, and up to 30 hours of battery life.",
  features: [
    "Advanced Noise Cancellation",
    "30-hour Battery Life",
    "Wireless Bluetooth 5.0",
    "Premium Comfort Design",
    "Built-in Microphone",
    "Quick Charge Technology"
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    "Impedance": "32 Ohms",
    "Weight": "250g",
    "Connectivity": "Bluetooth 5.0, 3.5mm jack",
    "Battery": "30 hours playback"
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: mockProduct.id,
        title: mockProduct.title,
        price: mockProduct.price,
        image: mockProduct.images[0]
      }
    });
    
    toast({
      title: "Added to cart!",
      description: `${mockProduct.title} has been added to your cart.`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-aliblue-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-aliblue-600">Products</Link>
          <span>/</span>
          <span>{mockProduct.category}</span>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-aliblue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${mockProduct.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-8 lg:mt-0">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-aliorange-500 text-white">
                -{mockProduct.discount}% OFF
              </Badge>
              <Badge variant="secondary">{mockProduct.category}</Badge>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {mockProduct.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(mockProduct.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {mockProduct.rating} ({mockProduct.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-aliblue-600">
                ${mockProduct.price}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ${mockProduct.originalPrice}
              </span>
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">
              {mockProduct.description}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="flex-1 gradient-primary hover:opacity-90"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <Truck className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Free Shipping</p>
                  <p className="text-sm text-green-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">Buyer Protection</p>
                  <p className="text-sm text-blue-600">Full refund guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                <RotateCcw className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">Easy Returns</p>
                  <p className="text-sm text-orange-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b">
              <nav className="flex">
                <button className="px-6 py-4 text-sm font-medium text-aliblue-600 border-b-2 border-aliblue-600">
                  Features
                </button>
                <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Specifications
                </button>
                <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Reviews
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {mockProduct.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-aliblue-600 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
