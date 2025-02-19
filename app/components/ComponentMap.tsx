import BannerCentered from "./Banners/BannerCentered";
import TextBanner from "./Banners/TextBanner";
import ImageBanner from "./Banners/ImageBanner";

const ComponentMap = {
  BannerCentered: {
    component: BannerCentered,
    metadata: {
      props: {
        title: { type: "string", default: "Explore the World" },
        subtitle: {
          type: "string",
          default: "Book your dream vacation today!",
        },
        imageUrl: {
          type: "string",
          format: "image",
          default: "/images/default-banner.jpg",
        }, // Image
        buttonText: { type: "string", default: "Book Now" },
        buttonLink: { type: "string", default: "#" },
      },
    },
  },
  TextBanner: {
    component: TextBanner,
    metadata: {
      props: {
        overTitle: { type: "string", default: "Special Offer" },
        title: { type: "string", default: "Discover Our" },
        italic: { type: "string", default: "Exclusive Services" },
        description: {
          type: "string",
          default:
            "Providing top-tier web solutions tailored to your business needs.",
        },
        cta: { type: "string", default: "Get Started" },
      },
    },
  },
  ImageBanner: {
    component: ImageBanner,
    metadata: {
      props: {
        banner: {
          type: "string",
          format: "image",
          default: "/default-banner.jpg",
        }, // Image
        alt: { type: "string", default: "Default banner image" },
        main: { type: "boolean", default: true },
        title: { type: "string", default: "Welcome to Our Website" },
        description: {
          type: "string",
          default: "Providing top-tier solutions",
        },
        owner: { type: "string", default: "Janusz Wozniak" },
        linkLabel: { type: "string", default: "Free Consultation" },
      },
    },
  },
};

export default ComponentMap;
