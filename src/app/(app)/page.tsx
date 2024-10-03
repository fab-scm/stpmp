import Image from "next/image";

export default function IndexPage() {
  return (
    <div className="container relative max-w-screen-2xl items-center p-6">
      <div className="h-[500px] w-full">
        <div className="relative flex justify-around h-full w-full p-5">
          <div className="w-3/5">
            <Image
              src="/satellite-imagery-1.jpg"
              alt="Satellite image"
              className="static object-cover w-full h-full rounded-3xl"
              // fill={true}
              width={7292}
              height={7292}
            />
          </div>
          <div className="static w-2/5 border-1 h-full text-center align-middle p-4"></div>
        </div>
      </div>
      <div className="h-[500px] w-full">
        <div className="relative flex justify-around h-full w-full p-5">
          <div className="static w-2/5 border-1 h-full text-center align-middle p-4"></div>
          <div className="w-3/5">
            <Image
              src="/satellite-imagery-2.jpg"
              alt="Satellite image"
              className="static object-cover w-full h-full rounded-3xl"
              // fill={true}
              width={5000}
              height={5000}
            />
          </div>
        </div>
      </div>
      <div className="h-[500px] w-full">
        <div className="relative flex justify-around h-full w-full p-5">
          <div className="w-3/5">
            <Image
              src="/satellite-imagery-3.jpg"
              alt="Satellite image"
              className="static object-cover w-full h-full rounded-3xl"
              // fill={true}
              width={2468}
              height={2640}
            />
          </div>
          <div className="static w-2/5 border-1 h-full text-center align-middle p-4"></div>
        </div>
      </div>
    </div>
  );
}
