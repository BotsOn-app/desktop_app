import { pageSelector } from '$lib/functions/stores';

export const load = async () => {
	pageSelector.update((n) => 0);
	return {
		bots: [
			{
				imgUrl:
					'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg',
				name: 'CatNovember',
			},
			{
				imgUrl:
					'https://static.vecteezy.com/system/resources/previews/002/410/747/original/cute-siamese-cat-on-yellow-background-free-photo.jpg',
				name: 'Siamese',
			},
		],
		username: 'Nirbooze',
	};
};
