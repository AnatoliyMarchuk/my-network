import { usersAPI, profileAPI } from '../api/api';
import { PhotosType, PostsType, ProfileType } from '../types/types';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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

		case SET_STATUS: {
			return { ...state, status: action.status };
		}
		case SAVE_PHOTO_SUCCESS: {
			return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };
		}

		default:
			return state;
	}
};
type AddPostCreatorType = {
	type: typeof ADD_POST;
	post: string;
};
type SetUserProfileType = {
	type: typeof SET_USER_PROFILE;
	profile: ProfileType;
};
type SetUserStatusType = {
	type: typeof SET_STATUS;
	status: string;
};
type SavePhotoSuccessType = {
	type: typeof SAVE_PHOTO_SUCCESS;
	photos: PhotosType;
};

export let addPostCreator = (post: string): AddPostCreatorType => ({ type: ADD_POST, post });

export let setUserProfile = (profile: ProfileType): SetUserProfileType => ({
	type: SET_USER_PROFILE,
	profile,
});

export let setUserStatus = (status: string): SetUserStatusType => ({
	type: SET_STATUS,
	status,
});
export let savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({
	type: SAVE_PHOTO_SUCCESS,
	photos,
});

// THUNK
export const getUserProfile = (profileId: number) => {
	return async (dispatch: any) => {
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
export const updateUserStatus = (status: string) => {
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
export const updateProfile = (profile: ProfileType, setStatus, goToEditMode) => {
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
