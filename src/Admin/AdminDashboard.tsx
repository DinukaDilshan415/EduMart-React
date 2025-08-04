import { useState, FC, ReactNode, useMemo, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { LogOut } from 'lucide-react';

// Helper function to conditionally apply class names
const classNames = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
};

// --- TYPE DEFINITIONS ---
type Address = {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    mobile: string;
};

type GiftAddress = {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    note: string;
};

type OrderItem = {
    productId: number;
    productName: string;
    productImageUrl: string;
    brandName: string;
    qty: number;
    price: number;
};

type OrderDetails = {
    billingAddress: Address;
    giftAddress: GiftAddress | null;
    items: OrderItem[];
};

type Order = {
    id: string;
    customerName: string;
    date: string;
    total: number;
    status: 'Paid' | 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
};

type ProductData = {
    name: string;
    description: string;
    brand_id: number | string;
    stock: number | string;
    price: number | string;
    discount: number | string;
    image: File | null;
    mainCategory: string;
    category: string;
    subCategory: string;
};

// --- MOCK DATA ---
let mockMainCategories = [
    { id: 1, name: 'School Supplies' },
];

let mockCategories = [
    { id: 1, name: 'Paper Products', main_category_id: 1 },
];

let mockSubCategories = [
    { id: 1, name: 'A4 Paper', category_id: 1 },
];

let mockBrands = [
    { id: 1, name: 'Global Office' },
    { id: 2, name: 'Parker' },
    { id: 3, name: 'ComfortZone' },
];

let mockProducts = [
    { id: 1, name: 'A4 Paper Ream (500 Sheets)', description: 'High-quality A4 paper for printing and copying', sub_category_id: 1, brand_id: 1, stock: 150, price: 5.99, discount: 0, active: true, imageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=A4+Paper' },
    { id: 2, name: 'Parker Jotter Ballpoint Pen', description: 'Classic ballpoint pen with smooth writing experience', sku: 'OFF-PEN-PRK-JTR', sub_category_id: 3, brand_id: 2, stock: 300, price: 12.50, discount: 10, active: true, imageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=Pen' },
    { id: 3, name: 'Ergonomic Office Chair', description: 'Comfortable office chair with ergonomic design', sku: 'OFF-FNT-CHR-ERGO', sub_category_id: 5, brand_id: 3, stock: 25, price: 120.00, discount: 15, active: false, imageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=Chair' },
];

let mockOrders: Order[] = [
    { id: 'ORD-2024-001', customerName: 'John Doe', date: '2025-08-01', total: 42.45, status: 'Shipped' },
    { id: 'ORD-2024-002', customerName: 'Jane Smith', date: '2025-07-31', total: 120.00, status: 'Delivered' },
    { id: 'ORD-2024-003', customerName: 'Peter Jones', date: '2025-07-31', total: 12.50, status: 'Pending' },
    { id: 'ORD-2024-004', customerName: 'Mary Johnson', date: '2025-07-30', total: 179.90, status: 'Processing' },
    { id: 'ORD-2024-005', customerName: 'Chris Lee', date: '2025-08-02', total: 62.50, status: 'Paid' }
];

let mockOrderDetails: { [key: string]: OrderDetails } = {
    // 'ORD-2024-001': {
    //     billingAddress: {
    //         fullName: 'John Doe',
    //         address: '123 Main St',
    //         city: 'Gampaha',
    //         postalCode: '11000',
    //         mobile: '077-123-4567',
    //     },
    //     giftAddress: {
    //         fullName: 'Jane Smith (Recipient)',
    //         address: '456 Lake Rd',
    //         city: 'Colombo',
    //         postalCode: '00500',
    //         note: 'Happy Birthday! Hope you like it.'
    //     },
    //     items: [
    //         { productId: 1, qty: 5, price: 5.99 },
    //         { productId: 2, qty: 1, price: 12.50 },
    //     ]
    // },
    // 'ORD-2024-002': {
    //     billingAddress: {
    //         fullName: 'Jane Smith',
    //         address: '789 Market Blvd',
    //         city: 'Kandy',
    //         postalCode: '20000',
    //         mobile: '071-987-6543'
    //     },
    //     giftAddress: null,
    //     items: [
    //         { productId: 3, qty: 1, price: 120.00 },
    //     ]
    // },
    // 'ORD-2024-003': {
    //     billingAddress: {
    //         fullName: 'Peter Jones',
    //         address: '101 First Ln',
    //         city: 'Galle',
    //         postalCode: '80000',
    //         mobile: '076-555-0000',
    //     },
    //     giftAddress: null,
    //     items: [
    //         { productId: 2, qty: 1, price: 12.50 },
    //     ]
    // },
    // 'ORD-2024-004': {
    //     billingAddress: {
    //         fullName: 'Mary Johnson',
    //         address: '222 Flower Rd',
    //         city: 'Colombo 07',
    //         postalCode: '00700',
    //         mobile: '075-111-2222',
    //     },
    //     giftAddress: {
    //         fullName: 'Samwise Gamgee',
    //         address: '333 Bag End',
    //         city: 'The Shire',
    //         postalCode: 'N/A',
    //         note: 'For your adventures!'
    //     },
    //     items: [
    //         { productId: 1, qty: 10, price: 5.99 },
    //         { productId: 3, qty: 1, price: 120.00 },
    //     ]
    // },
    // 'ORD-2024-005': {
    //     billingAddress: {
    //         fullName: 'Chris Lee',
    //         address: '555 Tech Way',
    //         city: 'Jaffna',
    //         postalCode: '40000',
    //         mobile: '070-321-6548',
    //     },
    //     giftAddress: null,
    //     items: [
    //         { productId: 2, qty: 5, price: 12.50 },
    //     ]
    // },
};

let mockCustomers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        mobile: '0771234567',
        joinDate: '2023-01-15',
        orderCount: 5,
        totalSpent: 450.75
    }];

const mockReviews = [{ id: 1, productName: 'Parker Jotter Ballpoint Pen', customerName: 'John Doe', rating: 5, comment: 'Excellent pen, writes smoothly and looks very professional. Highly recommended!', date: '2024-07-15', status: 'Approved' }, { id: 2, productName: 'Ergonomic Office Chair', customerName: 'Jane Smith', rating: 3, comment: 'It\'s a decent chair for the price, but the armrests feel a bit flimsy. Assembly was straightforward.', date: '2024-07-12', status: 'Approved' }, { id: 3, productName: 'A4 Paper Ream', customerName: 'Peter Jones', rating: 4, comment: 'Good quality paper, but the packaging was slightly damaged on arrival.', date: '2024-07-10', status: 'Pending' }];
const mockUsers = [{ id: 1, name: 'Admin User', email: 'admin@edumart.com', role: 'Administrator', lastLogin: '2024-07-21 10:30 AM' }, { id: 2, name: 'Manager Sam', email: 'sam@edumart.com', role: 'Manager', lastLogin: '2024-07-21 09:15 AM' }, { id: 3, name: 'Support Alex', email: 'alex@edumart.com', role: 'Support Staff', lastLogin: '2024-07-20 04:00 PM' }];

// --- SVG ICONS ---
const Icon: FC<{ path: string; className?: string }> = ({ path, className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
);

const Icons = {
    dashboard: <Icon path="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    products: <Icon path="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
    inventory: <Icon path="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />,
    customers: <Icon path="M8 10a4 4 0 118 0 4 4 0 01-8 0zm6.5 6h-5a6.5 6.5 0 00-6.5 6.5V23h18v-0.5A6.5 6.5 0 0014.5 16zm7.5-9a3 3 0 11-6 0 3 3 0 016 0zm-1 5.5h-4a5.5 5.5 0 00-5.5 5.5V19h13v-1.5a5.5 5.5 0 00-3.5-5zM4 7a3 3 0 116 0 3 3 0 01-6 0zm1 5.5h4a5.5 5.5 0 015.5 5.5V19H1v-1.5a5.5 5.5 0 014-5z" />,
    reviews: <Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
    orders: <Icon path="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
    settings: <Icon path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
    users: <Icon path="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
    chevronDown: <Icon path="M19 9l-7 7-7-7" className="w-4 h-4" />,
    chevronRight: <Icon path="M9 5l7 7-7 7" className="w-5 h-5" />,
    edit: <Icon path="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" className="w-5 h-5" />,
    trash: <Icon path="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" className="w-5 h-5" />,
    toggleOn: <Icon path="M17 7H7a5 5 0 000 10h10a5 5 0 000-10zm0 8a3 3 0 11-6 0 3 3 0 016 0z" className="w-6 h-6" />,
    toggleOff: <Icon path="M7 7h10a5 5 0 010 10H7a5 5 0 010-10zm0 8a3 3 0 106 0 3 3 0 00-6 0z" className="w-6 h-6" />,
    plus: <Icon path="M12 4v16m8-8H4" className="w-5 h-5" />,
    star: <Icon path="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.05 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.95-.69L11.049 2.927z" />,
    check: <Icon path="M5 13l4 4L19 7" className="w-5 h-5" />,
    upload: <Icon path="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
};

// --- UI Components ---
const Card: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
    <div className={classNames("bg-white p-6 rounded-lg shadow-sm", className)}>
        {children}
    </div>
);

const Button: FC<{ onClick?: () => void; children: ReactNode; variant?: 'primary' | 'secondary' | 'danger'; className?: string, type?: 'button' | 'submit' }> = ({ onClick, children, variant = 'primary', className, type = 'button' }) => {
    const baseClasses = "px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };
    return (
        <button type={type} onClick={onClick} className={classNames(baseClasses, variantClasses[variant], className)}>
            {children}
        </button>
    );
};

const Badge: FC<{ children: ReactNode; color: 'blue' | 'green' | 'yellow' | 'red' | 'gray' }> = ({ children, color }) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        red: 'bg-red-100 text-red-800',
        gray: 'bg-gray-100 text-gray-800',
    };
    return <span className={classNames('px-3 py-1 text-xs font-semibold rounded-full', colorClasses[color])}>{children}</span>;
}

// --- Layout Components ---
type SetViewFn = (view: string, params?: object) => void;

interface SidebarProps {
    currentView: string;
    setView: SetViewFn;
}

const Sidebar: FC<SidebarProps> = ({ currentView, setView }) => {
    const [isProductsOpen, setIsProductsOpen] = useState(true);

    const NavLink: FC<{ view: string; children: ReactNode; icon: ReactNode; isSublink?: boolean }> = ({ view, children, icon, isSublink = false }) => {
        const isActive = currentView.startsWith(view);
        const linkClasses = classNames(
            'flex items-center p-3 my-1 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors w-full text-left',
            isSublink && 'pl-11',
            isActive && 'bg-blue-600 text-white hover:bg-blue-600 hover:text-white'
        );
        return (
            <button onClick={() => setView(view)} className={linkClasses}>
                <span className="mr-3">{icon}</span>
                <span className="flex-1">{children}</span>
            </button>
        );
    };

    const toggleProductsMenu = () => setIsProductsOpen(!isProductsOpen);

    return (
        <aside className="w-64 bg-white border-r h-full flex flex-col flex-shrink-0 rounded-l-2xl shadow-lg">
            <div className="p-4 border-b h-16 flex items-center">
                <div className="flex justify-center">
                    <a href="/admin/dashboard">
                        <img
                            src="https://raw.githubusercontent.com/DinukaDilshan415/images/e901f9915a4c2352ca11d97a9fde00698b100e14/edumart-svg-diga.svg"
                            alt="Company Logo"
                            className="w-48"
                        />
                    </a>
                </div>
            </div>
            <nav className="flex-1 p-4 overflow-y-auto">
                <NavLink view="dashboard" icon={Icons.dashboard}>Dashboard</NavLink>

                <div>
                    <button onClick={toggleProductsMenu} className="flex items-center p-3 my-1 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors w-full text-left">
                        <span className="mr-3">{Icons.products}</span>
                        <span className="flex-1">Products</span>
                        <span className="ml-auto transition-transform duration-200" style={{ transform: isProductsOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}>{Icons.chevronDown}</span>
                    </button>
                    {isProductsOpen && (
                        <div className="pl-4 border-l-2 border-gray-100 ml-5">
                            <NavLink view="products/list" icon={<></>} isSublink>All Products</NavLink>
                            <NavLink view="products/add" icon={<></>} isSublink>Add Product</NavLink>
                            <NavLink view="products/categories" icon={<></>} isSublink>Categories</NavLink>
                            <NavLink view="products/brands" icon={<></>} isSublink>Brands</NavLink>
                        </div>
                    )}
                </div>

                <NavLink view="inventory" icon={Icons.inventory}>Inventory</NavLink>
                <NavLink view="orders" icon={Icons.orders}>Orders</NavLink>
                <NavLink view="customers" icon={Icons.customers}>Customers</NavLink>
                <NavLink view="reviews" icon={Icons.reviews}>Reviews</NavLink>
                <NavLink view="users" icon={Icons.users}>Manage Users</NavLink>
                <NavLink view="settings" icon={Icons.settings}>Settings</NavLink>
            </nav>
        </aside>
    );
};

// --- INLINE CONFIRM TOAST COMPONENT ---
const ConfirmToast = ({ message, onConfirm, toastId }: { message: string, onConfirm: () => void, toastId: string | number }) => {
    const handleConfirm = () => {
        onConfirm();
        toast.dismiss(toastId);
    };

    const handleCancel = () => {
        toast.dismiss(toastId);
    };

    return (
        <div className="p-2">
            <p className="mb-3 text-gray-700">{message}</p>
            <div className="flex gap-2">
                <button
                    onClick={handleConfirm}
                    className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                    Confirm
                </button>
                <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-400 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

const showLogoutConfirm = () => {
    const toastId = "custom-confirm";
    toast(
        <ConfirmToast
            message="Are you sure you want to Log out?"
            onConfirm={logOutFromAccount}
            toastId={toastId}
        />,
        {
            position: "top-center",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            toastId: toastId,
            style: { width: "340px" },
        }
    );
};

const logOutFromAccount = async () => {
    try {
        const response = await fetch("http://localhost:8080/Edumart-Backend/AdminSignOut", {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const json = await response.json();
            if (json.status) {
                window.location.href = "/admin/login";
            } else {
                toast.error(json.message);
            }
        } else {
            toast.error("Log out failed. Please try again");
        }
    } catch (error) {
        toast.error("Something wrong ! Please try again");
        console.error("Log out Error:", error);
    }
};

const Header: FC<{}> = () => (
    <header className="flex items-center justify-between p-4 bg-white border-b h-16 flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-800">Welcome back, Admin!</h2>
        <button onClick={showLogoutConfirm}
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200 flex items-center gap-2 cursor-pointer"
        >
            <LogOut size={16} />
            Log Out
        </button>
    </header>
);

// --- Page Components ---

const DashboardPage: FC = () => (
    <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card><h3 className="text-gray-500 font-medium">Total Revenue</h3><p className="text-3xl font-bold text-gray-800 mt-2">LKR 45,231.89</p><p className="text-green-500 text-sm mt-1">+20.1% from last month</p></Card>
            <Card><h3 className="text-gray-500 font-medium">Orders</h3><p className="text-3xl font-bold text-gray-800 mt-2">1,830</p><p className="text-green-500 text-sm mt-1">+5.2% from last month</p></Card>
            <Card><h3 className="text-gray-500 font-medium">Active Products</h3><p className="text-3xl font-bold text-gray-800 mt-2">342</p><p className="text-gray-500 text-sm mt-1">12 inactive</p></Card>
            <Card><h3 className="text-gray-500 font-medium">New Customers</h3><p className="text-3xl font-bold text-gray-800 mt-2">156</p><p className="text-red-500 text-sm mt-1">-2.8% from last month</p></Card>
        </div>
    </div>
);

const ProductList: FC<{ setView: SetViewFn }> = ({ setView }) => {
    const [products, setProducts] = useState(mockProducts);
    const toggleStatus = async (id: number) => {
        setProducts(products.map(p => p.id === id ? { ...p, active: !p.active } : p));

        const updateData = {
            productId: id,
        };
        try {
            const response = await fetch("http://localhost:8080/Edumart-Backend/ToggleProductStatus", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData)
            });
            if (response.ok) {
                const json = await response.json();
                if (json.status) {
                    toast.success("Product Status Updated !");
                    loadAllProducts();
                } else {
                    toast.error(json.message);
                }
            } else {
                toast.error("ToggleProductStatus failed. Please try again");
            }
        } catch (error) {
            toast.error("Something wrong ! Please try again");
            console.error("ToggleProductStatus Error:", error);
        }
    };


    const getCategoryPath = (subCategoryId: number) => {
        const subCat = mockSubCategories.find(sc => sc.id === subCategoryId);
        if (!subCat) return 'N/A';
        const cat = mockCategories.find(c => c.id === subCat.category_id);
        if (!cat) return subCat.name;
        const mainCat = mockMainCategories.find(mc => mc.id === cat.main_category_id);
        if (!mainCat) return `${cat.name} > ${subCat.name}`;
        return `${mainCat.name} > ${cat.name} > ${subCat.name}`;
    };

    useEffect(() => {
        loadAllProducts();
    }, []);

    //load All Products
    type ApiStockItem = {
        product: {
            id: number;
            title: string;
            description: string;
            subCategory: { id: number };
            brand: { id: number };
            discount: number;
            status: { id: number };
        };
        qty: number;
        price: number;
    };

    const loadAllProducts = async () => {
        try {
            const response = await fetch(`http://localhost:8080/Edumart-Backend/LoadAllProducts`, {
                method: "GET",
                credentials: "include"
            });

            if (response.ok) {
                const json = await response.json();
                if (json.status) {
                    mockProducts = json.stockList.map((item: ApiStockItem) => ({
                        id: item.product.id,
                        name: item.product.title,
                        description: item.product.description,
                        sub_category_id: item.product.subCategory.id,
                        brand_id: item.product.brand.id,
                        stock: item.qty,
                        price: item.price,
                        discount: item.product.discount,
                        active: item.product.status.id == 1,
                        imageUrl: `http://localhost:8080/Edumart-Backend/product-images/${item.product.id}/image1.png`
                    }));
                    setProducts(mockProducts);
                } else {
                    toast.error(json.message);
                }
            } else {
                toast.error("loadAllProducts failed. Please try again");
            }
        } catch (error) {
            toast.error("Internal Server Error. Please try again later");
            console.error("loadAllProducts Error:", error);
        }
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
                <Button onClick={() => setView('products/add')}>{Icons.plus} Add Product</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm">
                            <th className="p-3 font-semibold">Product</th>
                            <th className="p-3 font-semibold">Category Path</th>
                            <th className="p-3 font-semibold text-center">Stock</th>
                            <th className="p-3 font-semibold text-center">Price</th>
                            <th className="p-3 font-semibold text-center">Status</th>
                            <th className="p-3 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-gray-50">
                                <td className="p-3"><div className="flex items-center gap-4"><img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover" /><span className="font-medium text-gray-800">{product.name}</span></div></td>
                                <td className="p-3 text-gray-600 text-xs">{getCategoryPath(product.sub_category_id)}</td>
                                <td className="p-3 text-center text-gray-600">{product.stock}</td><td className="p-3 text-right font-medium text-gray-800">LKR {product.price.toFixed(2)}</td>
                                <td className="p-3 text-center"><Badge color={product.active ? 'green' : 'red'}>{product.active ? 'Active' : 'Inactive'}</Badge></td>
                                <td className="p-3"><div className="flex justify-center items-center space-x-2"><button onClick={() => toggleStatus(product.id)} className={classNames("p-2 rounded-full hover:bg-gray-200", product.active ? 'text-green-500' : 'text-red-500')}>{product.active ? Icons.toggleOn : Icons.toggleOff}</button><button onClick={() => setView('products/edit', { id: product.id })} className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-200">{Icons.edit}</button><button className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-gray-200">{Icons.trash}</button></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

const AddEditProduct: FC<{ setView: SetViewFn; params?: { id: number } }> = ({ setView, params }) => {
    const isEditMode = params && params.id;
    const product = isEditMode ? mockProducts.find(p => p.id === params.id) : null;

    const [selectedMainCat, setSelectedMainCat] = useState<number | null>(null);
    const [selectedCat, setSelectedCat] = useState<number | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(product?.imageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const availableCats = useMemo(() => {
        if (!selectedMainCat) return [];
        return mockCategories.filter(c => c.main_category_id === selectedMainCat);
    }, [selectedMainCat]);

    const availableSubCats = useMemo(() => {
        if (!selectedCat) return [];
        return mockSubCategories.filter(sc => sc.category_id === selectedCat);
    }, [selectedCat]);

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const displayPrice = () => {
        const priceNum = parseFloat(String(productData.price));
        const discountNum = parseFloat(String(productData.discount));
        if (isNaN(priceNum) || isNaN(discountNum) || discountNum >= 100) return '';
        return ((priceNum * 100 / (100 - discountNum))).toFixed(2);
    };

    const [productData, setProductData] = useState<ProductData>({
        name: product?.name || '',
        description: product?.description || '',
        brand_id: product?.brand_id || 0,
        stock: product?.stock || 0,
        price: product?.price || 0,
        discount: product?.discount || 0,
        image: null,
        mainCategory: '',
        category: '',
        subCategory: ''
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProductData(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const saveProduct = async () => {
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value instanceof File ? value : String(value));
            }
        });

        try {
            const response = await fetch("http://localhost:8080/Edumart-Backend/SaveProduct", {
                method: "POST",
                credentials: "include",
                body: formData
            });

            if (response.ok) {
                const json = await response.json();
                if (json.status) {
                    toast.success("New Product added successfully");
                    setView('products/list');
                } else {
                    toast.error(json.message);
                }
            } else {
                toast.error("New Product add failed. Please try again");
            }
        } catch (error) {
            toast.error("Internal Server Error. Please try again later");
            console.error("New Product add Error:", error);
        }
    };

    const updateProduct = async () => {
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value instanceof File ? value : String(value));
            }
        });

        try {
            const response = await fetch("http://localhost:8080/Edumart-Backend/StockUpdate", {
                method: "POST",
                credentials: "include",
                body: formData
            });

            if (response.ok) {
                const json = await response.json();
                if (json.status) {
                    toast.success("Product Stock Updated successfully");
                    setView('products/list');
                } else {
                    toast.error(json.message);
                }
            } else {
                toast.error("Product Stock Update failed. Please try again");
            }
        } catch (error) {
            toast.error("Internal Server Error. Please try again later");
            console.error("Product Stock Update Error:", error);
        }
    };

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleProductSave = () => {
        setOpen(false);
        saveProduct();
    };

    const handlProductUpdate = () => {
        setOpen(false);
        updateProduct();
    };

    const checkProductStock = async () => {
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value instanceof File ? value : String(value));
            }
        });

        try {
            const response = await fetch("http://localhost:8080/Edumart-Backend/StockCheck", {
                method: "POST",
                credentials: "include",
                body: formData
            });

            if (response.ok) {
                const json = await response.json();
                if (json.status) {
                    if (json.message === "UpdateProduct") {
                        handleClickOpen();
                    } else if (json.message === "InsertProduct") {
                        saveProduct();
                    }
                } else {
                    toast.error(json.message);
                }
            } else {
                toast.error("Stock check failed. Please try again");
            }
        } catch (error) {
            toast.error("Internal Server Error. Please try again later");
            console.error("Stock check Error:", error);
        }
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                            <input type="text" value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., HB Pencil Box" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Description</label>
                            <textarea rows={5} value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Detailed product description..."></textarea>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Product Image</label>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                        <div className="w-60 h-60 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 cursor-pointer bg-gray-50 overflow-hidden" onClick={handleImageUploadClick}>
                            {imagePreview ? <img src={imagePreview} alt="Product Preview" className="h-full w-full object-cover" /> : <div className="text-center">{Icons.upload}<p className="mt-2 text-sm">Click to upload</p></div>}
                        </div>
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-4 border-b pb-2">Categorization</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-gray-700 font-medium mb-2">Main Category</label><select onChange={(e) => { setSelectedMainCat(Number(e.target.value)); setSelectedCat(null); }} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"><option>Select Main Category</option>{mockMainCategories.map(mc => <option key={mc.id} value={mc.id}>{mc.name}</option>)}</select></div>
                    <div><label className="block text-gray-700 font-medium mb-2">Category</label><select onChange={(e) => setSelectedCat(Number(e.target.value))} disabled={!selectedMainCat} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100"><option>Select Category</option>{availableCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
                    <div><label className="block text-gray-700 font-medium mb-2">Sub Category</label><select disabled={!selectedCat} value={productData.subCategory} onChange={(e) => setProductData({ ...productData, subCategory: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100"><option>Select Sub Category</option>{availableSubCats.map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}</select></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-4 border-b pb-2">Details, Pricing & Stock</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-gray-700 font-medium mb-2">Brand</label><select value={productData.brand_id} onChange={(e) => setProductData({ ...productData, brand_id: e.target.value })} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"><option value={0}>Select Brand</option>{mockBrands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
                    <div><label className="block text-gray-700 font-medium mb-2">Stock Quantity</label><input type="number" value={productData.stock} onChange={(e) => setProductData({ ...productData, stock: e.target.value })} min="0" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div><label className="block text-gray-700 font-medium mb-2">Price (LKR)</label><input type="number" value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} min="0" step="0.01" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                    <div><label className="block text-gray-700 font-medium mb-2">Discount (%)</label><input type="number" value={productData.discount} onChange={(e) => setProductData({ ...productData, discount: e.target.value })} min="0" max="100" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                    <div><label className="block text-gray-700 font-medium mb-2">Display Price (LKR)</label><input type="text" value={displayPrice()} className="w-full px-4 py-2 border rounded-lg bg-gray-100" disabled /></div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                    <Button className='cursor-pointer' type="button" variant="secondary" onClick={() => setView('products/list')}>Cancel</Button>
                    <Button className='cursor-pointer' onClick={checkProductStock} type="submit">{isEditMode ? 'Update Product' : 'Save Product'}</Button>
                </div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Product Already Exists!"}</DialogTitle>
                    <DialogContent><DialogContentText id="alert-dialog-description">Product with the same name, brand, sub-category and Same Price already exists. Do you want to update the existing product stock or add a new one?</DialogContentText></DialogContent>
                    <DialogActions><Button className='cursor-pointer' onClick={handleProductSave}>Add As New One</Button><Button className='cursor-pointer' onClick={handlProductUpdate} variant="primary">Update Existing Stock</Button></DialogActions>
                </Dialog>
            </form>
        </Card>
    );
};

const ManageCategories: FC<{ setView: SetViewFn }> = () => {
    const [selectedMainCatId, setSelectedMainCatId] = useState<number | null>(mockMainCategories[0]?.id || null);
    const [selectedCatId, setSelectedCatId] = useState<number | null>(null);

    const categories = useMemo(() => mockCategories.filter(c => c.main_category_id === selectedMainCatId), [selectedMainCatId]);
    const subCategories = useMemo(() => mockSubCategories.filter(sc => sc.category_id === selectedCatId), [selectedCatId]);

    const handleSelectMainCat = (id: number) => {
        setSelectedMainCatId(id);
        setSelectedCatId(null);
    };

    const CategoryColumn: FC<{ title: string, items: { id: number, name: string }[], selectedId: number | null, onSelect: (id: number) => void }> = ({ title, items, selectedId, onSelect }) => (
        <div className="border rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 p-4 border-b bg-gray-50">{title}</h3>
            <div className="p-2 space-y-1">
                {items.map(item => <button key={item.id} onClick={() => onSelect(item.id)} className={classNames("w-full text-left p-3 rounded-md hover:bg-blue-50", selectedId === item.id && 'bg-blue-100 text-blue-700 font-semibold')}>{item.name}</button>)}
            </div>
            <div className="p-4 border-t"><Button variant="secondary" className="w-full">{Icons.plus} Add New</Button></div>
        </div>
    );

    return (
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CategoryColumn title="Main Categories" items={mockMainCategories} selectedId={selectedMainCatId} onSelect={handleSelectMainCat} />
                <CategoryColumn title="Categories" items={categories} selectedId={selectedCatId} onSelect={setSelectedCatId} />
                <CategoryColumn title="Sub Categories" items={subCategories} selectedId={null} onSelect={() => { }} />
            </div>
        </Card>
    );
};

const ManageBrands: FC<{ setView: SetViewFn }> = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="md:col-span-2">
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Brands</h2>
            <table className="w-full text-left table-auto"><thead><tr className="bg-gray-100 text-gray-600 text-sm"><th className="p-3 font-semibold">Brand Name</th><th className="p-3 font-semibold text-center">Products</th><th className="p-3 font-semibold text-center">Actions</th></tr></thead><tbody>{mockBrands.map(brand => (<tr key={brand.id} className="border-b hover:bg-gray-50"><td className="p-3 font-medium text-gray-800">{brand.name}</td><td className="p-3 text-center text-gray-600">{mockProducts.filter(p => p.brand_id === brand.id).length}</td><td className="p-3"><div className="flex justify-center items-center space-x-2"><button className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-200">{Icons.edit}</button><button className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-gray-200">{Icons.trash}</button></div></td></tr>))}</tbody></table>
        </Card>
    </div>
        <div>
            <Card>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Brand</h3>
                <form className="space-y-4">
                    <div><label className="block text-gray-700 font-medium mb-2">Brand Name</label><input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Faber-Castell" /></div>
                    <div><Button className="w-full">Add Brand</Button></div>
                </form>
            </Card>
        </div>
    </div>
);

// --- ORDER DETAILS DIALOG COMPONENT ---
interface OrderDetailsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
    details: OrderDetails | null;
}

const OrderDetailsDialog: FC<OrderDetailsDialogProps> = ({ isOpen, onClose, order, details }) => {
    if (!isOpen || !order || !details) return null;

    const getBrandName = (brandId: number) => mockBrands.find(b => b.id === brandId)?.name || 'N/A';
    const getProductDetails = (productId: number) => mockProducts.find(p => p.id == productId);

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle><span className="font-bold text-gray-800">Order Details: {order.id}</span></DialogTitle>
            <DialogContent dividers>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-1">Customer & Shipping Details</h4>
                        <p className="text-gray-600"><strong className="font-medium text-gray-800">Name:</strong> {details.billingAddress.fullName}</p>
                        <p className="text-gray-600"><strong className="font-medium text-gray-800">Address:</strong> {`${details.billingAddress.address}, ${details.billingAddress.city}, ${details.billingAddress.postalCode}`}</p>
                        <p className="text-gray-600"><strong className="font-medium text-gray-800">Mobile:</strong> {details.billingAddress.mobile}</p>
                    </div>

                    {details.giftAddress && (
                        <div>
                            <h4 className="text-lg font-semibold text-gray-700 mb-2 border-b pb-1">Gift Recipient Details 🎁</h4>
                            <p className="text-gray-600"><strong className="font-medium text-gray-800">Name:</strong> {details.giftAddress.fullName}</p>
                            <p className="text-gray-600"><strong className="font-medium text-gray-800">Address:</strong> {`${details.giftAddress.address}, ${details.giftAddress.city}, ${details.giftAddress.postalCode}`}</p>
                            <p className="text-gray-600 mt-2"><strong className="font-medium text-gray-800">Gift Note:</strong> <span className="italic">"{details.giftAddress.note}"</span></p>
                        </div>
                    )}
                </div>

                <h4 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-1">Order Items</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm">
                                <th className="p-3 font-semibold" style={{ width: '50%' }}>Product</th>
                                <th className="p-3 font-semibold text-center">Qty</th>
                                <th className="p-3 font-semibold text-right">Price</th>
                                <th className="p-3 font-semibold text-right">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.items.map((item) => {
                                return (
                                    <tr key={item.productId} className="border-b">
                                        <td className="p-3">
                                            <div className="flex items-center gap-4">
                                                <img src={item.productImageUrl} alt={item.productName} className="w-16 h-16 rounded-md object-cover" />
                                                <div>
                                                    <p className="font-medium text-gray-800">{item.productName}</p>
                                                    <p className="text-sm text-gray-500">Brand: {item.brandName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 text-center text-gray-600">{item.qty}</td>
                                        <td className="p-3 text-right text-gray-600">LKR{item.price.toFixed(2)}</td>
                                        <td className="p-3 text-right font-medium text-gray-800">LKR {(item.qty * item.price).toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="font-bold bg-gray-50">
                                <td colSpan={3} className="p-3 text-right text-gray-500">Delivery Fee</td>
                                <td className="p-3 text-right text-gray-500">LKR 500.00</td>
                            </tr>
                            <tr className="font-bold bg-gray-50">
                                <td colSpan={3} className="p-3 text-right text-xl text-gray-800">Total</td>
                                <td className="p-3 text-right text-xl text-gray-800">LKR {order.total.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </DialogContent>
            <DialogActions className="p-4 bg-gray-50">
                <Button onClick={onClose} variant="secondary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

// --- ORDERS PAGE COMPONENT ---
const OrdersPage: FC = () => {
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [orderDetails, setOrderDetails] = useState<{ [key: string]: OrderDetails }>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const orderStatuses: Order['status'][] = ['Paid', 'Pending', 'Processing', 'Shipped', 'Delivered'];
    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'Paid': return 'blue';
            case 'Processing': return 'yellow';
            case 'Shipped': return 'gray';
            case 'Delivered': return 'green';
            case 'Pending': return 'red';
            default: return 'gray';
        }
    };

    const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
        setOrders(orders.map(o => o.id == orderId ? { ...o, status: newStatus } : o));
        // toast.success(`Order ${orderId} status updated to ${newStatus}`);
        console.log(newStatus);
        updateDeliveryStatus(orderId, newStatus);
    };

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedOrder(null);
    };

    const loadAllOrders = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8080/Edumart-Backend/LoadAllOrders", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to fetch orders.");
            }

            const json = await response.json();

            console.log(json);

            // --- DATA TRANSFORMATION LOGIC ---

            if (json && json.invoiceList && json.invoiceItemsList) {
                const { invoiceList, invoiceItemsList } = json;

                // 1. Create a map of order items for quick lookup.
                // The key will be the order_id (e.g., "#0001"), and the value will be an array of OrderItem.
                const itemsMap = invoiceItemsList.reduce((acc: { [key: string]: OrderItem[] }, group: any) => {
                    acc[group.orderId] = group.invoiceItemses.map((item: any) => ({
                        productId: item.stock.product.id,
                        productName: item.stock.product.title,
                        productImageUrl: `http://localhost:8080/Edumart-Backend/product-images/${item.stock.product.id}/image1.png`,
                        brandName: item.stock.product.brand.name,
                        qty: item.qty,
                        price: item.stock.price,
                    }));
                    return acc;
                }, {});

                // 2. Process the main invoiceList to create the final data structures.
                const formattedOrders: Order[] = [];
                const formattedOrderDetails: { [key: string]: OrderDetails } = {};

                invoiceList.forEach((invoice: any) => {
                    const orderId = invoice.order_id;

                    // Create the Order summary object for the main table
                    formattedOrders.push({
                        id: orderId,
                        customerName: invoice.user.email + " ( " + invoice.user.username + " ) ",
                        date: new Date(invoice.created_at).toLocaleDateString('en-CA'), // Format date for consistency
                        total: invoice.amount,
                        status: invoice.orderStatus.value,
                    });

                    // Create the full OrderDetails object for the dialog
                    formattedOrderDetails[orderId] = {
                        billingAddress: {
                            fullName: invoice.userAddress.full_name,
                            address: invoice.userAddress.address,
                            city: invoice.userAddress.city.name,
                            postalCode: invoice.userAddress.postal_code,
                            mobile: invoice.userAddress.mobile,
                        },
                        giftAddress: invoice.giftAddress ? {
                            fullName: invoice.giftAddress.full_name,
                            address: invoice.giftAddress.address,
                            city: invoice.giftAddress.city.name,
                            postalCode: invoice.giftAddress.postal_code,
                            note: invoice.giftAddress.note,
                        } : null,
                        items: itemsMap[orderId] || [], // Get the items from our map
                    };
                });

                // 3. Set the state with our newly formatted data!
                setOrders(formattedOrders);
                setOrderDetails(formattedOrderDetails);
            }

        } catch (error) {
            toast.error("Something wrong with the server!");
            console.error("loadAllOrders Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadAllOrders();
    }, []);

    const updateDeliveryStatus = async (orderId: string, newStatus: Order['status']) => {
        const status = {
            newStatus: newStatus,
            orderId: orderId
        };
        try {
            const response = await fetch("http://localhost:8080/Edumart-Backend/DeliveryStatusUpdate", {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(status)
            });

            if (response.ok) {
                const json = await response.json();
                if (json.status) {
                    toast.success("Delivery Status Updated To " + newStatus + " !");
                    loadAllOrders();
                } else {
                    toast.error(json.message);
                }
            } else {
                toast.error("Delivery Status update failed. Please try again");
            }
        } catch (error) {
            toast.error("Something wrong ! Please try again");
            console.error("Delivery Status update Error:", error);
        }
    };

    return (
        <>
            <Card>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-sm">
                                <th className="p-3 font-semibold">Order ID</th>
                                <th className="p-3 font-semibold text-center">Customer</th>
                                <th className="p-3 font-semibold text-center">Date</th>
                                <th className="p-3 font-semibold text-center">Total</th>
                                <th className="p-3 font-semibold text-center">Status</th>
                                <th className="p-3 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium text-blue-600">{order.id}</td>
                                    <td className="p-3 text-gray-800 text-center">{order.customerName}</td>
                                    <td className="p-3 text-gray-600 text-center">{order.date}</td>
                                    <td className="p-3 text-center font-medium text-gray-800">LKR {order.total.toFixed(2)}</td>
                                    <td className="p-3 text-center">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                                            className={classNames(
                                                'border-gray-300 rounded-full text-xs font-semibold text-center focus:ring-2 focus:ring-blue-500 py-1 pl-3 pr-8 cursor-pointer appearance-none',
                                                `bg-${getStatusColor(order.status)}-100 text-${getStatusColor(order.status)}-800`
                                            )}
                                        >
                                            {orderStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                                        </select>
                                    </td>
                                    <td className="p-3 text-center flex justify-center items-center">
                                        <Button onClick={() => handleViewDetails(order)} variant="secondary" className="text-xs py-1 px-3 cursor-pointer">View Details</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <OrderDetailsDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                order={selectedOrder}
                // Pass details from the new state, not the mock data
                details={selectedOrder ? orderDetails[selectedOrder.id] : null}
            />
        </>
    );
};

const CustomersPage: FC = () => {
    const [customers, setCustomers] = useState(mockCustomers);

    const loadCustomers = async () => {
        try {
            const response = await fetch("http://localhost:8080/Edumart-Backend/LoadCustomers", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const json = await response.json();
                console.log(json);

                mockCustomers = json.customerList.map((cus: any) => ({
                    id: cus.user.id,
                    name: cus.user.username,
                    email: cus.user.email,
                    mobile: cus.user.mobile,
                    joinDate: new Date(cus.user.created_at).toLocaleDateString('en-CA'),
                    orderCount: cus.orderCount,
                    totalSpent: cus.spent
                }));

                setCustomers(mockCustomers);

            } else {
                toast.error("Customers load failed. Please try again");
            }
        } catch (error) {
            toast.error("Something wrong with the server!");
            console.error("Customers load Error:", error);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    return (<Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customers</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
                <thead>
                    <tr className="bg-gray-100 text-gray-600 text-sm">
                        <th className="p-3 font-semibold">Name</th>
                        <th className="p-3 font-semibold text-center">Email</th>
                        <th className="p-3 font-semibold text-center">Mobile Number</th>
                        <th className="p-3 font-semibold text-center">Joined On</th>
                        <th className="p-3 font-semibold text-center">Orders</th>
                        <th className="p-3 font-semibold text-right">Total Spent</th>
                    </tr>
                </thead>
                <tbody>{customers.map(customer => (<tr key={customer.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-800">{customer.name}</td>
                    <td className="p-3 text-gray-600 text-center">{customer.email}</td>
                    <td className="p-3 text-gray-600 text-center">{customer.mobile}</td>
                    <td className="p-3 text-gray-600 text-center">{customer.joinDate}</td>
                    <td className="p-3 text-center text-gray-600">{customer.orderCount}</td>
                    <td className="p-3 text-right font-medium text-gray-800">LKR {customer.totalSpent.toFixed(2)}</td>
                </tr>))}
                </tbody>
            </table>
        </div>
    </Card>);
};

const ReviewsPage: FC = () => {
    const StarRating: FC<{ rating: number }> = ({ rating }) => (<div className="flex items-center">{[...Array(5)].map((_, i) => (<Icon key={i} path={Icons.star.props.path} className={classNames('w-5 h-5', i < rating ? 'text-yellow-400' : 'text-gray-300')} />))}</div>);
    return (
        <div><h2 className="text-2xl font-bold text-gray-800 mb-6">Product Reviews</h2><div className="space-y-6">{mockReviews.map(review => (<Card key={review.id}><div className="flex justify-between items-start"><div><h3 className="font-bold text-lg text-gray-800">{review.productName}</h3><div className="flex items-center gap-2 text-sm text-gray-500 mt-1"><span>by {review.customerName}</span><span>&bull;</span><span>{review.date}</span></div><StarRating rating={review.rating} /></div><Badge color={review.status === 'Approved' ? 'green' : 'yellow'}>{review.status}</Badge></div><p className="text-gray-600 mt-4">{review.comment}</p><div className="flex justify-end gap-3 mt-4">{review.status === 'Pending' && <Button variant="secondary">{Icons.check} Approve</Button>}<Button variant="danger">{Icons.trash} Delete</Button></div></Card>))}</div></div>
    );
};

const InventoryPage: FC = () => {
    const getStockStatus = (stock: number) => {
        if (stock === 0) return <Badge color="red">Out of Stock</Badge>;
        if (stock < 10) return <Badge color="yellow">Low Stock</Badge>;
        return <Badge color="green">In Stock</Badge>;
    };
    return (
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Inventory Management</h2>
            <div className="overflow-x-auto"><table className="w-full text-left table-auto"><thead><tr className="bg-gray-100 text-gray-600 text-sm"><th className="p-3 font-semibold">Product</th><th className="p-3 font-semibold text-center">Stock Level</th><th className="p-3 font-semibold text-center">Status</th></tr></thead><tbody>{mockProducts.map(product => (<tr key={product.id} className="border-b hover:bg-gray-50"><td className="p-3"><div className="flex items-center gap-4"><img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover" /><span className="font-medium text-gray-800">{product.name}</span></div></td><td className="p-3 text-center font-bold text-lg">{product.stock}</td><td className="p-3 text-center">{getStockStatus(product.stock)}</td></tr>))}</tbody></table></div>
        </Card>
    );
};

const ManageUsersPage: FC = () => (
    <Card>
        <div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-800">Manage Users</h2><Button>{Icons.plus} Add User</Button></div>
        <div className="overflow-x-auto"><table className="w-full text-left table-auto"><thead><tr className="bg-gray-100 text-gray-600 text-sm"><th className="p-3 font-semibold">User</th><th className="p-3 font-semibold">Role</th><th className="p-3 font-semibold">Last Login</th><th className="p-3 font-semibold text-center">Actions</th></tr></thead><tbody>{mockUsers.map(user => (<tr key={user.id} className="border-b hover:bg-gray-50"><td className="p-3"><div className="font-medium text-gray-800">{user.name}</div><div className="text-sm text-gray-500">{user.email}</div></td><td className="p-3 text-gray-600">{user.role}</td><td className="p-3 text-gray-600">{user.lastLogin}</td><td className="p-3"><div className="flex justify-center items-center space-x-2"><button className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-200">{Icons.edit}</button><button className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-gray-200">{Icons.trash}</button></div></td></tr>))}</tbody></table></div>
    </Card>
);

const SettingsPage: FC = () => (
    <div><h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2><div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div className="lg:col-span-2 space-y-8"><Card><h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Store Details</h3><div className="space-y-4"><div><label className="block text-gray-700 font-medium mb-2">Store Name</label><input type="text" defaultValue="EduMart" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /></div><div><label className="block text-gray-700 font-medium mb-2">Store Email</label><input type="email" defaultValue="contact@edumart.com" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /></div></div></Card><Card><h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Currency Options</h3><div className="space-y-4"><div><label className="block text-gray-700 font-medium mb-2">Currency</label><select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"><option>LKR (Rs)</option><option>USD ($)</option><option>EUR (€)</option></select></div></div></Card></div><div className="lg:col-span-1"><Card><h3 className="text-xl font-bold text-gray-800 mb-4">Save Changes</h3><p className="text-gray-600 mb-4">Click the button below to save all your settings changes.</p><Button className="w-full">Save Settings</Button></Card></div></div></div>
);


// --- Main App Component ---
const AdminDashboard: FC = () => {
    const [view, setView] = useState('dashboard');
    const [params, setParams] = useState<object | null>(null);

    const handleSetView: SetViewFn = (newView, newParams) => {
        setView(newView);
        setParams(newParams || null);
    };

    const loadProductData = async () => {
        try {
            const response = await fetch("http://localhost:8080/Edumart-Backend/LoadProductData", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                const json = await response.json();
                mockBrands = json.brandList || [];
                mockMainCategories = json.mainCategoryList || [];
                mockCategories = json.categoryList.map((cat: { id: number; name: string; mainCategory: { id: number } }) => ({
                    id: cat.id,
                    name: cat.name,
                    main_category_id: cat.mainCategory?.id || null,
                }));
                mockSubCategories = json.subCategoryList.map((subCat: { id: number; name: string; category: { id: number }; }) => ({
                    id: subCat.id,
                    name: subCat.name,
                    category_id: subCat.category?.id ?? null,
                }));
            } else {
                toast.error("Product Data load failed. Please try again");
            }
        } catch (error) {
            toast.error("Something wrong with the server!");
            console.error("Product Data load Error:", error);
        }
    };

    useEffect(() => {
        loadProductData();
    }, []);

    const renderView = () => {
        const currentView = view.split('/')[0];
        switch (currentView) {
            case 'dashboard': return <DashboardPage />;
            case 'products':
                const subView = view.split('/')[1] || 'list';
                switch (subView) {
                    case 'list': return <ProductList setView={handleSetView} />;
                    case 'add': return <AddEditProduct setView={handleSetView} />;
                    case 'edit': return <AddEditProduct setView={handleSetView} params={params as { id: number }} />;
                    case 'categories': return <ManageCategories setView={handleSetView} />;
                    case 'brands': return <ManageBrands setView={handleSetView} />;
                    default: return <ProductList setView={handleSetView} />;
                }
            case 'inventory': return <InventoryPage />;
            case 'orders': return <OrdersPage />;
            case 'customers': return <CustomersPage />;
            case 'reviews': return <ReviewsPage />;
            case 'users': return <ManageUsersPage />;
            case 'settings': return <SettingsPage />;
            default: return <DashboardPage />;
        }
    };

    return (
        <div className="flex h-screen bg-edumartHover/30 font-sans p-6">
            <Sidebar currentView={view} setView={handleSetView}/>
            <div className="flex-1 flex flex-col overflow-hidden rounded-r-2xl bg-white shadow-lg">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;