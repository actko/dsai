"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import styles from "./Tabs.module.css"

type TabsProps = TabsPrimitive.Root.Props
type TabsTriggerProps = TabsPrimitive.Tab.Props
type TabsContentProps = TabsPrimitive.Panel.Props

function Tabs({ className, orientation = "horizontal", ...props }: TabsProps) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(styles.root, className)}
      {...props}
    />
  )
}

const tabsListVariants = cva(styles.list, {
  variants: {
    variant: {
      default: styles.listDefault,
      line: styles.listLine,
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type TabsListProps = TabsPrimitive.List.Props &
  VariantProps<typeof tabsListVariants>

function TabsList({ className, variant = "default", ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(styles.trigger, className)}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(styles.content, className)}
      {...props}
    />
  )
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
}
