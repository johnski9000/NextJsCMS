import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div className="bg-[url('https://pagedone.io/asset/uploads/1719484344.png')] bg-no-repeat bg-cover w-full bg-center">
      <section className="w-full lg:pt-[84px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full flex-col justify-start items-start gap-14 pt-14 inline-flex">
            <div className="w-full flex-col justify-start items-center lg:gap-28 gap-16 flex">
              <div className="w-full flex-col justify-start items-center gap-8 flex">
                <div className="w-full flex-col justify-start items-center gap-2.5 flex">
                  <div className="w-fit px-4 py-2 bg-black/opacity-10 rounded-full border border-orange-500 justify-center items-center gap-2 inline-flex">
                    <span className="text-center text-white text-xs font-normal leading-tight">
                      All in one Saas Dashboard, Get 50% Off Now
                    </span>
                  </div>
                  <h2 className="text-center text-white md:text-6xl text-5xl font-bold font-manrope md:leading-normal leading-relaxed">
                    Efficiency Management
                  </h2>
                  <p className="lg:max-w-lg w-full text-center text-white text-base font-normal leading-relaxed">
                    Optimize Operations, Elevate Performance. Unlock Your
                    Team&apos;s Full Potential with Seamless Workflow Solutions.
                  </p>
                </div>
                <div className="w-full justify-center items-start gap-3 flex sm:flex-row flex-col">
                  <button className="sm:w-fit w-full px-5 py-2.5 bg-orange-500 hover:bg-orange-600 transition-all duration-700 ease-in-out rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                    <span className="px-2 py-px text-white text-base font-semibold leading-relaxed">
                      Try Free Version
                    </span>
                  </button>
                  <button className="sm:w-fit w-full group px-5 py-2.5 rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-white hover:border-gray-300 transition-all duration-700 ease-in-out justify-center items-center flex">
                    <span className="px-2 text-white hover:text-gray-300 transition-all duration-700 ease-in-out text-base font-semibold leading-relaxed">
                      Book Your Demo
                    </span>
                  </button>
                </div>
              </div>
              <Image
                src="https://pagedone.io/asset/uploads/1719485061.png"
                alt="Dashboard"
                width={1200}
                height={600}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
