import { useSelector } from "react-redux";


export default function Footer() {
  const IsDark =  useSelector(state => state.userinfo.IsDark)
    return (
      <footer className={`relative bg-blueGray-200 pt-8 pb-6 ${IsDark ? 'bg-gray-900 text-white':''}`}>
        <hr className={`border my-2 ${IsDark ? 'border-gray-700':''}`}/>
        <div className="container mx-auto px-4 mt-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600 ">
      
                Bunblog
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button className={`${IsDark ? 'bg-gray-800 ':''} text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2`} type="button">
                  <i className="text-black fab fa-twitter"></i>
                </button>
                <button className={`${IsDark ? 'bg-gray-800 ':''} text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2`} type="button">
                  <i className="fab fa-facebook-square"></i>
                </button>
                <button className={`${IsDark ? 'bg-gray-800 ':''} text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2`} type="button">
                  <i className="fab fa-dribbble"></i>
                </button>
                <button className={`${IsDark ? 'bg-gray-800 ':''} text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2`} type="button">
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
                  <ul className="list-unstyled">
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/about">About Us</a>
                    </li>
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/blog">Blog</a>
                    </li>
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/authors">Authors</a>
                    </li>
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/contact">Contact Us</a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
                  <ul className="list-unstyled">
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/terms">Terms & Conditions</a>
                    </li>
                    <li>
                      <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="/privacy">Privacy Policy</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © <span id="get-current-year">2024</span>
                <a href="/about" className="text-blueGray-500 hover:text-gray-800" target="_blank" rel="noopener noreferrer">BunaBlog</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  