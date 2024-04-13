import { auth } from '$lib/firebase/firebase';
import { writable } from 'svelte/store';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { clientModel, orderModel, supplierModel } from '../interfaces/general';

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
	update: (index: number, supplier: supplierModel) => {
		suppliersStore.update((value) => {
			value.splice(index, 1, supplier);
			return value;
		});
	},
	delete: (index: number) => {
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
const clients: clientModel[] = [];

export const clientStore = writable(clients);

export const clientsHandler = {
	set: (client: clientModel) => {
		clientStore.update((value) => {
			value.push(client);
			return value;
		});
	},
	update: (index: number, client: clientModel) => {
		clientStore.update((value) => {
			value.splice(index, 1, client);
			return value;
		});
	},
	delete: (index: number) => {
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

//ORDERS
const orders: orderModel[] = [];
let order: orderModel = {
	id: '',
	date: null,
	client: null,
	ars_value: 0,
	usd_value: 0,
	currency: '',
	total_revenues: 0,
	total_payments: 0,
	products:[],
	revenues:[],
	soft_delete:false
};

export const orderStore = writable(orders);
export const activeOrderStore = writable(order);

export const ordersHandler = {
	set: (order: orderModel) => {
		orderStore.update((value) => {
			value.push(order);
			return value;
		});
	},
	update: (index: number, order: orderModel) => {
		orderStore.update((value) => {
			value.splice(index, 1, order);
			return value;
		});
	},
	delete: (index: number) => {
		orderStore.update((value) => {
			value.splice(index, 1);
			return value;
		});
	},
	clear: () => {
		orderStore.update((value) => {
			value = [];
			return value;
		});
	},
	get: (id: string) => {
		let order: orderModel[] = [];
		orderStore.update((value) => {
			order = value.filter((or) => (or.id = id));
			return value;
		});
		return order[0];
	},
	setOrder: (order: orderModel) => {
		activeOrderStore.update((value) => {
			value = order;
			return value;
		});
	},
	clearOrder: () => {
		activeOrderStore.update((value) => {
			value.id = '';
			return value;
		});
	}
};
