import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';
import type { orderModel } from '../../interfaces/general';
import { ordersHandler } from '../../store/store';

export async function getOrders() {
	ordersHandler.clear();
	try {
		const q = query(collection(db, 'orders'), where('soft_delete', '==', false));

		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			const order: orderModel = {
				id: doc.data().id,
				date: doc.data().date.toDate(),
				client: doc.data().client,
				products: doc.data().products,
				revenues: doc.data().revenues,
				ars_value: doc.data().ars_value,
				usd_value: doc.data().usd_value,
				currency: doc.data().currency,
				total_revenues: doc.data().total_revenues,
				total_payments: doc.data().total_payments,
				soft_delete: doc.data().soft_delete
			};
			ordersHandler.set(order);
		});
	} catch (error) {
		console.log(error);
	}
}

export async function saveOrder(data: orderModel): Promise<boolean> {
	let added: boolean = false;
	try {
		await addDoc(collection(db, 'orders'), data);
		// clientsHandler.set(data);
		added = true;
	} catch (error) {
		console.log(error);
	}
	return added;
}


export async function updateOrder(data: orderModel) {
	let updated: boolean = false;
	try {
		const q = query(collection(db, 'orders'), where('id', '==', data.id));		
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {			
			let up = updateDoc(doc.ref, { ...data });
		});
		updated = true;
	} catch (error) {
		console.log(error);
	}
	return updated;
}