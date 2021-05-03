import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard: {user?.email}</h1>
    </div>
  );
}
