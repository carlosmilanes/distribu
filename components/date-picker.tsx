import { useTouchDevice } from '@/hooks/useTouchDevice';
import { create, props } from 'stylex';
import { colors, borderRadius } from '../stylex/vars.stylex';

export function DatePicker({
  selectedDate = new Date(),
  onDateSelect,
  ...otherProps
}: {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
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

  return (
    <div
      {...props(DatePickerStyles.base)}
      {...otherProps}
    >
      <div {...props(DatePickerStyles.header)}>
        {weekDays.map((day) => (
          <div
            key={day}
            {...props(DatePickerStyles.weekDay)}
          >
            {day}
          </div>
        ))}
      </div>

      <div
        {...props(
          DatePickerStyles.daysGrid,
          isTouchDevice && DatePickerStyles.touchDevice
        )}
      >
        {[...Array(startDay)].map((_, i) => (
          <div
            key={`empty-${i}`}
            {...props(DatePickerStyles.emptyCell)}
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
              {...props(
                DatePickerStyles.dayButton,
                isTouchDevice && DatePickerStyles.touchDeviceButton,
                isSelected && DatePickerStyles.selectedDay
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

const DatePickerStyles = create({
  base: {
    backgroundColor: colors.gray4,
    borderRadius: borderRadius.big,
    padding: '16px',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  header: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
    marginBottom: '8px',
  },
  weekDay: {
    color: colors.gray,
    textAlign: 'center',
    fontSize: '14px',
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
  },
  touchDevice: {
    gap: '8px',
  },
  dayButton: {
    aspectRatio: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
    color: colors.text,
    fontSize: '14px',
    padding: '4px',
    transitionProperty: 'background-color',
    transitionDuration: '200ms',
    transitionTimingFunction: 'ease-in-out',
    ':hover': {
      backgroundColor: colors.gray3,
    },
  },
  touchDeviceButton: {
    fontSize: '18px',
    padding: '8px',
  },
  selectedDay: {
    outline: `2px solid ${colors.gray}`,
    fontWeight: 'bold',
  },
  emptyCell: {
    aspectRatio: '1',
  },
});
