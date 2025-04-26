import { cookies } from 'next/headers'
import { MainHero } from '@/components/main-hero'
import { MainForm } from '@/components/forms/form'
import { AdsLayout } from '@/components/ads-layout'
import { Footer } from '@/components/footer'
import { CURRENCY_COOKIE_KEY, CURRENCY_SELECTOR } from '@/lib/constants'

export default async function Home () {
  const hasCustomCurrency = cookies().get(CURRENCY_COOKIE_KEY)?.value
  const currency = hasCustomCurrency ? JSON.parse(hasCustomCurrency) : 'CLP'

  const intlConfig = CURRENCY_SELECTOR.find((c) => c.currency === currency)!

  return (
    <>
      <MainHero />
      <AdsLayout>
        <MainForm intlConfig={intlConfig} />
      </AdsLayout>
      <Footer />
    </>
  )
}
