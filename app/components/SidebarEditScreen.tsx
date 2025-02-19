"use client";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FaEdit, FaGripVertical, FaArrowLeft } from "react-icons/fa";
import cx from "clsx";
import { Button, Text, Tooltip, TextInput, Divider } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import classes from "./Sidebar.module.css";
import ComponentMap from "./ComponentMap";
import { PropsEditor } from "./PropsEditor";
import { SavePage } from "../utils/savePage";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
interface SidebarEditScreenProps {
  selectedElement: any;
  slug: string;
}

export function SidebarEditScreen({
  selectedElement,
  slug,
}: SidebarEditScreenProps) {
  const parsedValue = selectedElement?.value
    ? selectedElement.value
    : { components: [] };

  const [state, handlers] = useListState(parsedValue.components || []);
  const [originalState, setOriginalState] = useState(
    parsedValue.components || []
  );
  const [editingComponent, setEditingComponent] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [dragging, setDragging] = useState(true); // Trac
  const router = useRouter();
  useEffect(() => {
    setOriginalState(parsedValue.components || []);
    handlers.setState(parsedValue.components || []);
  }, [selectedElement]);
  useEffect(() => {
    if (!dragging) {
      handleSaveEdit(state);
    }
  }, [state]);

  // Handle Cancel (Reverts back to original state)
  const handleCancel = () => {
    handlers.setState(originalState);
  };

  // Handle Save after Editing
  const handleSaveEdit = async (updatedProps: any) => {
    if (!editingComponent) {
      console.log(updatedProps);
      try {
        // Ensure selectedPage is valid
        const selectedPage = selectedElement?.key;
        if (!selectedPage) {
          console.error("No selected page to save.");
          return;
        }

        // Save the page data
        const response = await SavePage({ selectedPage, savedItems: state });

        if (response?.success) {
          console.log("Page saved successfully.");
          router.refresh();
        } else {
          console.error("Failed to save page:", response);
        }
      } catch (error) {
        console.error("Error while saving page:", error);
      }
      toast("Saved successfully, please refresh to view changes!");
    } else if (editingComponent) {
      try {
        // Update component in the state
        handlers.setItem(editingComponent.index, {
          ...state[editingComponent.index],
          props: updatedProps,
        });

        // Create updated list of items
        const savedItems = state.map((item, index) =>
          index === editingComponent.index
            ? { ...item, props: updatedProps }
            : item
        );

        // Ensure selectedPage is valid
        const selectedPage = selectedElement?.key;
        if (!selectedPage) {
          console.error("No selected page to save.");
          return;
        }

        // Save the page data
        const response = await SavePage({ selectedPage, savedItems });

        if (response?.success) {
          console.log("Page saved successfully.");
          router.refresh();
        } else {
          console.error("Failed to save page:", response);
        }
      } catch (error) {
        console.error("Error while saving page:", error);
      }
      toast("Saved successfully, please refresh to view changes!");
    }
  };

  // Edit Screen UI
  if (editingComponent) {
    console.log(state[editingComponent.index]);

    const currentProps = state[editingComponent.index]?.props || {};

    const matchedComponent = Object.entries(ComponentMap).find(
      ([key]) => key === state[editingComponent.index].component
    );

    console.log(matchedComponent);

    const availableProps = matchedComponent
      ? matchedComponent[1].metadata
      : null;

    const props = { ...availableProps?.props, ...currentProps };

    console.log(props);

    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center">
          <Button variant="subtle" onClick={() => setEditingComponent(null)}>
            <FaArrowLeft /> Back
          </Button>
        </div>
        <Text className="text-lg !font-semibold">
          Editing {editingComponent.component}
        </Text>
        <Divider />

        {/* Props Editor */}
        <PropsEditor
          props={props}
          initialValues={currentProps}
          onSave={(updatedProps) => handleSaveEdit(updatedProps)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col !overflow-hidden">
      <DragDropContext
        onDragStart={() => setDragging(true)}
        onDragEnd={({ destination, source }) => {
          if (!destination) return;
          handlers.reorder({ from: source.index, to: destination.index });
          setDragging(false); // Mark drag as finished
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
                      <div className="absolute right-[40px]">
                        <Tooltip
                          label={`Edit ${item.component}`}
                          position="left"
                        >
                          <Button
                            onClick={() => {
                              setEditingComponent({ ...item, index });
                              setEditValues({ component: item.component });
                            }}
                          >
                            <FaEdit />
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
      </DragDropContext>

      {/* Buttons */}
      <div className="mt-4 flex justify-between space-x-2">
        <Button variant="outline" color="gray" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="blue" onClick={() => handleSaveEdit(state)}>
          Update
        </Button>
      </div>
    </div>
  );
}
