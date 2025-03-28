export function getDayInSpanish(date: Date): string {
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const dayOfMonth = date.getDate();

  return `${dayOfWeek} ${dayOfMonth}`;
}
