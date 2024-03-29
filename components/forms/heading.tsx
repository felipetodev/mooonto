import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

function Heading ({
  children,
  step,
  totalSteps
}: {
  children: React.ReactNode
  step: number
  totalSteps: number
}) {
  return (
    <div>
      <div className="flex gap-x-4">
        <Badge className='font-bold text-lg bg-[#C2F454] hover:bg-[#C2F454]/80 text-inherit'>
          Paso {step} de {totalSteps}
        </Badge>
        <h2 className='text-2xl'>
          {children}
        </h2>
      </div>
      <Separator className="mt-10" />
    </div>
  )
}

export default Heading
