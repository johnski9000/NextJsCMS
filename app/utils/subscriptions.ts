export const monthlyPackages = [
  {
    title: "Starter Plan",
    description: "Perfect for getting started",
    price: "£9.99",
    period: "Per Month",
    productId: "prod_Rws4heO15q7ZRn",
    features: [
      "1 Website",
      "1 Page",
      "Basic SEO",
      "Email Support",
      "Fast CDN Hosting",
    ],
  },
  {
    title: "Business Plan",
    description: "Ideal for small to medium businesses",
    price: "£19.99",
    period: "Per Month",
    productId: "prod_Rws4vzcdZtCO3K",
    features: [
      "3 Websites",
      "5 Pages per site",
      "Advanced SEO",
      "Priority Email Support",
      "Performance Optimizations",
    ],
  },
  {
    title: "Pro Plan",
    description: "Unlimited potential for growing businesses",
    price: "£29.99",
    productId: "prod_RwsMMAhWOlG7jX",
    period: "Per Month",
    features: [
      "5 Websites",
      "Unlimited Pages",
      "Premium SEO",
      "Priority Support",
      "Enhanced Performance Optimizations",
    ],
  },
];

export const yearlyPackages = [
  {
    title: "Starter Plan",
    description: "Perfect for individuals starting their online presence",
    price: "£99",
    period: "Per Year",
    productId: "prod_RxWaBUP2IfEaed",
    features: [
      "1 Website",
      "1 Page",
      "Basic SEO Optimization",
      "Basic CDN Hosting",
      "Email Support",
    ],
  },
  {
    title: "Business Plan",
    description: "Best for growing businesses with multiple websites",
    price: "£199",
    period: "Per Year",
    productId: "prod_RxWaTt4T0J1cOJ",
    features: [
      "Up to 5 Websites",
      "Up to 5 Pages per Website",
      "Advanced SEO Tools",
      "Enhanced CDN Hosting",
      "Priority Support",
      "Website Analytics",
    ],
  },
  {
    title: "Pro Plan",
    description: "Ideal for businesses needing unlimited flexibility",
    price: "£299",
    period: "Per Year",
    productId: "prod_RxWbdnjt7Unka4",
    features: [
      "Unlimited Websites",
      "Unlimited Pages",
      "Comprehensive SEO Suite",
      "Global CDN Hosting",
      "Dedicated Support",
      "Advanced Website Analytics",
      "Custom Domain Support",
    ],
  },
];
export const additionalWebsite = [
  {
    title: "Additional Website",
    description: "Add an extra website to your plan.",
    price: "£4.99",
    period: "Per Month",
    productId: "prod_RwsN7Od2x9oclp",
    features: [
      "1 Additional Website",
      "Same hosting & features as main plan",
      "No extra pages included",
      "Uses your existing CDN & SEO settings",
    ],
  },
  {
    title: "Additional Website (Yearly)",
    description: "Add an extra website to your plan with yearly billing.",
    price: "£49.99",
    period: "Per Year",
    productId: "prod_RxWdViMjptGwy5",
    features: [
      "1 Additional Website",
      "Same hosting & features as main plan",
      "No extra pages included",
      "Uses your existing CDN & SEO settings",
    ],
  },
];

const subscriptions = [
  ...monthlyPackages,
  ...yearlyPackages,
  ...additionalWebsite,
];

export { subscriptions };
