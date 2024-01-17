import StepOneForm from '@/components/forms/step-one-form'
import StepTwoForm from '@/components/forms/step-two-form'
import MainHero from '@/components/main-hero'
import { cookies } from 'next/headers'
import { CURRENCY_SELECTOR } from '@/lib/constants'

export default async function Home () {
  const hasCustomCurrency = cookies().get('currency')?.value
  const currency = hasCustomCurrency ? JSON.parse(hasCustomCurrency) : 'CLP'

  const intlConfig = CURRENCY_SELECTOR.find((c) => c.currency === currency)!

  return (
    <>
      <MainHero />
      <StepOneForm intlConfig={intlConfig} />
      <StepTwoForm intlConfig={intlConfig} />
    </>
  )
}
