import React, { useState } from "react";
import Image from "next/image";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const PostHere = ({update, setUpdate}) => {
  const [image, setImage] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { user } = useUser();

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleTitleChange = (event) => {
    setPostTitle(event.target.value);
  };
  
  const handleDescriptionChange = (event) => {
    setPostDescription(event.target.value);
  };

  const uploadPost = async (downloadURL, postTitle, postMessage) => {
    const data = {
      user_id: user.id,
      photo_url: downloadURL,
      firstName: user.firstName,
      user_photo: user.imageUrl,
      postTitle,
      postMessage,
    };

    try {
      const response = await axios.post("/api/uploads", data);

      setPostTitle("");
      setPostDescription("");
      setImage(null);
      setImagePreview(null);
      
      setMessage(response.data.message);
      setUpdate(!update)
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleImageUpload = async () => {
    if (!postTitle) {
      setError("Please provide title for your post.");
      return;
    }

    if (!postDescription) {
      setError("Please provide content for your post");
      return;
    }

    if (!image) {
      setError("Please provide an image for your post");
      return;
    }
    setLoading(true);
    try {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error(error.message);
          setError("Error uploading image");
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setMessage("Post Upload Completely");
          setLoading(false);
          await uploadPost(downloadURL, postTitle, postMessage);
        }
      );
    } catch (error) {
      console.error(error.message);
      setError("Error uploading image");
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
        value={postDescription}
        onChange={handleDescriptionChange}
        placeholder="Got any news?"
        className="w-full h-12 border rounded-md p-2 mb-2"
      ></textarea>
      {imagePreview && (
        <Image
          src={imagePreview}
          width={25}
          height={25}
          alt="Selected Image"
          className="w-full h-auto mb-2"
        />
      )}
      <div className="flex justify-between items-center">
        <label
          htmlFor="image-upload"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded cursor-pointer"
        >
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
