"use client";
import { formatProps } from "@/app/utils/formatProps";
import React, { useState } from "react";

interface ContactProps {
  id: { value: string; active: boolean };
  title?: { type: "string"; value: string; active: boolean };
  subtitle?: { type: "string"; value: string; active: boolean };
  phone?: { type: "string"; value: string; active: boolean };
  email?: { type: "string"; value: string; active: boolean };
  formFields?: {
    type: "array";
    value: Array<{
      inputType: { type: "string"; value: string; active: boolean };
      type: "object";
      fieldLabel: { type: "string"; value: string; active: boolean };
      fieldName: { type: "string"; value: string; active: boolean };
      active: boolean;
    }>;
    active: boolean;
  };
  buttonText?: { type: "string"; value: string; active: boolean };
}

const defaultContact: ContactProps = {
  id: { value: "contact", active: true },
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
  phone: { type: "string", value: "0161 234 5678", active: true },
  email: {
    type: "string",
    value: "info@setoriasecurity.com",
    active: true,
  },
  formFields: {
    type: "array",
    value: [
      {
        inputType: { type: "string", value: "regular", active: true },
        type: "object",
        fieldLabel: { type: "string", value: "Your Full Name", active: true },
        fieldName: { type: "string", value: "name", active: true },
        active: true,
      },
      {
        inputType: { type: "string", value: "regular", active: true },
        type: "object",
        fieldLabel: {
          type: "string",
          value: "Your Email Address",
          active: true,
        },
        fieldName: { type: "string", value: "email", active: true },
        active: true,
      },
      {
        inputType: { type: "string", value: "regular", active: true },
        type: "object",
        fieldLabel: {
          type: "string",
          value: "Your Phone Number",
          active: true,
        },
        fieldName: { type: "string", value: "phone", active: true },
        active: true,
      },
      {
        inputType: { type: "string", value: "textArea", active: true },
        type: "object",
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
};

const Contact: React.FC<ContactProps> = (props) => {
  const formattedProps = formatProps(props);
  const mergedProps = { ...defaultContact, ...formattedProps };

  // State to track form inputs and submission status
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // Handle input/textarea changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.text(); // Since the API returns plain text
      setSubmitStatus("success");
      setFormData({}); // Reset form after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <section className="py-24 " id={mergedProps.id.value}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="w-full flex items-center justify-center mb-2">
          {" "}
          <p className=" mx-auto inline-block px-3 py-2 font-bold mb-4 text-xs tracking-wider uppercase rounded-full !text-black bg-[rgba(209,159,78,1)] ">
            Contact Us
          </p>
        </div>

        {mergedProps.title?.active && (
          <h2 className="text-center font-manrope text-4xl font-bold leading-10 mb-4 ">
            {mergedProps.title.value}
          </h2>
        )}
        {mergedProps.subtitle?.active && (
          <p className="text-center  text-base font-normal leading-6 mb-14">
            {mergedProps.subtitle.value}
          </p>
        )}

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-3 grid-cols-1 md:gap-8 gap-0">
          {/* Contact Information */}
          <div className="md:mb-0 mb-5 flex flex-col">
            {/* Phone Section */}
            {mergedProps.phone?.active && (
              <div className="bg-gray-100 rounded-2xl text-black p-6 mb-8">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-lg  flex items-center justify-center mr-4">
                    📞
                  </div>
                  <h4 className=" text-base font-medium leading-6">
                    Call Us Directly
                  </h4>
                </div>
                <h3 className=" font-manrope text-2xl font-bold leading-10 mb-6 overflow-clip">
                  {mergedProps.phone.value}
                </h3>
              </div>
            )}

            {/* Email Section */}
            {mergedProps.email?.active && (
              <div className="p-6 bg-gray-100 text-black rounded-2xl">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-lg  flex items-center justify-center mr-4">
                    ✉️
                  </div>
                  <h4 className=" text-base font-medium leading-6">
                    Email Our Team
                  </h4>
                </div>
                <h3 className=" font-manrope text-2xl font-bold leading-10 mb-6 overflow-clip">
                  {mergedProps.email.value}
                </h3>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div className="col-span-2 md:p-8 p-5 border border-gray-200 rounded-2xl">
            <form className="mb-0" onSubmit={handleSubmit}>
              {mergedProps.formFields &&
                mergedProps.formFields?.value.map((field, index) => {
                  const { fieldLabel, fieldName, inputType } = field;
                  return (
                    field.active && (
                      <div
                        key={index}
                        className={
                          inputType.value === "textArea"
                            ? "mb-6"
                            : "grid md:grid-cols-1 grid-cols-1 gap-6 mb-6"
                        }
                      >
                        {inputType.value === "textArea" ? (
                          <textarea
                            name={fieldName.value}
                            value={formData[fieldName.value] || ""}
                            onChange={handleInputChange}
                            className="w-full h-40   border bg-slate-100 border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[rgba(209,159,78,1)]"
                            placeholder={fieldLabel.value}
                          ></textarea>
                        ) : (
                          <input
                            type={field.type}
                            name={fieldName.value}
                            value={formData[fieldName.value] || ""}
                            onChange={handleInputChange}
                            className="w-full h-12   border bg-slate-100 border-gray-300 rounded-full pl-4 focus:outline-none focus:ring-2 focus:ring-[rgba(209,159,78,1)]"
                            placeholder={fieldLabel.value}
                          />
                        )}
                      </div>
                    )
                  );
                })}

              {/* Submit Button */}
              {mergedProps.buttonText?.active && (
                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full h-12 mt-6  font-semibold !text-black bg-[rgba(209,159,78,1)] rounded-full shadow transition-all duration-200 hover:bg-[#b88f50] disabled:opacity-50"
                >
                  {submitStatus === "loading"
                    ? "Sending..."
                    : mergedProps.buttonText.value}
                </button>
              )}

              {/* Success/Error Feedback */}
              {submitStatus === "success" && (
                <p className="text-green-600 text-center mt-4">
                  Message sent successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 text-center mt-4">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
