import React, { useEffect } from 'react';
import { Mail, Phone, Trash2 } from 'lucide-react';
import { getAllUsersForAdmin } from '../../Features/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';

const UserList = () => {
    const { users, isLoading, isError, message } = useSelector(state => state.admin)

    const dispatch = useDispatch()


    useEffect(() => {
        // console.log("Influencers List")
        dispatch(getAllUsersForAdmin())
        if (isError && message) {
            toast.error(message, { position: "top-center" })
        }
    }, [])

    if (isLoading) {
        return <Loader />
    }



    return (
        <div className="bg-white rounded-lg shadow">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                UserName
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Contact
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Join Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                isAdmin
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col space-y-1">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Mail size={14} className="mr-1" />
                                            {user.email}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Phone size={14} className="mr-1" />
                                            {user.phone}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isAdmin ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {user.isAdmin ? 'Admin' : 'User'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList