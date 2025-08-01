import { useEffect, useState } from 'react';
import {
  User,
  Edit,
  Package,
  MapPin,
  Lock,
  LogOut,
  Plus,
  Eye,
  EyeOff,
  Save,
  X
} from 'lucide-react';
import { toast } from 'react-toastify';
import ConfirmToast from '../Components/ConfirmToast';

interface AccountData {
  username: string;
  email: string;
  mobile: string;
  created_at: string;
}

interface UserProfile {
  username: string;
  mobile: string;
}

interface UserPassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type City = {
  id: string;
  name: string;
};

type Address = {
  id: number;
  type: string;
  full_name: string;
  mobile: string; // Added this line
  address: string;
  cityName: string;
  postal_code: string;
  isDefault: boolean;
  city?: City; // Optional for displaying city name
};

const MyAccountPage = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // set account data
  const [accountData, setAccountData] = useState<AccountData>({
    username: '',
    email: '',
    mobile: '',
    created_at: ''
  });

  const fetchAccountData = async () => {

    try {
      const response = await fetch("http://localhost:8080/Edumart-Backend/SetAccountData", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const json = await response.json();
        if (json.status) {
          setAccountData(json);
          setUserProfile(json);
        } else {
          console.log(json.message);
          toast.error(json.message);
        }
      } else {
        console.log("Data load failed. Please try again");
        toast.error("Data load failed. Please try again");
      }
    } catch (error) {
      toast.error("Something wrong ! Please try again" + error);
      console.error("Data load Error:", error);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  // set account data

  const [cities, setCities] = useState<City[]>([]);

  const loadCityData = async () => {

    try {
      const response = await fetch("http://localhost:8080/Edumart-Backend/LoadCityData", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const json = await response.json();

        setCities(json); // Store city data in state

      } else {
        console.log("City data load failed. Please try again");
        toast.error("City data load failed. Please try again");
      }
    } catch (error) {
      toast.error("Something wrong ! Please try again" + error);
      console.error("City data load Error:", error);
    }
  };

  useEffect(() => {
    loadCityData();
    loadAddresses();
  }, []);

  // load city data

  const [orders] = useState([
    { id: '#ORD001', date: '2024-07-15', status: 'Delivered', total: '$129.99', items: 3 },
    { id: '#ORD002', date: '2024-07-10', status: 'Shipped', total: '$89.50', items: 2 },
    { id: '#ORD003', date: '2024-07-05', status: 'Processing', total: '$199.99', items: 4 },
    { id: '#ORD004', date: '2024-06-30', status: 'Delivered', total: '$59.99', items: 1 },
  ]);

  const menuItems = [
    { id: 'account', label: 'Account Information', icon: User, active: true },
    { id: 'profile', label: 'Update Profile', icon: Edit },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'password', label: 'Change Password', icon: Lock },
    { id: 'logout', label: 'Logout', icon: LogOut }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-100';
      case 'Shipped': return 'text-blue-600 bg-blue-100';
      case 'Processing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderAccountInfo = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
          <p className="text-lg text-gray-800">{accountData.username}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Member Since</label>
          <p className="text-lg text-gray-800">{accountData.created_at}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
          <p className="text-lg text-gray-800">{accountData.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
          <p className="text-lg text-gray-800">{accountData.mobile}</p>
        </div>
      </div>
    </div>
  );

  //update profile

  // user profile data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: '',
    mobile: '',
  });

  const updateProfile = async () => {
    const updateData = {
      username: userProfile.username,
      mobile: userProfile.mobile,
    };

    try {
      const response = await fetch("http://localhost:8080/Edumart-Backend/UpdateUserProfile", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        const json = await response.json();
        if (json.status) {
          console.log(json);
          toast.success("Profile updated successfully!");
          // render profile section
        } else {
          console.log(json.message);
          toast.error(json.message);
        }
      } else {
        console.log("Profile update failed. Please try again");
        toast.error("Profile update failed. Please try again");
      }
    } catch (error) {
      toast.error("Something wrong ! Please try again");
      console.error("Profile update Error:", error);
    }
  };


  //update profile

  const renderUpdateProfile = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Username</label>
            <input
              type="text"
              value={userProfile.username}
              onChange={(e) => setUserProfile({ ...userProfile, username: e.target.value })}

              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Mobile Number</label>
            <input
              type="tel"
              value={userProfile.mobile}
              onChange={(e) => setUserProfile({ ...userProfile, mobile: e.target.value })}
              placeholder="Enter mobile number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <button onClick={updateProfile}
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200 flex items-center gap-2 cursor-pointer"
        >
          <Save size={16} />
          Update Profile
        </button>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Items</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{order.id}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{order.items}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{order.total}</td>
                <td className="px-4 py-3">
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const [newAddress, setNewAddress] = useState<Address>({
    id: 0,
    type: "",
    full_name: "",
    mobile: "",
    address: "",
    cityName: "0",
    postal_code: "",
    isDefault: false,
  });

  const [addresses, setAddresses] = useState<Address[]>([]);

  const saveNewAddress = async () => {

    try {
      const response = await fetch("http://localhost:8080/Edumart-Backend/SaveNewAddress", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newAddress)
      });

      if (response.ok) {
        const json = await response.json();
        if (json.status) {

          toast.success("Address saved!");
          console.log("Address saved!");

          setNewAddress({
            id: 0,
            type: "",
            full_name: "",
            mobile: "",
            address: "",
            cityName: "",
            postal_code: "",
            isDefault: false,
          });
          setShowAddressForm(false);
          loadAddresses();
          renderAddresses();
        } else {
          console.log(json.message);
          toast.error(json.message);
        }
      } else {
        console.log("Address Registration failed. Please try again");
        toast.error("Address Registration failed. Please try again");
      }
    } catch (error) {
      toast.error("Error connecting to server");
      console.error("Address Registration Error:", error);
    }
  };

  const loadAddresses = async () => {

    try {
      const response = await fetch("http://localhost:8080/Edumart-Backend/SaveNewAddress", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const json = await response.json();

        if (json.addreassList) {
          setAddresses(json.addreassList as Address[]);
          console.log("Addresses loaded successfully:", json.addreassList);
        } else {
          toast.warning("No addresses found.");
          setAddresses([]);
        }
      } else {
        console.log("Failed to load addresses");
        toast.error("Failed to load addresses");
      }
    } catch (error) {
      toast.error("Error connecting to server for get addresses");
      console.error("Address Load Error:", error);
    }
  };

  // renderr

  const renderAddresses = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Addresses</h2>
        <button
          onClick={() => setShowAddressForm(!showAddressForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200 flex items-center gap-2"
        >
          <Plus size={16} />
          Add New Address
        </button>
      </div>

      {showAddressForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Address Type (Eg : Home/Work)</label>
                <input
                  type="text"
                  value={newAddress.type}
                  onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                <input
                  type="text"
                  value={newAddress.full_name}
                  onChange={(e) => setNewAddress({ ...newAddress, full_name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                <input
                  type="text"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">City</label>
                <select
                  value={newAddress.cityName}
                  onChange={(e) => setNewAddress({ ...newAddress, cityName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="0">Select a city</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Postal Code</label>
                <input
                  type="text"
                  value={newAddress.postal_code}
                  onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  value={newAddress.mobile}
                  onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })}
                  placeholder="Enter mobile number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newAddress.isDefault}
                onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                className="h-4 w-4 text-green-600"
              />
              <label className="text-sm text-gray-600">Set as default address</label>
            </div>
            <div className="flex gap-2">
              <button onClick={saveNewAddress}
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
              >
                Save Address
              </button>
              <button
                type="button"
                onClick={() => setShowAddressForm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div key={address.id} className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded">
                  {address.type}
                </span>
                {address.isDefault && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded">
                    Default
                  </span>
                )}
              </div>
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
            <h4 className="font-medium text-gray-800 mb-1"> {address.full_name} </h4>
            <p className="text-sm text-gray-600 mb-1">{address.mobile}</p>
            <p className="text-sm text-gray-600 mb-1">{address.address}</p>
            <p className="text-sm text-gray-600">
              {address.city?.name}, {address.postal_code
              }
            </p>

          </div>
        ))}
      </div>
    </div>
  );

  const handleDeleteAddress = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8080/Edumart-Backend/DeleteAddress?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        const json = await response.json();
        if (json.status) {
          toast.success("Address deleted successfully!");
          loadAddresses();
          renderAddresses();
        } else {
          console.log(json.message);
          toast.error(json.message);
        }
      } else {
        console.log("Address deletion failed. Please try again");
        toast.error("Address deletion failed. Please try again");
      }
    } catch (error) {
      toast.error("Something wrong ! Please try again" + error);
      console.error("Address deletion Error:", error);
    }
  };

  //update Password

  // Password data
  const [password, setPassword] = useState<UserPassword>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const updatePassword = async () => {

    const updateData = {
      currentPassword: password.currentPassword,
      newPassword: password.newPassword,
      confirmPassword: password.confirmPassword
    };

    try {
      const response = await fetch("http://localhost:8080/Edumart-Backend/UpdateUserPassword", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        const json = await response.json();
        if (json.status) {
          console.log(json);
          toast.success("Password updated successfully!");
          // render Password section or reset fields
          setPassword(prev => ({ ...prev, currentPassword: '' }));
          setPassword(prev => ({ ...prev, newPassword: '' }));
          setPassword(prev => ({ ...prev, confirmPassword: '' }));
        } else {
          console.log(json.message);
          toast.error(json.message);
        }
      } else {
        console.log("Password update failed. Please try again");
        toast.error("Password update failed. Please try again");
      }
    } catch (error) {
      toast.error("Something wrong ! Please try again");
      console.error("Password update Error:", error);
    }
  };


  //update Password

  const renderPasswordChange = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>

      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Current Password</label>
          <div className="relative">
            <input value={password.currentPassword}
              onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })}
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">New Password</label>
          <div className="relative">
            <input value={password.newPassword}
              onChange={(e) => setPassword({ ...password, newPassword: e.target.value })}
              type={showNewPassword ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Confirm New Password</label>
          <div className="relative">
            <input value={password.confirmPassword}
              onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })}
              type={showConfirmPassword ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        <button onClick={updatePassword}
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200 flex items-center gap-2"
        >
          <Lock size={16} />
          Change Password
        </button>

      </div>
    </div>
  );

  //Log out function

  const logOutFromAccount = async () => {
    // if (confirm('Are you sure you want to logout?')) {
    try {
      const response = await fetch("http://localhost:8080/Edumart-Backend/SignOut", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const json = await response.json();
        if (json.status) {
          window.location.href = "/login";

        } else {
          console.log(json.message);
          toast.error(json.message);
        }
      } else {
        console.log("Log out failed. Please try again");
        toast.error("Log out failed. Please try again");
      }
    } catch (error) {
      toast.error("Something wrong ! Please try again" + error);
      console.error("Log out Error:", error);
    }
    // }
  };

  //confirmation

  const showLogoutConfirm = () => {
    toast(
      <ConfirmToast
        message="Are you sure you want to Log out"
        onConfirm={logOutFromAccount}
      />,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        toastId: "custom-confirm",
        style: { width: "340px" },
      }
    );
  };

  //confirmation


  //Log out function

  const renderLogOut = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button onClick={showLogoutConfirm}
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200 flex items-center gap-2 cursor-pointer"
      >
        <LogOut size={16} />
        Log Out
      </button>
    </div>
  );

  const handleMenuClick = (id: string) => {
    if (id === 'logout') {
      setActiveSection(id);
    } else {
      setActiveSection(id);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'account': return renderAccountInfo();
      case 'profile': return renderUpdateProfile();
      case 'orders': return renderOrders();
      case 'address': return renderAddresses();
      case 'password': return renderPasswordChange();
      case 'logout': return renderLogOut();
      default: return renderAccountInfo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              T
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{accountData.username}</h1>
              <p className="text-gray-600">{accountData.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuClick(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-md transition duration-200 ${activeSection === item.id
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
