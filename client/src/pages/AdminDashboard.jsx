import React, { use, useEffect, useState } from 'react';
import { Users, UserPlus, MessageSquare, Calendar, LayoutDashboard, Menu, X } from 'lucide-react';
import InfluencerList from '../Components/admin/InfluencerList';
import AddInfluencer from '../Components/admin/AddInfluencer';
import CommentList from '../Components/admin/CommentList';
import BookingList from '../Components/admin/BookingList';
import { useDispatch, useSelector } from 'react-redux';
import UserList from '../Components/admin/UserList';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('influencers');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch()


    const navigate = useNavigate()
    const { user, isError, message, isSuccess, isLoading } = useSelector((state) => state.auth)

    // const handleLogOut = () => {
    //     dispatch(logOutUser())
    // }

    useEffect(() => {


        if (!user) {
            navigate("/")
        }

        if (user) {
            if (user.isAdmin === false) {
                navigate("/login")
            }
        }
        if (isError && message) {
            toast.error(message)
        }

    }, [user, isError, message])


    if (isLoading) {
        return <Loader />
    }

    const menuItems = [
        { id: 'influencers', label: 'Influencers', icon: Users },
        { id: 'add-influencer', label: 'Add Influencer', icon: UserPlus },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'comments', label: 'Comments', icon: MessageSquare },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'influencers':
                return <InfluencerList />;
            case 'add-influencer':
                return <AddInfluencer />;
            case 'users':
                return <UserList />;
            case 'comments':
                return <CommentList />;
            case 'bookings':
                return <BookingList />;
            default:
                return <InfluencerList />;
        }
    };

    const handleMenuClick = (id) => {
        setActiveTab(id);
        setIsSidebarOpen(false); // Close sidebar on mobile after selection
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
            >
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <LayoutDashboard className="text-teal-600" />
                            <span className="text-xl font-bold text-gray-800">Admin Panel</span>
                        </div>
                        <button
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => handleMenuClick(item.id)}
                                        className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === item.id
                                            ? 'bg-teal-50 text-teal-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    {/* <div className="pt-4 mt-4 border-t">
                        <button onClick={handleLogOut} className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    </div> */}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between px-4 py-4 lg:px-6">
                        <button
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">
                            {menuItems.find(item => item.id === activeTab)?.label}
                        </h1>
                        <div className="w-8 lg:hidden" /> {/* Spacer for centering */}
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 lg:p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;