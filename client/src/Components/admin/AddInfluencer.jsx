import React, { useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createInfluencer, updateTheInfluencer } from '../../Features/admin/adminSlice';
import Loader from '../Loader';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const AddInfluencer = () => {
    const { edit, isLoading, isError, message, isSuccess } = useSelector(state => state.admin);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        instagram_handle: "",
        gender: "",
        niche: '',
        followers: '',
        rate: '',
        profilePic: '',
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // First useEffect to handle error messages
    useEffect(() => {
        if (isError && message) {
            toast.error(message, { position: "top-center" });
        }
    }, [isError, message]);

    // Second useEffect to update form data when in edit mode
    useEffect(() => {
        if (edit.isEdit && edit.influencer) {
            setFormData(edit.influencer);
        }
    }, [edit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData)
        !edit.isEdit ? dispatch(createInfluencer(formData)) : dispatch(updateTheInfluencer(formData));
        setFormData({
            name: '',
            location: '',
            niche: '',
            followers: '',
            rate: '',
            instagram_handle: "",
            gender: "",
            profilePic: "",
        });
        // navigate("/")
    };

    // Conditional rendering AFTER all hooks have been called
    if (isLoading) {
        return <Loader />;
    }
    if(isSuccess) {
        toast.success(edit.isEdit ? "Influencer updated successfully" : "Influencer added successfully", { position: "top-center", autoClose: 2000 });
        navigate("/admin/influencers");
    }

    

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1  p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Instagram</label>
                        <input
                            type="text"
                            value={formData.instagram_handle}
                            onChange={(e) => setFormData({ ...formData, instagram_handle: e.target.value })}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <input
                            type="text"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Niche</label>
                        <select
                            value={formData.niche}
                            onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            required
                        >
                            <option value="">Select a niche</option>
                            <option value="fashion">fashion</option>
                            <option value="beauty">beauty</option>
                            <option value="fitness">fitness</option>
                            <option value="sports">sports</option>
                            <option value="food">food</option>
                            <option value="technology">technology</option>
                            <option value="gaming">gaming</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Followers</label>
                        <input
                            type="text"
                            value={formData.followers}
                            onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rate </label>
                        <input
                            type="number"
                            step="0.1"
                            value={formData.rate}
                            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                        <input
                            type="url"
                            value={formData.profilePic}
                            onChange={(e) => setFormData({ ...formData, profilePic: e.target.value })}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        <Upload className="h-4 w-4 mr-2" />
                        {edit.isEdit ? "Update" : "Add"} Influencer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddInfluencer;