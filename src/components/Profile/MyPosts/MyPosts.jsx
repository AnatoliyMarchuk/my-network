import React from 'react';
import AddCommentsForm from './CommentForm/AddCommentsForm';
import s from './MyPosts.module.css';

import Post from './Post/Post';

export default function MyPosts(props) {
	const posts = props.posts.map((item, index) => {
		return <Post message={item.message} count={item.count} img={item.img} key={index} />;
	});

	return (
		<div className={s.posts}>
			<div>New post</div>
			{posts}
			Main content
			<AddCommentsForm addPost={props.addPost} />
		</div>
	);
}
