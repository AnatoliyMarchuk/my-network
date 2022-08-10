// import React from 'react';
import { connect } from 'react-redux';
import { addPostCreator } from '../../../redux/profileReducer.ts';
import MyPosts from './MyPosts';

// export default function MyPostsContainer() {
// 	return (
// 		<StoreContext.Consumer>
// 			{(store) => {
// 				let state = store.getState();
// 				const addPost = () => {
// 					store.dispatch(addPostCreator());
// 				};

// 				let postOnChange = (newText) => {
// 					let action = updateNewPostTextCreator(newText);
// 					store.dispatch(action);
// 				};
// 				return (
// 					<MyPosts
// 						updateNewPostText={postOnChange}
// 						addPost={addPost}
// 						posts={state.profilePage.posts}
// 						newPostText={state.profilePage.newPostText}
// 					/>
// 				);
// 			}}
// 		</StoreContext.Consumer>
// 	);
// }

let mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
	};
};

let mapDispatchToProps = (dispatch) => {
	// debugger;
	return {
		addPost: (post) => {
			dispatch(addPostCreator(post));
		},
	};
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
