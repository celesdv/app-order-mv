import { auth } from '$lib/firebase/firebase';
import { writable } from 'svelte/store';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { clientModel, supplierModel } from '../interfaces/general';

//AUTH
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

//ACORDION
export const activoAccordion = writable('');

export const accordionHandler = {
	set: (element: string) => {
		activoAccordion.update((value) => {
			value = element;
			return value;
		});
	}
};

//ITEM BODY
export const activeItem = writable(0);

export const itemHandler = {
	set: (element: number) => {
		activeItem.update((value) => {
			value = element;
			return value;
		});
	}
};

//SUPPLIERS
const supliers: supplierModel[] = [];

export const suppliersStore = writable(supliers);

export const suppliersHandler = {
	set: (supplier: supplierModel) => {
		suppliersStore.update((value) => {
			value.push(supplier);
			return value;
		});
	},
	update: (index:number, supplier: supplierModel) => {
		suppliersStore.update((value) => {
			value.splice(index, 1, supplier);
			return value;
		});
	},
	delete: (index:number) => {
		suppliersStore.update((value) => {
			value.splice(index, 1);
			return value;
		});
	},
	clear: () => {
		suppliersStore.update((value) => {
			value = [];
			return value;
		});
	}
};


//CLIENTS
const clients: clientModel[] =[]

export const clientStore = writable(clients)

export const clientsHandler = {
	set: (client: clientModel) => {
		clientStore.update((value) => {
			value.push(client);
			return value;
		});
	},
	update: (index:number, client: clientModel) => {
		clientStore.update((value) => {
			value.splice(index, 1, client);
			return value;
		});
	},
	delete: (index:number) => {
		clientStore.update((value) => {
			value.splice(index, 1);
			return value;
		});
	},
	clear: () => {
		clientStore.update((value) => {
			value = [];
			return value;
		});
	}
};