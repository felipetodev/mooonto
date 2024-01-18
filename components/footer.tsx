import Link from 'next/link'
import { Logo } from '@/components/logo'
import { InstagramIcon } from '@/components/ui/icons'

function Footer () {
  return (
    <div className="bg-[#002446] w-full px-16 pb-8 pt-24">
      <div className='flex justify-between'>
        <Link href='/'>
          <Logo className='text-[#FF3B16]' />
        </Link>
        <div className='grid grid-cols-2'>
          <ul className='space-y-8 text-sm [&_a]:transition-colors hover:[&_a]:text-[#FF3B16]'>
            <li>
              <Link href='/'>
                ¿Quiénes somos?
              </Link>
            </li>
            <li>
              <Link href='/'>
                ¿Porqué Mooonto?
              </Link>
            </li>
            <li>
              <Link href='/'>
                Politica de privacidad
              </Link>
            </li>
          </ul>
          <ul className='space-y-8 text-sm [&_a]:transition-colors hover:[&_a]:text-[#FF3B16]'>
            <li>
              <a href="#" className='flex items-center'>
                <InstagramIcon className='h-6 w-6 mr-2' />
                Síguenos en Instagram
              </a>
            </li>
            <li>
              <a href="#">
                Discord
              </a>
            </li>
            <li>
              <a href="#">Contáctanos</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='flex justify-between text-xs mt-24 opacity-50'>
        <span>
          Copyright © {new Date().getFullYear()} Mooonto. All Rights Reserved.
        </span>
        <span>
          <a
            className='hover:underline'
            href="https://www.ls.graphics/illustrations"
            rel='noopener noreferrer'
            target='_blank'
          >
            Illustrations by LS Graphics.
          </a>
        </span>
      </div>
    </div>
  )
}

export default Footer
