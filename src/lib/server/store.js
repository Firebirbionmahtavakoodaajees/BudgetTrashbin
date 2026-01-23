// /src/lib/server/store.js
import fs from 'fs';
import path from 'path';

// File where we'll persist data
const STORE_FILE = path.resolve('store.json');

// Helper to read the JSON file
function readStore() {
	try {
		const data = fs.readFileSync(STORE_FILE, 'utf-8');
		return JSON.parse(data);
	} catch (e) {
		return {}; // return empty if file doesn't exist
	}
}

// Helper to write JSON file
function writeStore(data) {
	fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2));
}

// Get a variable
export function get(key) {
	const store = readStore();
	return store[key];
}

// Set a variable
export function set(key, value) {
	const store = readStore();
	store[key] = value;
	writeStore(store);
}

// Delete a variable
export function del(key) {
	const store = readStore();
	delete store[key];
	writeStore(store);
}

// Get all data
export function all() {
	return readStore();
}
