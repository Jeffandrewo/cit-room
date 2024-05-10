import React, { useState } from "react";
import axios from "axios";

const PostHere = () => {
  const [imageFile, setImageFile] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handleImageUpload = async () => {
    if (!imageFile || !postTitle) {
      setError("Please provide an image and content for your post");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("title", postTitle);

      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data.message);
      setLoading(false);
    } catch (error) {
      setError('Error uploading image');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <input
        type="text"
        placeholder="Enter post title..."
        value={postTitle}
        onChange={handleTitleChange}
        className="w-full h-12 border rounded-md p-2 mb-2"
      />
      <textarea
        placeholder="Got any news?"
        className="w-full h-12 border rounded-md p-2 mb-2"
      ></textarea>
      <div className="flex justify-between">
        <label htmlFor="image-upload" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded cursor-pointer">
          Upload Image
        </label>
        <input
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          className="hidden"
        />
        <button
          onClick={handleImageUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
    </div>
  );
};

export default PostHere;
