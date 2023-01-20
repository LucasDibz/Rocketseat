import { generateDatesFromYearBeginning } from '../utils';
import { HabitDay } from './HabitDay';

const summaryDays = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 7; // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDays.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[];

export function SummaryTable() {
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  return (
    <div className='flex w-full'>
      <div className='grid grid-flow-row grid-rows-7 gap-3'>
        {days.map((day, i) => (
          <div
            key={`${day}-${i}`}
            className='flex h-10 w-10 items-center justify-center text-xl font-bold text-zinc-400'
          >
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-flow-col grid-rows-7 gap-3'>
        {summaryDays.map((date) => {
          const randomAmount = Math.floor(Math.random() * 10);
          const randomCompleted = Math.floor(randomAmount * Math.random());
          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={randomAmount}
              completed={randomCompleted}
            />
          );
        })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => (
            <div
              key={i}
              className='h-10 w-10 cursor-not-allowed rounded-lg border-2 border-zinc-800 bg-zinc-900 opacity-40'
            />
          ))}
      </div>
    </div>
  );
}
