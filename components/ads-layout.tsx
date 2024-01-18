function AdsLayout ({ children }: { children: React.ReactNode }) {
  return (
    <section id='calcula' className="bg-[#f7f4f0] flex w-full px-10 md:px-16">
      <div className="ml-auto sticky mt-10 mb-20 top-0 rounded w-40 h-[600px] bg-neutral-200 grid place-items-center text-3xl font-bold">
        AD
      </div>
      <main className="xl:border-2 xl:border-red-500 px-14 w-full pt-10 pb-20 max-w-screen-4xl mx-auto">
        {children}
      </main>
      <div className="mr-auto sticky mt-10 mb-20 top-0 rounded w-40 h-[600px] bg-neutral-200 grid place-items-center text-3xl font-bold">
        AD
      </div>
    </section>
  )
}

export default AdsLayout
