"use client";
import React, { useState } from "react";
import { db } from "@/firebase";
import { doc, deleteDoc} from "firebase/firestore";

const NewsFeedItem = ({ news }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleEdit = (id) => {
    console.log(`Editing news item with id ${id}`);
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

  const toggleExpandContent = () => {
    setExpanded(!expanded);
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
        {news?.photo_url && (
          <img
            src={news?.photo_url}
            alt="News Image"
            className="w-full mb-4 rounded-lg"
          />
        )}
      </div>
      <div className="absolute top-2 right-2">
        <button
          onClick={handleToggleOptions}
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
        {showOptions && (
          <div className="absolute top-10 right-2 bg-white shadow-md rounded-md">
            <button
              onClick={handleEdit}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(news.id)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Remove post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeedItem;