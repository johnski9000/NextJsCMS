"use client";
import { useState } from "react";
import Script from "next/script";
import { formatProps } from "@/app/utils/formatProps";

interface FAQItem {
  type: "object"; // ✅ Ensure it's an object
  value: {
    question: { type: "string"; value: string; active: boolean };
    answer: { type: "string"; value: string; active: boolean };
    active: boolean;
  };
}

interface FAQProps {
  id: { value: string; active: boolean };
  overTitle?: { type: "string"; value: string; active: boolean };
  title?: { type: "string"; value: string; active: boolean };
  faqs?: { type: "array"; value: FAQItem[]; active: boolean };
}

const defaultFAQ: Required<FAQProps> = {
  id: { value: "faq", active: true },
  overTitle: { type: "string", value: "FAQs", active: true },
  title: {
    type: "string",
    value: "Frequently Asked Questions About Setoria Security Services",
    active: true,
  },
  faqs: {
    type: "array",
    active: true,
    value: [
      {
        type: "object",
        value: {
          question: {
            type: "string",
            value:
              "What security services does Setoria Security offer in Manchester and Cheshire?",
            active: true,
          },
          answer: {
            type: "string",
            value:
              "Setoria Security provides top-tier security solutions across Manchester and Cheshire, including corporate security, event security, residential protection, door supervision, mobile patrols, and 24/7 security monitoring. Our SIA-licensed team tailors services to meet the unique needs of businesses, high-profile events, and private properties.",
            active: true,
          },
          active: true,
        },
      },
      {
        type: "object",
        value: {
          question: {
            type: "string",
            value:
              "Are Setoria Security guards fully licensed and trained for risk management?",
            active: true,
          },
          answer: {
            type: "string",
            value:
              "Yes, all Setoria Security personnel are SIA-licensed and undergo extensive training in risk assessment, conflict resolution, and emergency response. With over 15 years of industry expertise, our guards ensure safety and peace of mind for clients across Manchester and Cheshire.",
            active: true,
          },
          active: true,
        },
      },
      {
        type: "object",
        value: {
          question: {
            type: "string",
            value:
              "How does Setoria Security manage crowd control for large events in Manchester?",
            active: true,
          },
          answer: {
            type: "string",
            value:
              "Setoria Security employs structured crowd management strategies for large events, combining advanced surveillance technology with expertly trained security guards. We assess venue layouts, implement entry/exit protocols, and provide real-time monitoring to ensure safety at concerts, festivals, and corporate events in Manchester and beyond.",
            active: true,
          },
          active: true,
        },
      },
      {
        type: "object",
        value: {
          question: {
            type: "string",
            value:
              "Can Setoria Security provide 24/7 protection for my business or home?",
            active: true,
          },
          answer: {
            type: "string",
            value:
              "Absolutely, we offer round-the-clock security services including mobile patrols, CCTV monitoring, and on-site guards for businesses and residential properties in Manchester and Cheshire. Contact us for a free consultation to customize your 24/7 protection plan.",
            active: true,
          },
          active: true,
        },
      },
      {
        type: "object",
        value: {
          question: {
            type: "string",
            value:
              "How quickly can Setoria Security respond to a security request in Cheshire?",
            active: true,
          },
          answer: {
            type: "string",
            value:
              "Setoria Security prides itself on rapid response times. Depending on your location in Cheshire or Manchester, our team can deploy trained security personnel within hours of your request. Call us at 0161 234 5678 or email info@setoriasecurity.com for immediate assistance.",
            active: true,
          },
          active: true,
        },
      },
    ],
  },
};

const FAQ: React.FC<FAQProps> = (props) => {
  const formattedProps = formatProps(props || {});

  const mergedProps = { ...defaultFAQ, ...formattedProps };
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // ✅ Ensure we correctly extract the `.value` from each FAQ object
  const activeFAQs = mergedProps.faqs.value || [];

  // ✅ Generate Schema.org FAQPage JSON-LD dynamically
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: mergedProps.title.value,
    mainEntity: activeFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.value.question.value,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.value.answer.value,
      },
    })),
  };

  return (
    <section
      id={mergedProps.id.value}
      className="py-24  relative overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* FAQ Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full">
          {/* FAQ Text Section */}
          <div className="w-full">
            <div>
              {/* OverTitle & Title Section */}
              <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
                {/* Over Title */}
                {mergedProps.overTitle?.active && (
                  <p className="inline-block px-3 py-2 font-bold mb-4 text-xs tracking-wider uppercase rounded-full !text-black bg-[rgba(209,159,78,1)] ">
                    {mergedProps.overTitle.value}
                  </p>
                )}

                {/* Main Title */}
                {mergedProps.title?.active && (
                  <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight  sm:text-4xl md:mx-auto">
                    {mergedProps.title.value}
                  </h2>
                )}
              </div>

              {/* Accordion */}
              <div className="accordion-group">
                {activeFAQs?.map((faq, index) => {
                  const { question, answer } = faq.value;
                  return (
                    <div
                      key={index}
                      className="border-b border-solid border-gray-200"
                    >
                      <button
                        id={`faq-${index}`}
                        className="flex justify-between items-center w-full py-6 cursor-pointer text-xl  hover:text-[rgba(209,159,78,1)]"
                        aria-expanded={expandedIndex === index}
                        aria-controls={`faq-content-${index}`}
                        onClick={() => toggleFAQ(index)}
                      >
                        {question.value}
                        <svg
                          className={`w-6 h-6  transition-transform duration-300 ${
                            expandedIndex === index ? "rotate-180" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div
                        className={`${
                          expandedIndex === index ? "block" : "hidden"
                        } transition-all duration-500`}
                        id={`faq-content-${index}`}
                        role="region"
                        aria-labelledby={`faq-${index}`}
                      >
                        <p className="text-base  p-4">{answer.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic JSON-LD for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
};

export default FAQ;
