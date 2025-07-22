import React, { useState } from 'react';
import { Star, Truck, Shield, Gift, CreditCard, Plus, Minus, Facebook, Twitter, Linkedin } from 'lucide-react';

interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  images: ProductImage[];
  mrp: number;
  price: number;
  discount: number;
  rating: number;
  reviewCount: number;
  sku: string;
  categories: string[];
  installmentPrice: number;
  installmentMonths: number;
}

const ProductViewPage: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const product: Product = {
    id: 'PCF60005-BOX',
    name: 'ProMate Photocopy Paper A4 80GSM Box | 2,500 Sheets [ 500 X 5 Packs ]',
    brand: 'ProMate',
    images: [
      {
        id: 1,
        src: '/api/placeholder/400/400',
        alt: 'ProMate Photocopy Paper Box'
      },
      {
        id: 2,
        src: '/api/placeholder/400/400',
        alt: 'ProMate Paper Packs'
      }
    ],
    mrp: 19500.00,
    price: 7600.00,
    discount: 61,
    rating: 5,
    reviewCount: 5,
    sku: 'PCF60005 - BOX',
    categories: ['Printing and Copy Papers', 'Photocopy Papers'],
    installmentPrice: 2533.33,
    installmentMonths: 3
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Printing and Copy Papers', href: '/products/printing-copy-papers' },
    { label: product.name, href: '#', active: true }
  ];

  const features = [
    {
      icon: <Truck className="w-5 h-5" />,
      title: 'Island wide Delivery'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Secure Payments'
    },
    {
      icon: <Gift className="w-5 h-5" />,
      title: 'Gift Service Available'
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Pay online or when receiving goods'
    }
  ];

  const handleQuantityChange = (action: 'increment' | 'decrement') => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <nav className="bg-white px-4 py-3 border-b">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                <a
                  href={item.href}
                  className={`${
                    item.active
                      ? 'text-gray-600 font-medium'
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-lg border p-4">
                <img
                  src={product.images[selectedImageIndex].src}
                  alt={product.images[selectedImageIndex].alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded border-2 p-1 ${
                      selectedImageIndex === index
                        ? 'border-green-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-4">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm text-gray-600">Brand:</span>
                  <span className="text-sm font-medium text-blue-600">{product.brand}</span>
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                    <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-lg text-gray-500 line-through">
                    MRP {product.mrp.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-red-600">
                    LKR {product.price.toFixed(2)}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                    -{product.discount}% OFF
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>LKR {product.installmentPrice.toFixed(2)} X {product.installmentMonths}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-600 font-medium">koko</span>
                    <span className="text-gray-800 font-medium">mintpay</span>
                  </div>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Quantity</span>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => handleQuantityChange('decrement')}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x min-w-[50px] text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increment')}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-black text-white py-3 px-6 rounded font-medium hover:bg-gray-800 transition-colors">
                    Add to cart
                  </button>
                  <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded font-medium hover:bg-green-600 transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-16">SKU:</span>
                  <span className="text-gray-600">{product.sku}</span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-16">Categories:</span>
                  <div className="flex flex-wrap gap-1">
                    {product.categories.map((category, index) => (
                      <span key={index} className="text-blue-600 hover:text-blue-800">
                        {category}
                        {index < product.categories.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex space-x-2">
                <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="p-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="p-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Features Sidebar */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border">
                  <div className="text-gray-600">{feature.icon}</div>
                  <span className="text-sm font-medium text-gray-700">{feature.title}</span>
                </div>
              ))}
            </div>

            {/* ProMate Brand Banner */}
            <div className="mt-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">ProMate</h3>
                  <p className="text-sm opacity-90">world stationer</p>
                </div>
                <div className="text-4xl font-bold opacity-20">V</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewPage;