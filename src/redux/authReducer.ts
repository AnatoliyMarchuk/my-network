import { authAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';
const SET_USER_PROFILE_PHOTO = 'SET_USER_PROFILE_PHOTO';

let initialState = {
	userId: null as number | null,
	email: null as number | null,
	login: null as number | null,
	isAuth: false,
	isFetching: false,
	profilePhoto: null as number | null,
	captchaUrl: null as number | null,
};

export type initialStateType = typeof initialState;
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
type SetAuthUserDataPayloadType = {
	userId: number | null;
	email: string | null;
	login: string | null;
	isAuth: boolean;
	captchaUrl: string | null;
};

type SetUserProfilePhotoPayloadType = {
	profilePhoto: string | null;
};
// type GetCaptchaUrlSuccessPayloadType = {
// 	captchaUrl: string;
// };

type SetAuthUserDataActionType = {
	type: typeof SET_USER_DATA;
	payload: SetAuthUserDataPayloadType;
};

type SetUserProfilePhotoActionType = {
	type: typeof SET_USER_PROFILE_PHOTO;
	payload: SetUserProfilePhotoPayloadType;
};

type GetCaptchaUrlSuccessType = {
	type: typeof GET_CAPTCHA_URL_SUCCESS;
	payload: { captchaUrl: string };
};

export const setAuthUserData = (
	userId: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean,
	captchaUrl: string | null
): SetAuthUserDataActionType => ({
	type: SET_USER_DATA,
	payload: { userId, email, login, isAuth, captchaUrl },
});
export const setUserProfilePhoto = (profilePhoto: string): SetUserProfilePhotoActionType => ({
	type: SET_USER_PROFILE_PHOTO,
	payload: { profilePhoto },
});
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => ({
	type: GET_CAPTCHA_URL_SUCCESS,
	payload: { captchaUrl },
});

export const auth = () => {
	return async (dispatch: any) => {
		const response = await authAPI.me();

		if (response.resultCode === 0) {
			let { id, login, email, captchaUrl } = response.data;
			dispatch(setAuthUserData(id, email, login, true, captchaUrl));
		}
	};
};
export const userLogin = (
	setStatus: (message: string) => {},
	email: string,
	password: string,
	rememberMe: boolean,
	captcha: any
) => {
	return async (dispatch: any) => {
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
	return async (dispatch: any) => {
		const response = await authAPI.logout();
		// debugger;
		if (response.resultCode === 0) {
			dispatch(setAuthUserData(null, null, null, false, null));
		}
	};
};
export const getCaptchaUrl = () => {
	return async (dispatch: any) => {
		const response = await securityAPI.getCaptchaUrl();
		const captchaUrl = response.url;
		dispatch(getCaptchaUrlSuccess(captchaUrl));
	};
};
export default usersReducer;
