import { formatProps } from "@/app/utils/formatProps";
import { ParsedPart, parseMarkdownBold } from "@/app/utils/parseMarkdown";
import Link from "next/link";

interface AboutUsProps {
  id: { value: string; active: boolean };
  title?: {
    type: string;
    value: string;
    active: boolean;
  };
  subtitle?: {
    type: string;
    value: string;
    active: boolean;
  };
  description?: {
    type: string;
    value: string;
    active: boolean;
  };
  stats?: {
    type: string;
    value: Array<{
      label: {
        type: string;
        value: string;
        active: boolean;
      };
      metric: {
        type: string;
        value: string;
        active: boolean;
      };
      active: boolean;
    }>;
    active: boolean;
  };
  images?: {
    type: string;
    value: Array<{
      image: {
        type: string;
        format: string;
        value: string;
        active: boolean;
      };
    }>;
    active: boolean;
  };
  cta?: {
    type: string;
    value: string;
    active: boolean;
  };
  ctaUrl?: {
    type: string;
    value: string;
    active: boolean;
  };
}

const defaultAboutUs: AboutUsProps = {
  id: { value: "about-us", active: true },
  title: {
    type: "string",
    value: "Leading Security Services Provider in Manchester & Cheshire",
    active: true,
  },
  subtitle: {
    type: "string",
    value: "Trusted Security Solutions for Every Need",
    active: true,
  },
  description: {
    type: "string",
    value:
      "At Setoria Security, we specialize in providing **top-tier security solutions** tailored for businesses, high-profile events, and residential properties. Our team of **SIA-licensed security professionals** is dedicated to ensuring safety, trust, and peace of mind for our clients across **Manchester and Cheshire**.",
    active: true,
  },
  stats: {
    type: "array",
    value: [
      {
        label: {
          type: "string",
          value: "Years of Industry Expertise",
          active: true,
        },
        metric: {
          type: "string",
          value: "15+",
          active: true,
        },
        active: true,
      },
      {
        label: {
          type: "string",
          value: "Trained Security Personnel",
          active: true,
        },
        metric: {
          type: "string",
          value: "100+",
          active: true,
        },
        active: true,
      },
      {
        label: {
          type: "string",
          value: "Satisfied Clients & Businesses",
          active: true,
        },
        metric: {
          type: "string",
          value: "500+",
          active: true,
        },
        active: true,
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
          value: "https://pagedone.io/asset/uploads/1717741205.png",
          active: true,
        },
      },
      {
        image: {
          type: "image",
          format: "image",
          value: "https://pagedone.io/asset/uploads/1717741215.png",
          active: true,
        },
      },
    ],
    active: true,
  },
  cta: {
    type: "string",
    value: "Discover Our Security Services",
    active: true,
  },
  ctaUrl: {
    type: "string",
    value: "/services",
    active: true,
  },
};
const AboutUs: React.FC<AboutUsProps> = (props) => {
  const formattedProps = formatProps(props);
  const mergedProps = { ...defaultAboutUs, ...formattedProps };

  // Convert stats object to an array
  const statsArray = mergedProps.stats.value;
  const parsedDescription: ParsedPart[] = parseMarkdownBold(
    mergedProps?.description?.value || ""
  );
  return (
    <section className="py-24 relative" id={mergedProps.id.value}>
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
          {/* Dynamic Images Section */}
          <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
            {mergedProps.images &&
              mergedProps?.images?.value?.map((item, index) => {
                const { image } = item;
                return (
                  image.active && (
                    <div
                      key={index}
                      className={`${
                        index === 0
                          ? "pt-24 lg:justify-center sm:justify-end"
                          : "sm:ml-0 ml-auto"
                      } justify-start items-start gap-2.5 flex`}
                    >
                      <img
                        className="rounded-xl object-cover"
                        src={image.value}
                        alt={`Image ${index + 1}`}
                      />
                    </div>
                  )
                );
              })}
          </div>

          {/* Content Section */}
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                <span className=" text-base font-medium text-center lg:text-start">
                  {mergedProps.subtitle?.value}
                </span>
                {mergedProps.title?.active && (
                  <h2 className=" text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    {mergedProps.title.value}
                  </h2>
                )}
                {mergedProps.description?.active && (
                  <p className=" text-base font-normal leading-relaxed lg:text-start text-center">
                    {parsedDescription.map((part, index) =>
                      part.type === "bold" ? (
                        <strong key={index}>{part.content}</strong>
                      ) : (
                        <span key={index}>{part.content}</span>
                      )
                    )}
                  </p>
                )}
              </div>

              {/* Dynamic Stats Section */}
              <div className="w-full lg:justify-start justify-center sm:items-center sm:gap-10 gap-5 inline-flex flex-col sm:flex-row">
                {statsArray.map((stat, index) => (
                  <div
                    key={index}
                    className="flex-col justify-start items-center md:items-start inline-flex"
                  >
                    {stat.metric.active && (
                      <h3 className=" text-4xl font-bold font-manrope leading-normal">
                        {stat.metric.value}
                      </h3>
                    )}
                    {stat.label.active && (
                      <h6 className=" text-base font-normal leading-relaxed">
                        {stat.label.value}
                      </h6>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            {mergedProps.cta?.active && (
              <Link href="/services">
                <button className="sm:w-fit w-full px-3.5 py-2 !text-black bg-[rgba(209,159,78,1)] hover:bg-opacity-80 transition-all duration-700 ease-in-out rounded-lg shadow-md justify-center items-center flex">
                  <span className="px-1.5  text-sm  font-medium leading-6">
                    {mergedProps.cta.value}
                  </span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
