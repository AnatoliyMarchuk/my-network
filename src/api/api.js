import axios from 'axios';

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		'API-KEY': '0ab2b8fd-316a-4882-9d69-3a60cf5f3ec6',
	},
});

export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => {
			return response.data;
		});
	},
	subscribe(id) {
		return instance.post(`follow/${id}`).then((response) => {
			return response.data;
		});
	},
	unsubscribe(id) {
		return instance.delete(`follow/${id}`).then((response) => {
			return response.data;
		});
	},

	getProfile(profileId) {
		console.warn('Obsolete method. Please use profileAPI object');
		return profileAPI.getProfile(profileId);
	},
};
export const profileAPI = {
	getProfile(profileId) {
		return instance.get(`profile/${profileId}`).then((response) => {
			return response.data;
		});
	},
	getStatus(profileId) {
		return instance.get(`profile/status/${profileId}`).then((response) => {
			return response.data;
		});
	},
	updateStatus(status) {
		return instance.put(`profile/status/`, { status: status }).then((response) => {
			return response.data;
		});
	},
	updateProfile(profile) {
		// debugger;
		return instance.put(`profile`, profile).then((response) => {
			return response.data;
		});
	},
	savePhoto(photoFile) {
		const formData = new FormData();
		formData.append('image', photoFile);
		return instance
			.put(`/profile/photo`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				return response.data;
			});
	},
};

export const authAPI = {
	me() {
		return instance.get(`auth/me`).then((response) => {
			return response.data;
		});
	},
	login(email, password, rememberMe, captcha = null) {
		// debugger;

		return instance
			.post(`auth/login`, { email, password, rememberMe, captcha })
			.then((response) => {
				return response.data;
			});
	},
	logout() {
		// debugger;

		return instance.delete(`auth/login`).then((response) => {
			return response.data;
		});
	},
};
export const securityAPI = {
	getCaptchaUrl() {
		return instance.get(`security/get-captcha-url`).then((response) => {
			return response.data;
		});
	},
};
