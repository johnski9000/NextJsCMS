import BannerCentered from "./Banners/BannerCentered";
import TextBanner from "./Banners/TextBanner";
import ImageBanner from "./Banners/ImageBanner";
import ServicesList from "./Services/ServicesList";
import AboutUs from "./AboutUs/AboutUs";
import Banner_Carousel from "./Banners/Banner_Carousel/Banner_Carousel";
import Contact from "./Contact/Contact";
import FAQ from "./FAQ/FAQ";
import TestimonialCarousel from "./Reviews/Testimonials";
import Footer from "./Footer/Footer";
import CenteredNav from "./Navbars/CenteredNav";
import WhyChooseUs from "./AboutUs/Features";

const Banners = {
  Banner_Carousel: {
    component: Banner_Carousel,
    name: "Banner Carousel",
    metadata: {
      props: {
        id: { type: "string", value: "banner-carousel", active: true },
        banners: {
          type: "array",
          value: [
            {
              image: {
                type: "image",
                format: "image",
                value:
                  "https://smartsecuritypros.com/wp-content/uploads/2021/09/on-site-security-guard-at-a-bar.jpg",
                active: true,
              },
              title: {
                type: "string",
                value: "Elite Bar and Club Security Services",
                active: true,
              },
              description: {
                type: "string",
                value:
                  "Ensure the safety of your patrons with our highly trained **bar and club security professionals**. Our expert security personnel are skilled in crowd management, conflict resolution, and emergency response, making your venue a safer space for guests.",
                active: true,
              },
              owner: {
                type: "string",
                value: "James Smith, Director of Security Operations",
                active: true,
              },
              linkLabel: {
                type: "string",
                value: "Explore Nightlife Security",
                active: true,
              },
              linkHref: {
                type: "string",
                value: "/services/nightlife-security",
                active: true,
              },
            },
            {
              image: {
                type: "image",
                format: "image",
                value:
                  "https://t-class.co.uk/wp-content/uploads/2021/04/Festival-and-Event-Security-Manchester.jpg",
                active: true,
              },
              title: {
                type: "string",
                value: "Event Security & Crowd Control Experts",
                active: true,
              },
              description: {
                type: "string",
                value:
                  "From **music festivals to corporate events**, our security team ensures smooth operations, crowd safety, and emergency preparedness. Trust our **SIA-licensed event security guards** to protect your attendees and maintain order at your venue.",
                active: true,
              },
              owner: {
                type: "string",
                value: "James Smith, Head of Event Security",
                active: true,
              },
              linkLabel: {
                type: "string",
                value: "Hire Event Security",
                active: true,
              },
              linkHref: {
                type: "string",
                value: "/services/event-security",
                active: true,
              },
            },
            {
              image: {
                type: "image",
                format: "image",
                value:
                  "https://i0.wp.com/airvis.co.uk/wp-content/uploads/Residential-security-services.png?fit=1500%2C1015&ssl=1",
                active: true,
              },
              title: {
                type: "string",
                value: "Residential Security & VIP Protection",
                active: true,
              },
              description: {
                type: "string",
                value:
                  "Protect your home, estate, or gated community with **24/7 residential security patrols** and cutting-edge surveillance solutions. Our **private security officers** provide VIP protection and deter intruders for ultimate peace of mind.",
                active: true,
              },
              owner: {
                type: "string",
                value: "James Smith, Director of Residential Protection",
                active: true,
              },
              linkLabel: {
                type: "string",
                value: "Get a Free Security Assessment",
                active: true,
              },
              linkHref: {
                type: "string",
                value: "/services/residential-security",
                active: true,
              },
            },
          ],
          active: true,
        },
        autoplaySpeed: { type: "number", value: 5000, active: true }, // Faster transitions for engagement
        fade: { type: "boolean", value: true, active: true },
      },
    },
  },
};

const Services = {
  ServicesList: {
    component: ServicesList,
    name: "Services List",
    metadata: {
      props: {
        id: { type: "string", value: "services_list", active: true },
        sectionTitle: {
          type: "string",
          value: "Expert Security Solutions for Businesses, Events & Homes",
          active: true,
        },
        description: {
          type: "string",
          value:
            "Our highly trained security professionals provide **door security, event security, and residential protection** to safeguard businesses, venues, and private properties. With **24/7 surveillance, access control, and on-site security personnel**, we ensure safety and peace of mind for our clients.",
          active: true,
        },
        services: {
          type: "array",
          value: [
            {
              type: "object",
              title: {
                type: "string",
                value: "Professional Door Security & Bouncer Services",
                active: true,
              },
              description: {
                type: "string",
                value:
                  "Ensure **controlled access and safety** at your venue with our **SIA-licensed door supervisors** and **bouncers**. Our **door security team** specializes in **crowd control, ID verification, conflict resolution, and emergency response**, making them the ideal choice for **bars, nightclubs, casinos, and private events**.",
                active: true,
              },
              icon: { type: "string", value: "🚪", active: true },
              items: {
                type: "array",
                value: [
                  {
                    type: "string",
                    value: "Licensed Door Supervisors",
                    active: true,
                  },
                  {
                    type: "string",
                    value: "ID & Age Verification",
                    active: true,
                  },
                  {
                    type: "string",
                    value: "Crowd Control & Conflict De-escalation",
                    active: true,
                  },
                  {
                    type: "string",
                    value: "Emergency Response & First Aid",
                    active: true,
                  },
                ],
                active: true,
              },
              active: true,
            },
            {
              title: {
                type: "string",
                value: "Event Security & Crowd Management",
                active: true,
              },
              description: {
                type: "string",
                value:
                  "From **music festivals to corporate events**, our security team provides **crowd management, VIP protection, bag checks, and emergency response**. With experience handling **high-profile events**, we ensure a smooth and secure experience for all attendees.",
                active: true,
              },
              icon: { type: "string", value: "🎤", active: true },
              items: {
                type: "array",
                value: [
                  {
                    type: "string",
                    value: "SIA-Licensed Event Security Guards",
                    active: true,
                  },
                  {
                    type: "string",
                    value: "Entry Screening & Bag Checks",
                    active: true,
                  },
                  {
                    type: "string",
                    value: "VIP & Artist Close Protection",
                    active: true,
                  },
                  {
                    type: "string",
                    value: "Emergency Response & First Aid",
                    active: true,
                  },
                ],
                active: true,
              },
              active: true,
            },
            {
              title: {
                value: "Residential Security & Gated Community Protection",
                active: true,
              },
              description: {
                value:
                  "Keep your **home, estate, or gated community secure** with **24/7 on-site security personnel, surveillance monitoring, and emergency response teams**. Our residential security guards deter threats, control access, and provide peace of mind for homeowners and families.",
                active: true,
              },
              icon: { value: "🏡", active: true },
              items: {
                value: [
                  { value: "24/7 Residential Security Patrols", active: true },
                  { value: "Gated Community Access Control", active: true },
                  { value: "CCTV & Alarm Monitoring", active: true },
                  { value: "Emergency Threat Response", active: true },
                ],
                active: true,
              },
              active: true,
            },
          ],
          active: true,
        },
      },
    },
  },
};

const AboutUsComponent = {
  AboutUs: {
    component: AboutUs,
    name: "About Us",
    metadata: {
      props: {
        id: { type: "string", value: "about-us", active: true },
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
      },
    },
  },
  WhyChooseUs: {
    component: WhyChooseUs,
    name: "Why Choose Us",
    metadata: {
      props: {
        id: { type: "string", value: "features", active: true },
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
      },
    },
  },
};

const ContactComponent = {
  Contact: {
    component: Contact,
    name: "Contact",
    metadata: {
      props: {
        id: { type: "string", value: "contact", active: true },
        title: {
          type: "string",
          value: "Contact Setoria Security for Expert Security Solutions",
          active: true,
        },
        subtitle: {
          type: "string",
          value:
            "Reach out for top-tier security services in Manchester & Cheshire – available 24/7!",
          active: true,
        },
        phone: { type: "string", value: "0161 234 5678", active: true }, // Updated to a UK-style number for relevance
        email: {
          type: "string",
          value: "info@setoriasecurity.com",
          active: true,
        },
        formFields: {
          type: "array",
          value: [
            {
              type: "object",
              inputType: { type: "string", value: "regular", active: true },
              fieldLabel: {
                type: "string",
                value: "Your Full Name",
                active: true,
              },
              fieldName: { type: "string", value: "name", active: true },
              active: true,
            },
            {
              type: "object",
              inputType: { type: "string", value: "regular", active: true },
              fieldLabel: {
                type: "string",
                value: "Your Email Address",
                active: true,
              },
              fieldName: { type: "string", value: "email", active: true },
              active: true,
            },
            {
              type: "object",
              inputType: { type: "string", value: "regular", active: true },
              fieldLabel: {
                type: "string",
                value: "Your Phone Number",
                active: true,
              },
              fieldName: { type: "string", value: "phone", active: true },
              active: true,
            },
            {
              type: "object",
              inputType: { type: "string", value: "textarea", active: true },
              fieldLabel: {
                type: "string",
                value: "How Can We Assist You?",
                active: true,
              },
              fieldName: { type: "string", value: "message", active: true },
              active: true,
            },
          ],
          active: true,
        },
        buttonText: {
          type: "string",
          value: "Request a Free Consultation",
          active: true,
        },
      },
    },
  },
};

const FAQComponent = {
  FAQ: {
    component: FAQ,
    name: "FAQ",
    metadata: {
      props: {
        id: { type: "string", value: "faq", active: true },
        overTitle: { type: "string", value: "FAQs", active: true },
        title: {
          type: "string",
          value: "Frequently Asked Questions About Setoria Security Services",
          active: true,
        },
        faqs: {
          type: "array",
          value: [
            {
              question: {
                type: "string",
                value:
                  "What security services does Setoria Security offer in Manchester and Cheshire?",
                active: true,
              },
              answer: {
                type: "string",
                value:
                  "Setoria Security provides **top-tier security solutions** across Manchester and Cheshire, including **corporate security**, **event security**, **residential protection**, **door supervision**, **mobile patrols**, and **24/7 security monitoring**. Our SIA-licensed team tailors services to meet the unique needs of businesses, high-profile events, and private properties.",
                active: true,
              },
              active: true,
            },
            {
              question: {
                type: "string",
                value:
                  "Are Setoria Security guards fully licensed and trained for risk management?",
                active: true,
              },
              answer: {
                type: "string",
                value:
                  "Yes, all Setoria Security personnel are **SIA-licensed** and undergo extensive training in **risk assessment**, **conflict resolution**, and **emergency response**. With over 15 years of industry expertise, our guards ensure safety and peace of mind for clients across Manchester and Cheshire.",
                active: true,
              },
              active: true,
            },
            {
              question: {
                type: "string",
                value:
                  "How does Setoria Security manage crowd control for large events in Manchester?",
                active: true,
              },
              answer: {
                type: "string",
                value:
                  "Setoria Security employs **structured crowd management strategies** for large events, combining **advanced surveillance technology** with **expertly trained security guards**. We assess venue layouts, implement entry/exit protocols, and provide real-time monitoring to ensure safety at concerts, festivals, and corporate events in Manchester and beyond.",
                active: true,
              },
              active: true,
            },
            {
              question: {
                type: "string",
                value:
                  "Can Setoria Security provide 24/7 protection for my business or home?",
                active: true,
              },
              answer: {
                type: "string",
                value:
                  "Absolutely, we offer **round-the-clock security services** including **mobile patrols**, **CCTV monitoring**, and **on-site guards** for businesses and residential properties in Manchester and Cheshire. Contact us for a free consultation to customize your 24/7 protection plan.",
                active: true,
              },
              active: true,
            },
            {
              question: {
                type: "string",
                value:
                  "How quickly can Setoria Security respond to a security request in Cheshire?",
                active: true,
              },
              answer: {
                type: "string",
                value:
                  "Setoria Security prides itself on rapid response times. Depending on your location in Cheshire or Manchester, our team can deploy **trained security personnel** within hours of your request. Call us at **0161 234 5678** or email **info@setoriasecurity.com** for immediate assistance.",
                active: true,
              },
              active: true,
            },
          ],
          active: true,
        },
      },
    },
  },
};

const ReviewComponent = {
  TestimonialCarousel: {
    component: TestimonialCarousel,
    name: "Testimonial Carousel",
    metadata: {
      props: {
        id: { type: "string", value: "testimonials", active: true },
        overTitle: { type: "string", value: "Testimonials", active: true },
        title: {
          type: "string",
          value: "What Our Clients Say About Setoria Security",
          active: true,
        },
        titleGold: {
          type: "string",
          value: "Client Feedback",
          active: true,
        },
        testimonials: {
          type: "array",
          value: [
            {
              type: "object",
              name: {
                type: "string",
                value: "Sarah Thompson",
                active: true,
              },
              role: {
                type: "string",
                value: "Event Organizer, Manchester Events Co.",
                active: true,
              },
              feedback: {
                type: "string",
                value:
                  "Setoria Security provided exceptional **event security in Manchester** for our festival. Their **SIA-licensed guards** managed the crowd flawlessly, ensuring safety all night. Highly recommend their professional services!",
                active: true,
              },
            },
            {
              type: "object",
              name: {
                type: "string",
                value: "James Carter",
                active: true,
              },
              role: {
                type: "string",
                value: "Business Owner, Cheshire Retail Ltd.",
                active: true,
              },
              feedback: {
                type: "string",
                value:
                  "The **24/7 security monitoring** from Setoria Security has given my business in Cheshire complete peace of mind. Their **mobile patrols** are prompt and reliable – the best security service I’ve used!",
                active: true,
              },
            },
            {
              type: "object",
              name: {
                type: "string",
                value: "Emily Hughes",
                active: true,
              },
              role: {
                type: "string",
                value: "Property Manager, Manchester Residences",
                active: true,
              },
              feedback: {
                type: "string",
                value:
                  "Setoria’s **residential security services in Manchester** are top-notch. Their **trained security personnel** responded quickly to our needs, keeping our properties safe and secure around the clock.",
                active: true,
              },
            },
            {
              type: "object",
              name: {
                type: "string",
                value: "Mark Reynolds",
                active: true,
              },
              role: {
                type: "string",
                value: "Venue Manager, Cheshire Nightlife",
                active: true,
              },
              feedback: {
                type: "string",
                value:
                  "We hired Setoria for **door supervision in Cheshire**, and their team exceeded expectations. Professional, courteous, and skilled in **conflict resolution** – perfect for our busy nightlife venues!",
                active: true,
              },
            },
            {
              type: "object",
              name: {
                type: "string",
                value: "Laura Bennett",
              },
              role: {
                type: "string",
                value: "Corporate Executive, TechFirm Manchester",
                active: true,
              },
              feedback: {
                type: "string",
                value:
                  "Setoria Security’s **corporate security solutions** transformed our Manchester office safety. Their **advanced surveillance technology** and expertise made all the difference for our team.",
                active: true,
              },
            },
            {
              type: "object",
              name: {
                type: "string",
                value: "David Patel",
                active: true,
              },
              role: {
                type: "string",
                value: "Homeowner, Cheshire Estates",
                active: true,
              },
              feedback: {
                type: "string",
                value:
                  "As a homeowner, I trust Setoria Security for **residential protection in Cheshire**. Their **rapid response** and **CCTV monitoring** gave me confidence in my family’s safety – truly outstanding service!",
                active: true,
              },
            },
          ],
          active: true,
        },
      },
    },
  },
};

const NavigationComponent = {
  CenteredNav: {
    component: CenteredNav,
    name: "CenteredNav",
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
};

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

const ComponentMap = {
  ...Object.keys(Banners).reduce((acc, key) => {
    acc[key] = Banners[key];
    return acc;
  }, {} as Record<string, any>),
  ...Object.keys(Services).reduce((acc, key) => {
    acc[key] = Services[key];
    return acc;
  }, {} as Record<string, any>),
  ...Object.keys(AboutUsComponent).reduce((acc, key) => {
    acc[key] = AboutUsComponent[key];
    return acc;
  }, {} as Record<string, any>),
  ...Object.keys(ContactComponent).reduce((acc, key) => {
    acc[key] = ContactComponent[key];
    return acc;
  }, {} as Record<string, any>),
  ...Object.keys(FAQComponent).reduce((acc, key) => {
    acc[key] = FAQComponent[key];
    return acc;
  }, {} as Record<string, any>),
  ...Object.keys(ReviewComponent).reduce((acc, key) => {
    acc[key] = ReviewComponent[key];
    return acc;
  }, {} as Record<string, any>),
  ...Object.keys(FooterComponent).reduce((acc, key) => {
    acc[key] = FooterComponent[key];
    return acc;
  }, {} as Record<string, any>),
  ...Object.keys(NavigationComponent).reduce((acc, key) => {
    acc[key] = NavigationComponent[key];
    return acc;
  }, {} as Record<string, any>),
};

export default ComponentMap;
