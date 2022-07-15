import { auth } from './authReducer';

const SET_INITIALIALIZ_SUCCESS = 'SET_INITIALIALIZ_SUCCESS';

// debugger;
let initialState = {
	initialize: false,
};
const usersReducer = (state = initialState, action) => {
	// debugger;
	switch (action.type) {
		case SET_INITIALIALIZ_SUCCESS: {
			return { ...state, initialize: true };
		}

		default:
			return state;
	}
};

export const setInitializeSuccess = () => ({
	type: SET_INITIALIALIZ_SUCCESS,
});

export const initialize = () => (dispatch) => {
	let promise = dispatch(auth());

	// debugger;
	Promise.all([promise]).then(() => {
		dispatch(setInitializeSuccess());
	});
};
export default usersReducer;
