export function twMakeImportant(className: string): string {
  if (className.split(" ").length > 1) {
    return className.split(" ").map(twMakeImportant).join(" ");
  }

  return `${className}!`;
}
