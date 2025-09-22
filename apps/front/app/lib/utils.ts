import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import type { FetchResponse } from 'openapi-fetch'

export interface ApiError {
  statusCode: number
  message: string
  error: string
}

/**
 * Retorna o erro do fetch ou null se for sucesso
 */
export function getApiError<T = ApiError>(
  res: FetchResponse<any, any, any>
): T | null {
  if ('error' in res) {
    return res.error as T
  }
  return null
}