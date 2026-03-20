import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
	projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
	authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Only initialize if it hasn't been already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);