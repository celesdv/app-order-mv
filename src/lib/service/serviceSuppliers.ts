import { addDoc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import type { supplierModel } from '../../interfaces/general';
import { db } from '$lib/firebase/firebase';
import { suppliersHandler } from '../../store/store';

export async function getSuppliers() {
	suppliersHandler.clear();
	const sup: supplierModel[] = [];
	try {
		const q = query(collection(db, 'suppliers'), where('soft_delete', '==', false));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			const supplier: supplierModel = {
				id: doc.data().id,
				name: doc.data().name,
				soft_delete: doc.data().soft_delete
			};
			suppliersHandler.set(supplier);
			sup.push(supplier);
		});
	} catch (error) {
		console.log(error);
	}
	return sup;
}

export async function saveSupplier(data: supplierModel): Promise<boolean> {
	let added: boolean = false;
	try {
		await addDoc(collection(db, 'suppliers'), data);
		suppliersHandler.set(data);
		added = true;
	} catch (error) {
		console.log(error);
	}
	return added;
}

export async function updateSupplier(data: supplierModel, index: number) {
	let updated: boolean = false;
	try {
		const q = query(collection(db, 'suppliers'), where('id', '==', data.id));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			updateDoc(doc.ref, { ...data });
		});
		suppliersHandler.update(index, data);
		updated = true;
	} catch (error) {
		console.log(error);
	}
	return updated;
}

export async function softDeleteSupplier(data: supplierModel, index: number): Promise<boolean> {
	let deleted: boolean = false;
	try {
		const q = query(collection(db, 'suppliers'), where('id', '==', data.id));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			updateDoc(doc.ref, { ...data });
		});
		suppliersHandler.delete(index);
		deleted = true;
	} catch (error) {
		console.log(error);
	}
	return deleted;
}
