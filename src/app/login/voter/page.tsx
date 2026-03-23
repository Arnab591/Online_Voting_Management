import { AuthPageShell } from '@/components/auth/AuthPageShell';

export default function VoterLoginPage() {
  return <AuthPageShell mode="login" initialRole="voter" startAtForm />;
}
