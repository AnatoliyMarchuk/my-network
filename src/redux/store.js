import profileReducer from './profileReducer';
import messageReducer from './messageReducer';
import sidebarReducer from './sidebarReducer';

export let store = {
	_state: {
		profilePage: {
			postsData: [
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
			],
			newPostText: '',
		},

		messagesPage: {
			usersData: [
				{
					name: 'Ivan',
					id: 1,
					img: 'https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/user/05.jpg',
				},
				{
					name: 'Marysy',
					id: 2,
					img: 'https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/user/09.jpg',
				},
				{
					name: 'Petro',
					id: 3,
					img: 'https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/user/08.jpg',
				},
				{
					name: 'Andre',
					id: 4,
					img: 'https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/user/1.jpg ',
				},
				{
					name: 'Vaslii',
					id: 5,
					img: 'https://templates.iqonic.design/socialv/bs5/html/dist/assets/images/user/07.jpg ',
				},
			],
			messageData: [
				{ id: 1, message: 'yo' },
				{ id: 2, message: 'Hello' },
				{ id: 3, message: 'How are you?' },
				{ id: 4, message: 'I am fine and you' },
				{ id: 5, message: 'It place for some message' },
			],
			newMessageText: '',
		},

		sidebar: {
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
		},
	},
	_callSubscriber() {
		console.log('state is changed!');
	},

	subscribe(observer) {
		this._callSubscriber = observer;
	},
	getState() {
		return this._state;
	},

	dispatch(action) {
		this._state.profilePage = profileReducer(this._state.profilePage, action);
		this._state.messagesPage = messageReducer(this._state.messagesPage, action);
		this._state.sidebar = sidebarReducer(this._state.sidebar, action);
		this._callSubscriber(this._state);
	},
};

window.store = store;
