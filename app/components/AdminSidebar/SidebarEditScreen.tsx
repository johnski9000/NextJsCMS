"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FaEdit, FaGripVertical, FaArrowLeft, FaSyncAlt } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { Button, Text, Tooltip, Divider, Loader } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import cx from "clsx";
import classes from "./Sidebar.module.css";
import ComponentMap from "../ComponentMap";
import { PropsEditor } from "./PropsEditor";
import { SavePage } from "../../utils/savePage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import AddComponent from "./AddComponent";
import { uploadImage } from "@/app/utils/uploadImage";

interface SidebarEditScreenProps {
  selectedElement: any;
  slug: string;
  refreshSidebar: () => void;
}

export function SidebarEditScreen({
  selectedElement,
  slug,
  refreshSidebar,
}: SidebarEditScreenProps) {
  const parsedValue = selectedElement?.value || { components: [] };
  const [state, handlers] = useListState(parsedValue.components || []);
  const [editingComponent, setEditingComponent] = useState(null);
  const [addingComponent, setAddingComponent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handlers.setState(parsedValue.components || []);
  }, [selectedElement]);

  /** Save page data after editing */
  const handleSaveEdit = async (updatedProps, file) => {
    try {
      const selectedPage = selectedElement?.key;
      if (!selectedPage) {
        console.error("No selected page to save.");
        return;
      }

      let savedItems = state;

      if (editingComponent && updatedProps) {
        console.log("update props", updatedProps);
        // Step 1: Upload Image if File Exists
        if (file) {
          const uploadedUrl = await uploadImage(file); // Call your upload function
          if (uploadedUrl) {
            // Step 2: Update `imageUrl.default` with new URL

            updatedProps = updatedProps.map((prop) => {
              if (prop.key === "imageUrl") {
                return {
                  ...prop,
                  default: uploadedUrl, // Update the `default` field
                };
              }
              return prop; // Keep other props unchanged
            });
          }
        }

        // Step 3: Update state with modified props
        handlers.setItem(editingComponent.index, {
          ...state[editingComponent.index],
          props: updatedProps,
        });

        savedItems = state.map((item, index) =>
          index === editingComponent.index
            ? { ...item, props: updatedProps }
            : item
        );
      }

      // Step 4: Save updated props with new image URL
      const response = await SavePage({ selectedPage, savedItems });

      if (response?.success) {
        toast.success("Page saved successfully!");
        router.refresh();
        refreshSidebar();
      } else {
        toast.error("Failed to save page.");
      }
    } catch (error) {
      console.error("Error while saving page:", error);
      toast.error("An error occurred while saving.");
    }
  };

  /** Refresh Page Data */
  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/pages/${slug}`,
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
      toast.success("Page data refreshed!");
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
        toast.success("Component deleted successfully.");
      } else {
        toast.error("Failed to delete component.");
      }
    } catch (error) {
      console.error("Error deleting component:", error);
      toast.error("An error occurred while deleting.");
    }
  };

  /** UI for Editing a Component */
  if (editingComponent) {
    const currentProps = state[editingComponent.index]?.props || {};
    const transformedObject = Array.isArray(currentProps)
      ? currentProps?.reduce((acc, { key, format, ...rest }) => {
          acc[key] = { ...rest };
          if (format) acc[key].format = format; // Add format only if it exists
          return acc;
        }, {})
      : currentProps;

    const matchedComponent = Object.entries(ComponentMap).find(
      ([key]) => key === state[editingComponent.index].component
    );
    const availableProps = matchedComponent?.[1]?.metadata || null;
    const props = { ...availableProps?.props, ...transformedObject };
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
          onSave={(updatedProps, file) => handleSaveEdit(updatedProps, file)}
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
        selectedPage={selectedElement?.key}
        slug={slug}
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
          handlers.reorder({ from: source.index, to: destination.index });
          handleSaveEdit();
        }}
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
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
                      <div className="absolute right-[40px] flex gap-2">
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
