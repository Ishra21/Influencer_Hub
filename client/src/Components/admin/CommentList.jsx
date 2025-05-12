import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCommentsForAdmin, replyToCommentByAdmin } from '../../Features/admin/adminSlice';
import Loader from '../../Components/Loader';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentList = () => {
    const { comments, isLoading, isError, message } = useSelector(state => state.admin);
    const dispatch = useDispatch();

    const [activeReplyId, setActiveReplyId] = useState('');
    const [replyText, setReplyText] = useState('');

    useEffect(() => {
        dispatch(getAllCommentsForAdmin());
        if (isError && message) {
            toast.error(message, { position: 'top-center' });
        }
    }, [dispatch, isError, message]);

    const handleReplySubmit = (bid) => {
        // console.log({ text: replyText, bid });
        dispatch(replyToCommentByAdmin({ text: replyText, bid }));
        setReplyText("");
        setActiveReplyId("");
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="bg-white rounded-lg shadow">
            {/* Comments Header */}
            <div className="border-b border-gray-200 p-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Recent Comments
                </h2>
            </div>

            {/* Comments List */}
            <div className="divide-y divide-gray-200">
                {comments.map((comment) => (
                    <div key={comment._id} className="p-4">
                        {/* Comment Header */}
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                                <span className="font-medium">Comment By : {comment.user.name}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString('en-IN')}
                            </span>
                        </div>

                        {/* Comment Text */}
                        <p className="text-gray-700 mb-2">{comment.text}</p>

                        {/* Booking ID */}
                        <div className="text-sm text-gray-500 mb-2">
                            Booking Reference: {comment.booking}
                        </div>

                        {/* Reply Button */}
                        <button
                            onClick={() => setActiveReplyId(comment._id)}
                            className="text-teal-600 text-sm hover:text-blue-800"
                        >
                            Reply
                        </button>

                        {/* Reply Form */}
                        {activeReplyId === comment._id && (
                            <div className="mt-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write a reply..."
                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={() => {
                                            handleReplySubmit(comment.booking);
                                        }}
                                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentList;
