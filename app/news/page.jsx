'use client'

import React, { useEffect, useState } from "react";
import PostHere from "../PostHere";
import NewsFeedItem from "../NewsFeedItem";
import axios from 'axios'

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/uploads");
        
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [update]);


  if (loading) {
    return <p>Loading News Page...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-black-500">Newsfeed</h1>
      <PostHere update={update} setUpdate={setUpdate} />
      <div className="grid gap-4">
        {posts.map(news => (
          <NewsFeedItem
            key={news.id}
            news={news}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsPage;