import { useEffect, useState } from "react";
import "./style.css";

function PostList({ posts }) {
  if (posts.length === 0) return <p className="empty-state">No data found from the API.</p>;

  return (
    <ul className="item-list">
      {posts.map((post) => (
        <li className="item-row" key={post.id}>
          <h3 className="item-title">{post.title}</h3>
          <p className="item-description">{post.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Ex3() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=8");
      if (!response.ok) throw new Error("Failed to fetch data from API.");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong while fetching.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="page">
      <section className="form-card">
        <div className="form-header">
          <p className="badge">Exercise 3</p>
          <h1>API Data Viewer</h1>
          <p className="subtitle">Fetching posts using useEffect and displaying them</p>
        </div>
        <button className="refresh-btn" onClick={fetchPosts} disabled={isLoading}>
          {isLoading ? "Refreshing..." : "Refresh Data"}
        </button>
        {isLoading && <p className="loading-text">Loading data...</p>}
        {!isLoading && errorMessage && <p className="error-text">{errorMessage}</p>}
        {!isLoading && !errorMessage && <PostList posts={posts} />}
      </section>
    </main>
  );
}

export default Ex3;

