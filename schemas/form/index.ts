import * as z from 'zod'
import { CUSTOM_FORM_ERROR as customFormError } from '@/lib/constants'

const stepOneSchema = z.object({
  selfEmployed: z.number().positive(customFormError),
  consultancy: z.number().positive(customFormError),
  lifecyclyEquipment: z.number().positive(customFormError),
  subscriptions: z.number().positive(customFormError),
  cowork: z.string().min(1, { message: 'Debes seleccionar una opción' }),
  officeRent: z.number().positive(customFormError).optional(),
  officeInsurance: z.number().positive(customFormError).optional(),
  officeBills: z.number().positive(customFormError).optional(),
  officeInternet: z.number().positive(customFormError).optional(),
  gasoline: z.number().positive(customFormError),
  coffee: z.number().positive(customFormError),
  water: z.number().positive(customFormError)
})

const stepTwoSchema = z.object({
  livingExpenses: z.number().positive(customFormError),
  commonExpenses: z.number().positive(customFormError),
  food: z.number().positive(customFormError),
  gym: z.number().positive(customFormError),
  entertainment: z.number().positive(customFormError),
  clothes: z.number().positive(customFormError),
  carFee: z.number().positive(customFormError),
  livingExpensesTwo: z.number().positive(customFormError),
  internet: z.number().positive(customFormError),
  personalPhone: z.number().positive(customFormError),
  healthPlan: z.number().positive(customFormError),
  retirementFund: z.number().positive(customFormError),
  otherExpenses: z.number().positive(customFormError),
  childrens: z.string().min(1, 'Debes seleccionar una opción'),
  quantityChildrens: z
    .string()
    .min(1, 'Ingresa una cantidad')
    .refine((value) => Number(value) > 0, customFormError)
    .optional(),
  childrensExpenses: z.number().positive(customFormError).optional(),
  livingExpensesTwoTwo: z.number().positive(customFormError).optional(),
  carInsurance: z.number().positive(customFormError).optional(),
  taxes: z.number().positive(customFormError).optional(),
  incomeTaxRetention: z.number().positive('Ingresa un monto mayor a 0%').optional(),
  valueContribution: z.number().positive('Ingresa un monto mayor a 0%').optional(),
  unExpectedExpenses: z.number().positive('Ingresa un monto mayor a 0%').optional()
})

export const formSchema = stepOneSchema.merge(stepTwoSchema)

export type FormValues = z.infer<typeof formSchema>
