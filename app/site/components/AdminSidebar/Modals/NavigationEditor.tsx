import { Button } from "@mantine/core";
import React from "react";
import NavigationMap from "../../ComponentMaps/NavigationMap";
import { PropsEditor } from "../PropsEditor";
import { formatProps } from "@/app/utils/formatProps";

function NavigationEditor({ navigation, setEdit, saveNavigation }) {
  const savedNavigationProps = formatProps(navigation?.value?.props);
  const baseNavigationProps =
    NavigationMap[navigation?.value?.compKey].metadata.props;
  const mergedProps = { ...baseNavigationProps, ...savedNavigationProps };

  return (
    <div>
      <Button
        onClick={() => {
          setEdit(false);
        }}
        color="blue"
        variant="outline"
      >
        Go Back
      </Button>
      <PropsEditor
        props={mergedProps}
        onSave={saveNavigation}
        navigationEditor={true}
        compKey={navigation?.value?.compKey}
      />
    </div>
  );
}

export default NavigationEditor;
