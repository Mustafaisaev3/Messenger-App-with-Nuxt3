import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { camelize, getCurrentInstance, toHandlerKey } from 'vue'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime (time: number) {
  if (isNaN(time)) return "00:00"

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

export const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} bytes`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};

export const getFileIconName = (fileName: string) => {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf':
      return 'mdi:file-pdf';
    case 'doc':
    case 'docx':
      return 'mdi:file-word';
    case 'xls':
    case 'xlsx':
      return 'mdi:file-excel';
    case 'ppt':
    case 'pptx':
      return 'mdi:file-powerpoint';
    case 'txt':
      return 'mdi:file-document';
    default:
      return 'mdi:file-outline';
  }
};