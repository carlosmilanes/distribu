import { create, props as style, type StyleXStyles } from 'stylex';

/**
 * Resources for animating this component:
 * For animating count using CSS only: https://css-tricks.com/animating-number-counters/
 * For animating count using Motion: https://examples.motion.dev/react/html-content
 * You can use this as a reference for the count animation: https://www.reactbits.dev/text-animations/count-up
 * For animating little money left using Motion: https://examples.motion.dev/react/characters-remaining
 * 
 * TODO: 
 * - Read locale and currency from Context
 * 
 * Format function you can use:
 * function formatMoney(amount: number, currency: string, locale: string) {
      if (currency === "none") {
        return amount.toFixed(2);
      }
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(amount);
    }
 */

export function Money({ amount, styling }: MoneyProps) {
  const formattedAmount = Number.isInteger(amount)
    ? amount.toString()
    : amount.toFixed(2);
  return <span {...style(styling)}>{formattedAmount}</span>;
}

type MoneyProps = {
  amount: number;
  styling?: StyleXStyles;
};
