import { type ChangeEvent } from "react";

export function adjustTextareaHeight(e: ChangeEvent<HTMLTextAreaElement>) {
  e.target.style.height = "auto";
  e.target.style.height = e.target.scrollHeight + "px";
}
