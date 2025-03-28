import { twMerge } from "tailwind-merge";
import { IncomeState } from "@/data/types";
import { findBasicPercentage } from "@/general/utils/findBasicPercentage";

export function StackedBar({
  state,
  className,
}: {
  state: IncomeState;
  className?: string;
}) {
  const styles = {
    container: twMerge(
      "bg-income relative h-5 overflow-hidden rounded-full shadow-md",
      className,
    ),
    bar: "absolute inset-0 rounded-full transition-all duration-500 ease-in-out border-white border-r shadow-[4px_0_4px_rgba(0,0,0,0.1)]",
  };

  return (
    <div className={styles.container}>
      <div
        className={twMerge(styles.bar, "bg-assigned")}
        style={{
          width: `${findBasicPercentage(state.assigned, state.total)}%`,
        }}
      />
      <div
        className={twMerge(styles.bar, "bg-expense")}
        style={{
          width: `${findBasicPercentage(state.used, state.total)}%`,
        }}
      />
    </div>
  );
}
