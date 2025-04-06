import React from "react";
import NavigationMap from "./ComponentMaps/NavigationMap";

interface SelectedNav {
  compKey: string;
  props: Record<string, any>;
}

const DynamicNavigation = ({ selectedNav }: { selectedNav: SelectedNav }) => {
  // Extract the correct key
  const componentKey = selectedNav.compKey;

  // Get the correct component from NavigationMap
  const NavComponent = NavigationMap[componentKey]?.component;

  if (!NavComponent) {
    console.log("❌ Component not found in NavigationMap");
    return <p>Invalid navigation type selected</p>;
  }

  // Merge default props with provided props
  const mergedProps = {
    ...NavigationMap[componentKey]?.metadata?.props, // Default props
    ...selectedNav.props, // Overwritten props
  };

  return <NavComponent {...mergedProps} />;
};

export default DynamicNavigation;
