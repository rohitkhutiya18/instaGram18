export const buttonVariants = {
  base: `
    inline-flex
    items-center
    justify-center
    rounded-md
    font-medium
    transition-all
    duration-300
    disabled:opacity-50
    disabled:cursor-not-allowed
  `,

  variant: {
    primary: `
     bg-[#A98E87]
  text-white
  font-semibold
      hover:opacity-90
    `,

    secondary: `
      bg-[var(--surface)]
      text-[var(--text-primary)]
      border
      border-[var(--border)]
      hover:bg-[var(--surface-hover)]
    `,

    danger: `
      bg-red-500
      text-white
      hover:bg-red-600
    `,

    ghost: `
      bg-transparent
      hover:bg-[var(--surface-hover)]
    `,
  },

  size: {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-7 py-4 text-lg",
  },
};