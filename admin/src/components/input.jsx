import { cn } from "../lib/utils";

export function Input({ id, ...props }) {
  return <input id={id} {...props} className={cn("input", props.className)} />;
}
