import { formatProps } from "@/app/utils/formatProps";
import Link from "next/link";

interface TextBannerProps {
  overTitle?: { value: string; active: boolean };
  title?: { value: string; active: boolean };
  italic?: { value: string; active: boolean };
  description?: { value: string; active: boolean };
  buttonText?: { value: string; active: boolean };
  buttonLink?: { value: string; active: boolean };
}

const defaultTextBanner: Required<TextBannerProps> = {
  overTitle: { value: "Special Offer", active: true },
  title: { value: "Discover Our", active: true },
  italic: { value: "Exclusive Services", active: true },
  description: {
    value: "Providing top-tier web solutions tailored to your business needs.",
    active: true,
  },
  buttonText: { value: "Contact Us", active: true },
  buttonLink: { value: "/contact", active: true },
};

const TextBanner: React.FC<TextBannerProps> = (props) => {
  const formattedProps = formatProps(props);
  const mergedProps = { ...defaultTextBanner, ...formattedProps };

  return (
    <section className="h-[93vh] relative ">
      {/* Overlay Section */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80">
        <div className="content-box p-6 w-full h-full flex justify-center text-center items-center relative">
          <div className="inner flex flex-col max-w-3xl space-y-6">
            {/* Over Title */}
            {mergedProps.overTitle.active && (
              <span className="w-fit mx-auto inline-block py-1 px-3 text-xs font-semibold text-orange-900 bg-orange-50 rounded-full">
                {mergedProps.overTitle.value}
              </span>
            )}

            {/* Main Title */}
            {(mergedProps.title.active || mergedProps.italic.active) && (
              <h1 className="font-heading text-3xl xs:text-5xl md:text-6xl font-bold  leading-tight">
                {mergedProps.title.active ? mergedProps.title.value : ""}{" "}
                {mergedProps.italic.active && (
                  <span className="italic">{mergedProps.italic.value}</span>
                )}
              </h1>
            )}

            {/* Description */}
            {mergedProps.description.active && (
              <p className="text-lg  leading-relaxed">
                {mergedProps.description.value}
              </p>
            )}

            {/* CTA Button */}
            {mergedProps.buttonText.active && (
              <div className="link-box max-w-[400px] w-full flex flex-col justify-center items-center mx-auto gap-6 pt-8">
                <Link
                  href={mergedProps.buttonLink.link ?? "/contact"}
                  className={`${
                    mergedProps.buttonText.value === "Go Back Home"
                      ? "bg-[#f99005] "
                      : "text-gray-300 bg-black border-gray-700 border-[1px]"
                  } w-full text-center rounded-md shadow-2xl px-4 py-2 tracking-widest font-bold`}
                  aria-label={mergedProps.buttonText.value}
                >
                  {mergedProps.buttonText.value}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextBanner;
