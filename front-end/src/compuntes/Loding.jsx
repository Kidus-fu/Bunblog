import { useSelector } from "react-redux"
import {Card, Skeleton} from "@nextui-org/react";
import Navber from "./Navber";
import Footer from "./Footer";


export function Loadingui(){

  const IsDark = useSelector((state) => state.userinfo.IsDark);
  return(
    <>
    <div
      className={IsDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}
    >
      <Navber />
      <section className="relative">
        <div className="p-3">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-12">
           
          <Card className={` h-96 space-y-5 p-1  ${IsDark ? "dark":''}`} radius="lg">
        <Skeleton className="rounded-lg h-64" isLoaded={false}>
          <div className="h-24 rounded-lg bg-secondary" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg" isLoaded={false}>
            <div className="h-3 w-full rounded-lg bg-secondary" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg" isLoaded={false}>
            <div className="h-3 w-full rounded-lg bg-secondary-300" />
          </Skeleton>
          
        </div>
      </Card>
            <div className="h-full col-span-2 ">
            <Card className={`${IsDark ? "dark":""} w-full h-full space-y-5 p-4`} radius="lg">
      <Skeleton className="rounded-lg h-72">
        <div className="h-24 rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
            </div>

            <Card className={`h-42 ${IsDark ? "dark":""} m-4`}>
            <div
          className={`sticky top-16 ${
            IsDark ? "bg-MenuColor" : "bg-MenuColor"
          } hidden h-fit lg:block p-6 rounded-lg shadow-md`}
        >
          <Skeleton className={` h-3 w-20 rounded-lg `}/>
          <hr className="border my-2" />
          <div className="mt-4 text-lg">
          <div className="max-w-[300px] w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>
    <div className="max-w-[300px] w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>
    <div className="max-w-[300px] w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
      </div>
    </div>
          </div>
        </div>
        </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  </>
  )
}

export  function Loading(){

  const IsDark =  useSelector(state => state.userinfo.IsDark)
  return(
        <div className={`flex justify-center items-center h-screen ${IsDark ? 'bg-gray-800 text-white':'bg-gray-100'}`}>
        <div className="text-center">
          <img
            src={IsDark ? 'https://th.bing.com/th/id/R.b77f96dcc937e7c9606d1f27dd00c21e?rik=wGlF6U86%2buSSRw&pid=ImgRaw&r=0':`https://th.bing.com/th/id/R.283c1ca1b7db46617327cde50b2dcfbd?rik=Z7BUVWHh2nnnCw&pid=ImgRaw&r=0`}
            alt="Loading"
            className="w-12 mx-auto"
          />
          <h1 className="text-5xl font-bold mt-4">BunaBlog</h1>
          <div className="flex justify-center mt-4">
            <div className={`${IsDark ? 'bg-white':'bg-black'} rounded-full animate-ping h-10 w-10 m-2`}></div>
            <div className={`${IsDark ? 'bg-white':'bg-black'} rounded-full animate-ping h-10 w-10 m-2`}></div>
            <div className={`${IsDark ? 'bg-white':'bg-black'} rounded-full animate-ping h-10 w-10 m-2`}></div>
          </div>
        </div>
      </div>
    )
}