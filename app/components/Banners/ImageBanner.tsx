import Image from "next/image";
import Link from "next/link";

interface BannerProps {
  banner?: string;
  src?: string;
  alt?: string;
  main?: boolean;
  title?: string;
  description?: string;
  owner?: string;
  linkLabel?: string;
  price?: string;
}

const defaultBanner: BannerProps = {
  banner: "https://readymadeui.com/cardImg.webp",
  alt: "Default banner image",
  main: true,
  title: "Welcome to Our Website",
  description: "Providing top-tier solutions",
  owner: "Janusz Wozniak",
  linkLabel: "Free Consultation",
};

const ImageBanner: React.FC<BannerProps> = (props) => {
  // Merge defaultBanner with props
  const mergedProps = { ...defaultBanner, ...props };

  return (
    <div className="h-[95vh] relative z-10">
      <Image
        src={mergedProps.banner ?? defaultBanner.banner}
        alt={mergedProps.alt ?? defaultBanner.alt}
        layout="fill"
        objectFit="cover"
        priority={true}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
        quality={90}
      />

      <div
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60"
        role="presentation"
        aria-hidden="true"
      >
        <div className="content-box p-4 w-full h-full flex items-center relative">
          <div className="inner flex flex-col max-w-[1/2vw]">
            {mergedProps.main ? (
              <h1 className="text-3xl md:text-6xl font-black pb-3 text-white text-center md:text-left">
                {mergedProps.title}
              </h1>
            ) : (
              <h2 className="text-3xl md:text-6xl font-black pb-3 text-white text-center md:text-left">
                {mergedProps.title}
              </h2>
            )}

            <div
              className="text !text-gray-200 italic text-center md:text-left"
              aria-label={`Description: ${mergedProps.description}`}
            >
              &quot;{mergedProps.description}&quot; - {mergedProps.owner}
            </div>

            <div className="link-box flex md:flex-row flex-col justify-center items-center md:justify-normal md:items-start gap-6 pt-8">
              <Link
                href="/contact"
                className="flex w-3/4 justify-center font-bold md:w-fit text-gray-300 bg-black border-gray-700 border-[1px] px-4 py-2 rounded-tl-[10px] font-[500] text-sm font-mont tracking-widest hover:font-bold transition-all hover:rounded-tl-[0] hover:rounded-br-[25px]"
              >
                {mergedProps.linkLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageBanner;
