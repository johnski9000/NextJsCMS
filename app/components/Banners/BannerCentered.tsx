import React from "react";

interface BannerProps {
  title?: { type: string; default: string };
  subtitle?: { type: string; default: string };
  imageUrl?: { type: string; default: string; format?: string };
  buttonText?: { type: string; default: string };
  buttonLink?: { type: string; default: string };
}

const defaultBanner: BannerProps = {
  title: { type: "string", default: "Explore the World" },
  subtitle: {
    type: "string",
    default:
      "Embark on unforgettable journeys. Book your dream vacation today!",
  },
  imageUrl: {
    type: "string",
    default: "https://readymadeui.com/cardImg.webp",
    format: "image",
  },
  buttonText: { type: "string", default: "Book Now" },
  buttonLink: { type: "string", default: "#" },
};

const BannerCentered: React.FC<BannerProps> = (props) => {
  console.log("BannerCentered Props:", props);

  // Convert the numeric-key object into an array
  const propsArray = Object.values(props).filter(
    (item) => typeof item === "object" && item.key
  );

  // Transform the array into the desired object format
  const transformedObject = propsArray.reduce(
    (acc, { key, format, ...rest }) => {
      acc[key] = { ...rest };
      if (format) acc[key].format = format; // Add format only if it exists
      return acc;
    },
    {}
  );

  // Merge with default props
  const mergedProps = { ...defaultBanner, ...transformedObject };

  console.log("Transformed Object:", transformedObject);
  console.log("Merged Props:", mergedProps);

  return (
    <div className="relative font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
      <img
        src={mergedProps.imageUrl?.default || defaultBanner.imageUrl.default}
        alt="Banner Image"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="min-h-[350px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
        <h2 className="sm:text-4xl text-2xl font-bold mb-6">
          {mergedProps.title?.default}
        </h2>
        <p className="sm:text-lg text-base text-center text-gray-200">
          {mergedProps.subtitle?.default}
        </p>

        <a href={mergedProps.buttonLink?.default}>
          <button
            type="button"
            className="mt-12 bg-transparent text-white text-base py-3 px-6 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300"
          >
            {mergedProps.buttonText?.default}
          </button>
        </a>
      </div>
    </div>
  );
};

export default BannerCentered;
