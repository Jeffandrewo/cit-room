'use client'
import React from 'react'

const NewsFeedItem = ({ title, content }) => (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
  
  const NewsPage = () => {
    // Mock data for news items
    const newsItems = [
      { id: 1, title: 'Breaking News: Lorem ipsum dolor sit amet', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { id: 2, title: 'Another Important News: Consectetur adipiscing elit', content: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
      { id: 3, title: 'Exciting News: Ut enim ad minim veniam', content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    ];
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Newsfeed</h1>
        <div className="grid gap-4">
          {newsItems.map(news => (
            <NewsFeedItem key={news.id} title={news.title} content={news.content} />
          ))}
        </div>
      </div>
    );
  };
  
  export default NewsPage;

/*export default function news() {
    return (
      <div>
        </div>
    )
  }*/