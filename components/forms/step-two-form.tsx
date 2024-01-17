'use client'

import Heading from './heading'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import CurrencyInput from 'react-currency-input-field'
import { cn } from '@/lib/utils'
import {
  FORM_FIELDS_TWO,
  FORM_FIELDS_TWO_TWO
} from '@/lib/constants'
import { type StepTwoValues, stepTwoSchema } from '@/schemas/form'
import { type IntlConfig } from '@/lib/types'

function StepTwoForm ({ intlConfig }: { intlConfig: IntlConfig }) {
  const form = useForm<StepTwoValues>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
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
      taxes: 0
    },
    mode: 'onChange'
  })

  function onSubmit (data: StepTwoValues): void {
    console.log({ 'Form Send ✔': data })
  }

  const disabledFields = form.getValues('childrens') === 'no'
  const opacityStyles = (className: string) => cn(className, { 'opacity-50': disabledFields })

  return (
    <div className="flex flex-col text-[#002446] px-16 bg-[#f7f4f0] pb-56">
      <Heading step={2} totalSteps={2}>
        Gastos mensuales mínimos para poder{' '}
        <span className="font-bold">vivir</span>
      </Heading>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-10">
          {FORM_FIELDS_TWO.map((f) => (
            <FormField
              key={f.name}
              control={form.control}
              name={f.name as any}
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center'>
                    <FormLabel className='w-[330px]'>{f.label}</FormLabel>
                    <div className='flex flex-col w-full'>
                      <FormControl>
                        <CurrencyInput
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end'
                          intlConfig={intlConfig}
                          onValueChange={(value) => {
                            field.onChange(Number(value))
                          }}
                          prefix={intlConfig.symbol}
                          placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
                        />
                      </FormControl>
                      <FormDescription className='text-inherit'>
                        {f.description}
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          ))}
          <FormField
            control={form.control}
            name="childrens"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className='flex items-center'>
                  <FormLabel className='block w-[330px]'>Hijos o personas a tu cargo</FormLabel>
                  <div className='flex flex-col w-full'>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Si
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            No
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            disabled={disabledFields}
            control={form.control}
            name="quantityChildrens"
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center'>
                  <FormLabel className='w-[330px]'>
                    <span className='ml-8'>Cantidad</span>
                  </FormLabel>
                  <div className='flex flex-col w-full'>
                    <FormControl>
                      <Input
                        className='max-w-[150px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        type='number'
                        placeholder="0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            disabled={disabledFields}
            control={form.control}
            name="childrensExpenses"
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center'>
                  <FormLabel className='w-[330px]'>
                    <span className='ml-8 flex text-balance'>
                      Media de gastos mensuales por cada hijo o persona a tu cargo
                    </span>
                  </FormLabel>
                  <div className='flex flex-col w-full'>
                    <FormControl>
                      <CurrencyInput
                        // ref={field.ref}
                        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end'
                        intlConfig={intlConfig}
                        onValueChange={(value) => {
                          field.onChange(Number(value))
                        }}
                        prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
                        placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
                        disabled={field.disabled}
                      />
                    </FormControl>
                    <FormDescription className={opacityStyles('text-inherit')}>
                      Lorem Ipsum dolor sit amet.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />
          {FORM_FIELDS_TWO_TWO.map((f) => (
            <FormField
              disabled={disabledFields}
              key={f.name}
              control={form.control}
              name={f.name as any}
              render={({ field }) => (
                <FormItem>
                  <div className='flex items-center'>
                    <FormLabel className='w-[330px]'>{f.label}</FormLabel>
                    <div className='flex flex-col w-full'>
                      <div className='grid grid-cols-2 gap-x-4'>
                        <div className='flex items-center'>
                          <FormLabel className={opacityStyles('min-w-max')}>Costo Anual</FormLabel>
                          <FormControl>
                            <CurrencyInput
                              disabled={field.disabled}
                              className='ml-4 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end'
                              intlConfig={intlConfig}
                              onValueChange={(value) => {
                                field.onChange(Number(value))
                              }}
                              prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
                              placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
                            />
                          </FormControl>
                        </div>
                        <CurrencyInput
                          readOnly
                          disabled={field.disabled}
                          className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end'
                          intlConfig={intlConfig}
                          value={form.getValues(f.name as any) * 12 || 0}
                          prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
                          placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
                        />
                      </div>
                      <FormDescription className={opacityStyles('text-inherit')}>
                        {f.description}
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          ))}
          <button className='border rounded-3xl h-10 px-4 bg-lime-400 font-bold'>
            Submit 2
          </button>
        </form>
      </Form>
    </div>
  )
}

export default StepTwoForm
