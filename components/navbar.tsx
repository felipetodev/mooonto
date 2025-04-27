import Link from 'next/link'
import CurrencySelector from '@/components/currency-selector'
import { Logo } from '@/components/logo'
import HelpPopover from '@/components/help-popover'

function NavBar () {
  return (
    <nav className='bg-[#FF3B16] px-10 md:px-16'>
      <div className='flex items-center justify-between max-w-(--breakpoint-4xl) mx-auto h-16'>
        <Link href='/'>
          <Logo className='text-[#F7F4F0]' />
        </ Link>
        <ul className='flex items-center gap-x-4'>
          <li>
            <HelpPopover>
              Ayuda
            </HelpPopover>
          </li>
          <li>
            <a href='#calcula' className="text-md text-[#F7F4F0] font-semibold hover:underline">
              Calcula tu precio
            </a>
          </li>
          <li>
            <CurrencySelector />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
