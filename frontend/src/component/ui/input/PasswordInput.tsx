import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeClosed } from "lucide-react";

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-[var(--text-primary)]">
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={`
              w-full
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              px-4
              py-3
              pr-12
              text-[var(--text-primary)]
              placeholder:text-[var(--text-secondary)]
              outline-none
              transition-all
              focus:border-[var(--color-primary)]
              focus:ring-2
              focus:ring-[var(--color-primary)]/30
              ${className}
            `}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 cursor-pointer flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
