import {
  CheckCircle,
  LineChart,
  FileText,
  Palette,
  ArrowRight,
} from "lucide-react";

const features = [
  "Rendered Illustration - Flat Sketch (Front View - Back View)",
  "Color Combo - Various Color Options of the Garments",
  "Stitching & Construction Detailing",
  "Graphic / Print Detailing Including Pantone Color",
  "Embroidery / Appliqué / Other Embellishment Detailing",
  "Washing Detailing & Care Instructions",
];

export default function TechPackPage() {
  return (
    <div className='min-h-screen py-12'>
      <div className='text-center max-w-4xl mx-auto px-4'>
        <h1 className='text-3xl font-semibold mb-4'>
          Apparel Design Studio | Tech Pack Designer | Manufacturer & Exporter
          of ReadyMade Garments
        </h1>
        <p className='text-lg mb-6 text-left'>
          Apparel Tech Packs set standards, processes, and guidelines for
          clothing manufacturers. We provide precise and production-friendly
          tech packs, ensuring your designs are factory-ready.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 mt-10'>
        {["Apparel Design", "Tech Packs", "Design Process"].map((title, i) => (
          <div key={i} className='shadow-lg rounded-lg overflow-hidden'>
            {/* <div className='h-48 bg-gray-300'></div> */}
            <div className='p-6'>
              <h3 className='text-xl font-semibold mb-2'>{title}</h3>
              <p className='text-gray-600'>Brief description about {title}.</p>
            </div>
          </div>
        ))}
      </div>

      <div className='max-w-6xl mx-auto px-4 mt-16'>
        <h2 className='text-2xl font-semibold mb-4'>
          What Constitutes a Tech Pack
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='flex items-center p-4 bg-white shadow rounded-lg'
            >
              <CheckCircle className='text-blue-600 mr-3' />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 mt-16'>
        <h2 className='text-2xl font-semibold mb-4'>Our Process</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[
            "Initial Consultation",
            "Design Development",
            "Final Documentation",
          ].map((step, i) => (
            <div key={i} className='p-6 bg-white shadow-lg rounded-lg'>
              <div className='mb-3'>
                {i === 0 && <LineChart className='text-blue-600 w-10 h-10' />}
                {i === 1 && <Palette className='text-blue-600 w-10 h-10' />}
                {i === 2 && <FileText className='text-blue-600 w-10 h-10' />}
              </div>
              <h3 className='text-xl font-semibold mb-2'>{step}</h3>
              <p className='text-gray-600'>Description of {step}.</p>
            </div>
          ))}
        </div>
      </div>

      <div className='text-center py-12 bg-blue-600 text-white rounded-lg max-w-4xl mx-auto mt-16 px-6'>
        <h2 className='text-2xl font-semibold mb-4'>Ready to Get Started?</h2>
        <p className='text-lg mb-6'>
          Contact us today to discuss your apparel design needs.
        </p>
        <button className='bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold flex items-center mx-auto hover:bg-gray-100'>
          Contact Us <ArrowRight className='ml-2' />
        </button>
      </div>
    </div>
  );
}
