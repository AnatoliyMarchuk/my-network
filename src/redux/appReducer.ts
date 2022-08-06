import { auth } from './authReducer.ts';

const SET_INITIALIALIZ_SUCCESS = 'SET_INITIALIALIZ_SUCCESS';
const SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR';
const UN_SET_GLOBAL_ERROR = 'UN_SET_GLOBAL_ERROR';

// debugger;

export type initialStateType = {
	initialize: boolean;
	globalError?: any;
};

let initialState: initialStateType = {
	initialize: false,
};
const usersReducer = (state: initialStateType = initialState, action: any): initialStateType => {
	// debugger;
	switch (action.type) {
		case SET_INITIALIALIZ_SUCCESS: {
			return { ...state, initialize: true };
		}
		case SET_GLOBAL_ERROR: {
			return { ...state, globalError: action.payload };
		}
		case UN_SET_GLOBAL_ERROR: {
			return { ...state, globalError: null };
		}

		default:
			return state;
	}
};
type InitializedSuccessActionType = {
	type: typeof SET_INITIALIALIZ_SUCCESS;
};
export const setInitializeSuccess = (): InitializedSuccessActionType => ({
	type: SET_INITIALIALIZ_SUCCESS,
});
export const setGlobalError = (payload) => ({
	type: SET_GLOBAL_ERROR,
	payload,
});
export const unSetGlobalError = () => ({
	type: UN_SET_GLOBAL_ERROR,
});

export const initialize = () => (dispatch) => {
	let promise = dispatch(auth());

	// debugger;
	Promise.all([promise]).then(() => {
		dispatch(setInitializeSuccess());
	});
};
export const globalError = (payload) => (dispatch) => {
	dispatch(setGlobalError(payload));
	setTimeout(() => {
		dispatch(unSetGlobalError());
	}, 1000);
};
export default usersReducer;
