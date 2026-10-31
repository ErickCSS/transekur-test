import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/modules/shared/utils/shared-class-names.utils"
import { Slot } from "radix-ui"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-[color,background-color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring/25 [&>svg]:pointer-events-none [&>svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        neutral: "bg-ink/5 text-muted-foreground",
        success: "bg-success-soft text-success",
        warning: "bg-accent/20 text-accent-foreground",
        destructive: "bg-destructive text-white",
        outline: "border-border text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
