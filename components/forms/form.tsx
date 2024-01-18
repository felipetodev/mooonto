'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import StepOneForm from './step-one-form'
import StepTwoForm from './step-two-form'
import { Form } from '../ui/form'
import { toast } from 'sonner'
import { type FormValues, formSchema } from '@/schemas/form'
import { type IntlConfig } from '@/lib/types'

const DEFAULT_FORM_STEP_ONE = {
  selfEmployed: 0,
  consultancy: 0,
  lifecyclyEquipment: 0,
  subscriptions: 0,
  cowork: 'no',
  officeRent: 0,
  officeInsurance: 0,
  officeBills: 0,
  officeInternet: 0,
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
  childrens: 'no',
  quantityChildrens: '1',
  childrensExpenses: 0,
  livingExpensesTwoTwo: 0,
  carInsurance: 0,
  taxes: 0,
  incomeTaxRetention: 0,
  valueContribution: 0,
  unExpectedExpenses: 0
}

function MainForm ({ intlConfig }: { intlConfig: IntlConfig }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...DEFAULT_FORM_STEP_ONE,
      ...DEFAULT_FORM_STEP_TWO
    },
    mode: 'onChange'
  })

  function onSubmit (data: FormValues) {
    alert(JSON.stringify(data, null, 2))
  }

  function onError (errors: any) {
    toast.warning('Tienes campos inválidos y/o incompletos')
  }

  return (
    <div className="flex flex-col text-[#002446]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className='flex flex-col gap-y-20'>
          <StepOneForm intlConfig={intlConfig} />
          <StepTwoForm intlConfig={intlConfig} />

          <button type='submit' className='border rounded-3xl h-12 px-4 bg-lime-400 font-bold text-2xl'>
            Obtener resultado
          </button>
        </form>
      </Form>
    </div>
  )
}

export default MainForm
