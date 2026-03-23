import { redirect } from 'next/navigation';

// Old /admin login page is no longer used.
// The auth flow now lives at /login → /login/voter or /login/admin-type.
export default function AdminPageRedirect() {
  redirect('/login');
}
