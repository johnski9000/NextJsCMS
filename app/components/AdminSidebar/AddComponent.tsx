"use client";
import { Button, Divider, Modal, Text } from "@mantine/core";
import React, { useState } from "react";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import ComponentMap from "../ComponentMap";
import { SavePage } from "@/app/utils/savePage";

function AddComponent({ setAddingComponent, state, selectedPage, router }) {
  const [previewComponent, setPreviewComponent] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  console.log("state", state);
  const handlePreview = (Component) => {
    setPreviewComponent(() => Component); // Store component reference properly
    setPreviewOpen(true);
  };
  const handleAddComponent = async (Component) => {
    console.log("Adding component:", Component);
    try {
      const mergedState = [
        ...state,
        {
          component: Component.name.replace(/\s/g, ""),
        },
      ];
      console.log("mergedState", mergedState);
      const response = await SavePage({
        selectedPage,
        savedItems: mergedState,
      });

      if (response?.success) {
        console.log("Page saved successfully.");
        router.refresh();
      } else {
        console.error("Failed to save page:", response);
      }
    } catch (error) {
      console.error("Error adding component:", error);
    }
  };
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center">
        <Button variant="light" onClick={() => setAddingComponent(false)}>
          <FaArrowLeft /> Back
        </Button>
      </div>
      <Text className="text-lg !font-semibold">Add New Element</Text>
      <Divider />

      {/* List of Components */}
      {Object.keys(ComponentMap).map((comp, index) => {
        console.log(comp);
        const { component: Component, name, metadata } = ComponentMap[comp];

        return (
          <div key={index} className="flex justify-between items-center p-2">
            <Text>{name}</Text>
            <div className="flex space-x-2">
              {/* Preview Button */}
              <Button size="xs" onClick={() => handlePreview(Component)}>
                <FaEye />
              </Button>
              {/* Add Button */}
              <Button
                size="xs"
                onClick={() => handleAddComponent(ComponentMap[comp])}
              >
                Add
              </Button>
            </div>
          </div>
        );
      })}

      {/* Full-Screen Preview Modal */}
      <Modal
        fullScreen
        opened={previewOpen}
        onClose={() => setPreviewOpen(false)}
      >
        <Modal.Header>
          <div className="flex mx-auto items-center text-center space-x-2 text-lg font-semibold text-gray-800">
            Component Preview
          </div>
        </Modal.Header>
        {previewComponent ? (
          React.createElement(previewComponent)
        ) : (
          <Text>No preview available</Text>
        )}
      </Modal>
    </div>
  );
}

export default AddComponent;
