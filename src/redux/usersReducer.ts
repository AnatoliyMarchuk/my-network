import { UserType } from './../types/types';

import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/objectHelper';

const FOLLOW = 'FOLLOW';
const UNSUBSCRIBE = 'UNSUBSCRIBE';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'TOGGLE_IS_FOLLOWING_IN_PROGRESS';

let initialState = {
	users: [] as Array<UserType>,
	pageSize: 10,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [] as Array<number>, //array users ids
};
export type InitialState = typeof initialState;

const usersReducer = (state = initialState, action): InitialState => {
	switch (action.type) {
		case FOLLOW: {
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: true }),
			};
		}
		case UNSUBSCRIBE:
			return {
				...state,
				users: updateObjectInArray(state.users, action.userId, 'id', { followed: false }),
			};
		case SET_USERS: {
			return { ...state, users: [...action.users] };
		}

		case SET_CURRENT_PAGE: {
			return {
				...state,
				currentPage: action.currentPage,
			};
		}
		case SET_TOTAL_USERS_COUNT: {
			return {
				...state,
				totalUsersCount: action.count,
			};
		}
		case TOGGLE_IS_FETCHING: {
			return {
				...state,
				isFetching: action.isFetching,
			};
		}
		case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter((id) => id !== action.userId),
			};
		}

		default:
			return state;
	}
};

type FollowType = {
	type: typeof FOLLOW;
	userId: number;
};
type UnfollowType = {
	type: typeof UNSUBSCRIBE;
	userId: number;
};
type SetUsersType = {
	type: typeof SET_USERS;
	users: Array<UserType>;
};
type SetCurrentPageType = {
	type: typeof SET_CURRENT_PAGE;
	currentPage: number;
};
type SetTotalUsersCountType = {
	type: typeof SET_TOTAL_USERS_COUNT;
	count: number;
};
type ToggleIsFetchingType = {
	type: typeof TOGGLE_IS_FETCHING;
	isFetching: boolean;
};
type ToggleFollowingProgressType = {
	type: typeof TOGGLE_IS_FOLLOWING_IN_PROGRESS;
	isFetching: boolean;
	userId: number;
};

export const follow = (userId: number): FollowType => ({ type: FOLLOW, userId });

export const unfollow = (userId: number): UnfollowType => ({ type: UNSUBSCRIBE, userId });

export const setUsers = (users: Array<UserType>): SetUsersType => ({ type: SET_USERS, users });

export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
	type: SET_CURRENT_PAGE,
	currentPage,
});

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({
	type: SET_TOTAL_USERS_COUNT,
	count: totalUsersCount,
});

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
});
export const toggleFollowingProgress = (
	isFetching: boolean,
	userId: number
): ToggleFollowingProgressType => ({
	type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
	isFetching,
	userId,
});

export const requestUsers = (page: number, pageSize: number) => {
	return async (dispatch) => {
		dispatch(toggleIsFetching(true));
		dispatch(setCurrentPage(page));

		const data = await usersAPI.getUsers(page, pageSize);
		dispatch(toggleIsFetching(false));
		dispatch(setUsers(data.items));
		dispatch(setTotalUsersCount(data.totalCount));
	};
};
const folowUnfolowFlow = async (dispatch, userId: number, apiMethod, actionCreator) => {
	dispatch(toggleFollowingProgress(true, userId));

	let data = await apiMethod(userId);
	if (data.resultCode === 0) {
		dispatch(actionCreator(userId));
	}
	dispatch(toggleFollowingProgress(false, userId));
};
export const subscribe = (userId: number) => {
	return async (dispatch) => {
		folowUnfolowFlow(dispatch, userId, usersAPI.subscribe.bind(usersAPI), follow);
	};
};

export const unsubscribe = (userId: number) => {
	return async (dispatch) => {
		folowUnfolowFlow(dispatch, userId, usersAPI.unsubscribe.bind(usersAPI), unfollow);
	};
};
export default usersReducer;
