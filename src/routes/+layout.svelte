<script lang='ts'>
	import '../app.css';
	import { auth, db } from '$lib/firebase/firebase';
	import { getDoc, doc, setDoc, type DocumentData } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { authStore } from '../store/store';

	const nonAuthRoutes = ['/'];

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user:any) => {
			const currentPath = window.location.pathname;

			if (!user && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = '/';
				return;
			}

			if (user && currentPath === '/') {
				window.location.href = '/dashboard';
				return;
			}

			if (!user) {
				return;
			}

			let dataToSetToStore: DocumentData ={};
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				console.log('Fetching User');
				const userData = docSnap.data();
				dataToSetToStore = userData;
			}

			authStore.update((curr: any) => {
				return {
					...curr,
					user,
					data: dataToSetToStore,
					loading: false
				};
			});
		});
	});

</script>

<div class="min-h-screen max-h-screen bg-gradient-to-t from-sky-950 to-neutral-100 relative flex flex-col">
	<slot />
</div>
