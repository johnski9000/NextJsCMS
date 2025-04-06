import React from "react";
import NavigationMap from "./ComponentMaps/NavigationMap";
import FooterMap from "./ComponentMaps/FooterMap";

interface SelectedNav {
  compKey: string;
  props: Record<string, any>;
}

const DynamicFooter = ({ selectedFooter }: { selectedFooter: SelectedNav }) => {
  // Extract the correct key
  const componentKey = selectedFooter.compKey;

  // Get the correct component from NavigationMap
  const FooterComponent = FooterMap[componentKey]?.component;

  if (!FooterComponent) {
    console.log("❌ Component not found in NavigationMap");
    return <p>Invalid navigation type selected</p>;
  }

  // Merge default props with provided props
  const mergedProps = {
    ...FooterMap[componentKey]?.metadata?.props, // Default props
    ...selectedFooter.props, // Overwritten props
  };

  return <FooterComponent {...mergedProps} />;
};

export default DynamicFooter;
