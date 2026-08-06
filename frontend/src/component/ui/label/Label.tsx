import type { LabelHTMLAttributes } from "react"

interface labelProp extends LabelHTMLAttributes<HTMLLabelElement>{
    children:string,className:string;
}
const Label = ({children,className=""}:labelProp) => {
  return (
    <label className={`mb-2 block text-xs uppercase tracking-[4px] text-[var(--text-primary)] 
    ${className}`}>
        {children}</label>
  )
}

export default Label