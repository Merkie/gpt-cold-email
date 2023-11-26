import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

export const RecipientEmailForTestSends: Writable<string> = writable('');

if (browser) {
	const RecipientEmailForTestSendsFromLocalStorage = localStorage.getItem(
		'RecipientEmailForTestSends'
	);
	if (RecipientEmailForTestSendsFromLocalStorage) {
		RecipientEmailForTestSends.set(RecipientEmailForTestSendsFromLocalStorage);
	}
	RecipientEmailForTestSends.subscribe((value) => {
		localStorage.setItem('RecipientEmailForTestSends', value);
	});
}
