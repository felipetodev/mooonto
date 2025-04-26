'use client'

import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { StepOneForm } from './step-one-form'
import { StepTwoForm } from './step-two-form'
import { Form } from '../ui/form'
import { toast } from 'sonner'
import { type FormValues, formSchema } from '@/schemas/form'
import { type IntlConfig } from '@/lib/types'

const DEFAULT_FORM_STEP_ONE = {
  selfEmployed: 0,
  consultancy: 0,
  lifecyclyEquipment: 0,
  subscriptions: 0,
  cowork: false,
  officeRent: undefined, // cowork conditional field
  officeInsurance: undefined, // cowork conditional field
  officeBills: undefined, // cowork conditional field
  officeInternet: undefined, // cowork conditional field
  gasoline: 0,
  coffee: 0,
  water: 0
}

const DEFAULT_FORM_STEP_TWO = {
  livingExpenses: 0,
  commonExpenses: 0,
  food: 0,
  gym: 0,
  entertainment: 0,
  clothes: 0,
  carFee: 0,
  livingExpensesTwo: 0,
  internet: 0,
  personalPhone: 0,
  healthPlan: 0,
  retirementFund: 0,
  otherExpenses: 0,
  childrens: false,
  // childrens conditional fields
  quantityChildrens: undefined,
  childrensExpenses: undefined,
  livingExpensesTwoTwo: undefined,
  carInsurance: undefined,
  taxes: undefined,
  incomeTaxRetention: undefined,
  valueContribution: undefined,
  unExpectedExpenses: undefined
}

const OFFICE_CONDITIONAL_FIELDS = [
  'officeRent',
  'officeInsurance',
  'officeBills',
  'officeInternet'
] as const

const CHILDREN_CONDITIONAL_FIELDS = [
  'quantityChildrens',
  'childrensExpenses',
  'livingExpensesTwoTwo',
  'carInsurance',
  'taxes',
  'incomeTaxRetention',
  'valueContribution',
  'unExpectedExpenses'
] as const

export function MainForm ({ intlConfig }: { intlConfig: IntlConfig }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...DEFAULT_FORM_STEP_ONE,
      ...DEFAULT_FORM_STEP_TWO
    },
    mode: 'onChange'
  })

  const watchedValues = useWatch({ control: form.control })

  function onSubmit (formData: FormValues) {
    const cleanedData: Partial<FormValues> = structuredClone(formData)

    if (!formData.cowork) {
      OFFICE_CONDITIONAL_FIELDS.forEach(field => {
        cleanedData[field as keyof FormValues] = undefined
      })
    }

    if (!formData.childrens) {
      CHILDREN_CONDITIONAL_FIELDS.forEach(field => {
        cleanedData[field as keyof FormValues] = undefined
      })
    }

    alert(JSON.stringify(cleanedData, null, 2))
  }

  function onError (errors: any) {
    toast.warning('Tienes campos inválidos y/o incompletos')
  }

  console.log('FORM VALUES :::: ', form.getValues())
  console.log('FORM ERRORS :::: ', form.formState.errors)

  const stepsSum = useMemo(() => {
    const stepOneSum = form.getValues().selfEmployed +
      form.getValues().consultancy +
      form.getValues().lifecyclyEquipment * 12 +
      form.getValues().subscriptions +
      (form.getValues().cowork ? (form.getValues().officeRent ?? 0) : 0) +
      (form.getValues().cowork ? (form.getValues().officeInsurance ?? 0) * 12 : 0) +
      (form.getValues().cowork ? (form.getValues().officeBills ?? 0) : 0) +
      (form.getValues().cowork ? (form.getValues().officeInternet ?? 0) : 0) +
      form.getValues().gasoline +
      form.getValues().coffee +
      form.getValues().water

    const stepTwoSum = form.getValues().livingExpenses +
      form.getValues().commonExpenses +
      form.getValues().food +
      form.getValues().gym +
      form.getValues().entertainment +
      form.getValues().clothes +
      form.getValues().carFee +
      (form.getValues().livingExpensesTwo ?? 0) +
      (form.getValues().internet ?? 0) +
      (form.getValues().personalPhone ?? 0) +
      (form.getValues().healthPlan ?? 0) +
      (form.getValues().retirementFund ?? 0) +
      (form.getValues().otherExpenses ?? 0) +
      (form.getValues().childrens
        ? (form.getValues().quantityChildrens ?? 0) * (form.getValues().childrensExpenses ?? 0)
        : 0) +
      (form.getValues().childrens ? (form.getValues().livingExpensesTwoTwo ?? 0) * 12 : 0) +
      (form.getValues().childrens ? (form.getValues().carInsurance ?? 0) * 12 : 0) +
      (form.getValues().childrens ? (form.getValues().taxes ?? 0) * 12 : 0) +
      (form.getValues().childrens ? (form.getValues().incomeTaxRetention ?? 0) : 0) + // %
      (form.getValues().childrens ? (form.getValues().valueContribution ?? 0) : 0) + // %
      (form.getValues().childrens ? (form.getValues().unExpectedExpenses ?? 0) : 0) // %

    return stepOneSum + stepTwoSum
  }
  , [watchedValues])

  return (
    <div className="relative flex flex-col text-[#002446]">
      <Form {...form}>
        <form id='mooonto' onSubmit={form.handleSubmit(onSubmit, onError)} className='flex flex-col gap-y-20'>
          <StepOneForm intlConfig={intlConfig} />
          <StepTwoForm intlConfig={intlConfig} />
        </form>
      </Form>
      <div className='sticky bottom-0 py-10'>
        <div className='bg-lime-400 rounded-3xl p-6 font-bold'>
          Total: {intlConfig.symbol}{stepsSum}
        </div>
      </div>
      <button form='mooonto' type='submit' className='border rounded-3xl h-12 px-4 bg-lime-400 font-bold text-2xl'>
        Obtener resultado
      </button>
    </div>
  )
}
