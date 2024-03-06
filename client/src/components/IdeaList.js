import IdeasApi from '../services/IdeasApi';

export default class IdeaList {
	constructor() {
		this._ideaListEl = document.querySelector('#idea-list');
		this._ideas = [];
		this.getIdeas();

		this._validTags = new Set();
		this._validTags.add('technology');
		this._validTags.add('education');
		this._validTags.add('inventions');
		this._validTags.add('health');
		this._validTags.add('software');
		this._validTags.add('business');
	}

	addEventListeners = () => {
		this._ideaListEl.addEventListener('click', (e) => {
			// console.log(e.target);
			if (e.target.classList.contains('fa-times')) {
				e.stopImmediatePropagation();
				const ideaId = e.target.parentElement.parentElement.dataset.id;
				this.deleteIdea(ideaId);
			}
		});
	};

	getIdeas = async () => {
		try {
			const res = await IdeasApi.getIdeas();
			this._ideas = res.data.data;
			// console.log(this._ideas);
			this.render();
		} catch (err) {
			console.log(err);
		}
	};

	deleteIdea = async (id) => {
		// console.log(id);
		try {
			// delete from server
			const res = await IdeasApi.deleteIdea(id);
			//delete from dom
			this._ideas.filter((idea) => idea._id !== id);

			this.getIdeas();
		} catch (error) {
			alert('you can not delete this resource');
		}
	};

	addIdeaToList = (idea) => {
		this._ideas.push(idea);
		this.render();
	};

	getTagClass = (tag) => {
		tag = tag.toLowerCase();
		let tagClass = '';
		if (this._validTags.has(tag)) {
			tagClass = `tag-${tag}`;
		} else {
			tagClass = '';
		}

		return tagClass;
	};

	render = () => {
		this._ideaListEl.innerHTML = this._ideas
			.map((idea) => {
				const tagClass = this.getTagClass(idea.tag);
				const deleteButton =
					idea.username === localStorage.getItem('username')
						? '<button class="delete"><i class="fas fa-times"></i></button>'
						: '';
				return `<div data-id=${idea._id} class="card">
            ${deleteButton}
            <h3>
                ${idea.text}
            </h3>
            <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
            <p>
                Posted on <span class="date">${idea.date}</span> by
                <span class="author">${idea.username}</span>
            </p>
        </div>`;
			})
			.join('');
		this.addEventListeners();
	};
}
