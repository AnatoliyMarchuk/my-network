import { usersAPI, profileAPI } from '../api/api';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_UPDATE_PROFILE = 'SET_USER_UPDATE_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

type PostsType = {
	message: string;
	count: number;
	img: string;
};
type ContactsType = {
	github: string;
	vk: string;
	facebook: string;
	instagram: string;
	twitter: string;
	website: string;
	youtube: string;
	mainLink: string;
};
type ProfileType = {
	userId: number;
	lookingForAJob: boolean;
	fullName: string;
	contacts: ContactsType;
};

let initialState = {
	posts: [
		{
			message: 'Hi i am props ',
			count: 15,
			img: 'https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/user/05.jpg',
		},
		{
			message: ' So what',
			count: 50,
			img: 'https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/user/06.jpg',
		},
		{
			age: 30,
			count: 20,
			img: 'https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/user/07.jpg',
		},
	] as Array<PostsType>,
	profile: null as ProfileType | null,
	status: '',
	login: null as string | null,
};
export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
	switch (action.type) {
		case ADD_POST: {
			let newPost = {
				id: 5,
				message: action.post,
				likesCount: 0,
			};
			return {
				...state,
				posts: [...state.posts, newPost],
			};
		}

		case SET_USER_PROFILE: {
			return { ...state, profile: action.profile };
		}

		case SET_USER_UPDATE_PROFILE: {
			return { ...state, profile: action.profileData };
		}
		case SET_STATUS: {
			return { ...state, status: action.status };
		}
		case SAVE_PHOTO_SUCCESS: {
			return { ...state, profile: { ...state.profile, photos: action.photos } };
		}

		default:
			return state;
	}
};

export let addPostCreator = (post) => ({ type: ADD_POST, post });

export let setUserProfile = (profile) => ({
	type: SET_USER_PROFILE,
	profile,
});

export let setUserStatus = (status) => ({
	type: SET_STATUS,
	status,
});
export let savePhotoSuccess = (photos) => ({
	type: SAVE_PHOTO_SUCCESS,
	photos,
});
export let setUserUpdateProfile = (photos) => ({
	type: SAVE_PHOTO_SUCCESS,
	photos,
});
// THUNK
export const getUserProfile = (profileId) => {
	return async (dispatch) => {
		const data = await usersAPI.getProfile(profileId);
		dispatch(setUserProfile(data));
	};
};
export const getUserStatus = (profileId) => {
	return async (dispatch) => {
		const data = await profileAPI.getStatus(profileId);
		// debugger;
		dispatch(setUserStatus(data));
	};
};
export const updateUserStatus = (status) => {
	return async (dispatch) => {
		try {
			const data = await profileAPI.updateStatus(status);
			if (data.resultCode === 0) {
				// debugger;
				dispatch(setUserStatus(status));
			}
		} catch (error) {
			alert(error.message);
			debugger;
			console.error(error.message);
		}
	};
};
export const updateProfile = (profile, setStatus, goToEditMode) => {
	return async (dispatch, getState) => {
		const data = await profileAPI.updateProfile(profile);

		if (data.resultCode === 0) {
			const userId = getState().auth.userId;

			if (userId) {
				await dispatch(getUserProfile(userId));
				goToEditMode(false);
			}
		} else {
			let message = data.messages.length > 0 ? data.messages.join(' ') : 'Some error!';
			console.log(message);

			setStatus(message); //Function Formik
		}
	};
};
export const savePhoto = (file) => {
	return async (dispatch) => {
		const data = await profileAPI.savePhoto(file);
		if (data.resultCode === 0) {
			dispatch(savePhotoSuccess(data.data.photos));
		}
	};
};

export default profileReducer;
