import Link from "next/link";

interface TextBannerProps {
  overTitle?: string;
  title?: string;
  italic?: string;
  description?: string;
  alt?: string;
  cta?: string;
  price?: string;
}

const defaultTextBanner: TextBannerProps = {
  overTitle: "Special Offer",
  title: "Discover Our",
  italic: "Exclusive Services",
  description:
    "Providing top-tier web solutions tailored to your business needs.",
  cta: "Get Started",
  price: "Contact us for pricing",
};

const TextBanner: React.FC<TextBannerProps> = (props) => {
  const mergedProps = { ...defaultTextBanner, ...props }; // Merge default & passed props

  return (
    <section className="h-[93vh] relative bg-white">
      {/* Overlay Section */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80">
        <div className="content-box p-6 w-full h-full flex justify-center text-center items-center relative">
          <div className="inner flex flex-col max-w-3xl space-y-6">
            {/* Over Title */}
            <span className="w-fit mx-auto inline-block py-1 px-3 text-xs font-semibold text-orange-900 bg-orange-50 rounded-full">
              {mergedProps.overTitle}
            </span>

            {/* Main Title */}
            <h1 className="font-heading text-3xl xs:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              {mergedProps.title}{" "}
              <span className="italic">{mergedProps.italic}</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              {mergedProps.description}
            </p>

            {/* CTA Buttons */}
            <div className="link-box max-w-[400px] w-full flex flex-col justify-center items-center mx-auto gap-6 pt-8">
              {mergedProps.cta === "Go Back Home" ? (
                <Link
                  href="/"
                  className="bg-[#f99005] w-full text-center text-black rounded-md shadow-2xl px-4 py-2 tracking-widest font-bold"
                >
                  {mergedProps.cta}
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="flex w-full justify-center text-gray-300 bg-black border-gray-700 border-[1px] px-4 py-2 rounded-tl-[10px] font-[500] text-sm font-mont tracking-widest hover:font-bold transition-all hover:rounded-tl-[0] hover:rounded-br-[25px]"
                >
                  {mergedProps.cta}
                </Link>
              )}

              {/* Secondary CTA */}
              <Link
                href="/contact"
                className="flex w-full justify-center text-gray-300 bg-black border-gray-700 border-[1px] px-4 py-2 rounded-tl-[10px] font-[500] text-sm font-mont tracking-widest hover:font-bold transition-all hover:rounded-tl-[0] hover:rounded-br-[25px]"
              >
                Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextBanner;
