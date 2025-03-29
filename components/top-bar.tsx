import { twMerge } from 'tailwind-merge';
import { PrimaryText } from './PrimaryText';

export function TopBar({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  /*
  A top navigation bar component that displays a title and optional elements.
  Any child components passed will be rendered as options in the top right corner of the bar.
   */
  return (
    <div
      className={twMerge(
        'border-gray4/50 bg-background/60 flex h-12 w-full items-center justify-between rounded-t-3xl border border-x-0 border-t-0 px-4 backdrop-blur-xl',
        className
      )}
    >
      <PrimaryText className='text-3xl'>{title}</PrimaryText>
      <div className='flex items-center gap-2'>{children}</div>
    </div>
  );
}
