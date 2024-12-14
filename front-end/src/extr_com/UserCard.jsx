import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router";
import api from "../api";
import { userinfoActions } from "../store/store";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner, 
  Skeleton
} from "@nextui-org/react";
export function UserCard(){
    const userdata = useSelector((state) => state.userinfo.userinfoobj);
    const IsDark = useSelector((state) => state.userinfo.IsDark);
    return(
        <>
        <div className="flex-1">
                <div
                  className={`hidden lg:block my-2 ${
                    IsDark
                      ? "bg-slate-800 text-white font-sans"
                      : "bg-white text-black"
                  } p-6 h-96 w-60 ml-5 rounded-lg`}
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={
                        userdata.profile_picture
                          ? userdata.profile_picture
                          : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                      }
                      alt=""
                      className="rounded-full h-20 w-20"
                    />
                  </div>
                  <p
                    className={`mt-4 line-clamp-3 ${
                      IsDark
                        ? "text-gray-400 font-mono"
                        : "text-sky-950 font-serif"
                    }`}
                  >
                    Bio: {userdata.bio}
                  </p>
                  <hr
                    className={`my-3 ${
                      IsDark ? "bg-slate-700" : "border-gray-600"
                    }`}
                  />
                  <a href={`mailto:${userdata.email}`}>email</a>
                  <Link
                    to="/article/1"
                    className="text-gray-800 font-semibold mt-4 block"
                  >
                    Read More
                  </Link>
                </div>
              </div>
              {/* Mobile verise */}
              <div className="flex-1 lg:hidden sm:block justify-center items-center mr-5">
                <div
                  className={`${
                    IsDark
                      ? "bg-slate-800 text-white font-sans"
                      : "bg-white text-black"
                  } p-6 h-96 w-full  rounded-lg  `}
                >
                  <div className="flex justify-center items-center">
                    <img
                      src={
                        userdata.profile_picture
                          ? userdata.profile_picture
                          : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                      }
                      alt=""
                      className="rounded-full h-20 w-20"
                    />
                  </div>
                  <p
                    className={`mt-4 line-clamp-3 ${
                      IsDark
                        ? "text-gray-400 font-mono"
                        : "text-sky-950 font-serif"
                    }`}
                  >
                    Bio: {userdata.bio}
                  </p>
                  <hr
                    className={`my-3 ${
                      IsDark ? "bg-slate-700" : "border-gray-600"
                    }`}
                  />
                  <a href={`mailto:${userdata.email}`}>email</a>
                  <Link
                    to="/article/1"
                    className="text-gray-800 font-semibold mt-4 block"
                  >
                    Read More
                  </Link>
                </div>
              </div>
        </>
    )
}

export function Userscard() {
    const IsDark = useSelector((state) => state.userinfo.IsDark);
    const [usersData, setUserData] = useState([]);
    const [dataOK, setDataOk] = useState(false);
    const dispatch = useDispatch();
  
    const handldata = async () => {
      try {
        const response = await api.get("api/userprofiles/");
        if (response.status === 200) {
          dispatch(userinfoActions.usersdata(response.data.results));
          setUserData(response.data.results.slice(0, 3));
          setDataOk(true);
        }
      } catch (error) {
        console.error("Failed to fetch user profiles:", error);
      }
    };
  
    useEffect(() => {
      handldata();
    }, []);
  
    if (dataOK) {
      return (
        <div
          className={`sticky top-16 ${
            IsDark ? "bg-MenuColor" : "bg-MenuColor"
          } hidden h-fit lg:block p-6 rounded-lg shadow-md`}
        >
          <h3 className="text-2xl font-semibold ">Users</h3>
          <hr className="border my-2" />
          <div className="mt-4 text-lg">
            {usersData.length > 0 ? (
              usersData.map((user) => (
                <div key={user.user} className="hover:scale-110">
                  <Link to={`/Profile/${user.user}`} className="">
                    <div className="flex gap-1">
                      <img
                        src={user.profile_picture}
                        alt={user.user}
                        className="h-12 w-12 my-2 rounded-full"
                      />
                      <small>{user.user}</small>
                    </div>
                    <small className="line-clamp-3 ml-5">{user.bio}</small>
                  </Link>
                </div>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
      );
    }
  
    return null;
  }

  export const UserTwitterCard = ({ userId = 1 }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
  
    const handlingdata = async () => {
      try {
        const resp = await api.get(`api/userprofile/${userId}/`);
        setData(resp.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        },1000); 
      }
    };
  
    useEffect(() => {
      handlingdata();
    }, [userId]); // Run the effect only when userId changes
  
    // Loading and error states
    if (isLoading) {
      return (
        <Card className="max-w-[300px] border-none bg-transparent" shadow="none">
          <CardHeader className="justify-between w-52">
            
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
          </CardHeader>
      <div className="w-full flex flex-col gap-2 my-4">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
          
          <div className="flex justify-center items-center">
            
          </div>
        </Card>
      );
    }
  
    if (data) {
      return (
        <Card className="max-w-[300px] border-none bg-transparent" shadow="none">
          <CardHeader className="justify-between">
            <div className="flex gap-3">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={data.profile_picture || "https://i.pravatar.cc/150?u=a04258114e29026702d"} // Use profile picture from API, fallback image if not available
              />
              <div className="flex flex-col items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">{data.user}</h4>
                <h5 className="text-small tracking-tight text-default-500">@{data.user}</h5>
              </div>
            </div>
            
              <Link to={`/Profile/${data.user}`}>
              <Button
              className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
              color="primary"
              radius="full"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              onPress={() => setIsFollowed(!isFollowed)}
            >Get </Button>
              </Link>
          </CardHeader>
          <CardBody className="px-3 py-0">
            <p className="text-small pl-px text-default-500">{data.bio}</p>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-1">
              <p className="font-semibold text-default-600 text-small">Birthdate: </p>
              <p className=" text-default-500 text-small">{data.birthdate}</p>
            </div>
          </CardFooter>
        </Card>
      );
    }
  
    // In case no data is found, you can show an error message or fallback UI
    return (
      <Card className="max-w-[300px] border-none bg-transparent" shadow="none">
        <CardHeader className="justify-between">
          <div className="flex gap-3">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />
            <div className="flex flex-col items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">No Data Available</h4>
            </div>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0">
          <p className="text-small text-default-500">Unable to load user data</p>
        </CardBody>
      </Card>
    );
  };
  