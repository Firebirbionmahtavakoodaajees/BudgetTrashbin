import { writable } from "svelte/store";
import { db } from "./firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

export function docStore(path) {
	const ref = doc(db, path);
	const store = writable(null);

	onSnapshot(ref, (snap) => {
		store.set(snap.exists() ? snap.data() : null);
	});

	return {
		subscribe: store.subscribe,
		set: (data) => setDoc(ref, data, { merge: true })
	};
}
