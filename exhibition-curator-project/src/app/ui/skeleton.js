import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800 h-96 w-72", className)}
      {...props} />)
  );
}

export { Skeleton }