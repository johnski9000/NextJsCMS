import React from "react";

interface BannerProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
}

const defaultBanner: BannerProps = {
  title: "Explore the World",
  subtitle: "Embark on unforgettable journeys. Book your dream vacation today!",
  imageUrl: "https://readymadeui.com/cardImg.webp",
  buttonText: "Book Now",
  buttonLink: "#",
};

const BannerCentered: React.FC<BannerProps> = (props) => {
  const mergedProps = { ...defaultBanner, ...props }; // Merge defaults & passed props

  return (
    <div className="relative font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
      <img
        src={mergedProps.imageUrl}
        alt="Banner Image"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
        <h2 className="sm:text-4xl text-2xl font-bold mb-6">
          {mergedProps.title}
        </h2>
        <p className="sm:text-lg text-base text-center text-gray-200">
          {mergedProps.subtitle}
        </p>

        <a href={mergedProps.buttonLink}>
          <button
            type="button"
            className="mt-12 bg-transparent text-white text-base py-3 px-6 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300"
          >
            {mergedProps.buttonText}
          </button>
        </a>
      </div>
    </div>
  );
};

export default BannerCentered;
