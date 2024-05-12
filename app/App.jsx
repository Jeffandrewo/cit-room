import React, { useState } from "react";
import PostHere from "./PostHere";
import NewsFeedItem from "./NewsFeedItem";

function App() {
  const [update, setUpdate] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Fetch news data from the server or any other data source
    // and update the news state
    // Example:
    // fetch('https://your-api-url.com/news')
    //   .then(response => response.json())
    //   .then(data => setNews(data))
    //   .catch(error => console.error('Error fetching news:', error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <form
        action="/upload"
        method="POST"
        encType="multipart/form-data"
    >
        <PostHere update={update} setUpdate={(newUpdate) => setUpdate(newUpdate)} />
      </form>
      {news.map((item) => (
        
        <NewsFeedItem key={item.id} news={item} setNews={setNews} />
      ))}
    </div>
  );
}

export default App;