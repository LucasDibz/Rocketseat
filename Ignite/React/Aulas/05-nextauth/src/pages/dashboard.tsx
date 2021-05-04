import { useEffect } from 'react';

import { useAuth } from '../context/AuthContext';
import { setupApiClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Dashboard() {
  const { user } = useAuth();

  useEffect(() => {
    api
      .get('/me')
      .then((response) => console.log('useEffect Dashboard ', response));
  }, []);

  return (
    <div>
      <h1>Dashboard: {user?.email}</h1>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get('/me');

  return { props: {} };
});
