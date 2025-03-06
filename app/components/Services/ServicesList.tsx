import { formatProps } from "@/app/utils/formatProps";
import Link from "next/link";

interface ServicesListProps {
  id: { value: string; active: boolean };
  sectionTitle: {
    type: string;
    value: string;
    active: boolean;
  };
  description: {
    type: string;
    value: string;
    active: boolean;
  };
  services: {
    type: string;
    value: Array<{
      title: {
        type: string;
        value: string;
        active: boolean;
      };
      description: {
        type: string;
        value: string;
        active: boolean;
      };
      icon: {
        type: string;
        value: string;
        active: boolean;
      };
      items: {
        type: string;
        value: Array<{
          type: string;
          value: string;
          active: boolean;
        }>;
        active: boolean;
      };
      active: boolean;
    }>;
    active: boolean;
  };
}

const defaultServicesList: ServicesListProps = {
  id: { value: "services", active: true },
  sectionTitle: {
    type: "string",
    value: "Comprehensive Security Solutions",
    active: true,
  },
  description: {
    type: "string",
    value:
      "Setoria Security provides **elite security services** tailored for **nightlife venues, large-scale events, and private residences**. Our highly trained professionals ensure a **safe, secure, and controlled environment** for your business, guests, and home.",
    active: true,
  },
  services: {
    type: "array",
    value: [
      {
        title: {
          type: "string",
          value: "Professional Door Security",
          active: true,
        },
        description: {
          type: "string",
          value:
            "Ensure the **safety and smooth operation** of your venue with **licensed door supervisors and security personnel**. Our team specializes in **crowd control, access management, ID verification, and conflict resolution**, keeping your establishment secure.",
          active: true,
        },
        icon: { type: "string", value: "🚪", active: true },
        items: {
          type: "array",
          value: [
            {
              type: "string",
              value: "SIA-Licensed Door Supervisors",
              active: true,
            },
            {
              type: "string",
              value: "Crowd Control & Conflict De-escalation",
              active: true,
            },
            { type: "string", value: "ID & Age Verification", active: true },
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
          value: "Event Security & Crowd Control",
          active: true,
        },
        description: {
          type: "string",
          value:
            "From **music festivals to corporate events**, our security team ensures **guest safety, crowd management, and emergency preparedness**. We deploy trained professionals to manage **entry screening, VIP security, and risk mitigation strategies**.",
          active: true,
        },
        icon: { type: "string", value: "🎤", active: true },
        items: {
          type: "array",
          value: [
            {
              type: "string",
              value: "Trained Event Security Personnel",
              active: true,
            },
            {
              type: "string",
              value: "VIP & Celebrity Close Protection",
              active: true,
            },
            {
              type: "string",
              value: "Bag Checks & Entry Screening",
              active: true,
            },
            {
              type: "string",
              value: "Emergency Planning & Rapid Response",
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
          value: "Residential Security & Private Protection",
          active: true,
        },
        description: {
          type: "string",
          value:
            "Protect your home, estate, or gated community with **round-the-clock security patrols, access control, and advanced surveillance solutions**. Our residential security services provide **VIP protection, deterrence against intruders, and real-time monitoring**.",
          active: true,
        },
        icon: { type: "string", value: "🏡", active: true },
        items: {
          type: "array",
          value: [
            { type: "string", value: "24/7 Security Patrols", active: true },
            {
              type: "string",
              value: "Gated Community & Private Estate Protection",
              active: true,
            },
            {
              type: "string",
              value: "CCTV & Advanced Surveillance Monitoring",
              active: true,
            },
            {
              type: "string",
              value: "Emergency Response & Threat Mitigation",
              active: true,
            },
          ],
          active: true,
        },
        active: true,
      },
    ],
    active: true,
  },
};

const ServicesList: React.FC<ServicesListProps> = (props) => {
  const formattedProps = formatProps(props);
  const mergedProps = { ...defaultServicesList, ...formattedProps };

  // ✅ Ensure `services` is an array before mapping
  const activeServices =
    mergedProps.services?.active && Array.isArray(mergedProps.services.value)
      ? mergedProps.services.value.filter((service) => service.active)
      : [];

  return (
    <div
      className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
      id={mergedProps.id.value}
    >
      {/* Section Header */}
      <div className="max-w-xl mb-10 md:mx-auto text-center lg:max-w-2xl md:mb-12">
        {mergedProps.sectionTitle?.active && (
          <div>
            <p className="inline-block px-3 py-2 font-bold mb-4 text-xs tracking-wider uppercase rounded-full !text-black bg-[rgba(209,159,78,1)] ">
              Our Services
            </p>
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight  sm:text-4xl md:mx-auto">
              {mergedProps.sectionTitle.value}
            </h2>
          </div>
        )}
        {mergedProps.description?.active && (
          <p className="text-base  md:text-lg">
            {mergedProps.description.value}
          </p>
        )}
      </div>

      {/* Services Grid */}
      <div className="grid max-w-md gap-8 row-gap-10 sm:mx-auto lg:max-w-full lg:grid-cols-3">
        {activeServices.map((service, index) => {
          // ✅ Convert items object to an array
          const itemsArray =
            service.items?.active && service.items.value
              ? Object.values(service.items.value).filter((item) => item.active)
              : [];

          return (
            <div key={index} className="flex flex-col sm:flex-row">
              {/* Icon */}
              {service.icon?.active && (
                <div className="sm:mr-4">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[rgba(209,159,78,0.2)]">
                    <span className="text-2xl">{service.icon.value}</span>
                  </div>
                </div>
              )}

              {/* Service Details */}
              <div>
                {service.title?.active && (
                  <h6 className="mb-2 font-semibold leading-5">
                    {service.title.value}
                  </h6>
                )}
                {service.description?.active && (
                  <p className="mb-3 text-sm ">{service.description.value}</p>
                )}

                {/* Features List */}
                {itemsArray.length > 0 && (
                  <ul className="mb-4 -ml-1 space-y-2">
                    {itemsArray.map((feature: ServiceFeature, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-1 text-[rgba(209,159,78,1)]">
                          ●
                        </span>
                        {feature.value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesList;
