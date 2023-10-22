function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  return process.env.NEXT_PUBLIC_LANDING_PAGE_URL!
}

export const baseUrl = getBaseUrl();
