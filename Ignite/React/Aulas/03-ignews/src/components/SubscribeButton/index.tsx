import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}
export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    if (session.activeSubscription) {
      router.push('/');
      return;
    }

    try {
      const response = await fetch('/api/subscribe', { method: 'POST' });
      const json = await response.json();

      const { sessionId } = json;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <button
      type='button'
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now!
    </button>
  );
}
