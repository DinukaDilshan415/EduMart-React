import React, { useState } from 'react';

// --- Type Definitions for TypeScript ---

interface IconProps {
  className?: string;
  size?: number;
}

interface Product {
    id: number;
    name: string;
    price: string;
    oldPrice: string;
    img: string;
}

type Tab = 'description' | 'reviews';

interface ProductTabsProps {
    activeTab: Tab;
    setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
}

interface ProductCardProps {
    product: Product;
}


// --- SVG Icon Components (Typed for TypeScript) ---

const StarIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const FacebookIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M14 13.5h2.5l.5-2.5h-3v-1.5c0-.7.2-1.2 1.2-1.2h1.3V6.2c-.2 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.8h-2v2.5h2V22h3v-8.5z" />
  </svg>
);

const TwitterIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.72-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.8 1.91 3.56-.71 0-1.37-.22-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.08.55 1.7 2.14 2.94 4.03 2.97-1.47 1.15-3.33 1.83-5.35 1.83-.35 0-.69-.02-1.03-.06 1.9 1.22 4.16 1.93 6.56 1.93 7.88 0 12.2-6.54 12.2-12.2 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.22z" />
  </svg>
);

const LinkedInIcon: React.FC<IconProps> = ({ className, size = 20 }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-12 6v9h3V11H7zM8.5 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18 18v-5a2.5 2.5 0 0 0-5 0v5h-3V11h3v1.1c.5-.9 1.6-1.6 3-1.6 2.2 0 4 1.8 4 4v4.5h-2z" />
  </svg>
);

const TruckIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M20.5 14.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S19 16.83 19 16s.67-1.5 1.5-1.5M6.5 14.5c.83 0 1.5.67 1.5 1.5S7.33 17.5 6.5 17.5 5 16.83 5 16s.67-1.5 1.5-1.5M21 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 14.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm14.5.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM15 13H3V6h12v7z" />
  </svg>
);

const LockIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z" />
  </svg>
);

const GiftIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M20 6h-2.18c.11-.31.18-.65.18-1a3 3 0 0 0-3-3c-1.66 0-3 1.34-3 3 0 .35.07.69.18 1H9.82c.11-.31.18-.65.18-1a3 3 0 0 0-3-3c-1.66 0-3 1.34-3 3 0 .35.07.69.18 1H2v14h10v-7h-2l4-4 4 4h-2v7h6V6z" />
  </svg>
);

const MoneyBillWaveIcon: React.FC<IconProps> = ({ className, size = 24 }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M1 4v16h22V4H1zm20 14H3V6h18v12zM9 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
  </svg>
);


// --- Placeholder Data & URLs ---
const productImageUrl = "https://i.imgur.com/S6S1t2s.png";
const promoImageUrl = "https://i.imgur.com/eBw1M5I.png";
const mintpayLogoUrl = "https://static.mintpay.lk/img/logo/mintpay-logo.svg";

const relatedProductsData: Product[] = [
    { id: 1, name: "Dalada Siritha", price: "216.00", oldPrice: "270.00", img: "https://placehold.co/220x220/f0f0f0/333?text=Book+1" },
    { id: 2, name: "Children's Colouring Book", price: "1,260.00", oldPrice: "1,575.00", img: "https://placehold.co/220x220/f0f0f0/333?text=Book+2" },
    { id: 3, name: "Everyday Pictures", price: "180.00", oldPrice: "225.00", img: "https://placehold.co/220x220/f0f0f0/333?text=Book+3" },
    { id: 4, name: "Rathna B5 Square Ruled", price: "272.00", oldPrice: "340.00", img: "https://placehold.co/220x220/f0f0f0/333?text=Book+4" },
    { id: 5, name: "Rathna B5 Single Ruled", price: "272.00", oldPrice: "340.00", img: "https://placehold.co/220x220/f0f0f0/333?text=Book+5" },
    { id: 6, name: "Purana Sanna Sahitha", price: "560.00", oldPrice: "700.00", img: "https://placehold.co/220x220/f0f0f0/333?text=Book+6" },
];


// --- Sub-components ---

const ProductTabs: React.FC<ProductTabsProps> = ({ activeTab, setActiveTab }) => (
    <div className="w-full mt-12">
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                    onClick={() => setActiveTab('description')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'description' ? 'border-yellow-400 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    Description
                </button>
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'reviews' ? 'border-yellow-400 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                >
                    Reviews (1)
                </button>
            </nav>
        </div>
        <div className="py-6 text-gray-600">
            {activeTab === 'description' && (
                <p>
                    Introducing the School Scissors 133mm by ProMate, a top choice for students and educators. Precision-engineered for durability, these scissors excel in school projects and crafts. Built tough for everyday use, they can elevate your stationery with these essentials, balancing safety and efficiency to ensure seamless cuts and limitless creativity. Order the School Scissors 133mm online for unmatched performance in all your cutting endeavors.
                </p>
            )}
            {activeTab === 'reviews' && (
                <div>
                    <h3 className="font-semibold text-lg mb-2">1 review for ProMate Photocopy Paper</h3>
                    <div className="flex items-start space-x-4">
                        <div className="flex items-center text-yellow-400">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} className="text-yellow-400" />)}
                        </div>
                        <p><span className="font-bold">Admin</span> – July 22, 2025</p>
                    </div>
                    <p className="mt-2">This is a sample review.</p>
                </div>
            )}
        </div>
    </div>
);

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <div className="border rounded-lg p-4 text-center group">
        <div className="relative">
            <img src={product.img} alt={product.name} className="mx-auto h-48 object-contain mb-4"/>
            <span className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-20%</span>
        </div>
        <h4 className="font-semibold text-gray-700 h-12">{product.name}</h4>
        <div className="flex justify-center items-baseline space-x-2 mt-2">
            <p className="text-red-600 font-bold">LKR {product.price}</p>
            <p className="text-gray-400 line-through text-sm">LKR {product.oldPrice}</p>
        </div>
        <div className="text-xs text-gray-500 mt-1">
            <span>LKR {(parseFloat(product.price.replace(/,/g, '')) / 3).toFixed(2)} X 3</span>
            <span className="mx-1">with</span>
            <img src={mintpayLogoUrl} alt="mintpay" className="h-3 inline-block" />
        </div>
    </div>
);

const RelatedProducts: React.FC = () => (
    <div className="w-full mt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Related products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {relatedProductsData.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>
);


/**
 * A responsive single product view component with functional quantity and tabs.
 */
const ProductPage: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<Tab>('description');

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="font-sans bg-white text-gray-800">
      <div className="container mx-auto p-4 lg:p-8">
        {/* BREADCRUMBS NAVIGATION */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <a href="#" className="hover:text-green-600 transition-colors">Home</a> /
          <a href="#" className="hover:text-green-600 transition-colors"> Products</a> /
          <a href="#" className="hover:text-green-600 transition-colors"> Printing and Copy Papers</a> /
          <span className="text-gray-700"> ProMate Photocopy Paper A4 80GSM Box...</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-8 gap-y-8">
          
          {/* --- LEFT COLUMN: PRODUCT IMAGES & SOCIAL SHARE --- */}
          <div className="lg:col-span-5">
            <div className="flex flex-col-reverse md:flex-row gap-4">
                <div className="flex-shrink-0 md:w-24 flex md:flex-col items-center justify-start gap-3">
                    <div className="w-20 h-20 border-2 border-green-500 rounded-md p-1 cursor-pointer">
                        <img 
                            src={productImageUrl} 
                            alt="ProMate Paper Thumbnail" 
                            className="w-full h-full object-contain" 
                            onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/80x80/e0e0e0/757575?text=Img'; }}
                        />
                    </div>
                </div>
                <div className="flex-1 border rounded-lg p-4 flex items-center justify-center h-[350px] md:h-[450px]">
                    <img 
                        src={productImageUrl} 
                        alt="ProMate Paper Box" 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/400x400/e0e0e0/757575?text=Image+Not+Found'; }}
                    />
                </div>
            </div>
             <div className="mt-6 flex items-center justify-center md:justify-start space-x-4">
                <span className="text-sm font-medium text-gray-600">Share:</span>
                <a href="#" aria-label="Share on Facebook" className="text-gray-400 hover:text-blue-600 transition-colors"><FacebookIcon /></a>
                <a href="#" aria-label="Share on Twitter" className="text-gray-400 hover:text-sky-500 transition-colors"><TwitterIcon /></a>
                <a href="#" aria-label="Share on LinkedIn" className="text-gray-400 hover:text-blue-700 transition-colors"><LinkedInIcon /></a>
            </div>
          </div>

          {/* --- MIDDLE COLUMN: PRODUCT DETAILS --- */}
          <div className="lg:col-span-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              ProMate Photocopy Paper A4 80GSM Box | 2,500 Sheets [ 500 X 5 Packs ]
            </h1>
            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-x-4 gap-y-2">
              <span>Brand: <a href="#" className="text-green-600 font-semibold hover:underline">ProMate</a></span>
              <div className="flex items-center">
                <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} className="text-yellow-400" />)}
                </div>
                <a href="#" className="ml-2 hover:underline">(5 reviews)</a>
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <span className="text-gray-500 line-through text-lg">MRP 19,500.00</span>
              <div className="flex items-baseline space-x-3 mt-1">
                <span className="text-4xl font-bold text-red-600">LKR 7,600.00</span>
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-full">-61% OFF</span>
              </div>
            </div>
            <div className="flex items-center bg-gray-50 p-3 rounded-lg my-5 border">
              <span className="font-semibold">LKR 2,533.33 X 3</span>
              <span className="text-gray-500 mx-2">with</span>
              <img src={mintpayLogoUrl} alt="mintpay" className="h-4" />
            </div>
            <div className="flex items-center my-6">
              <label htmlFor="quantity" className="font-semibold mr-4 text-gray-800">Quantity</label>
              <div className="flex border rounded-md overflow-hidden">
                <button onClick={handleDecrease} className="px-4 py-2 font-bold text-lg hover:bg-gray-100 transition-colors">-</button>
                <input type="text" id="quantity" value={quantity} readOnly className="w-14 text-center border-x focus:outline-none" />
                <button onClick={handleIncrease} className="px-4 py-2 font-bold text-lg hover:bg-gray-100 transition-colors">+</button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-900 transition-transform transform hover:scale-105">Add to cart</button>
              <button className="flex-1 bg-lime-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-lime-600 transition-transform transform hover:scale-105">Buy Now</button>
            </div>
            <hr className="my-6" />
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>SKU:</strong> PSTD0003_BOX</p>
              <div>
                <strong>Categories:</strong> 
                <a href="#" className="text-green-600 hover:underline ml-1">Printing and Copy Papers</a>, 
                <a href="#" className="text-green-600 hover:underline ml-1">Photocopy Papers</a>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: SERVICES & PROMO --- */}
          <div className="lg:col-span-3">
            <div className="border rounded-lg p-4 space-y-4 text-sm text-gray-700 bg-gray-50">
              <div className="flex items-center"><TruckIcon className="text-gray-500 mr-4 flex-shrink-0" /> Island wide Delivery</div>
              <div className="flex items-center"><LockIcon className="text-gray-500 mr-4 flex-shrink-0" /> Secure Payments</div>
              <div className="flex items-center"><GiftIcon className="text-gray-500 mr-4 flex-shrink-0" /> Gift Service Available</div>
              <div className="flex items-center"><MoneyBillWaveIcon className="text-gray-500 mr-4 flex-shrink-0" /> Pay online or when receiving goods</div>
            </div>
            <div className="mt-8">
              <img 
                src={promoImageUrl} 
                alt="Stationery Promotion" 
                className="w-full rounded-lg shadow-md" 
                onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src='https://placehold.co/300x400/e0e0e0/757575?text=Promo'; }}
              />
            </div>
          </div>
        </div>

        {/* --- TABS & RELATED PRODUCTS SECTION --- */}
        <div className="mt-8">
            <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <RelatedProducts />
        </div>

      </div>
    </div>
  );
};

export default ProductPage;
