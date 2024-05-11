import React, { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useUser } from '@clerk/nextjs';

const NewsFeedItem = ({ news }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const { user } = useUser();

  useEffect(() => {
    // Set the initial state of editedTitle and editedDescription when news changes
    setEditedTitle(news.postTitle);
    setEditedDescription(news.postDescription);
  }, [news]);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleExpandContent = () => {
    setExpanded(!expanded);
  };

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
      // Construct the reference to the document to be deleted
      const postRef = doc(db, "posts", id);
  
      // Delete the document from Firestore
      await deleteDoc(postRef);
  
      console.log(`Successfully deleted post with id ${id}`);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
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
        {editing ? (
          <>
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
          </>
        ) : (
          <>
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
                onClick={toggleExpandContent}
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            )}
          </>
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
          {editing ? (
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-full"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded-full"
            >
              Edit
            </button>
          )}
          <button
            onClick={handleToggleOptions}
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 ml-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <circle cx="10" cy="3" r="2" />
              <circle cx="10" cy="10" r="2" />
              <circle cx="10" cy="17" r="2" />
            </svg>
          </button>
          {showOptions && (
            <div className="absolute top-10 right-2 bg-white shadow-md rounded-md">
              <button
                onClick={() => handleDelete(news.id)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Remove post
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsFeedItem;
