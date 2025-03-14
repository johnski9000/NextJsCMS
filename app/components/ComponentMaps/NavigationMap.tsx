import CenteredNav from "../Navigation/CenteredNav";
import ModernNav from "../Navigation/ModernNav";

const NavigationComponent = {
  CenteredNav: {
    component: CenteredNav,
    name: "Centered Navigation with CTA & Mobile Drawer",
    metadata: {
      props: {
        id: { type: "string", value: "centered-nav", active: true },
        logo: {
          type: "image",
          format: "image",
          value: "/logo.webp",
          active: true,
        },
        menuItems: {
          type: "array",
          value: [
            {
              label: {
                type: "string",
                value: "Home",
                active: true,
              },
              href: {
                type: "string",
                value: "/",
                active: true,
              },
            },
            {
              label: {
                type: "string",
                value: "About",
                active: true,
              },
              href: {
                type: "string",
                value: "/about",
                active: true,
              },
            },
            {
              label: {
                type: "string",
                value: "Services",
                active: true,
              },
              href: {
                type: "string",
                value: "/services",
                active: true,
              },
            },
            {
              label: {
                type: "string",
                value: "Contact",
                active: true,
              },
              href: {
                type: "string",
                value: "/contact",
                active: true,
              },
            },
          ],
          active: true,
        },
        cta: {
          type: "string",
          value: "Get Started",
          active: true,
        },
        ctaUrl: {
          type: "string",
          value: "/contact",
          active: true,
        },
      },
    },
  },
  ModernNav: {
    component: ModernNav,
    name: "Modern Navigation with Fixed Header & Mobile Drawer",
    metadata: {
      props: {
        id: { type: "string", value: "modern-nav", active: true },
        logo: {
          type: "image",
          format: "image",
          value: "/logo.webp",
          active: true,
        },
        menuItems: {
          type: "array",
          value: [
            {
              label: {
                type: "string",
                value: "Home",
                active: true,
              },
              href: {
                type: "string",
                value: "/",
                active: true,
              },
            },
            {
              label: {
                type: "string",
                value: "About Us",
                active: true,
              },
              href: {
                type: "string",
                value: "/about",
                active: true,
              },
            },
            {
              label: {
                type: "string",
                value: "Products",
                active: true,
              },
              href: {
                type: "string",
                value: "/products",
                active: true,
              },
            },
            {
              label: {
                type: "string",
                value: "Features",
                active: true,
              },
              href: {
                type: "string",
                value: "/features",
                active: true,
              },
            },
          ],
          active: true,
        },
        cta_1: { type: "string", value: "Log In", active: true },
        ctaUrl_1: { type: "string", value: "/login", active: true },
        cta_2: { type: "string", value: "Sign Up", active: true },
        ctaUrl_2: { type: "string", value: "/signup", active: true },
      },
    },
  },
};

const NavigationMap = Object.keys(NavigationComponent).reduce((acc, key) => {
  acc[key] = NavigationComponent[key];
  return acc;
}, {} as Record<string, any>);

export default NavigationMap;
