"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

// Update type definitions
interface AccordionCustomProps {
  children?: React.ReactNode;
  className?: string;
}

// Add type definitions for child props
interface AccordionChildProps {
  value?: string;
  isActive?: boolean;
  children?: React.ReactNode;
}

// Update TimedAccordionProps
interface TimedAccordionProps extends AccordionCustomProps {
  interval?: number;
  onSelect?: (value: string) => void;
  value?: string;
  defaultValue?: string;
  collapsible?: boolean;
  children: React.ReactElement<AccordionChildProps> | React.ReactElement<AccordionChildProps>[];
}

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    isActive?: boolean;
    progress?: number;
  }
>(({ className, isActive, progress, ...props }, ref) => (
  <div className="relative">
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      {...props}
    />
  </div>
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const dataState = (props as { 'data-state'?: string })['data-state'];
  
  return (
    <AccordionPrimitive.Header className="flex flex-col">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "group flex items-center justify-between w-full py-4 text-left text-sm font-medium transition-all hover:text-blue-600",
          "border-b border-gray-200 dark:border-gray-700",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          dataState === "open" && "text-blue-600",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-300",
            "group-hover:text-blue-600",
            dataState === "open" && "rotate-180 text-blue-600"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    isActive?: boolean;
  }
>(({ className, children, isActive, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm",
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      "bg-gray-50/50 rounded-lg mt-2"
    )}
    {...props}
  >
    {isActive && (
      <motion.div className="h-0.5 bg-blue-100 w-full">
        <motion.div
          className="h-full bg-blue-600 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 8, ease: "linear" }}
        />
      </motion.div>
    )}
    <div className={cn("p-6", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

const TimedAccordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  TimedAccordionProps
>(({ 
  children, 
  interval = 8000,
  className,
  onSelect,
  ...props 
}, ref) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);
  const childrenArray = React.Children.toArray(children);
  
  useEffect(() => {
    if (childrenArray.length <= 1 || isUserInteracting) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex: number) => (prevIndex + 1) % childrenArray.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [childrenArray.length, interval, isUserInteracting]);

  const currentValue = React.isValidElement(childrenArray[currentIndex]) 
    ? childrenArray[currentIndex].props.value 
    : undefined;

  const handleValueChange = (value: string) => {
    const index = childrenArray.findIndex(
      (child) => React.isValidElement(child) && child.props.value === value
    );
    if (index !== -1) {
      setCurrentIndex(index);
      setIsUserInteracting(true);
      setTimeout(() => setIsUserInteracting(false), interval * 2);
    }
    onSelect?.(value);
  };

  return (
    <Accordion 
      type="single"
      collapsible 
      className={cn("space-y-2", className)}
      value={currentValue}
      onValueChange={handleValueChange}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const childProps: AccordionChildProps = {
          ...child.props,
          isActive: index === currentIndex,
        };

        return React.cloneElement(child, {
          ...childProps,
          children: React.Children.map(child.props.children, (contentChild) => {
            if (!React.isValidElement(contentChild)) return contentChild;
            return React.cloneElement(contentChild, {
              ...contentChild.props,
              isActive: index === currentIndex
            } as AccordionChildProps);
          })
        });
      })}
    </Accordion>
  );
});

TimedAccordion.displayName = "TimedAccordion";

export { Accordion, TimedAccordion, AccordionItem, AccordionTrigger, AccordionContent }
