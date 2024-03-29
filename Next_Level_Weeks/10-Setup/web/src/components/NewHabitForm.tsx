import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { FormEvent, useState } from 'react';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export function NewHabitForm() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    setTitle('');
    setWeekDays([]);

    alert('Hábito criado com sucesso!');
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysWithRemovedOne);
      return;
    }
    const weekDaysWithAddedOne = [...weekDays, weekDay];
    setWeekDays(weekDaysWithAddedOne);
  }

  return (
    <form onSubmit={createNewHabit} className='mt-6 flex w-full flex-col '>
      <label htmlFor='title' className='font-semibold leading-tight'>
        Qual seu comprometimento?
      </label>

      <input
        type='text'
        id='title'
        placeholder='Exercícios, beber água, etc...'
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className='mt-12 rounded-lg bg-zinc-800 p-4 text-white placeholder:text-zinc-400'
      />

      <label htmlFor='' className='mt-4 font-semibold leading-tight'>
        Qual a recorrência?
      </label>

      <div className='mt-3 flex flex-col gap-2'>
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox.Root
            key={weekDay}
            className='group flex items-center gap-3'
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <div className='flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 group-data-[state=checked]:border-green-50 group-data-[state=checked]:bg-green-500'>
              <Checkbox.Indicator>
                <Check size={20} className='text-white' />
              </Checkbox.Indicator>
            </div>

            <span className='leading-tight text-white'>{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type='submit'
        className='mt-6 flex items-center justify-center gap-3 rounded-lg bg-green-600 p-4 font-semibold hover:brightness-110'
      >
        <Check size={20} weight='bold' />
        Confirmar
      </button>
    </form>
  );
}
