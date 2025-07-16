'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // This is where you can fetch data or perform side effects

    const fetchData = async () => {
      const datas = await axios.get('http://localhost:8000/posts');
      setPosts(datas.data);
    };

    fetchData();
  }, []);

  return (
    <div className='min-h-screen bg-white text-black dark:bg-black dark:text-white'>
      <h1 className='text-2xl font-bold text-center pt-5'>Posts</h1>
      <div className='max-w-2xl mx-auto p-4'>
        {posts.map((post) => (
          <div key={post.id} className='mb-4 p-4 border rounded-lg shadow-sm'>
            <h2 className='text-xl font-semibold'>{post.title}</h2>
            <p className='text-gray-700 dark:text-gray-300'>{post.body}</p>
          </div>
        ))}
        {posts.length === 0 && (
          <p className='text-center text-gray-500'>No posts available</p>
        )}
      </div>
    </div>
  );
}
