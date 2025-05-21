"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import * as React from "react";

import { cn } from "@/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.TooltipProvider>) {
  return (
    <TooltipPrimitive.TooltipProvider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Tooltip>) {
  return <TooltipPrimitive.Tooltip data-slot="tooltip" {...props} />;
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.TooltipTrigger>) {
  return (
    <TooltipPrimitive.TooltipTrigger data-slot="tooltip-trigger" {...props} />
  );
}

function TooltipContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.TooltipContent>) {
  return (
    <TooltipPrimitive.TooltipContent
      data-slot="tooltip-content"
      sideOffset={sideOffset}
      className={cn(
        "rounded-base border-border bg-main font-base text-main-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-(--radix-tooltip-content-transform-origin) overflow-hidden border-2 px-3 py-1.5 text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
