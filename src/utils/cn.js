import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import React from "react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Date validation utilities
export function isValidDate(date) {
  if (!date) return false;
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
}

export function safeFormat(date, formatStr, fallback = "Invalid date") {
  if (!isValidDate(date)) return fallback;
  try {
    return format(new Date(date), formatStr);
  } catch (error) {
    console.warn("Date formatting error:", error);
return fallback;
  }
}