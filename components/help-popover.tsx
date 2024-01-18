import { HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { DiscordIcon } from './ui/icons'

function HelpPopover ({ children }: { children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger className='flex items-center h-7 text-md font-semibold text-[#F7F4F0] hover:underline'>
        <HelpCircle className='w-4 h-4 mr-1.5' />
        {children}
      </PopoverTrigger>
      <PopoverContent side='bottom' align='end' className='relative p-2'>
        <h5 className='font-semibold'>
          ¿Necesitas ayuda con el formulario?
        </h5>
        <p className='text-xs my-2'>
          Únete a nuestro servidor de Discord y te ayudaremos a resolver tus dudas.
        </p>
        <div className='relative overflow-hidden h-20 bg-[#404eed] rounded'>
          <a
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'absolute left-2 top-2 z-10 cursor-pointer text-xs')}
            href="/discord"
            target='_blank'
          >
            <DiscordIcon className='w-5 h-5 mr-1' /> Ingresa a nuestro servidor
          </a>
          <img className='block absolute h-full z-10 -right-10 top-0 object-contain' src="https://www.colab-ai.com/discord-pj.svg" alt="" />
          <img className='block absolute h-full inset-0 object-cover' src="https://www.colab-ai.com/discord-bg.svg" alt="" />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default HelpPopover
