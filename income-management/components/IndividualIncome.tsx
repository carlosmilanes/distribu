"use client";

import { useState } from "react";
import { ArrowPathIcon, ClockIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import { Income } from "@/data/types";
import { DeletionHelper } from "@/general/components/DeletionHelper";
import { EscapeHelper } from "@/general/components/EscapeHelper";
import { Switch } from "@/general/components/Switch";
import { DatePicker } from "@/general/components/DatePicker";
import { DeleteButton } from "@/general/components/DeleteButton";
import { getDayInSpanish } from "@/general/utils/getDayInSpanish";
import { adjustTextareaHeight } from "@/general/utils/adjustTextareaHeight";

export function IndividualIncome({
  income = {
    id: 0,
    amount: "",
    source: "",
    notes: "",
    date: new Date(),
    recurring: false,
  },
  onUpdate,
  className,
}: {
  income?: Income;
  onUpdate: (updatedIncome: Income) => void;
  className?: string;
}) {
  const isNew = income.id === 0;
  const [showDeleteOption, setShowDeleteOption] = useState(false);

  // form control
  const [sourceError, setSourceError] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [amount, setAmount] = useState(income.amount);
  const [source, setSource] = useState(income.source);
  const [notes, setNotes] = useState(income.notes);
  const [date, setDate] = useState(income.date);
  const [recurring, setRecurring] = useState(income.recurring);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove any non-numeric characters except decimal point
    value = value.replace(/[^\d.]/g, "");

    // Ensure only one decimal point
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
    }

    // Limit to 2 decimal places if decimals exist
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + "." + parts[1].substring(0, 2);
    }

    setAmount(value);
    onUpdate({ ...income, amount: value });
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
    onUpdate({ ...income, recurring: newRecurring });
  };

  const styles = {
    container: twMerge(
      "relative m-2 mx-auto flex w-[95%] max-w-96 items-center overflow-hidden rounded-3xl shadow-sm",
      date > new Date() && "border-primary-500 border-2 border-dashed",
    ),
    component: twMerge(
      "bg-primary-50 text-primary-900 relative rounded-3xl p-3 transition duration-300",
      date > new Date() && "text-primary-500",
      showDeleteOption && "pointer-events-none -translate-x-20 rounded-none",
      className,
    ),
    amount:
      "text-2xl outline-hidden bg-transparent focus:bg-primary-100/50 rounded-lg px-1 w-[12ch] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
    source:
      "text-lg mt-1 outline-hidden bg-transparent focus:bg-primary-100/50 rounded-lg px-1 w-full resize-none overflow-hidden",
    notes:
      "text-primary-600 text-sm mt-1 outline-hidden bg-transparent focus:bg-primary-100/50 rounded-lg px-1 w-full resize-none overflow-hidden",
    dateAndRecurrenceContainer:
      "p-2 rounded-full hover:bg-primary-200 active:bg-primary-300 transition flex items-center absolute top-2 right-2 cursor-pointer",
    date: "text-primary-600 text-sm ml-auto",
    recurrenceIcon: "size-3 mr-1 cursor-pointer",
    clockIcon: "text-primary-500 absolute bottom-2 right-1 size-6 mr-1",
    errorText: "text-alert-500 text-sm mt-1",
    datePickerContainer: "flex justify-between items-center mb-2",
    switchContainer: "ml-5 font-bold flex items-center space-x-2",
    switchLabel: "text-primary-900",
    doneButton:
      "mr-5 px-3 py-1 bg-primary-100 text-primary-900 rounded-full hover:bg-primary-200 active:bg-primary-300 font-bold transition",
    datePicker: "shadow-none",
    divider: "border-primary-500 w-full mb-4",
  };

  return (
    <div className={styles.container}>
      <DeletionHelper fn={() => setShowDeleteOption(true)}>
        <div className={styles.component}>
          {showDatePicker && (
            <EscapeHelper fn={() => setShowDatePicker(false)}>
              <div className={styles.datePickerContainer}>
                <div className={styles.switchContainer}>
                  <Switch active={recurring} onChange={handleRecurringChange} />
                  <div className={styles.switchLabel}>Recurrente</div>
                </div>
                <button
                  className={styles.doneButton}
                  onClick={() => setShowDatePicker(false)}
                >
                  Hecho
                </button>
              </div>
              <DatePicker
                selectedDate={date}
                onDateSelect={handleDateChange}
                className={styles.datePicker}
              />
              <hr className={styles.divider} />
            </EscapeHelper>
          )}
          <input
            className={styles.amount}
            autoFocus={isNew}
            placeholder="Monto"
            value={amount}
            type="text"
            inputMode="decimal"
            pattern="^\d*\.?\d{0,2}$"
            onChange={handleAmountChange}
            onBlur={(e) => {
              const value = e.target.value;
              let formattedValue = value;
              if (!value) {
                formattedValue = "0.00";
              } else if (!value.includes(".")) {
                formattedValue = value + ".00";
              } else {
                const parts = value.split(".");
                if (parts[1].length === 0) {
                  formattedValue = value + "00";
                } else if (parts[1].length === 1) {
                  formattedValue = value + "0";
                }
              }
              setAmount(formattedValue);
              onUpdate({ ...income, amount: formattedValue });
            }}
          />
          <textarea
            className={twMerge(
              styles.source,
              sourceError && "border-alert-500 border-2",
            )}
            value={source}
            placeholder="Origen"
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
            <p className={styles.errorText}>Especifica el origen del ingreso</p>
          )}
          <textarea
            className={styles.notes}
            value={notes}
            placeholder="Sin notas"
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
              className={styles.dateAndRecurrenceContainer}
              onClick={() => setShowDatePicker(true)}
            >
              <div>
                {recurring && (
                  <ArrowPathIcon className={styles.recurrenceIcon} />
                )}
              </div>
              <div className={styles.date}>{getDayInSpanish(date)}</div>
            </div>
          )}
          {date > new Date() && <ClockIcon className={styles.clockIcon} />}
        </div>
      </DeletionHelper>

      {showDeleteOption && (
        <EscapeHelper
          fn={() => setShowDeleteOption(false)}
          className="absolute right-2 shrink-0"
        >
          <DeleteButton onPress={() => {}} />
        </EscapeHelper>
      )}
    </div>
  );
}
