import React from "react";

export default function PortfolioPage() {
  const offerings = [
    "Apparel Tech Pack",
    "Sample and Fit Corrections",
    "Designed Collection Line Sheet",
    "Production Costing",
    "Quality Assurance",
    "Guaranteed Delivery",
    "Apparel Production",
    "Logistic Support",
  ];

  const requirements = [
    "What are the styles you want to go ahead with?",
    "Do you have the sketches or similar designs ready?",
    "Your target Standard measurement or Any Brands Measurement you want to follow:",
    "What are your fabric preferences?",
    "Your preferred COO?",
    "What quantities do you want to produce?",
    "Do you also need labels and hang tags with your brand name on them?",
    "What is your delivery date?",
    "Any Target date for Sample delivery?",
  ];

  const processSteps = [
    { title: "Payment For Sample", color: "bg-orange-500" },
    {
      title: "Tech Pack, Pattern Mock Sample Development",
      color: "bg-red-500",
    },
    { title: "We Ship Mock Swatches To You", color: "bg-blue-500" },
    { title: "Sampling Till Production Process Flow", color: "bg-green-500" },
    {
      title: "We Ship Corrected Sample for your Final Selection",
      color: "bg-indigo-500",
    },
    {
      title: "Purchase Order with 50% Advance Payment",
      color: "bg-orange-600",
    },
    {
      title: "We Ship Goods Upon Final 40% Balance Payment",
      color: "bg-teal-500",
    },
  ];

  const packages = [
    {
      title: "Starter",
      price: "1,250",
      features: [
        "2 Styles (T-Shirts)",
        "100 PCS Production",
        "Design & Tech Packs Included",
        "4 Sizes S, M, L, XL",
        "2 Sample Shipping",
        "1 Round of Fitting Adjustments",
        "Fedex D2D Shipping Included",
      ],
      buttonText: "Get Started",
      buttonColor: "bg-red-500",
    },
    {
      title: "Second Package",
      price: "3,500",
      features: [
        "5 Styles Collection",
        "250 PCS Production",
        "Design & Tech Packs Included",
        "4 Sizes S, M, L, XL",
        "Line-Sheet Presentation",
        "5 Samples",
        "1 Round of Fitting Adjustments",
        "Fedex D2D Shipping Included",
      ],
      buttonText: "Get Going",
      buttonColor: "bg-yellow-500",
    },
    {
      title: "Full-Launch",
      price: "6,250",
      features: [
        "10 Styles Collection",
        "500 PCS Production",
        "Design & Tech Packs Included",
        "5 Sizes S, M, L, XL, XXL",
        "Line-Sheet Presentation",
        "10 Custom Samples",
        "1 Round of Fitting Adjustments",
        "Fedex D2D Shipping Included",
      ],
      buttonText: "Get It All",
      buttonColor: "bg-green-500",
    },
  ];

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h1 className='text-3xl font-bold text-center mb-4'>
        Clothing Designer | Tech Pack Designer | Clothing Manufacturer Exporter
      </h1>

      <h2 className='text-2xl font-semibold text-center mb-6'>
        Clothing Manufacturing Process and Packages
      </h2>

      <div className='grid md:grid-cols-2 gap-6'>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-white'>
          <h3 className='text-xl font-semibold mb-4'>Our Offering</h3>
          <ul className='space-y-2'>
            {offerings.map((item, index) => (
              <li key={index} className='flex items-center'>
                ✅ <span className='ml-2'>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-white'>
          <h3 className='text-xl font-semibold mb-4'>
            Production Requirements
          </h3>
          <ul className='space-y-2'>
            {requirements.map((item, index) => (
              <li key={index} className='flex items-center'>
                ✅ <span className='ml-2'>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className='text-2xl font-semibold text-center mt-8 mb-6'>
        How We Extend Our Support
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 '>
        {processSteps.map((step, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg text-white ${step.color} text-center `}
          >
            {step.title}
          </div>
        ))}
      </div>

      <h2 className='text-2xl font-semibold text-center mt-8 mb-6'>
        Clothing Manufacturing Packages
      </h2>

      <div className='grid md:grid-cols-3 gap-6'>
        {packages.map((pkg, index) => (
          <div
            key={index}
            className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-white'
          >
            <h3 className='text-xl font-semibold'>{pkg.title}</h3>
            <p className='text-3xl font-bold mt-2'>${pkg.price}</p>
            <ul className='mt-4 space-y-2'>
              {pkg.features.map((feature, idx) => (
                <li key={idx} className='flex items-center'>
                  ✅ <span className='ml-2'>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`mt-4 w-full p-2 text-white rounded ${pkg.buttonColor}`}
            >
              {pkg.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
