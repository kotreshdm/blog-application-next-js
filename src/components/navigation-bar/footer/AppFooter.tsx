import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterest,
} from "react-icons/fa";
import { MdPayment } from "react-icons/md";

const AppFooter = () => {
  return (
    <footer className='py-8 border-t border-gray-300'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Company Info */}
          <div>
            <h2 className='text-lg font-bold'>Scripto Graphics</h2>
            <p className='text-sm mt-2'>
              Fashion Studio and Garments Manufacturing & Export Unit providing
              end-to-end solutions to small and medium apparel brands and
              clothing lines.
            </p>
            <div className='flex mt-3 space-x-3'>
              <a href='https://facebook.com' className=' hover:text-blue-600'>
                <FaFacebookF size={20} />
              </a>
              <a href='https://instagram.com' className=' hover:text-pink-500'>
                <FaInstagram size={20} />
              </a>
              <a href='https://twitter.com' className=' hover:text-blue-400'>
                <FaTwitter size={20} />
              </a>
              <a href='https://pinterest.com' className=' hover:text-red-600'>
                <FaPinterest size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className='text-lg font-bold'>CONTACT INFO</h2>
            <p className='text-sm  mt-2'>
              #302, 3rd Floor, No 33/10/B, 21, Suraj Nivas
              <br />
              Kodichikanahalli Main Rd, Someswara Layout,
              <br />
              Bilekahalli, Bengaluru, Karnataka 560076
            </p>
            <p className='text-sm  mt-2'>📞 +91 9035001810</p>
            <p className='text-sm  mt-2'>✉️ scriptographics@gmail.com</p>
          </div>

          {/* Links */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h2 className='text-lg font-bold'>GENERAL LINKS</h2>
              {["Home", "About us", "Best Seller", "Blog", "Contact"].map(
                (link) => (
                  <p key={link} className='text-sm mt-2'>
                    <a href='#' className='hover:text-gray-900'>
                      {link}
                    </a>
                  </p>
                )
              )}
            </div>
            <div>
              <h2 className='text-lg font-bold'>LEGAL</h2>
              {[
                "Privacy Policy",
                "Terms & Condition",
                "Disclaimer",
                "Legal Notice",
                "Payment Mode",
                "Sitemap",
              ].map((link) => (
                <p key={link} className='text-sm mt-2'>
                  <a href='#' className='hover:text-gray-900'>
                    {link}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='flex flex-col md:flex-row justify-between items-center mt-6 border-t pt-4'>
          <p className='text-sm '>
            © 2024 Scripto Graphics Pvt Ltd. All Rights Reserved
          </p>
          <div className='flex space-x-3 mt-3 md:mt-0'>
            <MdPayment size={24} />
            <MdPayment size={24} />
            <MdPayment size={24} />
            <MdPayment size={24} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
