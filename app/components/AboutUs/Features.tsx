import React from "react";
import Image from "next/image";
import { formatProps } from "@/app/utils/formatProps";
import Link from "next/link";

interface FeaturesProps {
  id: { value: string; active: boolean };
  title: {
    type: string;
    value: string;
    active: boolean;
  };
  subtitle: {
    type: string;
    value: string;
    active: boolean;
  };
  description: {
    type: string;
    value: string;
    active: boolean;
  };
  features: {
    type: string;
    value: Array<{
      text: {
        type: string;
        value: string;
        active: boolean;
      };
    }>;
    active: boolean;
  };
  images: {
    type: string;
    value: Array<{
      image: {
        type: string;
        format: string;
        value: string;
        active: boolean;
      };
      alt: {
        type: string;
        value: string;
        active: boolean;
      };
    }>;
    active: boolean;
  };
  ctaText: {
    type: string;
    value: string;
    active: boolean;
  };
  ctaUrl: {
    type: string;
    value: string;
    active: boolean;
  };
}

const defaultFeatures: Required<FeaturesProps> = {
  id: { value: "why-choose-us", active: true },
  title: {
    type: "string",
    value: "Why Choose Setoria Security?",
    active: true,
  },
  subtitle: {
    type: "string",
    value: "Reliable, Professional & 24/7 Security Services",
    active: true,
  },
  description: {
    type: "string",
    value:
      "Setoria Security is your **go-to security provider** in **Manchester and Cheshire**, offering **comprehensive security solutions** for businesses, events, and residential properties. We combine **advanced surveillance technology** with **expertly trained security guards** to ensure complete safety and protection.",
    active: true,
  },
  features: {
    type: "array",
    value: [
      {
        text: {
          type: "string",
          value:
            "✔ Over 15 years of experience in **corporate, event, and residential security**.",
          active: true,
        },
      },
      {
        text: {
          type: "string",
          value:
            "✔ 24/7 availability for **door supervision, mobile patrols, and security monitoring**.",
          active: true,
        },
      },
      {
        text: {
          type: "string",
          value:
            "✔ Fully **SIA-licensed security personnel** trained in **risk assessment and conflict resolution**.",
          active: true,
        },
      },
    ],
    active: true,
  },
  images: {
    type: "array",
    value: [
      {
        image: {
          type: "image",
          format: "image",
          value: "https://pagedone.io/asset/uploads/1717759413.png",
          active: true,
        },
        alt: {
          type: "string",
          value: "Setoria Security providing event security services",
          active: true,
        },
      },
      {
        image: {
          type: "image",
          format: "image",
          value: "https://pagedone.io/asset/uploads/1717759425.png",
          active: true,
        },
        alt: {
          type: "string",
          value: "Setoria Security professional security team in action",
          active: true,
        },
      },
      {
        image: {
          type: "image",
          format: "image",
          value: "https://pagedone.io/asset/uploads/1717759437.png",
          active: true,
        },
        alt: {
          type: "string",
          value: "Security operations conducted by Setoria Security",
          active: true,
        },
      },
    ],
    active: true,
  },
  ctaText: {
    type: "string",
    value: "Get a Free Security Consultation",
    active: true,
  },
  ctaUrl: {
    type: "string",
    value: "/contact",
    active: true,
  },
};

const WhyChooseUs: React.FC<FeaturesProps> = (props) => {
  const formattedProps = formatProps(props);
  const mergedProps = { ...defaultFeatures, ...formattedProps };

  return (
    <section className="py-24 relative " id={mergedProps.id.value}>
      <div className="max-w-7xl mx-auto px-4 md:px-5 lg:px-5">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Content Section */}
          <div className="flex flex-col gap-7">
            {/* Title & Subtitle */}
            <div className="flex flex-col gap-2.5">
              <span className=" text-base font-medium text-center lg:text-start">
                {mergedProps.subtitle?.value}
              </span>
              <h2 className=" text-4xl font-bold text-center lg:text-start">
                {mergedProps.title?.value}
              </h2>
            </div>

            {/* Description */}
            <p className=" text-base text-center lg:text-start">
              {mergedProps.description?.value}
            </p>

            {/* Features List */}
            <ul className="flex flex-col gap-3">
              {mergedProps.features?.value?.map((feature, index) => (
                <li key={index} className="flex items-center gap-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="rgba(209,159,78,1)"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M8 11.7236L9.53269 13.2563C10.1994 13.923 10.5327 14.2563 10.9469 14.2563C11.3611 14.2563 11.6945 13.923 12.3611 13.2563L16.6704 8.94702"
                      stroke="rgba(209,159,78,1)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h6 className=" text-sm font-normal leading-snug">
                    {feature?.text?.value}
                  </h6>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link href={mergedProps.ctaUrl?.value}>
              <button className="w-full sm:w-fit px-4 py-2 !text-black bg-[rgba(209,159,78,1)] hover:bg-opacity-80 transition-all duration-700 rounded-lg shadow-md flex justify-center items-center">
                <span className=" text-sm font-medium">
                  {mergedProps.ctaText?.value}
                </span>
              </button>
            </Link>
          </div>

          {/* Images Section */}
          <div className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {mergedProps.images.value
                .slice(0, mergedProps.images.value.length - 1)
                .map((img, index) => {
                  const { image, alt } = img;
                  return (
                    <Image
                      key={index}
                      src={image.value}
                      alt={alt.value}
                      width={500}
                      height={400}
                      className="w-full object-cover rounded-3xl max-h-[300px]"
                    />
                  );
                })}
            </div>
            {mergedProps.images.value[2].image.active && (
              <Image
                src={mergedProps.images.value[2].image.value}
                alt={mergedProps.images.value[2].alt.value}
                width={500}
                height={400}
                className="w-full object-cover rounded-3xl max-h-[300px]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
