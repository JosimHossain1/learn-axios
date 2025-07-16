'use client';

import axios from 'axios';
import { EyeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);

  const id = posts.length > 0 ? Number(posts[posts.length - 1].id) + 1 : 1;

  //Add a new post
  const addNewPost = async (e) => {
    e.preventDefault();
    console.log(e);
    const form = e.target.form;
    const title = form.title.value;
    const body = form.body.value;
    const newPost = {
      id,
      title,
      body,
      views: 0,
    };
    console.log(newPost);

    // Send the new post to the server
    await axios.post('http://localhost:8000/posts', newPost);
    // Clear the form fields
    form.title.value = '';
    form.body.value = '';
  };

  // Fetch posts from the server when the component mounts
  useEffect(() => {
    // Fetch posts from the server
    const fetchData = async () => {
      const datas = await axios.get('http://localhost:8000/posts');
      setPosts(datas.data);
    };

    fetchData();
  }, [posts]);

  return (
    <div className='min-h-screen bg-white text-black dark:bg-black dark:text-white'>
      <h1 className='text-2xl font-bold text-center pt-5'>
        {posts.length} Posts
      </h1>

      <div>
        <form action=''>
          <div className='max-w-2xl mx-auto p-4'>
            <input
              type='text'
              name='title'
              placeholder='Add Post Title'
              className='w-full p-2 border border-gray-300 rounded-lg mb-2 dark:bg-gray-800 dark:text-white'
            />
            <textarea
              name='body'
              placeholder='Add Post Body'
              className='w-full p-2 border border-gray-300 rounded-lg mb-2 dark:bg-gray-800 dark:text-white'
              rows='4'
            ></textarea>
            <input
              onClick={addNewPost}
              type='submit'
              value='Add Post'
              className='w-full cursor-pointer bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors'
            />
          </div>
        </form>
      </div>

      <div className='max-w-2xl mx-auto p-4'>
        {posts.map((post) => (
          <div key={post.id} className='mb-4 p-4 border rounded-lg shadow-sm'>
            <span>id : {post.id}</span>
            <h2 className='text-xl font-semibold'>{post.title}</h2>
            <p className='text-gray-700 dark:text-gray-300'>{post.body}</p>
            <div className='flex items-center mt-2'>
              <EyeIcon className='w-4 h-4 text-gray-500 mr-1' />
              <span className='text-sm text-gray-500'>{post.views} views</span>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <p className='text-center text-gray-500'>
            No posts available.
          </p>
        )}
      </div>
    </div>
  );
}
