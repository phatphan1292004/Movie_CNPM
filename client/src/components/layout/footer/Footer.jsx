import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#0F0F2D] text-white py-10 mt-20 bottom-0">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <img src="https://streamvid.jwsuperthemes.com/wp-content/uploads/2023/02/logo.svg"></img>
          <p className="text-sm mt-3 text-gray-400">
            Your ultimate destination for streaming the latest movies, shows,
            and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Pages
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Blogs
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:text-white">
                Action
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Drama
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Comedy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Sci-Fi
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2 text-xl">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-5">
        © 2025 Beck. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
