import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/Button";

export interface SubmitButtonProps extends Omit<ButtonProps, "type"> {
  loading?: boolean;
}

export const SubmitButton = React.forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ children, loading, disabled, ...props }, ref) => (
    <Button ref={ref} type="submit" loading={loading} disabled={disabled} {...props}>
      {children ?? "Submit"}
    </Button>
  ),
);
SubmitButton.displayName = "SubmitButton";
