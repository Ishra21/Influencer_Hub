import React, { useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfluencers } from '../../Features/influencers/influencerSlice';
import Loader from '../../Components/Loader';
import { toast } from 'react-toastify';
import { edit, removeInfluencer } from '../../Features/admin/adminSlice';
import { useNavigate } from 'react-router-dom';



const InfluencerList = () => {


    const { influencers, isLoading, isError, message } = useSelector(state => state.influencer)
    const navigate = useNavigate(); // ✅

    const dispatch = useDispatch()

    const handleEdit = (influencer) => {
        dispatch(edit(influencer))
        navigate("/add-influencer");
    }

    const handlRemove = (id) => {
        dispatch(removeInfluencer(id)).then(() => {
            dispatch(getInfluencers());
        });
    }
    

    useEffect(() => {
        // console.log("Influencers List")
        dispatch(getInfluencers())
    }, [dispatch])


    useEffect(() => {
        if (isError && message) {
            toast.error(message, { position: "top-center" });
        }
    }, [isError, message]);
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
                                Influencer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Niche
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Followers
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Instagram
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {influencers.map((influencer) => (
                            <tr key={influencer._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={influencer.profilePic}
                                                alt={influencer.name}
                                            />
                                        </div>
                                        <div className='ml-4'>
                                            <div className="text-sm font-medium text-gray-900">{influencer.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {influencer.location}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800">
                                        {influencer.niche}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {influencer.followers}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {influencer.instagram_handle}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <button onClick={()=>handleEdit(influencer)} className="text-teal-600 hover:text-teal-900">
                                            <Edit size={18} />
                                        </button>
                                        <button onClick={()=> handlRemove(influencer._id)} className="text-red-600 hover:text-red-900">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default InfluencerList