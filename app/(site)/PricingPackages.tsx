"use client";
import Link from "next/link";
import React, { useState } from "react";
import { monthlyPackages, yearlyPackages } from "./utils/subscriptions";
import { showToast } from "./utils/toast";
import { Button } from "@mantine/core";
import { useRouter, usePathname } from "next/navigation";

function PricingPackages({ userPage = false, session, currentProduct }) {
  const [isMonthly, setIsMonthly] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // Get current pathname
  const togglePricing = () => setIsMonthly(!isMonthly);

  // Async function to update subscription
  const updateSubscription = async (plan) => {
    if (!session || !currentProduct || currentProduct.status !== "active")
      return;

    try {
      const response = await fetch("/api/stripe/subscription/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stripeSubscriptionId: currentProduct.stripe_subscription_id,
          newMainProductId: plan.productId,
        }),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        showToast.success("Subscription updated successfully");
        window.location.href = "/dashboard/subscriptions"; // Redirect to dashboard
      } else {
        throw new Error(data.error || "Failed to update subscription");
      }
    } catch (error) {
      console.error("Error updating subscription:", error);
      showToast.error("Error updating subscription");
    }
  };

  // Synchronous handleClick for Link href
  const handleClick = (plan) => {
    if (session && currentProduct?.status === "active") {
      return "/dashboard/subscriptions"; // Default redirect after update
    }
    if (
      session &&
      (currentProduct?.status === "canceled" || !currentProduct?.status)
    ) {
      return `/signup?plan=${plan.productId}`;
    }
    return `/signup?plan=${plan.productId}`;
  };

  const PricingCard = ({ plan }) => {
    const selected = plan.productId === currentProduct?.product_id;
    console.log("Selected:", selected);

    // Handle button click to trigger update
    const handleButtonClick = async () => {
      if (selected) return; // No action if already selected
      if (session && currentProduct?.status === "active") {
        await updateSubscription(plan); // Run async update
      }
      // Navigation only happens via Link if not on /dashboard/subscriptions/update
    };

    // Check if we're on /dashboard/subscriptions/update
    const isOnUpdatePage = pathname === "/dashboard/subscriptions/update";

    return (
      <div
        className={
          "rounded-2xl lg:w-full sm:w-full w-full mx-auto group flex-col justify-start items-start inline-flex " +
          (selected ? "border-2 shadow-md" : "border-black/20")
        }
      >
        <div
          className={`w-full h-full p-4 bg-white rounded-2xl border flex-col justify-start items-start flex ${
            selected ? "border-2 shadow-md" : "border-black/20"
          }`}
        >
          <div className="w-full flex-col justify-start items-start gap-6 flex p-1">
            <div className="w-full flex-col justify-start items-start gap-2.5 flex">
              <h4 className="text-gray-800 text-xl font-medium leading-8">
                {plan.title}
              </h4>
              <p className="xl:w-80 w-full opacity-50 text-gray-800 text-sm font-medium leading-normal break-all">
                {plan.description}
              </p>
              <div className="w-full flex items-end gap-1.5">
                <h2 className="text-right text-gray-800 text-4xl font-bold font-manrope leading-normal">
                  {plan.price}
                </h2>
                <h6 className="text-gray-800 text-base font-medium leading-relaxed">
                  {plan.period}
                </h6>
              </div>
            </div>
            {selected ? (
              <div className="w-full px-3.5 py-2 bg-orange-100 text-orange-700 rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                <span className="px-1.5 text-sm font-medium leading-6">
                  Current Plan
                </span>
              </div>
            ) : isOnUpdatePage &&
              session &&
              currentProduct?.status === "active" ? (
              <Button
                color="orange"
                variant="outline"
                fullWidth
                onClick={handleButtonClick}
                className="w-full px-3.5 py-2 bg-gradient-to-b from-gray-700 to-gray-900 transition-all duration-700 ease-in-out rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
              >
                <span className="px-1.5 text-black text-sm font-medium leading-6">
                  Update Plan
                </span>
              </Button>
            ) : (
              <Link href={handleClick(plan)} className="w-full">
                <Button
                  color="orange"
                  variant="outline"
                  fullWidth
                  onClick={handleButtonClick}
                  className="w-full px-3.5 py-2 bg-gradient-to-b from-gray-700 to-gray-900 transition-all duration-700 ease-in-out rounded-full shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
                >
                  <span className="px-1.5 text-black text-sm font-medium leading-6">
                    Get Started
                  </span>
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="w-full pricingCard-frame relative px-8 pt-3 justify-start items-center inline-flex">
          <ul className="w-full flex-col justify-start items-start gap-4 inline-flex">
            {plan.features.map((feature, index) => (
              <li
                key={index}
                className="w-full pb-5 border-b border-gray-200 justify-start items-center gap-2 inline-flex"
              >
                <svg
                  className={`${
                    selected ? "text-orange-500" : "text-gray-500"
                  } group-hover:text-orange-500 transition-all duration-700 ease-in-out`}
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
                <h6
                  className={`${
                    selected ? "text-black" : "text-gray-500"
                  } group-hover:text-black transition-all duration-700 ease-in-out text-base font-normal leading-relaxed`}
                >
                  {feature}
                </h6>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white bg-no-repeat bg-cover w-full bg-center p-8">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .toggle, .toggler { display: inline-block; vertical-align: middle; }
            .toggler { color: rgb(31 41 55); transition: .2s; font-size: 20px; font-style: normal; line-height: 32px; }
            .toggler--is-active { color: rgb(99 102 241); }
            .b { display: block; }
            .toggle { position: relative; width: 36px; height: 20px; border-radius: 100px; background-color: #6366F1; overflow: hidden; box-shadow: inset 0 0 2px 1px rgba(0, 0, 0, 0.05); }
            .check { position: absolute; display: block; cursor: pointer; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; z-index: 6; }
            .check:checked ~ .switch { left: 2px; right: 50%; transition: 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86); transition-property: left, right; transition-delay: .08s, 0s; }
            .switch { position: absolute; width: 16px; right: 2px; top: 2px; bottom: 2px; left: 50%; background-color: #fff; border-radius: 36px; z-index: 1; transition: 0.25s cubic-bezier(0.785, 0.135, 0.15, 0.86); transition-property: left, right; transition-delay: 0s, .08s; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); }
            .pricingCard-frame { background: linear-gradient(180deg, rgba(23, 23, 35, 0.00) 1.56%, rgba(23, 23, 35, 0.03) 100%); border-radius: 0px 0px 16px 16px; }
            .pricingCard-frame:before { content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 0px 0px 16px 16px; padding: 1px; background: linear-gradient(0deg, #E5E7EB -40.41%, #FFFFFF 100%); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: destination-out; mask-composite: exclude; transition: all .6s ease-in-out; width: 100%; height: 100%; }
            .pricingCard-frame:hover { background: linear-gradient(180deg, rgba(186, 222, 255, 0.00) 1.56%, rgba(186, 222, 255, 0.10) 100%); }
            .pricingCard-frame:hover:before { background: linear-gradient(0deg, #6366f1cc 10.41%, #ffffff 90%); }
          `,
        }}
      />
      <div className="mx-auto max-w-7xl">
        <div className="w-full flex-col justify-start items-start lg:gap-12 gap-10 inline-flex">
          {!userPage && (
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
                    !isMonthly ? "!text-black" : "!text-gray-500"
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
          )}
          {userPage && (
            <div className="flex items-center justify-center gap-4">
              <label
                className={`toggler text-xl font-medium leading-8 ${
                  !isMonthly ? "!text-black" : "!text-gray-500"
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
          )}
          <div className="w-full">
            <div
              className={`justify-start items-center xl:gap-8 gap-6 grid lg:grid-cols-3 grid-cols-1`}
            >
              {(isMonthly ? monthlyPackages : yearlyPackages).map(
                (plan, index) => (
                  <PricingCard key={index} plan={plan} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingPackages;
