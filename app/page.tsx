import { Button } from '@/components/ui/button'

export default function Home () {
  return (
    <main className='h-screen flex flex-col justify-center items-center gap-10 bg-gray-500'>
      <img className='fill-black' src="mooonto.svg" alt="mooonto-logo" />
      <Button>
        Submit
      </Button>
    </main>
  )
}
