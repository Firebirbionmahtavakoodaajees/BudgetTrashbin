import type { RequestHandler } from '@sveltejs/kit';
import * as store from '$lib/server/store.js';

export const GET: RequestHandler = ({ url }) => {
	const key = url.searchParams.get('key');
	if (key) {
		return new Response(JSON.stringify({ value: store.get(key) }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
	return new Response(JSON.stringify(store.all()), {
		headers: { 'Content-Type': 'application/json' }
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const { key, value } = await request.json();
	store.set(key, value);
	return new Response(JSON.stringify({ success: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { key } = await request.json();
	store.del(key);
	return new Response(JSON.stringify({ success: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};
