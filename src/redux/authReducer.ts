import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';
const SET_USER_PROFILE_PHOTO = 'SET_USER_PROFILE_PHOTO';

export type initialStateType = {
	userId: number | null;
	email: string | null;
	login: string | null;
	isAuth: boolean;
	isFetching: boolean;
	profilePhoto: string | null;
	captchaUrl: string | null;
};

// debugger;
let initialState: initialStateType = {
	userId: null,
	email: null,
	login: null,
	isAuth: false,
	isFetching: false,
	profilePhoto: null,
	captchaUrl: null,
};
const usersReducer = (state = initialState, action: any): initialStateType => {
	// debugger;
	switch (action.type) {
		case SET_USER_DATA: {
			return { ...state, ...action.payload };
		}
		case GET_CAPTCHA_URL_SUCCESS:
			return { ...state, captchaUrl: action.payload };
		case SET_USER_PROFILE_PHOTO: {
			return { ...state, profilePhoto: action.profilePhoto };
		}

		default:
			return state;
	}
};
type setAuthUserDataPayloadType = {
	userId: number;
	email: string;
	login: string;
	isAuth: boolean;
	captchaUrl: string;
};

type setAuthUserDataActionType = {
	type: typeof SET_USER_DATA;
	payload: setAuthUserDataPayloadType;
};

export const setAuthUserData = (
	userId: number,
	email: string,
	login: string,
	isAuth: boolean,
	captchaUrl: boolean
): setAuthUserDataActionType => ({
	type: SET_USER_DATA,
	payload: { userId, email, login, isAuth, captchaUrl },
});
export const setUserProfilePhoto = (profilePhoto) => ({
	type: SET_USER_PROFILE_PHOTO,
	profilePhoto,
});
export const getCaptchaUrlSuccess = (captchaUrl) => ({
	type: GET_CAPTCHA_URL_SUCCESS,
	payload: captchaUrl,
});

export const auth = () => {
	return async (dispatch) => {
		const response = await authAPI.me();

		if (response.resultCode === 0) {
			let { id, login, email } = response.data;
			dispatch(setAuthUserData(id, email, login, true));
		}
	};
};
export const userLogin = (setStatus, email, password, rememberMe, captcha = null) => {
	return async (dispatch) => {
		const response = await authAPI.login(email, password, rememberMe, captcha);
		// debugger;
		if (response.resultCode === 0) {
			dispatch(auth());
		} else {
			if (response.resultCode === 10) {
				dispatch(getCaptchaUrl());
			}
			let message = response.messages.length > 0 ? response.messages.join(' ') : 'Some error!';
			setStatus(message);
		}
	};
};
export const userLogout = () => {
	return async (dispatch) => {
		const response = await authAPI.logout();
		// debugger;
		if (response.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false, null));
		}
	};
};
export const getCaptchaUrl = () => {
	return async (dispatch) => {
		const response = await securityAPI.getCaptchaUrl();
		const captchaUrl = response.url;
		dispatch(getCaptchaUrlSuccess(captchaUrl));
	};
};
export default usersReducer;
