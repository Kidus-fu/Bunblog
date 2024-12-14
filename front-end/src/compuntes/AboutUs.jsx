import { useSelector } from "react-redux";
import Footer from "./Footer";
import Navber from "./Navber";

export default function AboutUs() {
  const state = useSelector(state => state)
  const IsDark =  state.userinfo.IsDark
  return (
    <>
      <Navber />
      <div className={`sm:flex items-center  ${IsDark ? "bg-gray-950 text-gray-500":""}`}>
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" alt="Company Image" />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About Us</span>
            <h2 className="my-4 font-bold text-3xl sm:text-4xl">
              About <span className="text-indigo-600">BunaBlog</span>
            </h2>
            <p className="text-gray-700">
              Welcome to **BunaBlog**, your go-to source for insightful content from Ethiopia! Our platform is dedicated to
              bringing you thought-provoking articles, creative ideas, and discussions that resonate with our diverse
              community. As a blog born and nurtured in Ethiopia, we aim to provide a space for local and global voices to
              connect, share, and inspire.
            </p>
            <p className="text-gray-700 mt-4">
              At **BunaBlog**, we are passionate about offering content that educates, entertains, and empowers. Whether
              it's the latest trends in technology, deep dives into Ethiopia's rich culture, or personal stories that
              matter, we are here to engage you. Our mission is to connect people through the written word, create
              meaningful conversations, and provide a platform for Ethiopians and people from around the world to make
              their voices heard.
            </p>
            <p className="text-gray-700 mt-4">
              Join us on this exciting journey as we continue to build a thriving, vibrant community. Stay tuned for
              exciting updates, new blog posts, and much more from **BunaBlog**. Thank you for being a part of our
              story!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
