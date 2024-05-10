import React, { useState } from "react";
import PostHere from "./PostHere";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <form
        action="/upload"
        method="POST"
        encType="multipart/form-data"
      >
        <PostHere />
      </form>
    </div>
  );
}

export default App;