import { redirect } from '@sveltejs/kit';

/** Redirect from / to /home */
export function GET() {
	throw redirect(302, '/home');
}
