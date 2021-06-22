import { AuthProvider } from '../contexts/AuthContext';

import '../styles/global.scss';

import '../services/firebase';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
