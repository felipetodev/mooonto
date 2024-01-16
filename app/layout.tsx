import type { Metadata } from 'next'
import { fontSans, delaGothicOne } from '@/lib/fonts'
import { ThemeProvider } from '@/components/theme-provider'
import NavBar from '@/components/navbar'
import { cn } from '@/lib/utils'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mooonto',
  description: 'Mooonto es una herramienta para creativos autónomos, freelance o empleados que ayuda a calcular el valor/hora de su trabajo en base en tus propios datos y costos de vida.'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={cn(
        'font-sans min-h-screen bg-background antialiased',
        fontSans.variable,
        delaGothicOne.variable
      )}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NavBar />
          <main className='flex flex-col flex-1 min-h-[calc(100vh-64px)] text-[#F7F4F0]'>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
