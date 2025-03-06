"use client";
import { Button, Divider, Modal, Text } from "@mantine/core";
import React, { useState } from "react";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import ComponentMap from "../ComponentMap";
import { SavePage } from "@/app/utils/savePage";
import { useRouter } from "next/navigation";

interface AddComponentProps {
  setAddingComponent: (value: boolean) => void;
  state: { component: string; props: Record<string, any> }[];
  selectedPage: string;
  slug: string;
  handleRefresh?: () => void;
}

function AddComponent({
  setAddingComponent,
  state,
  selectedPage,
  slug,
  handleRefresh,
}: AddComponentProps) {
  const [previewComponent, setPreviewComponent] = useState<React.FC | null>(
    null
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const router = useRouter();

  const handlePreview = (Component: React.FC) => {
    setPreviewComponent(() => Component); // Store the component reference
    setPreviewOpen(true);
  };

  const handleAddComponent = async (componentKey: string) => {
    try {
      const newComponent = { component: componentKey, props: {} };
      const mergedState = [...state, newComponent];

      const response = await SavePage({
        selectedPage,
        savedItems: mergedState,
      });

      if (response?.success) {
        router.refresh();
        handleRefresh();
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
      {Object.entries(ComponentMap).map(
        ([compKey, { component: Component, name }], index) => (
          <div key={index} className="flex justify-between items-center p-2">
            <Text>{name}</Text>
            <div className="flex space-x-2">
              {/* Preview Button */}
              <Button size="xs" onClick={() => handlePreview(Component)}>
                <FaEye />
              </Button>
              {/* Add Button */}
              <Button size="xs" onClick={() => handleAddComponent(compKey)}>
                Add
              </Button>
            </div>
          </div>
        )
      )}

      {/* Full-Screen Preview Modal */}
      <Modal
        fullScreen
        opened={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title="Component Preview"
      >
        <div className="flex justify-center items-center h-full">
          {previewComponent ? (
            <div className="h-full w-full">
              {React.createElement(previewComponent)}
            </div>
          ) : (
            <Text>No preview available</Text>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default AddComponent;
