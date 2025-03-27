import React from "react";
import {
  ArrowRight,
  Edit,
  FileText,
  Scissors,
  Target,
  TrendingUp,
  FlaskConical,
} from "lucide-react";

const services = [
  {
    title: "Concept Development",
    icon: <FlaskConical className='w-10 h-10 text-blue-500' />,
    description:
      "Transform your raw ideas into viable fashion concepts. Our professional team guides you through silhouette development and design refinement, ensuring your vision becomes a market-ready product.",
  },
  {
    title: "Apparel Design",
    icon: <Edit className='w-10 h-10 text-green-500' />,
    description:
      "Unique collection designs with distinct brand identity. Our technical designers create detailed fashion flats and sketches based on your vision, including front, back, and side views with color specifications.",
  },
  {
    title: "Tech Pack Design Service",
    icon: <FileText className='w-10 h-10 text-purple-500' />,
    description:
      "Comprehensive technical drawings with detailed garment specifications. Our tech packs include fabric, trims, color, and measurement specifications - everything manufacturers need for precise production.",
  },
  {
    title: "Sample Development",
    icon: <Target className='w-10 h-10 text-red-500' />,
    description:
      "Perfect your designs with our precise sample development process. We ensure 100% accuracy in reproducing your garment style, making your manufacturing journey smoother and more efficient.",
  },
  {
    title: "Clothing Manufacturing",
    icon: <Scissors className='w-10 h-10 text-yellow-500' />,
    description:
      "End-to-end clothing manufacturing and shipping services with our in-house production unit. We specialize in serving global brands with efficient backend manufacturing and logistics.",
  },
  {
    title: "Apparel Branding",
    icon: <TrendingUp className='w-10 h-10 text-indigo-500' />,
    description:
      "Strategic brand development focused on consumer acceptance and market impact. We help build meaningful concepts that resonate with your target audience and drive market success.",
  },
];

export default function ServicesPage() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6'>
      <div className='max-w-7xl mx-auto text-center'>
        <h1 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
          Fashion Design and Development Services
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10'>
          Bringing your fashion brand to market with expert technical design,
          pattern making, and complete sampling solutions. Reduce operating
          costs by 30% while expanding your product offering.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
        {services.map((service, index) => (
          <div
            key={index}
            className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition hover:border-blue-500'
          >
            <div className='mb-4'>{service.icon}</div>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              {service.title}
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              {service.description}
            </p>
            <button className='mt-4 text-blue-500 hover:text-blue-700 flex items-center gap-2'>
              Learn More{" "}
              <ArrowRight className='w-4 h-4 transition-transform transform hover:translate-x-1' />
            </button>
          </div>
        ))}
      </div>

      <div className='mt-12 text-center'>
        <button className='bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold flex items-center mx-auto gap-2 hover:bg-blue-700'>
          Contact Us <ArrowRight className='w-5 h-5' />
        </button>
        <p className='text-gray-600 dark:text-gray-300 mt-4'>
          Ready to bring your fashion ideas to life? Let&apos;s talk about your
          project.
        </p>
      </div>
    </div>
  );
}
