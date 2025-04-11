import { Button } from "@mantine/core";
import React from "react";
import { PropsEditor } from "../PropsEditor";
import { formatProps } from "@/app/utils/formatProps";
import FooterMap from "../../ComponentMaps/FooterMap";

function FooterEditor({ footer, setEdit, saveFooter }) {
  const savedFooterProps = formatProps(footer?.value?.props);
  const baseNavigationProps = FooterMap[footer?.value?.compKey].metadata.props;
  const mergedProps = { ...baseNavigationProps, ...savedFooterProps };

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
        onSave={saveFooter}
        navigationEditor={true}
        compKey={footer?.value?.compKey}
      />
    </div>
  );
}

export default FooterEditor;
