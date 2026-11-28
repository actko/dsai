import * as React from "react"
import { cn } from "cn"

import styles from "./Textarea.module.css"

type TextareaProps = React.ComponentProps<"textarea">

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

export { Textarea, type TextareaProps }
