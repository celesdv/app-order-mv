import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase';
import type { orderModel } from "../../interfaces/general";

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