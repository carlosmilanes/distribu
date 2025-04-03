import { twMerge } from 'tailwind-merge';
import { useTouchDevice } from '@/hooks/useTouchDevice';

export function DatePicker({
  selectedDate = new Date(),
  onDateSelect,
  className,
}: {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  className?: string;
}) {
  const isTouchDevice = useTouchDevice();

  // Get first, last and total days of month
  const firstDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const lastDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );
  const totalDays = lastDay.getDate();

  // Adjust first day to start from Monday (1) instead of Sunday (0)
  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const styles = {
    component: twMerge('bg-primary-50 rounded-3xl p-4 shadow-lg', className),
    header: 'grid grid-cols-7 gap-1 mb-2',
    weekDay: 'text-primary-600 text-center text-sm',
    daysGrid: twMerge('grid grid-cols-7 gap-1', isTouchDevice && 'gap-2'),
    dayButton: twMerge(
      'aspect-square flex items-center justify-center rounded-full text-primary-900 hover:bg-primary-200 transition',
      isTouchDevice ? 'text-lg p-2' : 'text-sm p-1'
    ),
    selectedDay: 'ring-2 ring-primary-500 font-bold',
    emptyCell: 'aspect-square',
  };

  return (
    <div className={styles.component}>
      <div className={styles.header}>
        {weekDays.map((day) => (
          <div
            key={day}
            className={styles.weekDay}
          >
            {day}
          </div>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {[...Array(startDay)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className={styles.emptyCell}
          />
        ))}

        {[...Array(totalDays)].map((_, i) => {
          const date = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            i + 1
          );
          const isSelected =
            selectedDate?.toDateString() === date.toDateString();
          return (
            <button
              key={i}
              onClick={() => onDateSelect(date)}
              className={twMerge(
                styles.dayButton,
                isSelected && styles.selectedDay
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
