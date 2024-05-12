"use client";
import React, { useState } from "react";
import { db } from "@/firebase";
import { doc, deleteDoc} from "firebase/firestore";
import { useUser } from "@clerk/nextjs";


const NewsFeedItem = ({ news }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [deleted, setDeleted] = useState(false); // State to track if post is deleted
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to track delete confirmation
  const { user } = useUser();
  

  

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
  


  

  const shouldRenderPost = news && news.id !== null; 

  return (
    <>
      {shouldRenderPost && !deleted &&  (
        <div className={`bg-white rounded-lg shadow-md p-6 flex relative`}>
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
            <p className="text-gray-700 mb-2">
              {news?.postDescription}
            </p>
            {news?.photo_url && ( // Check if post has a photo
              <img
                src={news?.photo_url}
                alt="News Image"
                className="w-full mb-4 rounded-lg"
              />
            )}
          </div>
          {user && ( // Render options only if user is logged in
            <div className="absolute top-2 right-2">
              <button
                onClick={() => setShowDeleteConfirmation(true)} // Show delete confirmation modal
                className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded-full"
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
            </div>
          )}
        </div>
      )}
      {showDeleteConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <p style={{ color: 'black' }}> Are you sure you want to delete this post?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)} // Close delete confirmation modal
                className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded-full mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(news.id)} // Delete the post
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-full"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
     
    </>
  );
};

export default NewsFeedItem;