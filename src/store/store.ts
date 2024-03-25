import { auth } from '$lib/firebase/firebase';
import { writable } from 'svelte/store';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const authStore = writable({
	user: null,
	loading: true,
	data: {}
});

export const authHandlers = {
	login: async (email: string, pass: string) => {
		await signInWithEmailAndPassword(auth, email, pass);
	},
	logout: async () => {
		await signOut(auth);
	}
};

export const activoAccordion = writable('')

export const accordionHandler = {
    set: (element: string) => {
        activoAccordion.update((value) => {
            value = element
            return value
        })
    },
}