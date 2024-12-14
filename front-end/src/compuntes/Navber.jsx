import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router";
import api from "../api";
import { userinfoActions } from "../store/store";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { FaUserCircle } from "react-icons/fa";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
export const PlusIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};
export default function Navber() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const IsDark =  useSelector(state => state.userinfo.IsDark)
  const userdata = useSelector(
    (state) => state.userinfo.userinfoobj
  );
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");



  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector((state) => state.userinfo.id);
  const userdatafuch = () => {
    api.get(`api/userprofile/${id}/`).then((res) => {
      if (res.statusText === "OK") {
        dispatch(userinfoActions.userdata(res.data));
      }
    });
  };
  useEffect(() => {
    userdatafuch();
  }, []);
  const handleToggleDarkMode = () => {
    dispatch(userinfoActions.toggleDarkMode());
  };
  return (
    
     <nav
      className={`sticky top-0 bottom-16 left-0 w-full z-50 shadow-lg ${
        IsDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <img
            src={IsDark ? 'https://th.bing.com/th/id/R.b77f96dcc937e7c9606d1f27dd00c21e?rik=wGlF6U86%2buSSRw&pid=ImgRaw&r=0':`https://th.bing.com/th/id/R.283c1ca1b7db46617327cde50b2dcfbd?rik=Z7BUVWHh2nnnCw&pid=ImgRaw&r=0`}
            alt="BunaBlog Logo"
            className="w-12 h-12 mr-2"
          />
          <Link to="/">BunaBlog</Link>
        </div>

        {/* Hamburger Menu */}
        <div className="sm:hidden">
          <button
            className="text-black focus:outline-none"
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
                  className={`${IsDark ? 'text-white':'text-black'}`}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className={`${IsDark ? 'text-white':'text-black'}`}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden sm:flex space-x-6 relative `}>
          <div className=" pt-4 hover:scale-125">
            <Link
              to="/feed"
              className="hover:text-gray-400 transition duration-200"
            >
              <div className="relative">
                <i className="fa-solid fa-house text-xl"></i>
                <i className="absolute  fa-solid fa-circle top-0 left-4 text-blue-500"></i>
              </div>
            </Link>
          </div>
          <div className=" pt-4 hover:scale-125">
            
              <div className="flex flex-wrap gap-3">
              <Button
            className="capitalize"
            variant="flat"
            onPress={() => handleOpen('blur')}
          >
             <i className="fa-solid fa-magnifying-glass text-xl"></i>
          </Button>
          <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} className={`${IsDark ? 'dark text-white':''}`}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                  risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                  quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                  adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                  officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                  deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </div>
      
    
             
          </div>
          <div className=" pt-4 hover:scale-125">
            <Link
              to="/notification"
              className="hover:text-gray-400 transition duration-200"
            >
              <div className="relative">
                <i className="fa-solid fa-bell text-xl"></i>
                <i className="absolute  fa-solid fa-circle top-0 left-3 text-blue-500 text-sm"></i>
              </div>
            </Link>
          </div>
          <div className=" pt-4 hover:scale-125">
            <Link
              to="/create"
              className="hover:text-gray-400 transition duration-200"
            >
              <i className="fa-regular fa-square-plus text-blue-700 text-xl"></i>
            </Link>
          </div>

          
            <Dropdown
      showArrow
      classNames={{
        base: "before:bg-default-200", // change arrow background
        content: "p-0 border-small border-divider bg-background",
      }}
      radius="sm"
    >
      <DropdownTrigger>
        <Button disableRipple variant="ghost" className={IsDark ? 'bg-gray-900 border-none text-white mt-2 ':'bg-white text-black border-none mt-2'}>
        <FaUserCircle className="text-3xl" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        className={IsDark ? "bg-gray-800":""}
        disabledKeys={["profile"]}
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection showDivider aria-label="Profile & Actions">
          <DropdownItem key="profile" isReadOnly className="h-14 gap-2 opacity-100">
            <User
              avatarProps={{
                size: "sm",
                src:userdata.profile_picture
              }}
              classNames={{
                name: "text-default-600",
                description: "text-default-500 ",
              }}
              description=""
              name={userdata.user}
            />
          </DropdownItem>
          <DropdownItem key="dashboard">Dashboard</DropdownItem>
          <DropdownItem key="settings"  ><Link
                  to={"/settings"}>Settings</Link></DropdownItem>
          <DropdownItem key="new_project" endContent={<PlusIcon className="text-large" />}>
            New Project
          </DropdownItem>
         
        </DropdownSection>

        <DropdownSection showDivider aria-label="Preferences">
          <DropdownItem key="quick_search" shortcut="⌘K">
            Quick search
          </DropdownItem>
         
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout">Log Out</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
            {/* {dropdownOpen && (
              <div
                className={`absolute top-8 right-3 mt-4 shadow-lg rounded-lg w-40 ${IsDark ? 'bg-gray-800 text-white':'bg-white text-black'}`}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <Link
                  to="/profile"
                  className={`block px-4 py-2 ${IsDark ? 'hover:bg-gray-100 hover:text-black' :'hover:bg-gray-100 text-black'}`}
                  onClick={() => setDropdownOpen(false)}
                >
                  <i className="fa-regular fa-eye mr2"></i> View Profile
                </Link>
                <Link
                  to="/settings"
                  className={`block px-4 py-2 ${IsDark ? 'hover:bg-gray-100 hover:text-black' :'hover:bg-gray-100 text-black'}`}
                  onClick={() => setDropdownOpen(false)}
                >
                  <i className="fa-solid fa-gear mr-2"></i>Settings
                </Link>
                <button
                  onClick={() => {
                    dispatch(userinfoActions.logout());
                    navigate("/login");
                  }}
                  className={`block w-full text-left px-4 py-2 ${IsDark ? 'hover:bg-gray-100 hover:text-black' :'hover:bg-gray-100 text-black'}`}
                >
                  <i className="fa-solid fa-right-from-bracket mr-2"></i>
                  Logout
                </button>
              </div>
            )} */}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`sm:hidden  sticky ${IsDark ? 'bg-MenuColor text-white':'bg-MenuColor text-black'}`}>
          <div className="flex flex-col items-center space-y-4 py-4 bg-MenuColor">
            <ul className="p-2">
              <li className="p-2">
            <Link
              to="/feed"s
              onClick={() => setMenuOpen(false)}
              className="hover:text-gray-400"
            >
              <i className="fa-solid fa-house text-xl"></i>{" "}
              <span className="ml-2">Home</span>
            </Link>
            </li>
            <li className="p-2">
            <Link
              to="/search"
              className="hover:text-gray-400 transition duration-200"
            >
              <i className="fa-solid fa-magnifying-glass text-xl"></i>
              <span className="ml-2">search</span>
            </Link>
            </li>
            <li className="p-2">
            <Link
              to="/notification"
              className="hover:text-gray-400 transition duration-200"
            >
              <i className="fa-solid fa-bell text-xl"></i>
              <span className="ml-2">notification</span>
            </Link>
            </li>
            <li className="p-2">
            <Link
              to="/create"
              className="hover:text-gray-400 transition duration-200"
            >
              <i className="fa-regular fa-square-plus text-blue-700 text-xl"></i>
              <span className="ml-2">create</span>
            </Link>
            </li>
            </ul>
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)} // Open on hover
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="hover:text-gray-400">Profile</button>
              {dropdownOpen && (
                <div className={`absolute top-8 right-4 ${IsDark ? 'bg-gray-700 text-white':'bg-black text-white'}  shadow-lg rounded-lg w-40`}>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="fa-regular fa-eye mr2"></i> View Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <i className="fa-solid fa-gear mr-2"></i>Settings
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(userinfoActions.logout());
                      navigate("/login");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <i className="fa-solid fa-right-from-bracket mr-2"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}


    </nav>
  );
}
