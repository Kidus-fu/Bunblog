import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import Footer from './Footer';

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (

    <div className="  ">
      {/* Fixed Navigation Bar */}
      <nav className=" sticky top-0 left-0 w-full z-50 shadow-md">
        <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
          {/* Logo */}
          <div className="text-2xl font-bold flex items-center">
            <img
              src="https://th.bing.com/th/id/R.283c1ca1b7db46617327cde50b2dcfbd?rik=Z7BUVWHh2nnnCw&pid=ImgRaw&r=0"
              alt="Logo"
              className="w-12 h-12 mr-2"
            />
            <Link to="/">BunaBlog</Link>
          </div>

          {/* Hamburger Menu (for mobile screens) */}
          <div className="sm:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-6">
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-400">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-400">
              Contact
            </Link>
            <Link to="/login" className="hover:text-gray-400">
              Login
            </Link>
            
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden ">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">
                Home
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">
                About
              </Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">
                Contact
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-gray-400">
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="h-96 bg-black w-full"
      style={{background:"url(https://th.bing.com/th/id/R.42789c3d580978674a265b3dc2730720?rik=t2rQCsWhtKfQ9g&pid=ImgRaw&r=0)",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}
      ></div>
        {/* Testimonials Section */}
        
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto text-center  hover:animate-pulse ">
          <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>
          <div className="flex sm:flex-1 justify-center space-x-8">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-xs ">
              <p className="text-lg ">"BunaBlog has transformed the way I blog. It's easy to use and connect with others!"</p>
              <p className="mt-4 font-semibold">John Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-xs">
              <p className="text-lg">"I love being part of the community. The platform is intuitive, and the content is top-notch."</p>
              <p className="mt-4 font-semibold">Jane Smith</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-xs">
              <p className="text-lg">"Great place to learn new things and improve my writing skills!"</p>
              <p className="mt-4 font-semibold">Alice Johnson</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold">How to Start Your Blog</h3>
              <p className="mt-4 text-lg">A complete guide to launching your own blog from scratch.</p>
              <Link to="/article/1" className="text-gray-800 font-semibold mt-4 block">Read More</Link>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold">Growing Your Audience</h3>
              <p className="mt-4 text-lg">Tips and tricks for attracting and retaining readers on your blog.</p>
              <Link to="/article/2" className="text-gray-800 font-semibold mt-4 block">Read More</Link>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold">Writing Effective Content</h3>
              <p className="mt-4 text-lg">Learn the art of crafting engaging blog posts that resonate with readers.</p>
              <Link to="/article/3" className="text-gray-800 font-semibold mt-4 block">Read More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Blogging Journey?</h2>
          <p className="text-xl mb-8">Join thousands of other bloggers who are making their voices heard on BunaBlog.</p>
          <Link
            to="/signup"
            className="bg-btnColorMess text-white py-3 px-8 rounded-lg text-lg"
          >
            Start Your Blog Now
          </Link>
        </div>
      </section>

      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
