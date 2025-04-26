import * as z from 'zod'
import { CUSTOM_FORM_ERROR as customFormError } from '@/lib/constants'

export const formSchema = z.object({
  // Step One - Base fields
  selfEmployed: z.number().positive(customFormError),
  consultancy: z.number().positive(customFormError),
  lifecyclyEquipment: z.number().positive(customFormError),
  subscriptions: z.number().positive(customFormError),
  cowork: z.boolean().default(false),
  gasoline: z.number().positive(customFormError),
  coffee: z.number().positive(customFormError),
  water: z.number().positive(customFormError),

  // Step One - Office fields (conditional on cowork)
  officeRent: z.number().positive(customFormError).optional(),
  officeInsurance: z.number().positive(customFormError).optional(),
  officeBills: z.number().positive(customFormError).optional(),
  officeInternet: z.number().positive(customFormError).optional(),

  // Step Two - Base fields
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
  childrens: z.boolean().default(false),

  // Step Two - Children fields (conditional on childrens)
  quantityChildrens: z.number().positive(customFormError)
    .max(10, 'Ingresa un número entre 1 y 10')
    .optional(),
  childrensExpenses: z.number().positive(customFormError).optional(),
  livingExpensesTwoTwo: z.number().positive(customFormError).optional(),
  carInsurance: z.number().positive(customFormError).optional(),
  taxes: z.number().positive(customFormError).optional(),
  incomeTaxRetention: z.number().positive('Ingresa un monto mayor a 0%').optional(),
  valueContribution: z.number().positive('Ingresa un monto mayor a 0%').optional(),
  unExpectedExpenses: z.number().positive('Ingresa un monto mayor a 0%').optional()
})
  .refine(
    (data) => {
      if (data.cowork) {
        return data.officeRent !== undefined &&
          data.officeInsurance !== undefined &&
          data.officeBills !== undefined &&
          data.officeInternet !== undefined
      }
      return true
    },
    {
      message: 'Deberás ingresar todos los campos relacionados a oficina/cowork',
      path: ['cowork']
    }
  )
  .refine(
    (data) => {
      if (data.childrens) {
        return data.quantityChildrens !== undefined &&
          data.childrensExpenses !== undefined &&
          data.livingExpensesTwoTwo !== undefined &&
          data.carInsurance !== undefined &&
          data.taxes !== undefined &&
          data.incomeTaxRetention !== undefined &&
          data.valueContribution !== undefined &&
          data.unExpectedExpenses !== undefined
      }
      return true
    },
    {
      message: 'Deberás ingresar todos los campos relacionados a hijos',
      path: ['childrens']
    }
  )

export type FormValues = z.infer<typeof formSchema>
