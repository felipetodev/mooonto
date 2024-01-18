import Link from 'next/link'
import CurrencySelector from '@/components/currency-selector'
import { Logo } from '@/components/logo'

function NavBar () {
  return (
    <nav className='flex items-center justify-between bg-[#FF3B16] px-16 h-16'>
      <Link href='/'>
        <Logo className='text-[#F7F4F0]' />
      </ Link>
      <ul className='flex items-center gap-x-4'>
        <li>
          <a href='#calcula' className="text-md text-[#F7F4F0] font-semibold hover:underline">
            Calcula tu precio
          </a>
        </li>
        <li>
          <CurrencySelector />
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
