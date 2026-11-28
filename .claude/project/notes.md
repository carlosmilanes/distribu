# Notes

## Extraction Candidates

Small pieces of logic kept inline on purpose, noted here so they aren't forgotten when a second use case shows up.

- `useAutoFocus` (`app/routes/distribus/components/distribu-creation-form.tsx`): focuses a ref'd input on mount. Generic and reusable, but only used once; move to `app/hooks` once a second caller needs it.
