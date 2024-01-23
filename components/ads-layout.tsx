import { cn } from '@/lib/utils'

function AdComponent ({
  className,
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <>
      <div className={cn('hidden sticky mt-10 mb-20 top-0 rounded w-40 h-[600px] bg-neutral-200 md:grid place-items-center text-3xl font-bold', className)}>
        {children}
      </div>
      <div className={cn('mt-10 mb-20 rounded w-full h-32 bg-neutral-200 grid md:hidden place-items-center text-3xl font-bold', className)}>
        {children}
      </div>
    </>
  )
}

function AdsLayout ({ children }: { children: React.ReactNode }) {
  return (
    <section id='calcula' className="bg-[#f7f4f0] px-10 md:px-16">
      <div className="max-w-screen-4xl mx-auto flex flex-col md:flex-row w-full">
        <AdComponent className="ml-auto">
          AD
        </AdComponent>
        <main className="md:px-14 w-full pt-10 pb-20">
          {children}
        </main>
        <AdComponent className="mr-auto">
          AD
        </AdComponent>
      </div>
    </section>
  )
}

export default AdsLayout
