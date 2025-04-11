"use client";
import { Button, Divider, Grid, Modal, Paper, Text } from "@mantine/core";
import React, { useState } from "react";
import { FaBars, FaEye } from "react-icons/fa";
import NavigationMap from "../../ComponentMaps/NavigationMap";
import { showToast } from "@/app/utils/toast";
import { SavePage } from "@/app/utils/savePage";
import NavigationEditor from "./NavigationEditor";
import { uploadImage } from "@/app/utils/uploadImage";
import { useRouter } from "next/navigation";

function Navigation({ openModal, setOpenModal, navigation, refreshSidebar }) {
  const [previewComponent, setPreviewComponent] = useState<React.FC | null>(
    null
  );
  const [edit, setEdit] = useState<React.FC | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const router = useRouter();
  const handlePreview = (Component: React.FC) => {
    setPreviewComponent(() => Component); // Store the component reference
    setPreviewOpen(true);
  };
  const saveNavigation = async (
    compKey: string,
    updatedProps: object,
    file: Record<string, File>
  ) => {
    const originalProps = NavigationMap[compKey].metadata.props;
    console.log("originalProps", originalProps);
    let formattedProps;
    if (updatedProps) {
      formattedProps = Object.entries(originalProps).map(([key, propItem]) => {
        if (propItem.type === "array") {
          // Handle array fields (e.g., banners)
          const updatedArray = propItem.value.map((originalItem, index) => {
            const updatedItem = updatedProps[key]?.[index] || {};
            return Object.fromEntries(
              Object.entries(originalItem).map(([subKey, subPropItem]) => [
                subKey,
                {
                  ...subPropItem,
                  value:
                    updatedItem[subKey] !== undefined
                      ? updatedItem[subKey]
                      : subPropItem.value,
                },
              ])
            );
          });

          return { ...propItem, key, value: updatedArray };
        } else {
          // Handle simple fields
          return {
            ...propItem,
            key,
            value:
              updatedProps[key] !== undefined
                ? updatedProps[key]
                : propItem.value,
          };
        }
      });
    }
    try {
      let uploadUrl;
      if (file) {
        const uploadedUrl = await uploadImage(file);
        uploadUrl = uploadedUrl;
        console.log("uploadUrl", uploadUrl);
        formattedProps = formattedProps.map((prop) => {
          if (prop.format === "image") {
            return { ...prop, value: uploadUrl };
          }
          return prop;
        });
        console.log("formattedProps", formattedProps);
      }
      const response = await SavePage({
        selectedPage: "Navigation",
        savedItems: {
          compKey,
          props: updatedProps ? formattedProps : originalProps,
        },
      });
      if (response?.success) {
        showToast.success("Navigation saved successfully");
      }
    } catch (error) {
      showToast.error("Failed to save navigation");
    } finally {
      router.refresh();
      refreshSidebar();
    }
  };
  const sortedNavigation = Object.entries(NavigationMap).sort(
    ([compKeyA], [compKeyB]) => {
      // Ensure isSaved navigation appears first
      const isSavedA = navigation?.value?.compKey === compKeyA;
      const isSavedB = navigation?.value?.compKey === compKeyB;

      return isSavedB - isSavedA; // isSavedB should come first
    }
  );
  return (
    <Modal
      centered
      opened={openModal === "Navigation"}
      onClose={() => setOpenModal(false)}
      title={
        <div className="flex items-center space-x-2 text-lg font-semibold ">
          <FaBars className="text-blue-600" />
          <span>Navigation</span>
        </div>
      }
      size="xl"
      radius="md"
      classNames={{
        inner: "animate-fadeUp",
        content: "p-2 rounded-lg shadow-xl ",
        body: "space-y-4",
      }}
    >
      <Divider className="mb-4" />

      {edit && (
        <NavigationEditor
          navigation={navigation}
          setEdit={setEdit}
          saveNavigation={saveNavigation}
        />
      )}
      {!edit && (
        <Grid columns={12} gutter="xs">
          {sortedNavigation.map(
            ([compKey, { component: Component, name }], index) => {
              const isSaved = navigation?.value?.compKey === compKey;
              console.log("isSaved", isSaved);

              return (
                <Grid.Col key={index} span={4} className="relative">
                  <Paper
                    shadow="sm"
                    p="md"
                    radius="md"
                    className={`flex flex-col justify-between items-center h-full aspect-square text-center transition-all duration-300 ${
                      isSaved
                        ? "border-2 border-blue-600 shadow-lg shadow-blue-500/50 scale-105"
                        : "border border-gray-300 hover:shadow-xl"
                    }`}
                  >
                    <Text className="text-lg !font-semibold">{name}</Text>

                    <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2 mt-4">
                      {/* Preview Button */}
                      <Button
                        size="xs"
                        variant="light"
                        onClick={() => handlePreview(Component)}
                      >
                        <FaEye />
                      </Button>

                      {/* Save/Edit Button */}
                      <Button
                        size="xs"
                        color="blue"
                        onClick={() => {
                          if (isSaved) {
                            setEdit({
                              compKey,
                              props:
                                navigation?.value?.compKey === compKey
                                  ? navigation.value.props
                                  : {},
                            });
                          } else {
                            saveNavigation(compKey);
                          }
                        }}
                      >
                        {isSaved ? "Edit" : "Select"}
                      </Button>
                    </div>
                  </Paper>
                </Grid.Col>
              );
            }
          )}
        </Grid>
      )}
      <Modal
        opened={!!previewComponent}
        onClose={() => setPreviewComponent(null)}
        title="Component Preview"
        fullScreen
      >
        <div className=" flex justify-center items-center h-full">
          {previewComponent ? (
            <div className="translate-y-1 relative h-full w-full">
              {React.createElement(previewComponent, { isPreview: true })}
            </div>
          ) : (
            <Text>No preview available</Text>
          )}
        </div>
      </Modal>
    </Modal>
  );
}

export default Navigation;
