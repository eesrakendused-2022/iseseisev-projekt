import React, { useState, useRef } from 'react';
import PostList from './components/PostList';
import './components/styles/App.css';
import PostForm from './components/PostForm';
import Calendar from './components/Calendar';

function App() {

  const [posts, setPosts] = useState([
    {id:1, title:'Teema', body:'Kirjeldus', dateToDo:'Tahtaeg'},
  ])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>    
      <PostList remove={removePost}posts={posts} title={'Ülesanded'}/>
      <Calendar/>
    </div>
    
  );
}

export default App;
