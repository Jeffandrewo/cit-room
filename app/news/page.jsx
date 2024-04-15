'use client'
import React, { useState } from "react";

const PostHere = () => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <textarea
      placeholder="Got any news?"
      className="w-full h-12 border rounded-md p-2 mb-2"
    ></textarea>
    <div className="flex justify-between">
      <label htmlFor="image-upload" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded cursor-pointer">
        Upload Image
      </label>
      <input id="image-upload" type="file" className="hidden" />
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded">
        Post
      </button>
    </div>
  </div>
);

const NewsFeedItem = ({ id, title, content, imageUrl, profileUrl, profileName }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleEdit = () => {
    // Functionality for editing news feed item will be implemented here
    // This function doesn't do anything yet
  };

  const handleDelete = () => {
    // Functionality for deleting news feed item will be implemented here
    // This function doesn't do anything yet
  };

  const toggleExpandContent = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex relative">
      <img src={profileUrl} alt="Profile" className="h-12 w-12 rounded-full mr-4 bg-blue-500" />
      <div className="text-gray-800">
        <div>
          <h2 className="text-lg font-semibold text-blue-500">{profileName}</h2>
          <p className="text-sm text-gray-500 mb-2">1h ago</p>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        {expanded ? (
          <p className="text-gray-700 mb-2">{content}</p>
        ) : (
          <p className="text-gray-700 mb-2">{content.slice(0, 100)}</p>
        )}
        {content.length > 100 && (
          <button
            className="text-blue-500 font-semibold text-sm"
            onClick={toggleExpandContent}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
        {imageUrl && <img src={imageUrl} alt="News Image" className="w-full mb-4 rounded-lg" />}
      </div>
      {/* Setting button */}
      <div className="absolute top-2 right-2">
        <button
          onClick={handleToggleOptions}
          className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-1 px-2 rounded-full"
        >
          {/* Three dots vertically */}
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
        {/* Options */}
        {showOptions && (
          <div className="absolute top-10 right-2 bg-white shadow-md rounded-md">
            <button
              onClick={handleEdit}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
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

const NewsPage = () => {
  const newsItems = [
    { id: 1, title: 'Breaking News: Lorem ipsum dolor sit amet', 
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    imageUrl: 'https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-6/434847659_828083332679256_3782075047263335210_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muX-fJrVxDEAb6rhQ-X&_nc_ht=scontent.fmnl4-3.fna&oh=00_AfAUbVaDhpG3txU0O01Ahdx_o7wYUviwkrcYkkxzoNmWyA&oe=661D8EA9', 
    profileUrl: 'https://wallpapercave.com/wp/wp2180573.jpg', 
    profileName: 'Admin' },

    { id: 2, title: 'Another Important News: Consectetur adipiscing elit', 
    content: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua the big red dog is called bogart the big red dog and she sells seashells on the seashore and when the only.', 
    imageUrl: 'https://i.ytimg.com/vi/3hwQ-rtj9I8/maxresdefault.jpg', 
    profileUrl: 'https://www.fillmurray.com/100/100', 
    profileName: 'Admin' },

    { id: 3, title: 'Exciting News: Ut enim ad minim veniam', 
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
    imageUrl: 'https://th.bing.com/th/id/OIP.NXaaIxT_jWG3zytzBuXU0AHaLU?rs=1&pid=ImgDetMain', 
    profileUrl: 'https://www.fillmurray.com/100/100', 
    profileName: 'Admin' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-black-500">Newsfeed</h1>
      <PostHere />
      <div className="grid gap-4">
        {newsItems.map(news => (
          <NewsFeedItem
            key={news.id}
            id={news.id}
            title={news.title}
            content={news.content}
            imageUrl={news.imageUrl}
            profileUrl={news.profileUrl}
            profileName={news.profileName}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;

