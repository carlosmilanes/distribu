import { useState } from 'react';
import { ArrowPathIcon, ClockIcon } from '@heroicons/react/24/outline';
import type { Income } from '@/backend/types';
import { DeletionHelper } from '@/frontend/global/components/deletion-helper';
import { EscapeHelper } from '@/frontend/global/components/escape-helper';
import { Switch } from '@/frontend/global/components/core/switch';
import { DatePicker } from '@/frontend/global/components/date-picker';
import { DeleteButton } from '@/frontend/global/components/buttons/delete-button';
import { getDayInSpanish } from '@/frontend/global/utils/getDayInSpanish';
import { adjustTextareaHeight } from '@/frontend/global/utils/adjustTextareaHeight';
import { create, props } from 'stylex';
import { colors, borderRadius } from '@/frontend/global/styles/vars.stylex';

export function IndividualIncome({
  income = {
    id: 0,
    amount: 0,
    source: '',
    notes: '',
    date: new Date(),
    isRecurring: false,
  },
  onUpdate,
}: {
  income?: Income;
  onUpdate: (updatedIncome: Income) => void;
}) {
  const isNew = income.id === 0;
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [sourceError, setSourceError] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState(income.amount);
  const [source, setSource] = useState(income.source);
  const [notes, setNotes] = useState(income.notes);
  const [date, setDate] = useState(income.date);
  const [recurring, setRecurring] = useState(income.isRecurring);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    setAmount(Number(value));
    onUpdate({ ...income, amount: Number(value) });
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    adjustTextareaHeight(e);
    setSourceError(!value.trim());
    setSource(value);
    onUpdate({ ...income, source: value });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    adjustTextareaHeight(e);
    setNotes(value);
    onUpdate({ ...income, notes: value });
  };

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    onUpdate({ ...income, date: newDate });
  };

  const handleRecurringChange = (newRecurring: boolean) => {
    setRecurring(newRecurring);
    onUpdate({ ...income, isRecurring: newRecurring });
  };

  return (
    <div {...props(IndividualIncomeStyles.container)}>
      <DeletionHelper fn={() => setShowDeleteOption(true)}>
        <div
          {...props(
            IndividualIncomeStyles.component,
            date > new Date() && IndividualIncomeStyles.futureDate,
            showDeleteOption && IndividualIncomeStyles.deleting
          )}
        >
          {showDatePicker && (
            <EscapeHelper fn={() => setShowDatePicker(false)}>
              <div {...props(IndividualIncomeStyles.datePickerContainer)}>
                <div {...props(IndividualIncomeStyles.switchContainer)}>
                  <Switch
                    active={recurring}
                    onChange={handleRecurringChange}
                  />
                  <div {...props(IndividualIncomeStyles.switchLabel)}>
                    Recurrente
                  </div>
                </div>
                <button
                  {...props(IndividualIncomeStyles.doneButton)}
                  onClick={() => setShowDatePicker(false)}
                >
                  Hecho
                </button>
              </div>
              <DatePicker
                selectedDate={date}
                onDateSelect={handleDateChange}
              />
              <hr {...props(IndividualIncomeStyles.divider)} />
            </EscapeHelper>
          )}
          <input
            {...props(IndividualIncomeStyles.amount)}
            autoFocus={isNew}
            placeholder='Monto'
            value={amount}
            type='text'
            inputMode='decimal'
            pattern='^\d*\.?\d{0,2}$'
            onChange={handleAmountChange}
            onBlur={(e) => {
              const value = e.target.value;
              let formattedValue = value;
              if (!value) {
                formattedValue = '0.00';
              } else if (!value.includes('.')) {
                formattedValue = value + '.00';
              } else {
                const parts = value.split('.');
                if (parts[1].length === 0) {
                  formattedValue = value + '00';
                } else if (parts[1].length === 1) {
                  formattedValue = value + '0';
                }
              }
              setAmount(Number(formattedValue));
              onUpdate({ ...income, amount: Number(formattedValue) });
            }}
          />
          <textarea
            {...props(
              IndividualIncomeStyles.source,
              sourceError && IndividualIncomeStyles.sourceError
            )}
            value={source}
            placeholder='Origen'
            rows={1}
            required
            onChange={handleSourceChange}
            onBlur={() => setSourceError(!source.trim())}
            onFocus={(e) =>
              adjustTextareaHeight({
                target: e.target,
              } as React.ChangeEvent<HTMLTextAreaElement>)
            }
          />
          {sourceError && (
            <p {...props(IndividualIncomeStyles.errorText)}>
              Especifica el origen del ingreso
            </p>
          )}
          <textarea
            {...props(IndividualIncomeStyles.notes)}
            value={notes}
            placeholder='Sin notas'
            rows={1}
            onChange={handleNotesChange}
            onFocus={(e) =>
              adjustTextareaHeight({
                target: e.target,
              } as React.ChangeEvent<HTMLTextAreaElement>)
            }
          />

          {!showDatePicker && (
            <div
              {...props(IndividualIncomeStyles.dateAndRecurrenceContainer)}
              onClick={() => setShowDatePicker(true)}
            >
              <div>
                {recurring && (
                  <ArrowPathIcon
                    {...props(IndividualIncomeStyles.recurrenceIcon)}
                  />
                )}
              </div>
              <div {...props(IndividualIncomeStyles.date)}>
                {getDayInSpanish(date)}
              </div>
            </div>
          )}
          {date > new Date() && (
            <ClockIcon {...props(IndividualIncomeStyles.clockIcon)} />
          )}
        </div>
      </DeletionHelper>

      {showDeleteOption && (
        <EscapeHelper fn={() => setShowDeleteOption(false)}>
          <DeleteButton onPress={() => {}} />
        </EscapeHelper>
      )}
    </div>
  );
}

const IndividualIncomeStyles = create({
  container: {
    position: 'relative',
    margin: '8px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    width: '95%',
    maxWidth: '384px',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: borderRadius.xl,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  },
  component: {
    backgroundColor: colors.secondaryBackground,
    color: colors.text,
    position: 'relative',
    borderRadius: borderRadius.xl,
    padding: '12px',
    transitionDuration: '300ms',
  },
  futureDate: {
    border: `2px dashed ${colors.income}`,
    color: colors.income,
  },
  deleting: {
    pointerEvents: 'none',
    transform: 'translateX(-80px)',
    borderRadius: 0,
  },
  amount: {
    fontSize: '24px',
    outline: 'none',
    backgroundColor: 'transparent',
    borderRadius: borderRadius.s,
    paddingLeft: '4px',
    paddingRight: '4px',
    width: '12ch',
    appearance: 'textfield',
    '::-webkit-outer-spin-button': {
      appearance: 'none',
    },
    '::-webkit-inner-spin-button': {
      appearance: 'none',
    },
    ':focus': {
      backgroundColor: `${colors.secondaryBackground}80`,
    },
  },
  source: {
    fontSize: '18px',
    marginTop: '4px',
    outline: 'none',
    backgroundColor: 'transparent',
    borderRadius: borderRadius.s,
    paddingLeft: '4px',
    paddingRight: '4px',
    width: '100%',
    resize: 'none',
    overflow: 'hidden',
    ':focus': {
      backgroundColor: `${colors.secondaryBackground}80`,
    },
  },
  sourceError: {
    border: `2px solid ${colors.alert}`,
  },
  notes: {
    color: colors.secondaryText,
    fontSize: '14px',
    marginTop: '4px',
    outline: 'none',
    backgroundColor: 'transparent',
    borderRadius: borderRadius.s,
    paddingLeft: '4px',
    paddingRight: '4px',
    width: '100%',
    resize: 'none',
    overflow: 'hidden',
    ':focus': {
      backgroundColor: `${colors.secondaryBackground}80`,
    },
  },
  dateAndRecurrenceContainer: {
    padding: '8px',
    borderRadius: borderRadius.xl,
    ':hover': {
      backgroundColor: colors.gray4,
    },
    ':active': {
      backgroundColor: colors.gray3,
    },
    transition: 'background-color 200ms',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '8px',
    right: '8px',
    cursor: 'pointer',
  },
  date: {
    color: colors.secondaryText,
    fontSize: '14px',
    marginLeft: 'auto',
  },
  recurrenceIcon: {
    width: '12px',
    height: '12px',
    marginRight: '4px',
    cursor: 'pointer',
  },
  clockIcon: {
    color: colors.income,
    position: 'absolute',
    bottom: '8px',
    right: '4px',
    width: '24px',
    height: '24px',
    marginRight: '4px',
  },
  errorText: {
    color: colors.alert,
    fontSize: '14px',
    marginTop: '4px',
  },
  datePickerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  switchContainer: {
    marginLeft: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  switchLabel: {
    color: colors.text,
  },
  doneButton: {
    marginRight: '20px',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '4px',
    paddingBottom: '4px',
    backgroundColor: colors.secondaryBackground,
    color: colors.text,
    borderRadius: borderRadius.full,
    ':hover': {
      backgroundColor: colors.gray4,
    },
    ':active': {
      backgroundColor: colors.gray3,
    },
    fontWeight: 'bold',
    transition: 'background-color 200ms',
  },
  divider: {
    borderColor: colors.income,
    width: '100%',
    marginBottom: '16px',
  },
});
