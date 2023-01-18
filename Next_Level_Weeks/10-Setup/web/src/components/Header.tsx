import { Plus } from 'phosphor-react';
import logoImage from '../assets/logo.svg';

export function Header() {
  return (
    <header className='mx-auto flex w-full max-w-3xl items-center justify-between'>
      <img src={logoImage} alt='Habits' />

      <button
        type='button'
        className='flex items-center gap-3 rounded-lg border border-violet-500 px-6 py-4 font-semibold hover:border-violet-300'
      >
        <Plus size={20} className='text-violet-500' />
        Novo hábito
      </button>
    </header>
  );
}
