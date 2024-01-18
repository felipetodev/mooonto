import Heading from './heading'
import CurrencyInput from 'react-currency-input-field'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { type IntlConfig } from '@/lib/types'

function StepOneForm ({ intlConfig }: { intlConfig: IntlConfig }) {
  const form = useFormContext()

  const disabledField = form.getValues('cowork') === 'no'
  const opacityStyles = (className: string) => cn(
    className,
    'transition-opacity ease-in-out',
    { 'opacity-50': disabledField }
  )

  return (
    <div className="flex flex-col">
      <Heading step={1} totalSteps={2}>
        Gastos mensuales mínimos para poder{' '}
        <span className="font-bold">trabajar</span>
      </Heading>
      <div className="space-y-8 mt-10">
        <FormField
          control={form.control}
          name="selfEmployed"
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel className='w-[330px]'>Autónomos</FormLabel>
                <div className='flex flex-col w-full'>
                  <FormControl>
                    <CurrencyInput
                      ref={field.ref}
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
                    Costo de impuestos por ser autónomo
                  </FormDescription>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consultancy"
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel className='w-[330px]'>Asesoría / Gestoría</FormLabel>
                <div className='flex flex-col w-full'>
                  <FormControl>
                    <CurrencyInput
                      ref={field.ref}
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end'
                      intlConfig={intlConfig}
                      onValueChange={(value) => {
                        field.onChange(Number(value))
                      }}
                      prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
                      placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
                    />
                  </FormControl>
                  <FormDescription className='text-inherit'>
                    Costos de contabilidad y servicios externos
                  </FormDescription>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lifecyclyEquipment"
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel className='w-[330px]'>Vida útil de tus equipos</FormLabel>
                <div className='flex flex-col w-full'>
                  <div className='grid grid-cols-2 gap-x-4'>
                    <div className='flex items-center'>
                      <FormLabel className='min-w-max'>Costo Anual</FormLabel>
                      <FormControl>
                        <CurrencyInput
                          ref={field.ref}
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
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end'
                      intlConfig={intlConfig}
                      value={form.getValues('lifecyclyEquipment') * 12 || 0}
                      prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
                      placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
                    />
                  </div>
                  <FormDescription className='text-inherit'>
                    Costo de impuestos por ser autónomo
                  </FormDescription>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subscriptions"
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel className='w-[330px]'>Suscripciones</FormLabel>
                <div className='flex flex-col w-full'>
                  <FormControl>
                    <CurrencyInput
                      ref={field.ref}
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end'
                      intlConfig={intlConfig}
                      onValueChange={(value) => {
                        field.onChange(Number(value))
                      }}
                      prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
                      placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
                    />
                  </FormControl>
                  <FormDescription className='text-inherit'>
                    Vercel, GitHub, Adobe, Shutterstock, Figma, etc.
                  </FormDescription>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cowork"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <div className='flex items-center'>
                <FormLabel className='w-[330px]'>Oficina / Cowork</FormLabel>
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
        <div className='space-y-8'>
          <FormField
            disabled={disabledField}
            control={form.control}
            name="officeRent"
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center'>
                  <FormLabel className='w-[330px]'>
                    <span className='ml-8'>Alquiler de oficina / Cowork</span>
                  </FormLabel>
                  <div className='flex flex-col w-full'>
                    <FormControl>
                      <CurrencyInput
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
          <FormField
            disabled={disabledField}
            control={form.control}
            name="officeInsurance"
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center'>
                  <FormLabel className='w-[330px]'>
                    <span className='ml-8'>Seguro oficina</span>
                  </FormLabel>
                  <div className='flex flex-col w-full'>
                    <div className='grid grid-cols-2 gap-x-4'>
                      <div className='flex items-center'>
                        <FormLabel className={opacityStyles('min-w-max')}>Costo Anual</FormLabel>
                        <FormControl>
                          <CurrencyInput
                            className='ml-4 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end'
                            intlConfig={intlConfig}
                            onValueChange={(value) => {
                              field.onChange(Number(value))
                            }}
                            prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
                            placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
                            disabled={field.disabled}
                          />
                        </FormControl>
                      </div>
                      <CurrencyInput
                        readOnly
                        className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end'
                        intlConfig={intlConfig}
                        value={(form.getValues('officeInsurance') ?? 0) * 12 || 0}
                        prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
                        placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
                        disabled={field.disabled}
                      />
                    </div>
                    <FormDescription className={opacityStyles('text-inherit')}>
                      Lorem Ipsum dolor sit amet.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />
          <FormField
            disabled={disabledField}
            control={form.control}
            name="officeBills"
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center'>
                  <FormLabel className='w-[330px]'>
                    <span className='ml-8'>Agua / luz / gas oficina</span>
                  </FormLabel>
                  <div className='flex flex-col w-full'>
                    <FormControl>
                      <CurrencyInput
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
          <FormField
            disabled={disabledField}
            control={form.control}
            name="officeInternet"
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center'>
                  <FormLabel className='w-[330px]'>
                    <span className='ml-8'>Internet / teléfono oficina</span>
                  </FormLabel>
                  <div className='flex flex-col w-full'>
                    <FormControl>
                      <CurrencyInput
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
        </div>
        <FormField
          control={form.control}
          name="gasoline"
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel className='w-[330px]'>Gasolina / diesel</FormLabel>
                <div className='flex flex-col w-full'>
                  <FormControl>
                    <CurrencyInput
                      ref={field.ref}
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end'
                      intlConfig={intlConfig}
                      onValueChange={(value) => {
                        field.onChange(Number(value))
                      }}
                      prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
                      placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
                    />
                  </FormControl>
                  <FormDescription className='text-inherit'>
                    Lorem Ipsum dolor sit amet.
                  </FormDescription>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coffee"
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel className='w-[330px]'>Café</FormLabel>
                <div className='flex flex-col w-full'>
                  <FormControl>
                    <CurrencyInput
                      ref={field.ref}
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end'
                      intlConfig={intlConfig}
                      onValueChange={(value) => {
                        field.onChange(Number(value))
                      }}
                      prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
                      placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
                    />
                  </FormControl>
                  <FormDescription className='text-inherit'>
                    Lorem Ipsum dolor sit amet.
                  </FormDescription>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="water"
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center'>
                <FormLabel className='w-[330px]'>Agua</FormLabel>
                <div className='flex flex-col w-full'>
                  <FormControl>
                    <CurrencyInput
                      ref={field.ref}
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end'
                      intlConfig={intlConfig}
                      onValueChange={(value) => {
                        field.onChange(Number(value))
                      }}
                      prefix={`${intlConfig.currency} ${intlConfig.symbol}`}
                      placeholder={`${intlConfig.currency} ${intlConfig.symbol} 0`}
                    />
                  </FormControl>
                  <FormDescription className='text-inherit'>
                    Lorem Ipsum dolor sit amet.
                  </FormDescription>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default StepOneForm
