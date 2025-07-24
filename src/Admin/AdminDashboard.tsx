import { useState, FC, ReactNode, useMemo, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Helper function to conditionally apply class names
const classNames = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
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

// --- MOCK DATA (Updated based on ER Diagram) ---

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
];

const mockProducts = [
    { id: 1, name: 'A4 Paper Ream (500 Sheets)', description: 'High-quality A4 paper for printing and copying', sku: 'SCH-PPR-A4-500', sub_category_id: 1, brand_id: 1, stock: 150, price: 5.99, discount: 0, active: true, imageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=A4+Paper' },
    { id: 2, name: 'Parker Jotter Ballpoint Pen', description: 'Classic ballpoint pen with smooth writing experience', sku: 'OFF-PEN-PRK-JTR', sub_category_id: 3, brand_id: 2, stock: 300, price: 12.50, discount: 10, active: true, imageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=Pen' },
    { id: 3, name: 'Ergonomic Office Chair', description: 'Comfortable office chair with ergonomic design', sku: 'OFF-FNT-CHR-ERGO', sub_category_id: 5, brand_id: 3, stock: 25, price: 120.00, discount: 15, active: false, imageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=Chair' },
    { id: 4, name: '12-pack HB Pencils', description: 'Standard HB pencils for general use', sku: 'SCH-PEN-STA-HB', sub_category_id: 4, brand_id: 4, stock: 8, price: 4.50, discount: 0, active: true, imageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=Pencils' },
    { id: 5, name: 'Canvas Paint Set (24 Colors)', description: 'Comprehensive paint set with 24 vibrant colors', sku: 'ART-PNT-CNV-24', sub_category_id: 7, brand_id: 5, stock: 0, price: 25.00, discount: 5, active: true, imageUrl: 'https://placehold.co/100x100/E2E8F0/4A5568?text=Paint+Set' },
];

const mockOrders = [{ id: 'ORD-2024-001', customerName: 'John Doe', date: '2024-07-20', total: 49.99, status: 'Shipped' }, { id: 'ORD-2024-002', customerName: 'Jane Smith', date: '2024-07-19', total: 125.50, status: 'Delivered' }, { id: 'ORD-2024-003', customerName: 'Peter Jones', date: '2024-07-19', total: 12.00, status: 'Pending' }, { id: 'ORD-2024-004', customerName: 'Mary Johnson', date: '2024-07-18', total: 250.00, status: 'Cancelled' }];
const mockCustomers = [{ id: 1, name: 'John Doe', email: 'john.doe@example.com', joinDate: '2023-01-15', orderCount: 5, totalSpent: 450.75 }, { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', joinDate: '2023-02-20', orderCount: 8, totalSpent: 1250.00 }, { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', joinDate: '2023-05-10', orderCount: 2, totalSpent: 85.20 }];
const mockReviews = [{ id: 1, productName: 'Parker Jotter Ballpoint Pen', customerName: 'John Doe', rating: 5, comment: 'Excellent pen, writes smoothly and looks very professional. Highly recommended!', date: '2024-07-15', status: 'Approved' }, { id: 2, productName: 'Ergonomic Office Chair', customerName: 'Jane Smith', rating: 3, comment: 'It\'s a decent chair for the price, but the armrests feel a bit flimsy. Assembly was straightforward.', date: '2024-07-12', status: 'Approved' }, { id: 3, productName: 'A4 Paper Ream', customerName: 'Peter Jones', rating: 4, comment: 'Good quality paper, but the packaging was slightly damaged on arrival.', date: '2024-07-10', status: 'Pending' }];
const mockUsers = [{ id: 1, name: 'Admin User', email: 'admin@edumart.com', role: 'Administrator', lastLogin: '2024-07-21 10:30 AM' }, { id: 2, name: 'Manager Sam', email: 'sam@edumart.com', role: 'Manager', lastLogin: '2024-07-21 09:15 AM' }, { id: 3, name: 'Support Alex', email: 'alex@edumart.com', role: 'Support Staff', lastLogin: '2024-07-20 04:00 PM' }];


// --- SVG ICONS (Self-contained to avoid external dependencies) ---
const Icon: FC<{ path: string; className?: string }> = ({ path, className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
);

const Icons = {
    dashboard: <Icon path="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    products: <Icon path="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
    inventory: <Icon path="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />,
    customers: <Icon path="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97m-3.102 5.97a6 6 0 01-2.72-5.197M15 15a4 4 0 100-8 4 4 0 000 8z" />,
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
type SetViewFn = (view: string, params?: any) => void;

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
        <aside className="w-64 bg-white border-r h-full flex flex-col flex-shrink-0">
            <div className="p-4 border-b h-16 flex items-center">
                <h1 className="text-2xl font-bold text-blue-600">EduMart</h1>
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

const Header: FC<{}> = () => (
    <header className="flex items-center justify-between p-4 bg-white border-b h-16 flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-800">Welcome back, Admin!</h2>
    </header>
);

// --- Page Components ---

const DashboardPage: FC = () => (
    <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card><h3 className="text-gray-500 font-medium">Total Revenue</h3><p className="text-3xl font-bold text-gray-800 mt-2">$45,231.89</p><p className="text-green-500 text-sm mt-1">+20.1% from last month</p></Card>
            <Card><h3 className="text-gray-500 font-medium">Orders</h3><p className="text-3xl font-bold text-gray-800 mt-2">1,830</p><p className="text-green-500 text-sm mt-1">+5.2% from last month</p></Card>
            <Card><h3 className="text-gray-500 font-medium">Active Products</h3><p className="text-3xl font-bold text-gray-800 mt-2">342</p><p className="text-gray-500 text-sm mt-1">12 inactive</p></Card>
            <Card><h3 className="text-gray-500 font-medium">New Customers</h3><p className="text-3xl font-bold text-gray-800 mt-2">156</p><p className="text-red-500 text-sm mt-1">-2.8% from last month</p></Card>
        </div>
    </div>
);

const ProductList: FC<{ setView: SetViewFn }> = ({ setView }) => {
    const [products, setProducts] = useState(mockProducts);
    const toggleStatus = (id: number) => setProducts(products.map(p => p.id === id ? { ...p, active: !p.active } : p));

    const getCategoryPath = (subCategoryId: number) => {
        const subCat = mockSubCategories.find(sc => sc.id === subCategoryId);
        if (!subCat) return 'N/A';
        const cat = mockCategories.find(c => c.id === subCat.category_id);
        if (!cat) return subCat.name;
        const mainCat = mockMainCategories.find(mc => mc.id === cat.main_category_id);
        if (!mainCat) return `${cat.name} > ${subCat.name}`;
        return `${mainCat.name} > ${cat.name} > ${subCat.name}`;
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Product List</h2>
                <Button onClick={() => setView('products/add')}>{Icons.plus} Add Product</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left table-auto">
                    <thead><tr className="bg-gray-100 text-gray-600 text-sm"><th className="p-3 font-semibold">Product</th><th className="p-3 font-semibold">Category Path</th><th className="p-3 font-semibold text-center">Stock</th><th className="p-3 font-semibold text-right">Price</th><th className="p-3 font-semibold text-center">Status</th><th className="p-3 font-semibold text-center">Actions</th></tr></thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-gray-50">
                                <td className="p-3"><div className="flex items-center gap-4"><img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover" /><span className="font-medium text-gray-800">{product.name}</span></div></td>
                                <td className="p-3 text-gray-600 text-xs">{getCategoryPath(product.sub_category_id)}</td>
                                <td className="p-3 text-center text-gray-600">{product.stock}</td><td className="p-3 text-right font-medium text-gray-800">${product.price.toFixed(2)}</td>
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

const AddEditProduct: FC<{ setView: SetViewFn; params?: any }> = ({ setView, params }) => {
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

    // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.files && event.target.files[0]) {
    //         const file = event.target.files[0];
    //         setImagePreview(URL.createObjectURL(file));
    //     }
    // };

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const displayPrice = () => {
        const priceNum = parseFloat(String(productData.price));
        const discountNum = parseFloat(String(productData.discount));

        if (isNaN(priceNum) || isNaN(discountNum)) return '';

        return ((priceNum * 100 / (100 - discountNum))).toFixed(2);
    };


    //add new product function 

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
            setProductData(prev => ({
                ...prev,
                image: file // <-- set the image file here
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };


    const saveProduct = async () => {
        // You can now send productData in fetch / axios
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            if (value !== null) formData.append(key, value as any);
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

                    console.log("New Product added successfully");
                    toast.success("New Product added successfully");
                    setView('products/list');
                } else {
                    console.log(json.message);
                    toast.error(json.message);
                }
            } else {
                console.log("New Product add failed. Please try again");
                toast.error("New Product add failed. Please try again");
            }
        } catch (error) {
            toast.error("Internal Server Error. Please try again later");
            console.error("New Product add Error:", error);
        }
    };

    //add new product function 

    //Update product function 

    const updateProduct = async () => {
        // You can now send productData in fetch / axios
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            if (value !== null) formData.append(key, value as any);
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

                    console.log("Product Stock Updated successfully");
                    toast.success("Product Stock Updated successfully");
                    setView('products/list');
                } else {
                    console.log(json.message);
                    toast.error(json.message);
                }
            } else {
                console.log("Product Stock Update failed. Please try again");
                toast.error("Product Stock Update failed. Please try again");
            }
        } catch (error) {
            toast.error("Internal Server Error. Please try again later");
            console.error("Product Stock Updat Error:", error);
        }
    };

    //Update product function 

    //Stock check function 

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleProductSave = () => {
        setOpen(false);
        saveProduct();
    };

    const handlProductUpdate = () => {
        setOpen(false);
        updateProduct();
    };

    const checkProductStock = async () => {
        console.log(productData);

        // You can now send productData in fetch / axios
        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            if (value !== null) formData.append(key, value as any);
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

                    if (json.message == "UpdateProduct") {
                        console.log("UpdateProduct");
                        handleClickOpen();
                    } else if (json.message == "InsertProduct") {
                        console.log("InsertProduct");
                        saveProduct();
                    }

                } else {
                    console.log(json);
                    toast.error(json.message);
                }
            } else {
                console.log("Stock check failed. Please try again");
                toast.error("Stock check failed. Please try again");
            }
        } catch (error) {
            toast.error("Internal Server Error. Please try again later");
            console.error("Stock check Error:", error);
        }
    };

    //Stock check function

    return (
        <Card>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{isEditMode ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={(e) => { e.preventDefault(); }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                            <input type="text"
                                value={productData.name}
                                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                                defaultValue={product?.name} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., HB Pencil Box" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Description</label>
                            <textarea rows={5}
                                value={productData.description}
                                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Detailed product description..."></textarea>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Product Image</label>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                        <div
                            className="w-60 h-60 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 cursor-pointer bg-gray-50 overflow-hidden"
                            onClick={handleImageUploadClick}
                        >
                            {imagePreview ? (
                                <img src={imagePreview} alt="Product Preview" className="h-full w-full object-cover" />
                            ) : (
                                <div className="text-center">
                                    {Icons.upload}
                                    <p className="mt-2 text-sm">Click to upload</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-4 border-b pb-2">Categorization</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-gray-700 font-medium mb-2">Main Category</label>
                        <select onChange={(e) => { setSelectedMainCat(Number(e.target.value)); setSelectedCat(null); }} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                            <option>Select Main Category</option>
                            {mockMainCategories.map(mc => <option key={mc.id} value={mc.id}>{mc.name}</option>)}
                        </select>
                    </div>
                    <div><label className="block text-gray-700 font-medium mb-2">Category</label>
                        <select onChange={(e) => setSelectedCat(Number(e.target.value))} disabled={!selectedMainCat} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100">
                            <option>Select Category</option>
                            {availableCats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div><label className="block text-gray-700 font-medium mb-2">Sub Category</label>
                        <select disabled={!selectedCat}
                            value={productData.subCategory}
                            onChange={(e) => setProductData({ ...productData, subCategory: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100">
                            <option>Select Sub Category</option>
                            {availableSubCats.map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
                        </select>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-4 border-b pb-2">Details, Pricing & Stock</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-gray-700 font-medium mb-2">Brand</label>
                        <select
                            value={productData.brand_id}
                            onChange={(e) => setProductData({ ...productData, brand_id: e.target.value })}
                            defaultValue={product?.brand_id} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                            <option value={0}>Select Brand</option>
                            {mockBrands.map(b =>
                                <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Stock Quantity</label>
                        <input type="number"
                            value={productData.stock}
                            onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                            min="0" defaultValue={product?.stock}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price (LKR)</label>
                        <input type="number" value={productData.price}
                            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                            min="0" step="0.01" defaultValue={product?.price}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Discount (%)</label>
                        <input type="number"
                            value={productData.discount}
                            onChange={(e) => setProductData({ ...productData, discount: e.target.value })}
                            min="0" max="100" defaultValue={product?.discount}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Display Price (LKR)</label>
                        <input type="number" min="0" step="0.01" value={displayPrice()} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" disabled />
                    </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                    <Button className='cursor-pointer' type="button" variant="secondary" onClick={() => setView('products/list')}>Cancel</Button>
                    <Button className='cursor-pointer' onClick={checkProductStock} type="submit">{isEditMode ? 'Update Product' : 'Save Product'}</Button>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Product Already Exists!"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Product with the same name, brand, sub-category and Same Price already exists.
                            Do you want to update the existing product stock or add a new one?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button className='cursor-pointer' onClick={handleProductSave}>Add As New One</Button>
                        <Button className='cursor-pointer' onClick={handlProductUpdate} variant="primary">
                            Update Existing Stock
                        </Button>
                    </DialogActions>
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
                {items.map(item => (
                    <button key={item.id} onClick={() => onSelect(item.id)} className={classNames("w-full text-left p-3 rounded-md hover:bg-blue-50", selectedId === item.id && 'bg-blue-100 text-blue-700 font-semibold')}>
                        {item.name}
                    </button>
                ))}
            </div>
            <div className="p-4 border-t">
                <Button variant="secondary" className="w-full">{Icons.plus} Add New</Button>
            </div>
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

const ManageBrands: FC<{ setView: SetViewFn }> = ({ setView }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><div className="md:col-span-2"><Card><h2 className="text-2xl font-bold text-gray-800 mb-6">Product Brands</h2><table className="w-full text-left table-auto"><thead><tr className="bg-gray-100 text-gray-600 text-sm"><th className="p-3 font-semibold">Brand Name</th><th className="p-3 font-semibold text-center">Products</th><th className="p-3 font-semibold text-center">Actions</th></tr></thead><tbody>{mockBrands.map(brand => (<tr key={brand.id} className="border-b hover:bg-gray-50"><td className="p-3 font-medium text-gray-800">{brand.name}</td><td className="p-3 text-center text-gray-600">{mockProducts.filter(p => p.brand_id === brand.id).length}</td><td className="p-3"><div className="flex justify-center items-center space-x-2"><button className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-gray-200">{Icons.edit}</button><button className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-gray-200">{Icons.trash}</button></div></td></tr>))}</tbody></table></Card></div><div><Card><h3 className="text-xl font-bold text-gray-800 mb-4">Add New Brand</h3><form className="space-y-4"><div><label className="block text-gray-700 font-medium mb-2">Brand Name</label><input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Faber-Castell" /></div><div><Button className="w-full">Add Brand</Button></div></form></Card></div></div>
);

const OrdersPage: FC = () => {
    const getStatusColor = (status: string) => {
        switch (status) { case 'Shipped': return 'blue'; case 'Delivered': return 'green'; case 'Pending': return 'yellow'; case 'Cancelled': return 'red'; default: return 'gray'; }
    };
    return (
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Orders</h2>
            <div className="overflow-x-auto"><table className="w-full text-left table-auto"><thead><tr className="bg-gray-100 text-gray-600 text-sm"><th className="p-3 font-semibold">Order ID</th><th className="p-3 font-semibold">Customer</th><th className="p-3 font-semibold">Date</th><th className="p-3 font-semibold text-right">Total</th><th className="p-3 font-semibold text-center">Status</th><th className="p-3 font-semibold text-center">Actions</th></tr></thead><tbody>{mockOrders.map(order => (<tr key={order.id} className="border-b hover:bg-gray-50"><td className="p-3 font-medium text-blue-600 cursor-pointer hover:underline">{order.id}</td><td className="p-3 text-gray-800">{order.customerName}</td><td className="p-3 text-gray-600">{order.date}</td><td className="p-3 text-right font-medium text-gray-800">${order.total.toFixed(2)}</td><td className="p-3 text-center"><Badge color={getStatusColor(order.status)}>{order.status}</Badge></td><td className="p-3 text-center"><Button variant="secondary" className="text-xs py-1 px-3">View Details</Button></td></tr>))}</tbody></table></div>
        </Card>
    );
};

const CustomersPage: FC = () => (
    <Card>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customers</h2>
        <div className="overflow-x-auto"><table className="w-full text-left table-auto"><thead><tr className="bg-gray-100 text-gray-600 text-sm"><th className="p-3 font-semibold">Name</th><th className="p-3 font-semibold">Email</th><th className="p-3 font-semibold">Joined On</th><th className="p-3 font-semibold text-center">Orders</th><th className="p-3 font-semibold text-right">Total Spent</th></tr></thead><tbody>{mockCustomers.map(customer => (<tr key={customer.id} className="border-b hover:bg-gray-50"><td className="p-3 font-medium text-gray-800">{customer.name}</td><td className="p-3 text-gray-600">{customer.email}</td><td className="p-3 text-gray-600">{customer.joinDate}</td><td className="p-3 text-center text-gray-600">{customer.orderCount}</td><td className="p-3 text-right font-medium text-gray-800">${customer.totalSpent.toFixed(2)}</td></tr>))}</tbody></table></div>
    </Card>
);

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
            <div className="overflow-x-auto"><table className="w-full text-left table-auto"><thead><tr className="bg-gray-100 text-gray-600 text-sm"><th className="p-3 font-semibold">Product</th><th className="p-3 font-semibold">SKU</th><th className="p-3 font-semibold text-center">Stock Level</th><th className="p-3 font-semibold text-center">Status</th></tr></thead><tbody>{mockProducts.map(product => (<tr key={product.id} className="border-b hover:bg-gray-50"><td className="p-3"><div className="flex items-center gap-4"><img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-md object-cover" /><span className="font-medium text-gray-800">{product.name}</span></div></td><td className="p-3 text-gray-600">{product.sku}</td><td className="p-3 text-center font-bold text-lg">{product.stock}</td><td className="p-3 text-center">{getStockStatus(product.stock)}</td></tr>))}</tbody></table></div>
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
    <div><h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2><div className="grid grid-cols-1 lg:grid-cols-3 gap-8"><div className="lg:col-span-2 space-y-8"><Card><h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Store Details</h3><div className="space-y-4"><div><label className="block text-gray-700 font-medium mb-2">Store Name</label><input type="text" defaultValue="EduMart" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /></div><div><label className="block text-gray-700 font-medium mb-2">Store Email</label><input type="email" defaultValue="contact@edumart.com" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /></div></div></Card><Card><h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-3">Currency Options</h3><div className="space-y-4"><div><label className="block text-gray-700 font-medium mb-2">Currency</label><select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"><option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option></select></div></div></Card></div><div className="lg:col-span-1"><Card><h3 className="text-xl font-bold text-gray-800 mb-4">Save Changes</h3><p className="text-gray-600 mb-4">Click the button below to save all your settings changes.</p><Button className="w-full">Save Settings</Button></Card></div></div></div>
);


// --- Main App Component ---
const AdminDashboard: FC = () => {
    const [view, setView] = useState('dashboard');
    const [params, setParams] = useState<any>(null);

    const handleSetView: SetViewFn = (newView, newParams) => {
        setView(newView);
        setParams(newParams);
    };

    //Functional Js

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


                // setCities(json);

            } else {
                console.log("Product Data load failed. Please try again");
                toast.error("Product Data load failed. Please try again");
            }
        } catch (error) {
            toast.error("Something wrong ! Please try again" + error);
            console.error("Product Data load Error:", error);
        }
    };

    useEffect(() => {
        loadProductData();
    }, []);

    //Functional Js

    const renderView = () => {
        const currentView = view.split('/')[0];
        switch (currentView) {
            case 'dashboard': return <DashboardPage />;
            case 'products':
                const subView = view.split('/')[1] || 'list';
                switch (subView) {
                    case 'list': return <ProductList setView={handleSetView} />;
                    case 'add': return <AddEditProduct setView={handleSetView} />;
                    case 'edit': return <AddEditProduct setView={handleSetView} params={params} />;
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
        <div className="flex h-screen bg-gray-100 font-sans">
            <Sidebar currentView={view} setView={handleSetView} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
