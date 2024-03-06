import axios from 'axios';

class IdeasApi {
	constructor() {
		this._apiUrl = '/api/ideas'; // for deployment
	}

	getIdeas = async () => {
		return axios.get(this._apiUrl);
	};

	createIdea = (data) => {
		return axios.post(this._apiUrl, data);
	};

	updateIdea(id, data) {
		return axios.put(`${this._apiUrl}/${id}`, data);
	}

	deleteIdea(id) {
		// console.log(id);
		const username = localStorage.getItem('username')
			? localStorage.getItem('username')
			: '';
		// console.log(username);
		return axios.delete(`${this._apiUrl}/${id}`, { data: { username } });
	}
}

export default new IdeasApi();
