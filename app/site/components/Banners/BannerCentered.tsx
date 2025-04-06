import { formatProps } from "@/app/utils/formatProps";
import React from "react";

interface BannerProps {
  title?: { value: string; active: boolean };
  subtitle?: { value: string; active: boolean };
  image?: { value: string; active: boolean; format?: string };
  buttonText?: { value: string; active: boolean };
  buttonLink?: { value: string; active: boolean };
}

const defaultBanner: BannerProps = {
  title: { value: "Explore the World", active: true },
  subtitle: {
    value: "Embark on unforgettable journeys. Book your dream vacation today!",
    active: true,
  },
  image: {
    value: "https://readymadeui.com/cardImg.webp",
    active: true,
    format: "image",
  },
  buttonText: { value: "Book Now", active: true },
  buttonLink: { value: "#", active: true },
};

const BannerCentered: React.FC<BannerProps> = (props) => {
  const formattedProps = formatProps(props);
  const mergedProps = { ...defaultBanner, ...formattedProps };
  return (
    <div className="relative font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
      {/* Background Image */}
      {mergedProps.image?.active && mergedProps.image.value && (
        <img
          src={mergedProps.image.value}
          alt="Banner Image"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Content Box */}
      <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
        {/* Title */}
        {mergedProps.title?.active && (
          <h2 className="sm:text-4xl text-2xl font-bold mb-6">
            {mergedProps.title.value}
          </h2>
        )}

        {/* Subtitle */}
        {mergedProps.subtitle?.active && (
          <p className="sm:text-lg text-base text-center text-gray-200">
            {mergedProps.subtitle.value}
          </p>
        )}

        {/* Call to Action */}
        {mergedProps.buttonText?.active && mergedProps.buttonLink?.active && (
          <a href={mergedProps.buttonLink.value}>
            <button
              type="button"
              className="mt-12 bg-transparent text-white text-base py-3 px-6 border border-white rounded-lg hover: hover: transition duration-300"
            >
              {mergedProps.buttonText.value}
            </button>
          </a>
        )}
      </div>
    </div>
  );
};

export default BannerCentered;
