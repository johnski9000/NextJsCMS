"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { formatProps } from "@/app/utils/formatProps";

interface Testimonial {
  type: "object";
  name: { type: "string"; value: string; active: boolean };
  role: { type: "string"; value: string; active: boolean };
  feedback: { type: "string"; value: string; active: boolean };
}
interface FAQProps {
  id: { value: string; active: boolean };
  overTitle?: { type: "string"; value: string; active: boolean };
  titleGold?: { type: "string"; value: string; active: boolean };
  title?: { type: "string"; value: string; active: boolean };
  testimonials?: { type: "array"; value: Testimonial[]; active: boolean };
}
const defaultTestimonials: Required<FAQProps> = {
  id: { value: "testimonials", active: true },
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
    active: true,
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
            "Setoria Security provided exceptional event security in Manchester for our festival. Their SIA-licensed guards managed the crowd flawlessly, ensuring safety all night. Highly recommend their professional services!",
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
            "The 24/7 security monitoring from Setoria Security has given my business in Cheshire complete peace of mind. Their mobile patrols are prompt and reliable – the best security service I’ve used!",
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
            "Setoria’s residential security services in Manchester are top-notch. Their trained security personnel responded quickly to our needs, keeping our properties safe and secure around the clock.",
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
            "We hired Setoria for door supervision in Cheshire, and their team exceeded expectations. Professional, courteous, and skilled in conflict resolution – perfect for our busy nightlife venues!",
          active: true,
        },
      },
      {
        type: "object",
        name: {
          type: "string",
          value: "Laura Bennett",
          active: true,
        },
        role: {
          type: "string",
          value: "Corporate Executive, TechFirm Manchester",
          active: true,
        },
        feedback: {
          type: "string",
          value:
            "Setoria Security’s corporate security solutions transformed our Manchester office safety. Their advanced surveillance technology and expertise made all the difference for our team.",
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
            "As a homeowner, I trust Setoria Security for residential protection in Cheshire. Their rapid response and CCTV monitoring gave me confidence in my family’s safety – truly outstanding service!",
          active: true,
        },
      },
    ],
  },
};
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const TestimonialCarousel: React.FC = (props) => {
  const formattedProps = formatProps(props);
  const mergedProps = { ...defaultTestimonials, ...formattedProps };
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <section className="py-24 " id={mergedProps.id.value}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between items-center">
          {/* Left Section */}
          <div className="w-full lg:w-2/5 text-center lg:text-left">
            <p className="inline-block px-3 py-2 font-bold mb-4 text-xs tracking-wider uppercase rounded-full !text-black bg-[rgba(209,159,78,1)] ">
              {mergedProps.overTitle.value}
            </p>
            <h2 className="text-4xl font-bold  leading-[3.25rem] mb-8">
              {mergedProps.title.value}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#d19f4e] to-[#d19f4e]">
                {mergedProps.titleGold.value}
              </span>
            </h2>
            {/* Slider Controls */}
            <div className="flex justify-center lg:justify-start gap-10">
              <button
                ref={prevRef}
                className="group flex justify-center items-center border border-solid border-[#d19f4e] w-12 h-12 transition-all duration-500 rounded-lg hover:bg-[#d19f4e]"
              >
                <svg
                  className="h-6 w-6 text-[#d19f4e] group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.9999 12L4.99992 12M9.99992 6L4.70703 11.2929C4.3737 11.6262 4.20703 11.7929 4.20703 12C4.20703 12.2071 4.3737 12.3738 4.70703 12.7071L9.99992 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                ref={nextRef}
                className="group flex justify-center items-center border border-solid border-[#d19f4e] w-12 h-12 transition-all duration-500 rounded-lg hover:bg-[#d19f4e]"
              >
                <svg
                  className="h-6 w-6 text-[#d19f4e] group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12L19 12M14 18L19.2929 12.7071C19.6262 12.3738 19.7929 12.2071 19.7929 12C19.7929 11.7929 19.6262 11.6262 19.2929 11.2929L14 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Section: Testimonials */}
          <div className="w-full lg:w-3/5 mt-10 lg:mt-0">
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={2}
              spaceBetween={28}
              loop={true}
              autoplay={{ delay: 5000 }}
              pagination={false}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 28 },
                1024: { slidesPerView: 2, spaceBetween: 32 },
              }}
            >
              {mergedProps.testimonials.value.map((testimonial, index) => (
                <SwiperSlide
                  key={index}
                  className="group  border border-solid border-gray-300 rounded-2xl p-6 transition-all duration-500 hover:border-[#d19f4e] shadow-xl"
                >
                  <div className="flex items-center gap-5 mb-5">
                    {/* Avatar with Initials */}
                    <div className="w-12 h-12 rounded-full bg-[#d19f4e] flex items-center justify-center text-white text-lg font-bold">
                      {getInitials(testimonial.name.value)}
                    </div>
                    <div className="grid gap-1">
                      <h5 className=" font-medium">{testimonial.name.value}</h5>
                      <span className="text-sm ">{testimonial.role.value}</span>
                    </div>
                  </div>
                  {/* Review Stars */}
                  <div className="flex items-center mb-5 gap-2 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        viewBox="0 0 18 17"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm  leading-6 min-h-24">
                    {testimonial.feedback.value}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
