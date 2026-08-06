import type { ButtonHTMLAttributes } from "react";
import { buttonVariants } from "./button.style";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        ${buttonVariants.variant[variant]}
        ${buttonVariants.size[size]}
        ${buttonVariants.base}
        ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
