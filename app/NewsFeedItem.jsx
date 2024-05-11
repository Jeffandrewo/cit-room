import React, { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';

const NewsFeedItem = ({ news }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [deleted, setDeleted] = useState(false); // State to track if post is deleted
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to track delete confirmation
  const { user } = useUser();

  useEffect(() => {
    // Set the initial state of editedTitle and editedDescription when news changes
    setEditedTitle(news?.postTitle || '');
    setEditedDescription(news?.postDescription || '');
  }, [news]);

  const handleEdit = async () => {
    try {
      const postRef = doc(db, 'posts', news.id);
      await updateDoc(postRef, {
        postTitle: editedTitle,
        postDescription: editedDescription || '' // Ensure editedDescription is not undefined
      });
      console.log(`Successfully edited post with id ${news.id}`);
      setEditing(false); // Exit editing mode
    } catch (error) {
      console.error(`Error editing post: ${error.message}`);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const postRef = doc(db, "posts", id);
      await deleteDoc(postRef);
      console.log(`Successfully deleted post with id ${id}`);
      
      setShowDeleteConfirmation(false); // Hide delete confirmation modal
      setDeleted(true); // Update deleted state
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
    {!deleted && news && ( // Check if the post is not deleted and news is not null/undefined
      <>
        {editing ? (
          <div className="bg-white rounded-lg shadow-md p-6 flex relative">
            <img
              src={news?.user_photo}
              alt="Profile"
              className="h-12 w-12 rounded-full mr-4 bg-blue-500"
            />
            <div className="text-gray-800">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-lg font-bold mb-2"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="text-gray-700 mb-2"
              />
            </div>
            <div className="absolute top-2 right-2">
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 flex relative">
            <img
              src={news?.user_photo}
              alt="Profile"
              className="h-12 w-12 rounded-full mr-4 bg-blue-500"
            />
            <div className="text-gray-800">
              <div>
                <h2 className="text-lg font-semibold text-blue-500">
                  {news?.firstName}
                </h2>
                <p className="text-sm text-gray-500 mb-2">1h ago</p>
              </div>
              <h3 className="text-xl font-bold mb-2">{news?.postTitle}</h3>
              {expanded ? (
                <p className="text-gray-700 mb-2">{news?.postDescription}</p>
              ) : (
                <p className="text-gray-700 mb-2">
                  {news?.postDescription?.slice(0, 100)}
                </p>
              )}
              {news?.postDescription?.length > 100 && (
                <button
                  className="text-blue-500 font-semibold text-sm"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Show less" : "Show more"}
                </button>
              )}
               {news?.photo_url && (
          <img
            src={news?.photo_url}
            alt="News Image"
            className="w-full mb-4 rounded-lg"
          />
        )}
            </div>
            {user && (
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded-full"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteConfirmation(true)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded-full ml-2"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}

        {showDeleteConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg">
              <p>Are you sure you want to delete this post?</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded-full mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleDelete(news.id);
                    setShowDeleteConfirmation(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )}
  </>
);
};

export default NewsFeedItem;
