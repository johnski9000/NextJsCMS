"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FaEdit, FaGripVertical, FaArrowLeft, FaSyncAlt } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Button, Text, Tooltip, Divider, Loader } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import cx from "clsx";
import classes from "./Sidebar.module.css";
import ComponentMap from "../ComponentMaps/ComponentMap";
import { PropsEditor } from "./PropsEditor";
import { SavePage } from "../../utils/savePage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AddComponent from "./AddComponent";
import { uploadImage } from "@/app/utils/uploadImage";
import { showToast } from "@/app/utils/toast";

interface SidebarEditScreenProps {
  selectedElement: { key: string; value: any } | null;
  slug: string;
  refreshSidebar: () => void;
}

export function SidebarEditScreen({
  selectedElement,
  slug,
  refreshSidebar,
}: SidebarEditScreenProps) {
  const parsedValue = selectedElement?.value || { components: [] };
  interface ComponentState {
    component: string;
    props: { key: string; value: any }[];
  }

  const [state, handlers] = useListState<ComponentState>(
    parsedValue.components || []
  );
  const [editingComponent, setEditingComponent] = useState<{
    index: number;
    component: string;
  } | null>(null);
  const [addingComponent, setAddingComponent] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    handleRefresh();
    return () => {};
  }, []);
  useEffect(() => {
    if (Array.isArray(parsedValue.components)) {
      handlers.setState(parsedValue.components);
    }
  }, [selectedElement, parsedValue.components]);
  const handleSaveEdit = async (
    updatedProps: PropItem[], // Array of full PropItem objects
    files: Record<string, File>
  ): Promise<void> => {
    try {
      setUploading(true);
      const selectedPage = selectedElement?.key;
      if (!selectedPage) {
        console.error("No selected page to save.");
        return;
      }

      let savedItems = updatedProps;
      if (editingComponent && updatedProps) {
        // Step 1: Upload Images if Files Exist
        const uploadedUrls: Record<string, string> = {};
        for (const [keyPath, file] of Object.entries(files)) {
          const uploadedUrl = await uploadImage(file);
          if (uploadedUrl) {
            uploadedUrls[keyPath] = uploadedUrl;
          }
        }

        // Step 2: Update Props with Uploaded URLs
        const finalProps = updatedProps.map((prop) => {
          if (prop.type === "image" && prop.key && prop.key in uploadedUrls) {
            return { ...prop, value: uploadedUrls[prop.key] };
          } else if (prop.type === "array") {
            const updatedValue = prop.value.map((item, index) => {
              const updatedItem = { ...item };
              Object.keys(item).forEach((subKey) => {
                const imageKey = `${prop.key}[${index}].${subKey}`;
                if (item[subKey].type === "image" && imageKey in uploadedUrls) {
                  updatedItem[subKey] = {
                    ...item[subKey],
                    value: uploadedUrls[imageKey],
                  };
                }
              });
              return updatedItem;
            });
            return { ...prop, value: updatedValue };
          }
          return prop;
        });

        // Step 3: Update state with modified props
        handlers.setItem(editingComponent.index, {
          component: state[editingComponent.index].component,
          props: finalProps,
        });

        savedItems = state.map((item, index) =>
          index === editingComponent.index
            ? {
                ...(typeof item === "object" ? item : {}),
                props: finalProps,
                component: item.component || "",
              }
            : item
        );
      }
      // Step 4: Save updated props using SavePage
      const response = await SavePage({ selectedPage, savedItems });

      if (response?.success) {
        setUploading(false);
        showToast.success("Page saved successfully!");
        refreshSidebar();
      } else {
        setUploading(false);
        showToast.error("Failed to save page.");
      }
    } catch (error) {
      setUploading(false);
      console.error("Error while saving page:", error);
      showToast.error("An error occurred while saving.");
    }
  };

  /** Refresh Page Data */
  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/pages/${slug}`,
        {
          cache: "no-store",
        }
      );
      if (response.ok) {
        const updatedData = await response.json();
        handlers.setState(updatedData.components || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      showToast.success("Page data refreshed!");
    }
  };

  /** Handle deleting a component */
  const handleDelete = async (index: number) => {
    try {
      const updatedItems = state.filter((_, i) => i !== index);
      const selectedPage = selectedElement?.key;
      if (!selectedPage) return;

      const response = await SavePage({
        selectedPage,
        savedItems: updatedItems,
      });

      if (response?.success) {
        handlers.setState(updatedItems);
        router.refresh();
        refreshSidebar();
        handleRefresh();
        showToast.success("Component deleted successfully.");
      } else {
        showToast.error("Failed to delete component.");
      }
    } catch (error) {
      console.error("Error deleting component:", error);
      showToast.error("An error occurred while deleting.");
    }
  };

  /** UI for Editing a Component */
  if (editingComponent) {
    // Ensure state[editingComponent.index] exists and has props
    const currentProps: { key: string; format?: string; [key: string]: any }[] =
      Array.isArray(state[editingComponent.index]?.props)
        ? state[editingComponent.index]?.props
        : [];

    // Transform currentProps into an object with keys
    const transformedObject = currentProps.reduce<Record<string, any>>(
      (acc, { key, format, ...rest }) => {
        acc[key] = { ...rest };
        if (format) acc[key].format = format; // Add format only if it exists
        return acc;
      },
      {}
    );

    // Find the corresponding component in ComponentMap
    const matchedComponent = Object.entries(ComponentMap).find(
      ([componentKey]) =>
        componentKey === state[editingComponent.index]?.component
    );

    // Ensure availableProps is correctly typed
    const availableProps = matchedComponent?.[1]?.metadata ?? null;
    const props = { ...availableProps?.props, ...transformedObject };

    if (uploading) {
      return (
        <div className="p-4">
          <Loader size="md" />
          <Text className="text-lg font-semibold">Uploading Data...</Text>
        </div>
      );
    }

    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="light" onClick={() => setEditingComponent(null)}>
            <FaArrowLeft /> Back
          </Button>
          {/* Refresh Button */}
          <Tooltip label="Refresh Data">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={loading}
            >
              {loading ? <Loader size="xs" /> : <FaSyncAlt />}
            </Button>
          </Tooltip>
        </div>
        <Text className="text-lg font-semibold">
          Editing {editingComponent.component}
        </Text>
        <Divider />
        <PropsEditor
          props={props}
          initialValues={currentProps}
          onSave={(updatedProps, files) => {
            const formattedProps = Object.entries(props).map(
              ([key, propItem]) => {
                if (propItem.type === "array") {
                  // Handle array fields (e.g., banners)
                  const updatedArray = propItem.value.map(
                    (originalItem, index) => {
                      const updatedItem = updatedProps[key]?.[index] || {};
                      return Object.fromEntries(
                        Object.entries(originalItem).map(
                          ([subKey, subPropItem]) => [
                            subKey,
                            {
                              ...subPropItem,
                              value:
                                updatedItem[subKey] !== undefined
                                  ? updatedItem[subKey]
                                  : subPropItem.value,
                            },
                          ]
                        )
                      );
                    }
                  );
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
              }
            );
            handleSaveEdit(formattedProps, files);
          }}
        />
      </div>
    );
  }

  /** UI for Adding a Component */
  if (addingComponent) {
    return (
      <AddComponent
        setAddingComponent={setAddingComponent}
        state={state}
        selectedPage={selectedElement?.key || ""}
        slug={slug}
        handleRefresh={handleRefresh}
      />
    );
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex justify-between p-4">
        <Text className="text-lg font-semibold">Page Components</Text>
        {/* Refresh Button */}
        <Tooltip label="Refresh Data">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            {loading ? <Loader size="xs" /> : <FaSyncAlt />}
          </Button>
        </Tooltip>
      </div>

      <DragDropContext
        onDragEnd={({ destination, source }) => {
          if (!destination) return;
          const newState = [...state];
          const [movedItem] = newState.splice(source.index, 1);
          newState.splice(destination.index, 0, movedItem);
          handlers.setState(newState);
          handleSaveEdit(newState, {});
        }}
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ overflow: "auto" }} // Ensure single scroll container
            >
              {state.map((item, index) => (
                <Draggable
                  key={index}
                  index={index}
                  draggableId={index.toString()}
                >
                  {(provided, snapshot) => (
                    <div
                      className={cx(classes.item, {
                        [classes.itemDragging]: snapshot.isDragging,
                      })}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className={classes.dragHandle}
                      >
                        <FaGripVertical size={18} stroke={"1.5"} />
                      </div>
                      <Text className={classes.symbol}>{index + 1}</Text>
                      <div>
                        <Text>{item.component}</Text>
                      </div>
                      <div className="absolute right-[10px] flex gap-2">
                        <Tooltip
                          label={`Edit ${item.component}`}
                          position="left"
                        >
                          <Button
                            onClick={() =>
                              setEditingComponent({ ...item, index })
                            }
                          >
                            <FaEdit />
                          </Button>
                        </Tooltip>
                        <Tooltip
                          label={`Delete ${item.component}`}
                          position="left"
                        >
                          <Button
                            variant="light"
                            color="red"
                            onClick={() => handleDelete(index)}
                          >
                            <FaDeleteLeft />
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Button
          fullWidth
          mt="md"
          variant="outline"
          onClick={() => setAddingComponent(true)}
        >
          Add New Element
        </Button>
      </DragDropContext>
    </div>
  );
}
