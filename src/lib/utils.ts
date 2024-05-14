import { monthsList } from "@/data";
import { IAlarmCurrentState } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDecimalNumber = (num: number) => {
  if (num < 10) return `0${num}`;
  return `${num}`
}

export const getComponentsFromDate = (date: Date): IAlarmCurrentState => {
  let hours = date.getHours();
  let amPm: string;
  const minutes = date.getMinutes();
  const day = date.getDate().toString();
  const month = date.getMonth();
  const year = date.getFullYear().toString();


  if (hours >= 12) {
    hours = hours - 12;
    amPm = "PM"
  } else {
    amPm = "AM"
  }

  if (hours == 0) hours = 12;

  return {
    hours: getDecimalNumber(hours),
    minutes: getDecimalNumber(minutes),
    amPm,
    day,
    month: monthsList[month],
    year
  }
}

export const addMinutesToDate = (dt: Date, min: number) : Date => {
  const d = new Date(dt).getTime();
  return new Date(d + 1000*60*min)
}
