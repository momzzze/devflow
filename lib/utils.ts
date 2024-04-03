import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diff = (now.getTime() - createdAt.getTime()) / 1000;

  if (diff < 0) {
    console.warn("The provided date is in the future.");
    return "in the future";
  }

  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);
  const months = Math.floor(diff / (86400 * 30));
  const years = Math.floor(diff / (86400 * 365));

  if (diff < 60) {
    return "just now";
  } else if (minutes < 2) {
    return "a minute ago";
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 2) {
    return "an hour ago";
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 2) {
    return "yesterday";
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 2) {
    return "a month ago";
  } else if (months < 12) {
    return `${months} months ago`;
  } else if (years < 2) {
    return "a year ago";
  } else {
    return `${years} years ago`;
  }
};


export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};