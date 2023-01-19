type ProgressBarProps = {
  progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className='mt-4 h-3 w-full rounded-xl bg-zinc-700'>
      <div
        role='progressbar'
        aria-label='habit day progress'
        aria-valuenow={progress}
        className='h-3 rounded-xl bg-violet-600'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
