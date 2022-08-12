type FriendsDataType = {
	name: string;
	age: number;
	img: string;
};

let initialState = {
	friendsData: [
		{
			name: 'Yuriy',
			age: 30,
			img: 'https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/user/05.jpg',
		},
		{
			name: 'Paul Molive',
			age: 23,
			img: 'https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/user/06.jpg',
		},
		{
			name: 'Anna Mull',
			age: 38,
			img: 'https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/user/07.jpg',
		},
	] as Array<FriendsDataType>,
};
export type InitialStateType = typeof initialState;

const sidebarReducer = (state = initialState, action: any) => {
	return state;
};
export default sidebarReducer;
