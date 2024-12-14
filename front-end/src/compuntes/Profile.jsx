import { useEffect, useState } from "react";
import Navber from "./Navber";
import api from "../api";
import { useSelector } from "react-redux";
import { Skeleton } from "@nextui-org/react";
import { Link, useParams } from "react-router";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import Footer from "./Footer";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const IsDark = useSelector((state) => state.userinfo.IsDark);
  const params = useParams();
  const userparam = params.username;
  console.log(userparam);
  const handeldata = async () => {
    try {
      setLoading(true);
      const object = await api.get("api/userprofiles/");
      if (object.status === 200) {
        const objects = object.data.results;
        let user = objects.filter((obj) => obj.user == userparam);
        console.log(objects);

        setData(user[0]);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch {}
  };
  useEffect(() => {
    handeldata();
  }, []);
  if (loading) {
    return (
      <>
        <Navber />
        <main className="profile-page">
          <section className="relative block h-96">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80)`,
              }}
            >
              <span className="w-full h-full absolute opacity-50 bg-black"></span>
            </div>
          </section>

          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <Skeleton className="flex rounded-full w-52  h-52" />
                      </div>
                    </div>

                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <div className="flex justify-center">
                          <Skeleton className="h-11 w-32 rounded-lg" />
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            <Skeleton className="h-3 w-2/5 rounded-lg" />
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Posts
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            <Skeleton className="h-3 w-2/5 rounded-lg" />
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Likes
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            <Skeleton className="h-3 w-2/5 rounded-lg" />
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Comments
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 justify-center items-center justify-items-center mt-10">
                    <Skeleton className="h-3 w-32  rounded-lg" />
                    <div className="text-sm leading-normal text-blueGray-400 my-7 font-bold uppercase">
                      <Skeleton className="h-3 w-52 rounded-lg" />
                    </div>
                    <div className="text-sm leading-normal text-blueGray-400 my-7 font-bold uppercase">
                      <Skeleton className="h-3 w-52 rounded-lg" />
                    </div>
                    <div className="text-sm leading-normal text-blueGray-400 my-7 font-bold uppercase">
                      <Skeleton className="h-3 w-52 rounded-lg" />
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <div className="max-w-[300px] w-full flex items-center gap-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </>
    );
  } else {
    console.log(data);

    return (
      <>
        <Navber />
        <main className={`profile-page`}>
          {/* Profile Header */}
          <section className="relative block h-96">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80)`,
              }}
            >
              <span className="w-full h-full absolute opacity-50 bg-black"></span>
            </div>
          </section>

          {/* Profile Information */}
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <div className="relative">
                        <img
                          alt="Profile"
                          src={
                            data.profile_picture ||
                            "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                          }
                          className="shadow-xl rounded-full w-52 h-52 align-middle border-none "
                        />
                        {/* You can add any other content here */}
                      </div>
                    </div>

                    <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-32 sm:mt-0">
                        <div className="mb-2 text-blueGray-600">
                          <div className="mt-6 lg:mb-0 mb-6">
                            <Popover showArrow offset={20} placement="bottom">
                              <PopoverTrigger>
                                <button
                                  className={` text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2`}
                                  type="button"
                                >
                                  <i class="fa-brands fa-x-twitter"></i>
                                </button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <div className="px-1 py-2">
                                  <div className="text-small font-bold">
                                    {data.user}-X
                                  </div>
                                  <div className="text-tiny">
                                    {data.x ? (
                                      <a
                                        href={data.x}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Get In X{" "}
                                      </a>
                                    ) : (
                                      "No X"
                                    )}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            <Popover showArrow offset={20} placement="bottom">
                              <PopoverTrigger>
                                <button
                                  className={` text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2`}
                                  type="button"
                                >
                                  <i class="fa-solid fa-envelope"></i>
                                </button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <div className="px-1 py-2">
                                  <div className="text-small font-bold">
                                    Get In mail
                                  </div>
                                  <div className="text-tiny">
                                    {data.email ? (
                                      <a href={`mailto:${data.email}`}>
                                        {data.user}-mail
                                      </a>
                                    ) : (
                                      "No Email"
                                    )}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            <Popover showArrow offset={20} placement="bottom">
                              <PopoverTrigger>
                                <button
                                  className={` text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2`}
                                  type="button"
                                >
                                  <i className="fab fa-dribbble"></i>
                                </button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <div className="px-1 py-2">
                                  <div className="text-small font-bold">
                                    Website
                                  </div>
                                  <div className="text-tiny">
                                    {data.website ? (
                                      <a
                                        href={data.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {data.website || "No Web"}
                                      </a>
                                    ) : (
                                      "No Web"
                                    )}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                            <Popover showArrow offset={20} placement="bottom">
                              <PopoverTrigger>
                                <button
                                  className={` text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2`}
                                  type="button"
                                >
                                  <i class="fa-brands fa-instagram"></i>
                                </button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <div className="px-1 py-2">
                                  <div className="text-small font-bold">
                                    Instagrame
                                  </div>
                                  <div className="text-tiny">
                                    {data.ig ? (
                                      <a
                                        href={data.ig}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Get Now
                                      </a>
                                    ) : (
                                      "No Instagrame"
                                    )}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>

                            <Popover showArrow offset={20} placement="bottom">
                              <PopoverTrigger>
                                <button
                                  className={` text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2`}
                                  type="button"
                                >
                                  <i class="fa-solid fa-phone"></i>
                                </button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <div className="px-1 py-2">
                                  <div className="text-small font-bold">
                                    Phone number of {data.user}
                                  </div>
                                  <div className="text-tiny">
                                    {data.phone_number ? (
                                      <a href={`tel:${data.phone_number}`}>
                                        {data.phone_number}
                                      </a>
                                    ) : (
                                      "No Phone"
                                    )}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {data.postcount}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Posts
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {data.likes}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Likes
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            {data.comments}
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Comments
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-12">
                    <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                      {data.user}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      {data.country}, {data.city}
                    </div>
                    <div className="mb-2 text-blueGray-600 mt-10">
                      <i className="fa-solid fa-user mx-2"></i>
                      {data.fristname || "No Data"} -{" "}
                      {data.lastname || "No Data"}
                    </div>
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          {data.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex justify-center items-center gap-4 ">
                    <div className="flex w-full flex-col justify-center items-center">
                      <Tabs aria-label="Options">
                        <Tab
                          key="photos"
                          title={
                            <i className="fa-brands fa-slack text-2xl hover:underline cursor-pointer"></i>
                          }
                        >
                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {data.posts ? data.posts.map(post => {
                                return(
                                    <Link to={`/post/${post.id}`}>
                                    <Card key={post.id} isPressable shadow="sm" className="relative" onPress={() => console.log("item pressed")}>
                                    <CardBody className="overflow-visible p-0">
                                      <Image
                                        alt={post.header}
                                        className="w-full object-cover h-[140px]"
                                        radius="lg"
                                        shadow="sm"
                                        src={`http://localhost:8000/media/${post.image}`}
                                        width="100%"
                                      />
                                      
                                    </CardBody>
                                    <CardFooter className="text-small justify-between">
                                      <b>{post.header}</b>
                                      <p className="text-default-500">{post.price}</p>
                                    </CardFooter>
                                  </Card> 
                                  </Link> 
                                )
                            }):"cfcgg"}
                         </div>
                        </Tab>
                        <Tab
                          key="Liked_psot"
                          title={
                            <i className="fa-solid fa-heart text-2xl hover:underline cursor-pointer text-red-700"></i>
                          }
                        >
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                              {data.liked_posts ? 
                              data.liked_posts.map(liked => {
                                return (
                                  <Link to={`/post/${liked.id}`}>
                                  <Card key={liked.id} isPressable shadow="sm" className="relative" onPress={() => console.log("item pressed")}>
                                  <CardBody className="overflow-visible p-0">
                                    <Image
                                      alt={liked.header}
                                      className="w-full object-cover h-[140px]"
                                      radius="lg"
                                      shadow="sm"
                                      src={`http://localhost:8000/media/${liked.image}`}
                                      width="100%"
                                    />
                                    
                                  </CardBody>
                                  <CardFooter className="text-small justify-between">
                                    <b>{liked.header}</b>
                                    <p className="text-default-500">{liked.price}</p>
                                  </CardFooter>
                                </Card> 
                                </Link> 
                                )
                                
                              })
                              : 
                                <p>No Data</p>
                              }
                          </div>
                        </Tab>
                        <Tab key="Info" title={<i className="fa-solid fa-circle-info"></i>}>
                          <Card>
                            <CardBody>
                            <div className="">
                            Join date :{new Date(data.join_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                            </div>
                            <div className="">
                            Birthdate :{new Date(data.birthdate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                            
                            </div>
                            </CardBody>
                          </Card>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}
