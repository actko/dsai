"use client"

import { Button, toast } from "@dsai/ui"

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Draft saved")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.success("Project published", {
            description: "It's now visible to your team.",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Couldn't upload 2 files")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Item moved to trash", {
            action: { label: "Undo", onClick: () => toast("Restored") },
          })
        }
      >
        With action
      </Button>
    </div>
  )
}
