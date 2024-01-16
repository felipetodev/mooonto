import CurrencySelector from '@/components/currency-selector'

function NavBar () {
  return (
    <nav className='flex items-center justify-between bg-[#FF3B16] px-16 h-16'>
      <img className='fill-black' src="mooonto.svg" alt="mooonto-logo" />
      <ul className='flex items-center gap-x-4'>
        <li>
          <a href='#' className="text-md text-[#F7F4F0] font-semibold hover:underline">
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
