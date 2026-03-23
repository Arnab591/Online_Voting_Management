import { AuthPageShell } from '@/components/auth/AuthPageShell';

export default function AdminLoginPage() {
  return <AuthPageShell mode="login" initialRole="admin" startAtForm />;
}
