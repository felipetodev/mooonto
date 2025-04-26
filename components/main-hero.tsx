import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function MainHero () {
  return (
    <section className="h-[700px] bg-[#002446] w-full px-10 md:px-16">
      <div className='max-w-screen-4xl mx-auto h-full'>
        <div className="flex flex-col gap-y-10 justify-center h-full max-w-3xl">
          <h1 className="flex flex-col text-[80px] font-bold leading-tight font-delaGothic">
            <span>Dale valor a tu</span>{' '}
            <span>trabajo creativo</span>{' '}
            <span>
              con <span className="text-[#FF3B16]">mooonto</span>
            </span>
          </h1>

          <div className="flex flex-col gap-y-4">
            <p>Mooonto es una herramienta para creativos autónomos, freelance o empleados que ayuda a calcular el valor/hora de su trabajo en base en tus propios datos y costos de vida.</p>
            <p>Si definimos nuestro valor real podemos elevar los estándares salariales de la industria creativa</p>
            <p>Conoce tu valor/hora como freelance dentro de la industria creativa. Esta herramienta está basada en la plantilla “Calcula tu precio” de Marco Creativo.</p>
          </div>

          <a
            href='#calcula'
            className={cn(buttonVariants({ variant: 'secondary' }), 'w-max rounded-3xl font-bold text-[#002446] text-lg')}
          >
            Calcula tu precio ahora, ¡es gratis!
          </a>
        </div>
      </div>
    </section>
  )
}
