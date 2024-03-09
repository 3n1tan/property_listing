// app/providers.tsx
'use client'

import {NextUIProvider, user} from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useRouter } from 'next/navigation'
import { ThemeProviderProps } from 'next-themes/dist/types'

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;

}

export function Providers({children, themeProps}: ProvidersProps) {

  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps} attribute='class' defaultTheme='dark'>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}