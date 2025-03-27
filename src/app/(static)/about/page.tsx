export default function AboutPage() {
  return (
    <div className='max-w-6xl mx-auto py-8 px-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>About Us</h1>

      <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-8'>
        <h2 className='text-xl font-semibold text-blue-600 mb-4'>Who We Are</h2>
        <p className='text-gray-700 dark:text-gray-300 mb-4'>
          As a fashion studio and clothing manufacturing unit, our mission is to
          provide outstanding clothing designs that are fashionable and nurture
          an inventory of unique fashion products. We, at Fashion Studio Urban
          Purple (FSUP) firmly believe in providing the guiding light for
          apparel brands and private clothing labels to create products with
          fundamentally better techniques.
        </p>
        <p className='text-gray-700 dark:text-gray-300'>
          We are a one-stop destination for designers, offering services from
          Concept to Consumer. Our designs are unique and inspirational;
          delivering a collection line that can propel any brand en route to
          success.
        </p>
      </div>

      <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mb-8'>
        <h2 className='text-xl font-semibold text-blue-600 mb-4'>
          Our Mission
        </h2>
        <p className='text-gray-700 dark:text-gray-300'>
          Our Mission is to empower small and start-up clothing brands to
          achieve success. Urban Purple, with its Parent Company,
          ScriptoGraphics, and other dedicated affiliate companies form a strong
          conglomerate of companies committed to the construction and growth of
          small and start-up apparel businesses without any geographical
          boundaries.
        </p>
      </div>

      <h2 className='text-xl font-semibold text-blue-600 mb-6'>
        Board Members
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md'>
          <div className='flex flex-col items-center'>
            <img
              src='/images/partners/paromita.jpg'
              alt='Paromita Das'
              className='w-24 h-24 rounded-full mb-4'
            />
            <h3 className='text-lg font-bold text-white'>Paromita Das</h3>
            <p className='text-blue-600 text-sm'>
              Fashion Designer, Technical Designer, Managing Director
            </p>
            <hr className='w-full my-4' />
            <p className='text-gray-700 dark:text-gray-300 text-sm'>
              Paromita began her career as a fashion designer in various
              industries and co-operative societies, with experience working
              with both high industry officials and people at the grassroots
              level. With over 14 years of experience, she heads the Design
              Department of Urban Purple.
            </p>
          </div>
        </div>

        <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md'>
          <div className='flex flex-col items-center'>
            <img
              src='/images/partners/sashi.jpg'
              alt='Sashikant Khuntia'
              className='w-24 h-24 rounded-full mb-4'
            />
            <h3 className='text-lg font-bold text-white'>Sashikant Khuntia</h3>
            <p className='text-blue-600 text-sm'>
              Head Marketing and Public Relation
            </p>
            <hr className='w-full my-4' />
            <p className='text-gray-700 dark:text-gray-300 text-sm'>
              Sashikant specializes in Marketing and Public Relations for the
              apparel industry, with more than 16 years of experience spanning
              marketing, sales, information technology, and public relations. He
              is a Founder member of Urban Purple and ScriptoGraphics.
            </p>
          </div>
        </div>
      </div>

      <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md mt-8'>
        <h2 className='text-xl font-semibold text-blue-600 mb-4'>
          Our Partner Company
        </h2>
        <h3 className='text-lg font-bold mb-2 text-white'>SCRIPTOGRAPHICS</h3>
        <p className='text-gray-700 dark:text-gray-300'>
          ScriptoGraphics is a newly formed technology company specializing in
          apparel design and production. Founded by Sashikant Khuntia, a
          business operations analyst in garment technology, and Kotresh D.M, a
          system analyst and programmer, ScriptoGraphics is developing
          automation solutions for apparel design, tech packs, and garment
          manufacturing software.
        </p>
      </div>
    </div>
  );
}
