"use client";
import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { formatProps } from "@/app/utils/formatProps";
import "./Banner.css";
import { ParsedPart, parseMarkdownBold } from "@/app/utils/parseMarkdown";
interface Banner {
  image: { value: string; active: boolean };
  title: { value: string; active: boolean };
  description: { value: string; active: boolean };
  owner: { value: string; active: boolean };
  linkLabel: { value: string; active: boolean };
  linkHref: { value: string; active: boolean };
}

interface BannerCarouselProps {
  id: { value: string; active: boolean };
  banners: { value: Banner[]; active: boolean };
  autoplaySpeed?: { value: number; active: boolean };
  fade?: { value: boolean; active: boolean };
}

const defaultBanners: BannerCarouselProps = {
  id: { value: "banner-carousel", active: true },
  banners: {
    value: [
      {
        image: {
          value: "https://placehold.co/600x400",
          active: true,
        },
        title: {
          value: "Elite Bar and Club Security Services",
          active: true,
        },
        description: {
          value:
            "Ensure the safety of your patrons with our highly trained **bar and club security professionals**. Our expert security personnel are skilled in crowd management, conflict resolution, and emergency response, making your venue a safer space for guests.",
          active: true,
        },
        owner: {
          value: "James Smith, Director of Security Operations",
          active: true,
        },
        linkLabel: {
          value: "Explore Nightlife Security",
          active: true,
        },
        linkHref: {
          value: "/services/nightlife-security",
          active: true,
        },
      },
      {
        image: {
          value: "https://placehold.co/600x400",
          active: true,
        },
        title: {
          value: "Event Security & Crowd Control Experts",
          active: true,
        },
        description: {
          value:
            "From **music festivals to corporate events**, our security team ensures smooth operations, crowd safety, and emergency preparedness. Trust our **SIA-licensed event security guards** to protect your attendees and maintain order at your venue.",
          active: true,
        },
        owner: {
          value: "James Smith, Head of Event Security",
          active: true,
        },
        linkLabel: {
          value: "Hire Event Security",
          active: true,
        },
        linkHref: {
          value: "/services/event-security",
          active: true,
        },
      },
      {
        image: {
          value: "https://placehold.co/600x400",
          active: true,
        },
        title: {
          value: "Residential Security & VIP Protection",
          active: true,
        },
        description: {
          value:
            "Protect your home, estate, or gated community with **24/7 residential security patrols** and cutting-edge surveillance solutions. Our **private security officers** provide VIP protection and deter intruders for ultimate peace of mind.",
          active: true,
        },
        owner: {
          value: "James Smith, Director of Residential Protection",
          active: true,
        },
        linkLabel: {
          value: "Get a Free Security Assessment",
          active: true,
        },
        linkHref: {
          value: "/services/residential-security",
          active: true,
        },
      },
    ],
    active: true,
  },
  autoplaySpeed: { value: 5000, active: true }, // Faster transitions for engagement
  fade: { value: true, active: true },
};

const Banner_Carousel: React.FC<BannerCarouselProps> = (props) => {
  const sliderRef = useRef<Slider | null>(null);
  const formattedProps = formatProps(props);
  const mergedProps = { ...defaultBanners, ...formattedProps };
  const { banners, autoplaySpeed, fade } = mergedProps;

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoplaySpeed?.active ? autoplaySpeed.value : 7000,
    fade: fade?.active ? fade.value : true,
    afterChange: (current: number) => animateSlide(current),
  };

  useEffect(() => {
    setTimeout(() => animateSlide(0), 100); // Prevent race condition

    const handleScroll = () => {
      requestAnimationFrame(() => {
        document.querySelectorAll(".parallax-bg").forEach((bg) => {
          const speed = 0.6;
          (bg as HTMLElement).style.backgroundPosition = `center calc(50% + ${
            window.scrollY * speed
          }px)`;
        });
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const animateSlide = (current: number) => {
    document.querySelectorAll(".slick-slide").forEach((slide, index) => {
      const content = slide.querySelector(".content-box");
      if (content) {
        content.classList.toggle("animate", index === current);
      }
    });
  };

  return (
    <section className="min-h-screen relative" id={mergedProps.id.value}>
      <Slider ref={sliderRef} {...settings}>
        {banners.active &&
          banners.value.map((banner, index) => {
            const parsedDescription: ParsedPart[] = parseMarkdownBold(
              banner?.description?.value || ""
            );
            if (banner.image.active)
              return (
                <div key={index} className="relative">
                  {/* Background Image with Parallax */}
                  <div
                    className="bg-cover bg-center h-screen z-0 parallax-bg"
                    style={{ backgroundImage: `url(${banner.image.value})` }}
                  ></div>

                  {/* Overlay */}
                  <div className="absolute top-0 left-0 bottom-0 right-0 bg-black opacity-50 z-10" />

                  {/* Content */}
                  <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center z-20">
                    <div className="max-w-[1440px] mx-auto content-box p-4 w-full h-full flex items-center relative">
                      <div className="inner flex flex-col max-w-[900px]">
                        {banner.title.active && (
                          <h1 className="text-3xl md:text-6xl font-black pb-3 font-mont text-white">
                            {banner.title.value}
                          </h1>
                        )}
                        {banner.description.active && (
                          <div className="text !text-gray-200 italic">
                            &quot;
                            {parsedDescription.map((part, index) =>
                              part.type === "bold" ? (
                                <strong key={index}>{part.content}</strong>
                              ) : (
                                <span key={index}>{part.content}</span>
                              )
                            )}
                            &quot; - {banner.owner.value}
                          </div>
                        )}
                        {banner.linkLabel.active && banner.linkHref.active && (
                          <div className="link-box flex md:flex-row flex-col gap-6 pt-8">
                            <Link
                              href={banner.linkHref.value}
                              className="flex text-sm font-bold group"
                            >
                              <div className="bg-[rgba(209,159,78,1)] !text-black  font-[500] px-4 py-2 text-sm font-mont tracking-widest hover:font-bold transition-all">
                                {banner.linkLabel.value}
                              </div>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
          })}
      </Slider>
    </section>
  );
};

export default Banner_Carousel;
