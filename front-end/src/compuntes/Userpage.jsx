import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userinfoActions } from "../store/store";
import api from "../api";
import Footer from "./Footer";
import Navber from "./Navber";
import { Loading, Loadingui } from "./Loding";
import { UserCard, Userscard, UserTwitterCard } from "../extr_com/UserCard";
import {
  CardBody,
  Card,
  CardHeader,
  Image,
  CardFooter,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import Search from "../extr_com/Serach";

const PostUserMore = ({ userId }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`api/userprofile/${userId}/`);
        setProfilePicture(response.data.profile_picture); // Store the profile picture in state
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!profilePicture) {
    return <span>Loading...</span>; // Show loading until profile picture is fetched
  }

  return (
    <img
      src={profilePicture}
      alt="User Profile"
      className="rounded-full w-8 h-8"
    />
  );
};

export default function Userpage() {
  const dispatch = useDispatch();
  const IsDark = useSelector((state) => state.userinfo.IsDark);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [userPostData, setUserPostData] = useState([]);
  const userdata = useSelector((state) => state.userinfo.userinfoobj);

  const userId = useSelector((state) => state.userinfo.id);
  const postusermore = (id) => {
    let data;
    api.get(`api/userprofile/${id}/`).then((res) => {
      data = res.data.profile_picture;
    });
    return <small>{data}</small>;
  };

  const fetchDataWithoutloding = async () => {
    try {
      const [postsUserRes, postsRes, profileRes, like] = await Promise.all([
        api.get("blog/postsuser/"),
        api.get("blog/posts/"),
        api.get(`api/userprofile/${userId}/`),

        api.get("blog/likes/"),
      ]);

      if (postsUserRes.status === 200) {
        setUserPostData(postsUserRes.data.results);
      }

      if (postsRes.status === 200) {
        setData(postsRes.data);
      }

      if (profileRes.status === 200) {
        dispatch(userinfoActions.usersdata(profileRes.data));
      }

      if (like.status === 200) {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [postsUserRes, postsRes, profileRes, users, like, view] =
        await Promise.all([
          api.get("blog/postsuser/"),
          api.get("blog/posts/"),
          api.get(`api/userprofile/${userId}/`),
          api.get("api/userprofiles/"),
          api.get("blog/likes/"),
        ]);

      if (postsUserRes.status === 200) {
        setUserPostData(postsUserRes.data.results);
      }

      if (postsRes.status === 200) {
        setData(postsRes.data);
        console.log(postsRes.data);
      }

      if (profileRes.status === 200) {
        dispatch(userinfoActions.usersdata(profileRes.data));
      }

      if (like.status === 200) {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleNext = async (nextUrl) => {
    try {
      if (!nextUrl) return;

      const response = await api.get(nextUrl);

      if (response.status === 200) {
        setData((prevData) => ({
          ...prevData,
          results: [...prevData.results, ...response.data.results], // Append new data to the bottom
          next: response.data.next,
        }));
      }
    } catch (error) {
      console.error("Error loading next page:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loadingui />;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const reversedData = data.results;

  return (
    <>
      <div
        className={IsDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
      >
        <Navber />
        <section className="relative">
          <div className="p-3">
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Sidebar Section */}

              <div className="flex flex-col gap-3">
                <UserCard />
              </div>
              {/* Main Post Section */}

              <div className="h-full col-span-2 ">
                {reversedData.map((post) => (
                  <div
                    key={post.id}
                    className={`max-w-[900px] mx-auto mb-10  StartAnimation  ${
                      IsDark ? "bg-gray-800 text-white" : "bg-white"
                    } rounded-lg`}
                  >
                    <Card className={`${IsDark ? "dark" : ""} py-4`}>
                      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold text-gray-500">
                          <Popover showArrow placement="bottom">
                            <PopoverTrigger>
                              <User
                                as="button"
                                avatarProps={{
                                  src:`http://localhost:8000/${post.profile_picture}/`,
                                }}
                                className="transition-transform"
                                description={`${post.created_at}`}
                                name={`${post.username}`}
                              />
                            </PopoverTrigger>
                            <PopoverContent className="p-1">
                              <UserTwitterCard userId={post.userid}/>
                            </PopoverContent>
                          </Popover>
                        </p>
                        <small className="text-default-500">12 Tracks</small>
                        <h3 className="font-bold text-2xl mt-1">
                          {post.header}
                        </h3>
                        <p className="mt-2 text-gray-700">{post.description}</p>
                        <span className="bg-primary rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-black mb-5">
                          Posted{" "}
                          {new Date(post.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </CardHeader>
                        <Link to={`/post/${post.id}`}>
                      <CardBody className="overflow-visible py-2">
                        <Image
                          alt={post.header}
                          className="object-cover rounded-xl shadow-lg transition-transform transform hover:scale-105"
                          src={post.image}
                          width={670}
                          height={400}
                        />
                      </CardBody>
                          <Outlet />
                      <div className="flex-1">
                        {/* Tags */}
                        <div className="text-sm">
                          <strong>Tags:</strong>{" "}
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded-full mr-2 mb-2"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Categories */}
                        <div className="text-sm">
                          <strong>Categories:</strong>{" "}
                          {post.categories.map((category, index) => (
                            <span
                              key={index}
                              className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      </Link>
                      <hr className="mt-5 border-t-2 border-gray-300" />

                      <div className="flex justify-between mt-4">
                        <div className="flex gap-1 text-sm text-gray-600">
                          {post.likeinfo.slice(0, 3).map((like) => (
                            <small
                              key={like.username}
                              className="text-gray-600"
                            >
                              {like.username}
                            </small>
                          ))}
                          <button className="text-btnColorMessHov text-xs">
                            See more...
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <div className="flex items-center gap-2">
                            <i
                              className={`fa-regular fa-thumbs-up text-2xl cursor-pointer ${
                                post.likeinfo.some(
                                  (p) => p.username === userdata.user
                                )
                                  ? "text-btnColorMessHov"
                                  : "text-black"
                              } hover:text-3xl`}
                              onClick={() => {
                                if (
                                  post.likeinfo.some(
                                    (p) => p.username === userdata.user
                                  )
                                ) {
                                  post.likeinfo.some((p) => {
                                    p.username === userdata.user
                                      ? api
                                          .delete(`blog/likes/${p.like_id}/`)
                                          .then(() => {
                                            fetchDataWithoutloding();
                                          })
                                      : "";
                                  });
                                } else {
                                  api
                                    .post(`blog/likes/`, { post: post.id })
                                    .then(() => {
                                      fetchDataWithoutloding();
                                    });
                                }
                              }}
                            ></i>
                            <b>{post.total_likes}</b>
                          </div>
                          <div className="flex items-center gap-2">
                            <i className="fa-solid fa-comment text-2xl"></i>
                            <b>{post.total_comments}</b>
                          </div>
                          <Dropdown>
                            <DropdownTrigger>
                              <Button variant="bordered">Open Menu</Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="dark Static Actions">
                              <DropdownItem key="new">New file</DropdownItem>
                              <DropdownItem key="copy">Copy link</DropdownItem>
                              <DropdownItem key="edit">Edit file</DropdownItem>
                              <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                              >
                                Delete file
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
                {/* Pagination */}
                {data.next ? (
                  <div
                    className="text-center cursor-pointer"
                    onMouseEnter={() => handleNext(data.next)}
                  >
                    <div className="flex justify-center items-center space-x-2">
                      <div
                        className={`h-9 w-9 ${
                          IsDark ? "bg-gray-500 shadow-2xl" : "bg-gray-600"
                        } animate-bounce rounded-full transition-all duration-500 transform hover:translate-x-5 hover:opacity-90`}
                      />
                      <div
                        className={`h-9 w-9 ${
                          IsDark ? "bg-gray-500 shadow-2xl" : "bg-gray-600"
                        } animate-bounce rounded-full transition-all duration-500 transform hover:translate-x-5 hover:opacity-90`}
                      />
                      <div
                        className={`h-9 w-9 ${
                          IsDark ? "bg-gray-500 shadow-2xl" : "bg-gray-600"
                        } animate-bounce rounded-full transition-all duration-500 transform hover:translate-x-5 hover:opacity-90`}
                      />
                      <div
                        className={`h-9 w-9 ${
                          IsDark ? "bg-gray-500 shadow-2xl" : "bg-gray-600"
                        } animate-bounce rounded-full transition-all duration-500 transform hover:translate-x-5 hover:opacity-90`}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 mt-4">No more data</p>
                )}
              </div>

              {/* Sidebar Section */}
              <Userscard />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
