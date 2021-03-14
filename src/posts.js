import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

const Posts = () => {
  const [formData, setFormData] = useState([]);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await axios
      .get(baseUrl)
      .catch((err) => setPosts('Error loading beacaue ', err));

    if (response && response.data) {
      setPosts(response.data.slice(0, 5));
    }
  };

  const formPreventDefault = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const addPost = async () => {
    formData.id = getRandomInt(6, 100);
    // formData.id = posts.length + 1;

    const response = await axios
      .post(baseUrl, formData)
      .catch((err) => console.log('Error: Unable To Post because ', err));
    // console.log(formData);

    if (response) setPosts([formData, ...posts]);

    setFormData({});
  };

  const deletePost = async (id) => {
    const response = await axios
      .delete(`${baseUrl}/${id}`)
      .catch((err) =>
        console.log('Error: Unable To Delete Post because ', err)
      );

    if (response) {
      let newPost = posts.filter((post) => post.id !== id);
      setPosts(newPost);
    }
  };

  const onEditPost = (id) => {
    const newArr = posts.filter((post) => post.id === id);
    const obj = newArr[0];
    if (obj !== undefined) {
      setFormData({ title: obj.title, body: obj.body, id: id });
      // console.log({ title: obj.title, body: obj.body, id: id });
    }
  };

  const updatePost = async (id) => {
    if (id === undefined) {
      alert('select a data to update');
    } else {
      const response = await axios
        .put(`${baseUrl}/${id}`)
        .catch((err) =>
          console.log('Error: Unable To Update Post because ', err)
        );

      if (response) {
        let updatedPosts = posts.filter((post) => post.id !== id);
        // console.log(updatedPosts);
        const updatedPost = [formData, ...updatedPosts];
        setPosts(updatedPost);
      }

      setFormData({});
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <React.Fragment>
      <h1 style={{ textTransform: 'uppercase', textAlign: 'center' }}>
        Blog Post
      </h1>
      <form onSubmit={formPreventDefault}>
        <input
          id='title'
          name='title'
          placeholder='Title'
          onChange={handleChange.bind(this)}
          value={formData.title ? formData.title : ''}
        />
        <input
          id='body'
          name='body'
          placeholder='Body'
          onChange={handleChange.bind(this)}
          value={formData.body ? formData.body : ''}
        />
        <button
          type='submit'
          style={{ marginLeft: '85px' }}
          onClick={() => addPost()}
        >
          Add
        </button>
        <button onClick={() => updatePost(formData.id)}>Update</button>
      </form>
      <ul className='posts'>
        {posts.map((post) => {
          const { id, title, body } = post;
          return (
            <li key={id}>
              <div>
                <div className='group'>
                  <h4>{title}</h4>
                  <div className='group1'>
                    <button onClick={() => onEditPost(id)}>update</button>
                    <button onClick={() => deletePost(id)}>remove</button>
                  </div>
                </div>
                <p>{body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default Posts;
