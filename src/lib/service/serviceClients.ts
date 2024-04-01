import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import type { clientModel } from '../../interfaces/general';
import { db } from '$lib/firebase/firebase';
import { clientsHandler } from '../../store/store';

export async function getClients() {
	clientsHandler.clear();
	const clients: clientModel[] = [];
	try {
		const q = query(collection(db, 'clients'), where('soft_delete', '==', false));

		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			const client: clientModel = {
				id: doc.data().id,
				first_name: doc.data().first_name,
				last_name: doc.data().last_name,
				phone: doc.data().phone,
				email: doc.data().email,
				address: doc.data().address,
				city: doc.data().city,
				observation: doc.data().observation,
				soft_delete: doc.data().soft_delete
			};
			clientsHandler.set(client);
			clients.push(client);
		});
	} catch (error) {
		console.log(error);
	}
	return clients;
}

export async function saveClient(data: clientModel): Promise<boolean> {
	let added: boolean = false;
	try {
		await addDoc(collection(db, 'clients'), data);
		clientsHandler.set(data);
		added = true;
	} catch (error) {
		console.log(error);
	}
	return added;
}

export async function updateClient(data: clientModel, index: number) {
	let updated: boolean = false;
	try {
		const q = query(collection(db, 'clients'), where('id', '==', data.id));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			updateDoc(doc.ref, { ...data });
		});
		clientsHandler.update(index, data);
		updated = true;
	} catch (error) {
		console.log(error);
	}
	return updated;
}

export async function softDeleteClient(data: clientModel, index: number): Promise<boolean> {
	let deleted: boolean = false;
	try {
		const q = query(collection(db, 'clients'), where('id', '==', data.id));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			updateDoc(doc.ref, { ...data });
		});
		clientsHandler.delete(index);
		deleted = true;
	} catch (error) {
		console.log(error);
	}
	return deleted;
}
