import { Inter as FontSans, Dela_Gothic_One as DelaGothicOne } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const delaGothicOne = DelaGothicOne({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dela-gothic'
})
