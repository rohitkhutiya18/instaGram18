import type { InputHTMLAttributes } from "react"

interface inputProp extends InputHTMLAttributes<HTMLInputElement>{
 label ?:string,
 error?:string,
}

const Input = ({
    label,
    error,
    className="",
    ...props}:inputProp) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="mb-2 block text-xs uppercase tracking-[4px] text-[var(--text-primary)]">
          {label}
        </label>
      )}

      <input
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

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input