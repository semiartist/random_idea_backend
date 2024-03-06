export default class Modal {
	constructor() {
		this._modal = document.querySelector('#modal');
		this._modalBtn = document.querySelector('#modal-btn');
		this.addEventListeners();
	}

	addEventListeners = () => {
		this._modalBtn.addEventListener('click', this.open.bind(this));
		window.addEventListener('click', this.outsideClick.bind(this));
		document.addEventListener('closeModal', () => this.close());
	};

	open = () => {
		// console.log('clicked');
		this._modal.style.display = 'block';
	};

	close = () => {
		this._modal.style.display = 'none';
	};

	outsideClick = (e) => {
		if (e.target === modal) {
			this.close();
		}
		// console.log(e);
		// close();
	};
}
