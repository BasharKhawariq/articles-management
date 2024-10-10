import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, label, id, required, ...props }, ref) => {
  return (
    <div>
      <div className="flex flex-row gap-2">
        {label && <Label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</Label>}
        {required && <span className="text-red-500">*</span>}
      </div>
      <input
        type={type}
        id={id}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };