"use client";

import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";

export default function Home() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true); // State for pricing toggle
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  const togglePricing = () => setIsMonthly(!isMonthly);
  const menuItems = [
    { href: "/dashboard/websites", label: "My Websites" },
    { href: "/dashboard/subscriptions", label: "Subscriptions" },
    { href: "/dashboard/settings", label: "Settings" },
    { href: "/dashboard/support", label: "Support" },
  ];
  const scrolled = true;
  const handleStripeCheckout = () => {};
  const handleSignOut = () => {};
  return (
    <div className="min-h-screen">
      {/* Navigation Section */}
      <div className="bg-[url('https://pagedone.io/asset/uploads/1719484344.png')] bg-no-repeat bg-cover w-full bg-center">
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? "bg-black/60 backdrop-blur-md shadow-md" : "bg-black"
          } `}
        >
          <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between p-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/newLogo.png" alt="Logo" width={120} height={40} />
            </Link>

            {/* CTA Button + Mobile Toggle */}
            <div className="flex md:order-2 space-x-3">
              <Button
                onClick={handleStripeCheckout}
                className="!hidden md:!block !font-medium text-sm px-4 py-2 !text-black !bg-orange-500"
                color="orange"
                variant="filled"
                leftSection={session ? <MdDashboard size={20} /> : null}
                disabled={loading || signOutLoading}
                onMouseEnter={
                  (e) => (e.currentTarget.style.backgroundColor = "#ea580c") // orange-600
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f97316")
                }
              >
                {session ? "Dashboard" : "Get Started"}
              </Button>
              {/* Mobile menu toggle button */}
              <button
                type="button"
                className="md:hidden hover:text-orange-500 p-2 focus:outline-none"
                onClick={open}
              >
                <svg
                  className="w-6 h-6 text-orange-200"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {opened ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Drawer Navigation */}
            <Drawer
              position="right"
              size={200}
              opened={opened}
              onClose={close}
              title={<img src="/logo.png" className="h-24" alt="Logo" />}
              styles={{
                content: { backgroundColor: "#0a0a0a", color: "white" },
                header: { backgroundColor: "#0a0a0a", color: "white" },
              }}
            >
              <ul className="flex flex-col items-center space-y-4">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`block py-2 px-4 rounded-sm transition-all duration-300 ${
                        item.label === "Dashboard"
                          ? "bg-orange-500 font-bold rounded-md hover:bg-orange-600"
                          : "text-white hover:text-orange-500"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <Button
                  onClick={handleSignOut}
                  className="!font-medium text-sm px-4 py-2 !text-black !bg-orange-500"
                  style={{
                    backgroundColor: "#f97316",
                    borderRadius: "8px",
                    transition: "background-color 0.3s",
                  }}
                  disabled={signOutLoading}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ea580c")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f97316")
                  }
                >
                  {signOutLoading ? "Signing Out..." : "Logout"}
                </Button>
              </ul>
            </Drawer>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <ul className="flex flex-col md:flex-row md:space-x-8">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="block py-2 px-4 text-white rounded-sm transition-all duration-300 hover:text-orange-500"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <section className="w-full lg:pt-[84px]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="w-full flex-col justify-start items-start gap-14 pt-14 inline-flex">
              <div className="w-full flex-col justify-start items-center lg:gap-28 gap-16 flex">
                <div className="w-full flex-col justify-start items-center gap-8 flex">
                  <div className="w-full flex-col justify-start items-center gap-2.5 flex">
                    <div className="w-fit px-4 py-2 bg-black/opacity-10 rounded-full border border-orange-500 justify-center items-center gap-2 inline-flex">
                      <span className="text-center text-white text-xs font-normal leading-tight">
                        All in one Saas Dashboard, Get 50% Off Now
                      </span>
                    </div>
                    <h2 className="text-center text-white md:text-6xl text-5xl font-bold font-manrope md:leading-normal leading-relaxed">
                      Efficiency Management
                    </h2>
                    <p className="lg:max-w-lg w-full text-center text-white text-base font-normal leading-relaxed">
                      Optimize Operations, Elevate Performance. Unlock Your
                      Team's Full Potential with Seamless Workflow Solutions.
                    </p>
                  </div>
                  <div className="w-full justify-center items-start gap-3 flex sm:flex-row flex-col">
                    <button className="sm:w-fit w-full px-5 py-2.5 bg-orange-500 hover:bg-orange-600 transition-all duration-700 ease-in-out rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                      <span className="px-2 py-px text-white text-base font-semibold leading-relaxed">
                        Try Free Version
                      </span>
                    </button>
                    <button className="sm:w-fit w-full group px-5 py-2.5 rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-white hover:border-gray-300 transition-all duration-700 ease-in-out justify-center items-center flex">
                      <span className="px-2 text-white hover:text-gray-300 transition-all duration-700 ease-in-out text-base font-semibold leading-relaxed">
                        Book Your Demo
                      </span>
                    </button>
                  </div>
                </div>
                <Image
                  src="https://pagedone.io/asset/uploads/1719485061.png"
                  alt="Dashboard"
                  width={1200}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Pricing Section */}
      <section className="py-24 bg-[url('https://pagedone.io/asset/uploads/1719484344.png')] bg-no-repeat bg-cover w-full bg-center">
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .toggle, .toggler {
                display: inline-block;
                vertical-align: middle;
              }
              .toggler {
                color: rgb(31 41 55);
                transition: .2s;
                font-size: 20px;
                font-style: normal;
                line-height: 32px;
              }
              .toggler--is-active {
                color: rgb(99 102 241);
              }
              .b {
                display: block;
              }
              .toggle {
                position: relative;
                width: 36px;
                height: 20px;
                border-radius: 100px;
                background-color: #6366F1;
                overflow: hidden;
                box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.05);
              }
              .check {
                position: absolute;
                display: block;
                cursor: pointer;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
                z-index: 6;
              }
              .check:checked ~ .switch {
                left: 2px;
                right: 50%;
                transition: 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86);
                transition-property: left, right;
                transition-delay: .08s, 0s;
              }
              .switch {
                position: absolute;
                width: 16px;
                right: 2px;
                top: 2px;
                bottom: 2px;
                left: 50%;
                background-color: #fff;
                border-radius: 36px;
                z-index: 1;
                transition: 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86);
                transition-property: left, right;
                transition-delay: 0s, .08s;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
              }
              .pricingCard-frame {
                background: linear-gradient(180deg, rgba(23, 23, 35, 0.00) 1.56%, rgba(23, 23, 35, 0.03) 100%);
                border-radius: 0px 0px 16px 16px;
              }
              .pricingCard-frame:before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                border-radius: 0px 0px 16px 16px;
                padding: 1px;
                background: linear-gradient(0deg, #E5E7EB -40.41%, #FFFFFF 100%);
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: destination-out;
                mask-composite: exclude;
                transition: all .6s ease-in-out;
                width: 100%;
                height: 100%;
              }
              .pricingCard-frame:hover {
                background: linear-gradient(180deg, rgba(186, 222, 255, 0.00) 1.56%, rgba(186, 222, 255, 0.10) 100%);
              }
              .pricingCard-frame:hover:before {
                background: linear-gradient(0deg, #6366f1cc 10.41%, #ffffff 90%);
              }
            `,
          }}
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full flex-col justify-start items-start lg:gap-12 gap-10 inline-flex">
            <div className="lg:w-full sm:w-96 w-full mx-auto flex-col justify-start items-center gap-3.5 flex">
              <div className="w-fit px-4 py-2 bg-black/opacity-10 rounded-full border border-orange-500 justify-center items-center gap-2 inline-flex">
                <span className="text-center text-black text-xs font-normal leading-tight">
                  Pricing Plans
                </span>
              </div>
              <h2 className="text-center text-gray-800 text-3xl font-bold font-manrope leading-normal">
                We Have Got A Perfect Pricing Plan
              </h2>
              <p className="lg:max-w-4xl w-full text-center text-gray-800 opacity-50 text-base font-normal leading-relaxed">
                Discover our range of pricing plans and select the option that
                aligns perfectly with your needs. Whether you prefer flexibility
                or comprehensive coverage.
              </p>
              <div className="flex items-center justify-center gap-4">
                <label
                  className={`toggler text-xl font-medium leading-8 ${
                    !isMonthly ? "!black" : "!text-gray-500"
                  }`}
                  onClick={() => setIsMonthly(false)}
                >
                  Bill Yearly
                </label>
                <div className="toggle">
                  <input
                    type="checkbox"
                    id="switcher"
                    className="check"
                    checked={isMonthly}
                    onChange={togglePricing}
                  />
                  <span className="b switch" />
                </div>
                <label
                  className={`toggler text-xl font-medium leading-8 ${
                    isMonthly ? "!text-black" : "!text-gray-500"
                  }`}
                  onClick={() => setIsMonthly(true)}
                >
                  Bill Monthly
                </label>
              </div>
            </div>
            <div className="w-full">
              {/* Monthly Pricing */}
              <div
                className={`${
                  isMonthly ? "block" : "hidden"
                } justify-start items-center xl:gap-8 gap-6 grid lg:grid-cols-3 grid-cols-1`}
              >
                {/* Free Plan */}
                <div className="lg:w-full sm:w-96 w-full mx-auto group flex-col justify-start items-start inline-flex">
                  <div className="w-full xl:h-[274px] h-72 p-8 bg-white rounded-2xl border group-hover:border-4 border-black/20 group-hover:border-orange-300 group-hover:bg-orange-500 flex-col justify-start items-start flex">
                    <div className="w-full flex-col justify-start items-start gap-6 flex p-1">
                      <div className="w-full flex-col justify-start items-start gap-2.5 flex">
                        <h4 className="text-gray-800 group-hover:text-white text-xl font-medium leading-8">
                          Free Plan
                        </h4>
                        <p className="xl:w-80 w-full opacity-50 text-gray-800 group-hover:text-white group-hover:opacity-80 text-sm font-medium leading-normal break-all">
                          This service is available at no cost; sign up and
                          create an account on this platform.
                        </p>
                        <div className="w-full flex items-end gap-1.5">
                          <h2 className="text-right text-gray-800 group-hover:text-white text-4xl font-bold font-manrope leading-normal">
                            $0
                          </h2>
                          <h6 className="text-gray-800 group-hover:text-white text-base font-medium leading-relaxed">
                            Per Month
                          </h6>
                        </div>
                      </div>
                      <button className="w-full px-3.5 py-2 bg-gradient-to-b from-gray-700 to-gray-900 group-hover:from-white group-hover:to-orange-50 transition-all duration-700 ease-in-out rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white group-hover:text-gray-800 text-sm font-medium leading-6">
                          Get Started for free
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="w-full pricingCard-frame relative px-8 pt-3 justify-start items-center inline-flex">
                    <ul className="w-full flex-col justify-start items-start gap-4 inline-flex">
                      {[
                        "Security Lock Feature",
                        "Collaboration for 2 Accounts",
                        "2 Active Open Jobs",
                        "1 Recruitment Board",
                        "Advance admin reporting tool",
                        "Our Platform features",
                      ].map((feature, index) => (
                        <li
                          key={index}
                          className="w-full pb-5 border-b border-gray-200 justify-start items-center gap-2 inline-flex"
                        >
                          <svg
                            className="text-gray-500 group-hover:text-orange-500 transition-all duration-700 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M17.5 10C17.5 14.1422 14.1422 17.5 10 17.5C5.85787 17.5 2.5 14.1422 2.5 10C2.5 5.85787 5.85787 2.5 10 2.5C14.1422 2.5 17.5 5.85787 17.5 10Z"
                              stroke="currentColor"
                              strokeWidth="1.2"
                            />
                            <path
                              d="M6.66406 9.76987L7.9413 11.0471C8.4969 11.6027 8.77465 11.8805 9.11981 11.8805C9.46498 11.8805 9.74281 11.6027 10.2983 11.0471L13.8894 7.45605"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <h6 className="text-gray-500 group-hover:text-black transition-all duration-700 ease-in-out text-base font-normal leading-relaxed">
                            {feature}
                          </h6>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Startup Plan */}
                <div className="lg:w-full sm:w-96 w-full mx-auto group flex-col justify-start items-start inline-flex">
                  <div className="w-full xl:h-[274px] h-72 p-8 bg-white rounded-2xl border group-hover:border-4 border-black/20 group-hover:border-orange-300 group-hover:bg-orange-500 flex-col justify-start items-start flex">
                    <div className="w-full flex-col justify-start items-start gap-6 flex p-1">
                      <div className="w-full flex-col justify-start items-start gap-2.5 flex">
                        <h4 className="text-gray-800 group-hover:text-white text-xl font-medium leading-8">
                          Startup
                        </h4>
                        <p className="xl:w-80 w-full opacity-50 text-gray-800 group-hover:text-white group-hover:opacity-80 text-sm font-medium leading-normal break-all">
                          We highly recommend this package because it offers the
                          lowest price.
                        </p>
                        <div className="w-full flex items-end gap-1.5">
                          <h2 className="text-right text-gray-800 group-hover:text-white text-4xl font-bold font-manrope leading-normal">
                            $24
                          </h2>
                          <h6 className="text-gray-800 group-hover:text-white text-base font-medium leading-relaxed">
                            Per Month
                          </h6>
                        </div>
                      </div>
                      <button className="w-full px-3.5 py-2 bg-gradient-to-b from-gray-700 to-gray-900 group-hover:from-white group-hover:to-orange-50 transition-all duration-700 ease-in-out rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white group-hover:text-gray-800 text-sm font-medium leading-6">
                          Buy Now
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="w-full pricingCard-frame relative px-8 pt-3 justify-start items-center inline-flex">
                    <ul className="w-full flex-col justify-start items-start gap-4 inline-flex">
                      {[
                        "Security Lock Feature",
                        "Collaboration for 6 Accounts",
                        "8 Active Open Jobs",
                        "8 Recruitment Board",
                        "Advance admin reporting tool",
                        "Our Platform features",
                      ].map((feature, index) => (
                        <li
                          key={index}
                          className="w-full pb-5 border-b border-gray-200 justify-start items-center gap-2 inline-flex"
                        >
                          <svg
                            className="text-gray-500 group-hover:text-orange-500 transition-all duration-700 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M17.5 10C17.5 14.1422 14.1422 17.5 10 17.5C5.85787 17.5 2.5 14.1422 2.5 10C2.5 5.85787 5.85787 2.5 10 2.5C14.1422 2.5 17.5 5.85787 17.5 10Z"
                              stroke="currentColor"
                              strokeWidth="1.2"
                            />
                            <path
                              d="M6.66406 9.76987L7.9413 11.0471C8.4969 11.6027 8.77465 11.8805 9.11981 11.8805C9.46498 11.8805 9.74281 11.6027 10.2983 11.0471L13.8894 7.45605"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <h6 className="text-gray-500 group-hover:text-black transition-all duration-700 ease-in-out text-base font-normal leading-relaxed">
                            {feature}
                          </h6>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Elite Plan */}
                <div className="lg:w-full sm:w-96 w-full mx-auto group flex-col justify-start items-start inline-flex">
                  <div className="w-full xl:h-[274px] h-72 p-8 bg-white rounded-2xl border group-hover:border-4 border-black/20 group-hover:border-orange-300 group-hover:bg-orange-500 flex-col justify-start items-start flex">
                    <div className="w-full flex-col justify-start items-start gap-6 flex p-1">
                      <div className="w-full flex-col justify-start items-start gap-2.5 flex">
                        <h4 className="text-gray-800 group-hover:text-white text-xl font-medium leading-8">
                          Elite Plan
                        </h4>
                        <p className="xl:w-80 w-full opacity-50 text-gray-800 group-hover:text-white group-hover:opacity-80 text-sm font-medium leading-normal break-all">
                          We strongly suggest this package as it provides all
                          the option & features.
                        </p>
                        <div className="w-full flex items-end gap-1.5">
                          <h2 className="text-right text-gray-800 group-hover:text-white text-4xl font-bold font-manrope leading-normal">
                            $110
                          </h2>
                          <h6 className="text-gray-800 group-hover:text-white text-base font-medium leading-relaxed">
                            Per Month
                          </h6>
                        </div>
                      </div>
                      <button className="w-full px-3.5 py-2 bg-gradient-to-b from-gray-700 to-gray-900 group-hover:from-white group-hover:to-orange-50 transition-all duration-700 ease-in-out rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white group-hover:text-gray-800 text-sm font-medium leading-6">
                          Get Started for free
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="w-full pricingCard-frame relative px-8 pt-3 justify-start items-center inline-flex">
                    <ul className="w-full flex-col justify-start items-start gap-4 inline-flex">
                      {[
                        "Security Lock Feature",
                        "Unlimited Collaboration",
                        "Unlimited Open Job Active",
                        "Unlimited Recruitment Board",
                        "Advance admin reporting tool",
                        "Our Platform features",
                      ].map((feature, index) => (
                        <li
                          key={index}
                          className="w-full pb-5 border-b border-gray-200 justify-start items-center gap-2 inline-flex"
                        >
                          <svg
                            className="text-gray-500 group-hover:text-orange-500 transition-all duration-700 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M17.5 10C17.5 14.1422 14.1422 17.5 10 17.5C5.85787 17.5 2.5 14.1422 2.5 10C2.5 5.85787 5.85787 2.5 10 2.5C14.1422 2.5 17.5 5.85787 17.5 10Z"
                              stroke="currentColor"
                              strokeWidth="1.2"
                            />
                            <path
                              d="M6.66406 9.76987L7.9413 11.0471C8.4969 11.6027 8.77465 11.8805 9.11981 11.8805C9.46498 11.8805 9.74281 11.6027 10.2983 11.0471L13.8894 7.45605"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <h6 className="text-gray-500 group-hover:text-black transition-all duration-700 ease-in-out text-base font-normal leading-relaxed">
                            {feature}
                          </h6>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* Yearly Pricing */}
              <div
                className={`${
                  isMonthly ? "hidden" : "block"
                } justify-start items-center xl:gap-8 gap-6 grid lg:grid-cols-3 grid-cols-1`}
              >
                {/* Free Plan */}
                <div className="lg:w-full sm:w-96 w-full mx-auto group flex-col justify-start items-start inline-flex">
                  <div className="w-full xl:h-[274px] h-72 p-8 bg-white rounded-2xl border group-hover:border-4 border-black/20 group-hover:border-orange-300 group-hover:bg-orange-500 flex-col justify-start items-start flex">
                    <div className="w-full flex-col justify-start items-start gap-6 flex p-1">
                      <div className="w-full flex-col justify-start items-start gap-2.5 flex">
                        <h4 className="text-gray-800 group-hover:text-white text-xl font-medium leading-8">
                          Free Plan
                        </h4>
                        <p className="xl:w-80 w-full opacity-50 text-gray-800 group-hover:text-white group-hover:opacity-80 text-sm font-medium leading-normal break-all">
                          This service is available at no cost; simply sign up
                          and create an account on this platform.
                        </p>
                        <div className="w-full flex items-end gap-1.5">
                          <h2 className="text-right text-gray-800 group-hover:text-white text-4xl font-bold font-manrope leading-normal">
                            $60
                          </h2>
                          <h6 className="text-gray-800 group-hover:text-white text-base font-medium leading-relaxed">
                            Per Year
                          </h6>
                        </div>
                      </div>
                      <button className="w-full px-3.5 py-2 bg-gradient-to-b from-gray-700 to-gray-900 group-hover:from-white group-hover:to-orange-50 transition-all duration-700 ease-in-out rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white group-hover:text-gray-800 text-sm font-medium leading-6">
                          Get Started for free
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="w-full pricingCard-frame relative px-8 pt-3 justify-start items-center inline-flex">
                    <ul className="w-full flex-col justify-start items-start gap-4 inline-flex">
                      {[
                        "Security Lock Feature",
                        "Collaboration for 2 Accounts",
                        "2 Active Open Jobs",
                        "1 Recruitment Board",
                        "Advance admin reporting tool",
                        "Our Platform features",
                      ].map((feature, index) => (
                        <li
                          key={index}
                          className="w-full pb-5 border-b border-gray-200 justify-start items-center gap-2 inline-flex"
                        >
                          <svg
                            className="text-gray-500 group-hover:text-orange-500 transition-all duration-700 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M17.5 10C17.5 14.1422 14.1422 17.5 10 17.5C5.85787 17.5 2.5 14.1422 2.5 10C2.5 5.85787 5.85787 2.5 10 2.5C14.1422 2.5 17.5 5.85787 17.5 10Z"
                              stroke="currentColor"
                              strokeWidth="1.2"
                            />
                            <path
                              d="M6.66406 9.76987L7.9413 11.0471C8.4969 11.6027 8.77465 11.8805 9.11981 11.8805C9.46498 11.8805 9.74281 11.6027 10.2983 11.0471L13.8894 7.45605"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <h6 className="text-gray-500 group-hover:text-black transition-all duration-700 ease-in-out text-base font-normal leading-relaxed">
                            {feature}
                          </h6>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Startup Plan */}
                <div className="lg:w-full sm:w-96 w-full mx-auto group flex-col justify-start items-start inline-flex">
                  <div className="w-full xl:h-[274px] h-72 p-8 bg-white rounded-2xl border group-hover:border-4 border-black/20 group-hover:border-orange-300 group-hover:bg-orange-500 flex-col justify-start items-start flex">
                    <div className="w-full flex-col justify-start items-start gap-6 flex p-1">
                      <div className="w-full flex-col justify-start items-start gap-2.5 flex">
                        <h4 className="text-gray-800 group-hover:text-white text-xl font-medium leading-8">
                          Startup
                        </h4>
                        <p className="xl:w-80 w-full opacity-50 text-gray-800 group-hover:text-white group-hover:opacity-80 text-sm font-medium leading-normal break-all">
                          We highly recommend this package because it offers the
                          lowest price.
                        </p>
                        <div className="w-full flex items-end gap-1.5">
                          <h2 className="text-right text-gray-800 group-hover:text-white text-4xl font-bold font-manrope leading-normal">
                            $280
                          </h2>
                          <h6 className="text-gray-800 group-hover:text-white text-base font-medium leading-relaxed">
                            Per Year
                          </h6>
                        </div>
                      </div>
                      <button className="w-full px-3.5 py-2 bg-gradient-to-b from-gray-700 to-gray-900 group-hover:from-white group-hover:to-orange-50 transition-all duration-700 ease-in-out rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white group-hover:text-gray-800 text-sm font-medium leading-6">
                          Buy Now
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="w-full pricingCard-frame relative px-8 pt-3 justify-start items-center inline-flex">
                    <ul className="w-full flex-col justify-start items-start gap-4 inline-flex">
                      {[
                        "Security Lock Feature",
                        "Collaboration for 6 Accounts",
                        "8 Active Open Jobs",
                        "8 Recruitment Board",
                        "Advance admin reporting tool",
                        "Our Platform features",
                      ].map((feature, index) => (
                        <li
                          key={index}
                          className="w-full pb-5 border-b border-gray-200 justify-start items-center gap-2 inline-flex"
                        >
                          <svg
                            className="text-gray-500 group-hover:text-orange-500 transition-all duration-700 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M17.5 10C17.5 14.1422 14.1422 17.5 10 17.5C5.85787 17.5 2.5 14.1422 2.5 10C2.5 5.85787 5.85787 2.5 10 2.5C14.1422 2.5 17.5 5.85787 17.5 10Z"
                              stroke="currentColor"
                              strokeWidth="1.2"
                            />
                            <path
                              d="M6.66406 9.76987L7.9413 11.0471C8.4969 11.6027 8.77465 11.8805 9.11981 11.8805C9.46498 11.8805 9.74281 11.6027 10.2983 11.0471L13.8894 7.45605"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <h6 className="text-gray-500 group-hover:text-black transition-all duration-700 ease-in-out text-base font-normal leading-relaxed">
                            {feature}
                          </h6>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* Elite Plan */}
                <div className="lg:w-full sm:w-96 w-full mx-auto group flex-col justify-start items-start inline-flex">
                  <div className="w-full xl:h-[274px] h-72 p-8 bg-white rounded-2xl border group-hover:border-4 border-black/20 group-hover:border-orange-300 group-hover:bg-orange-500 flex-col justify-start items-start flex">
                    <div className="w-full flex-col justify-start items-start gap-6 flex p-1">
                      <div className="w-full flex-col justify-start items-start gap-2.5 flex">
                        <h4 className="text-gray-800 group-hover:text-black text-xl font-medium leading-8">
                          Elite Plan
                        </h4>
                        <p className="xl:w-80 w-full opacity-50 text-gray-800 group-hover:text-white group-hover:opacity-80 text-sm font-medium leading-normal break-all">
                          We strongly suggest this package as it provides all
                          the option & features.
                        </p>
                        <div className="w-full flex items-end gap-1.5">
                          <h2 className="text-right text-gray-800 group-hover:text-white text-4xl font-bold font-manrope leading-normal">
                            $1100
                          </h2>
                          <h6 className="text-gray-800 group-hover:text-white text-base font-medium leading-relaxed">
                            Per Year
                          </h6>
                        </div>
                      </div>
                      <button className="w-full px-3.5 py-2 bg-gradient-to-b from-gray-700 to-gray-900 group-hover:from-white group-hover:to-orange-50 transition-all duration-700 ease-in-out rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span className="px-1.5 text-white group-hover:text-gray-800 text-sm font-medium leading-6">
                          Get Started for free
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="w-full pricingCard-frame relative px-8 pt-3 justify-start items-center inline-flex">
                    <ul className="w-full flex-col justify-start items-start gap-4 inline-flex">
                      {[
                        "Security Lock Feature",
                        "Unlimited Collaboration",
                        "Unlimited Open Job Active",
                        "Unlimited Recruitment Board",
                        "Advance admin reporting tool",
                        "Our Platform features",
                      ].map((feature, index) => (
                        <li
                          key={index}
                          className="w-full pb-5 border-b border-gray-200 justify-start items-center gap-2 inline-flex"
                        >
                          <svg
                            className="text-gray-500 group-hover:text-orange-500 transition-all duration-700 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M17.5 10C17.5 14.1422 14.1422 17.5 10 17.5C5.85787 17.5 2.5 14.1422 2.5 10C2.5 5.85787 5.85787 2.5 10 2.5C14.1422 2.5 17.5 5.85787 17.5 10Z"
                              stroke="currentColor"
                              strokeWidth="1.2"
                            />
                            <path
                              d="M6.66406 9.76987L7.9413 11.0471C8.4969 11.6027 8.77465 11.8805 9.11981 11.8805C9.46498 11.8805 9.74281 11.6027 10.2983 11.0471L13.8894 7.45605"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <h6 className="text-gray-500 group-hover:text-black transition-all duration-700 ease-in-out text-base font-normal leading-relaxed">
                            {feature}
                          </h6>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
