import { formatProps } from "@/app/utils/formatProps";
import { Button } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

interface BannerProps {
  imageUrl?: { value: string; active: boolean };
  alt?: { value: string; active: boolean };
  main?: boolean;
  title?: { value: string; active: boolean };
  description?: { value: string; active: boolean };
  owner?: { value: string; active: boolean };
  linkLabel?: { value: string; active: boolean };
  linkUrl?: { value: string; active: boolean };
  backgroundOverlay?: string;
}

const defaultBanner: BannerProps = {
  imageUrl: { value: "https://readymadeui.com/cardImg.webp", active: true },
  alt: { value: "Default banner image", active: true },
  main: true,
  title: { value: "Welcome to Our Website", active: true },
  description: { value: "Providing top-tier solutions", active: true },
  owner: { value: "Janusz Wozniak", active: true },
  linkLabel: { value: "Free Consultation", active: true },
  linkUrl: { value: "/contact", active: true },
  backgroundOverlay: "rgba(0, 0, 0, 0.6)", // Default overlay color
};

const ImageBanner: React.FC<BannerProps> = (props) => {
  // Merge defaultBanner with props
  const formattedProps = formatProps(props);

  const mergedProps = { ...defaultBanner, ...formattedProps };
  return (
    <div className="h-[95vh] relative z-10">
      {mergedProps.imageUrl?.active && (
        <Image
          src={mergedProps.imageUrl.value}
          alt={mergedProps.alt?.active ? mergedProps.alt.value : "Banner"}
          layout="fill"
          objectFit="cover"
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
          quality={90}
        />
      )}

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: mergedProps.backgroundOverlay }}
        role="presentation"
        aria-hidden="true"
      >
        <div className="max-w-screen-xl content-box p-4 w-full h-full flex items-center relative">
          <div className="inner flex flex-col max-w-[1/2vw]">
            {mergedProps.main ? (
              <h1 className="text-3xl md:text-6xl font-black pb-3 text-white text-center md:text-left">
                {mergedProps.title?.active ? mergedProps.title.value : ""}
              </h1>
            ) : (
              <h2 className="text-3xl md:text-6xl font-black pb-3 text-white text-center md:text-left">
                {mergedProps.title?.active ? mergedProps.title.value : ""}
              </h2>
            )}

            {mergedProps.description?.active && (
              <div
                className="text !text-gray-200 italic text-center md:text-left"
                aria-label={`Description: ${mergedProps.description.value}`}
              >
                &quot;{mergedProps.description.value}&quot; -{" "}
                {mergedProps.owner?.active ? mergedProps.owner.value : ""}
              </div>
            )}

            {mergedProps.linkLabel?.active && (
              <div className="link-box flex md:flex-row flex-col justify-center items-center md:justify-normal md:items-start gap-6 pt-8">
                <Link href={mergedProps.linkUrl.value ?? "/contact"}>
                  <Button
                    className="text-white font-medium text-sm px-4 py-2"
                    styles={{
                      root: {
                        backgroundColor: "#161a1d", // Dark background for the button
                        color: "white", // White text color
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor: "rgb(161, 156, 76)", // Hover color
                        },
                      },
                    }}
                  >
                    {" "}
                    {mergedProps.linkLabel.value}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageBanner;
