'use client'


import React from "react";
import PostHere from "../PostHere";
import NewsFeedItem from "../NewsFeedItem";

const NewsPage = () => {
  const newsItems = [
    { id: 1, title: 'Breaking News: Lorem ipsum dolor sit amet', 
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
    imageUrl: 'https://scontent.fmnl4-3.fna.fbcdn.net/v/t39.30808-6/a434847659_828083332679256_3782075047263335210_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=muX-fJrVxDEAb6rhQ-X&_nc_ht=scontent.fmnl4-3.fna&oh=00_AfAUbVaDhpG3txU0O01Ahdx_o7wYUviwkrcYkkxzoNmWyA&oe=661D8EA9', 
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