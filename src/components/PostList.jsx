import React from 'react';
import PostItem from './postItem';

const PostList = ({posts, title, remove}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>
            {posts.map((post, index) =>
                <PostItem remove={remove} key={post.id} number = {index + 1} post={post}/>       
            )}
        </div>
    );
};

export default PostList;