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
                <div className="inline-block px-4 py-2 bg-black bg-opacity-50 rounded-full mb-4">
                  <span className="text-orange-300 font-medium">
                    Ignite Your Online Presence
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-white font-manrope leading-tight">
                  Easily Manage Your Websites
                </h1>

                <p className="max-w-2xl mx-auto text-gray-100 text-lg">
                  Simplify your website management with our intuitive dashboard.
                  Host, customize, and optimize your websites—all in one place.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 transition-all duration-300 rounded-full shadow-md text-black font-semibold">
                    Get Started
                  </button>

                  <button className="px-6 py-2.5 border border-white hover:border-gray-300 transition-all duration-300 rounded-full text-white font-semibold">
                    View Plans
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
