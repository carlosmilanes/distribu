import { twMerge } from "tailwind-merge";
import { TertiaryText } from "@/general/components/TertiaryText";
import { findBasicPercentage } from "@/general/utils/findBasicPercentage";

export function UsageBar({
  part,
  total,
  color = "primary-400",
  label,
  className,
}: {
  part: string;
  total: string;
  label: string;
  color: string;
  className?: string;
}) {
  const styles = {
    component: twMerge("relative h-16 p-2", className),
    bar: `bg-${color}/80 rounded-e size-full absolute inset-0 z-10`,
    amount: "w-min mx-auto text-2xl text-primary-900/80 relative z-20",
  };

  return (
    <div className={styles.component}>
      <div
        className={styles.bar}
        style={{ width: `${findBasicPercentage(part, total)}%` }}
      ></div>
      <div className={styles.amount}>{part}</div>
      <TertiaryText className="relative z-20">
        {label} ({findBasicPercentage(part, total)}%)
      </TertiaryText>
    </div>
  );
}
