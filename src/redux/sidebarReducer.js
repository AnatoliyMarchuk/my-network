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
	],
};

const sidebarReducer = (state = initialState, action) => {
	return state;
};
export default sidebarReducer;
