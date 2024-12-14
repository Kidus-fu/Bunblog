import { useSelector } from "react-redux";
import Navber from "../compuntes/Navber";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api"; // Import your API utility
import {Loading} from "../compuntes/Loding";

import {
  CardBody,
  Card,
  CardHeader,
  Image,
  CardFooter,
  Button,
} from "@nextui-org/react";
import Footer from "../compuntes/Footer";
import { useParams } from "react-router";

export default function SinglPost() {
  const IsDark = useSelector((state) => state.userinfo.IsDark);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userdata = useSelector((state) => state.userinfo.userinfoobj);
  const [userPostData, setUserPostData] = useState([]);
  const [otherpost,setOtherpost] = useState([])
  const promt = useParams()
  console.log(promt);
  
  useEffect(() => {
    if (promt.id){ 
    api
      .get(`blog/posts/${promt.id}/`)
      .then((resp) => {
        console.log(resp);

        if (resp.status === 200) {
          setData(resp.data);
          console.log(resp.data);
          
        }
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      })
      .finally(() => {
        setLoading(false);
      });
    }
  }, []);

  const getmorepost = async () => {
    try {
      // Ensure Tags is properly extracted and converted to a string
      const Tags = data.tags[0]; // Get the first tag only (assuming `data.tags` is an array)
      const tag = Tags.split("#")
      const ftag = tag[tag.length  - 1]
      
      // Make an API call with the tag
      const response = await api.get(`blog/post/search/?tag=%23${ftag}`);
  
      setOtherpost(response.data.hits)
      
  
      return response.data; // Return the fetched data if needed
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
useEffect(() => {
getmorepost()
},[data])  
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
  // Handle case when data is not yet loaded
  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <div>Post not found.</div>;
  }

  const post = data;
  
  return (
    <>
      <div
        className={IsDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
      >
        <Navber />
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-full flex justify-between p-3">
          <Card className={`${IsDark ? "dark" : ""} py-4`}>
  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
    <p className="text-tiny uppercase font-bold text-gray-500">{post.username}</p>
    <h3 className="font-bold text-2xl mt-1">{post.header}</h3>
    <p className="mt-2 text-gray-700">{post.description}</p>
    <span className="bg-primary rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-black mb-5">
      Posted{" "}
      {new Date(post.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </span>
  </CardHeader>

  <CardBody className="overflow-visible py-2">
    <Image
      alt={post.header}
      className="object-cover rounded-xl shadow-lg transition-transform transform hover:scale-105"
      src={post.image}
      width={670}
      height={400}
    />
  </CardBody>

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

    <hr className="mt-5 border-t-2 border-gray-300" />

    <div className="flex justify-between mt-4">
      <div className="flex gap-1 text-sm text-gray-600">
        {post.likeinfo.slice(0, 3).map((like) => (
          <small key={like.username} className="text-gray-600">
            {like.username}
          </small>
        ))}
        <button className="text-btnColorMessHov text-xs">See more...</button>
      </div>

      <div className="flex items-center gap-2 text-gray-600">
        <div className="flex items-center gap-2">
          <i
            className={`fa-regular fa-thumbs-up text-2xl cursor-pointer ${
              post.likeinfo.some((p) => p.username === userdata.user)
                ? "text-btnColorMessHov"
                : "text-black"
            } hover:text-3xl`}
            onClick={() => {
              if (post.likeinfo.some((p) => p.username === userdata.user)) {
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
      </div>
    </div>
</Card>

          </div>
          <div className="flex-1   justify-center items-center mr-5">
          
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
                    post.profile_picture
                      ? `http://localhost:8000/${post.profile_picture}`
                      : "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                  }
                  alt=""
                  className="rounded-full h-20 w-20"
                />
              </div>
              <p
                className={`mt-4 line-clamp-3 ${
                  IsDark ? "text-gray-400 font-mono" : "text-sky-950 font-serif"
                }`}
              >
                Username : {post.username}
              </p>
              <p
                className={`mt-4 line-clamp-3 ${
                  IsDark ? "text-gray-400 font-mono" : "text-sky-950 font-serif"
                }`}
              >
                Email:
                <a href={`mailto:${post.postuseremail}`}>
                  {post.postuseremail}
                </a>
              </p>
              <hr
                className={`my-3 ${
                  IsDark ? "bg-slate-700" : "border-gray-600"
                }`}
              />
              <Link
                to="/article/1"
                className="text-gray-800 font-semibold mt-4 block"
              >
                Read More
              </Link>
            </div>
          </div>

         
        </div>
        <div className="gap-4 m-3 p-4 grid grid-cols-2  sm:grid-cols-4">
      {otherpost.slice(0,-1).map((post) => (
        /* eslint-disable no-console */
        <Card key={post.header} isPressable shadow="sm" className={IsDark ? "dark":""} onPress={() => console.log("post pressed")}>
          <CardBody className={`overflow-visible p-0`}>
          <a href={`/post/${post.objectID}`}>
            <Image
              alt={post.header}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={`http://localhost:8000/media/${post.image}`}
              width="100%"
            />
          </a>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{post.header}</b>
            <p className="text-default-500">{post.price}</p>
          </CardFooter>
            {/* Tags */}
        <small><b>Tags:</b></small>{" "}
        <small>{post.get_tags.join()}</small>
        </Card>
      ))}
    </div>
        <Footer />
      </div>
    </>
  );
}
