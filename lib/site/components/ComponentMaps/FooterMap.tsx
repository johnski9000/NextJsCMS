import Footer from "../Footer/Footer";
const FooterComponent = {
  Footer: {
    component: Footer,
    name: "Footer",
    metadata: {
      props: {
        id: { type: "string", value: "footer", active: true },
        logo: {
          type: "image",
          format: "image",
          value: "/logo.webp",
          active: true,
        },
        links: {
          type: "array",
          value: [
            {
              label: { type: "string", value: "Pagedone", active: true },
              href: { type: "string", value: "/", active: true },
              active: true,
            },
            {
              label: { type: "string", value: "Products", active: true },
              href: { type: "string", value: "/", active: true },
              active: true,
            },
            {
              label: { type: "string", value: "Resources", active: true },
              href: { type: "string", value: "/", active: true },
              active: true,
            },
            {
              label: { type: "string", value: "Blogs", active: true },
              href: { type: "string", value: "/", active: true },
              active: true,
            },
            {
              label: { type: "string", value: "Support", active: true },
              href: { type: "string", value: "/", active: true },
              active: true,
            },
          ],
          active: true,
        },
        socialLinks: {
          type: "array",
          value: [
            {
              platform: { type: "string", value: "Twitter", active: true },
              href: { type: "string", value: "/", active: true },
              active: true,
            },
            {
              platform: { type: "string", value: "Instagram", active: true },
              href: { type: "string", value: "/", active: true },
              active: true,
            },
            {
              platform: { type: "string", value: "Facebook", active: true },
              href: { type: "string", value: "/", active: true },
              active: true,
            },
            {
              platform: { type: "string", value: "YouTube", active: true },
              href: { type: "string", value: "/", active: true },
              active: true,
            },
          ],
          active: true,
        },
        copyrightText: {
          type: "string",
          value: `Setoria Security Ltd ${new Date().getFullYear()}, All rights reserved.`,
          active: true,
        },
      },
    },
  },
};

const FooterMap = Object.keys(FooterComponent).reduce((acc, key) => {
  acc[key] = FooterComponent[key];
  return acc;
}, {} as Record<string, any>);

export default FooterMap;
