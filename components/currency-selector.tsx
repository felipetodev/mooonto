'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { CURRENCY_SELECTOR } from '@/lib/constants'

function CurrencySelector () {
  return (
    <Select defaultValue='CLP' onValueChange={e => console.log(CURRENCY_SELECTOR.find(el => el.currency === e))}>
      <SelectTrigger className="rounded-3xl">
        <SelectValue placeholder="$ CLP" />
      </SelectTrigger>
      <SelectContent align='end'>
        <SelectGroup>
          <SelectLabel>Moneda:</SelectLabel>
          {CURRENCY_SELECTOR.map((c) => (
            <SelectItem key={c.name} value={c.currency}>
              <div className='flex space-x-2'>
                <img
                  src={`https://hatscripts.github.io/circle-flags/flags/${c.locale}.svg`}
                  width="20"
                  alt={c.name}
                />
                <span>{c.symbol} {c.currency}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default CurrencySelector
