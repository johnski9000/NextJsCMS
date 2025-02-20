"use client";
import { useState } from "react";
import { TextInput, Checkbox, Button, FileInput, Image } from "@mantine/core";

interface PropsEditorProps {
  props: Record<string, { type: string; format?: string; default: any }>;
  initialValues?: Record<string, any>;
  onSave: (updatedProps: Record<string, any>, file: File | null) => void;
}

export function PropsEditor({
  props,
  initialValues = {},
  onSave,
}: PropsEditorProps) {
  // Initialize file state
  const [file, setFile] = useState<File | null>(null);

  // Initialize image preview from props
  const [imagePreview, setImagePreview] = useState<Record<string, string>>(
    () => {
      const initialImageState: Record<string, string> = {};
      Object.entries(props).forEach(([key, value]) => {
        if (value.format === "image") {
          initialImageState[key] = initialValues[key] ?? value.default; // Use default image value
        }
      });
      return initialImageState;
    }
  );

  // Convert props object into an array format
  const [formValues, setFormValues] = useState(
    Object.entries(props).map(([key, value]) => ({
      key,
      type: value.type,
      format: value.format || null,
      default: initialValues[key] ?? value.default,
    }))
  );

  console.log("Initial Image State:", imagePreview);

  // Handle text/boolean updates
  const handleChange = (key: string, newValue: any) => {
    setFormValues((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, default: newValue } : item
      )
    );
  };

  // Handle image updates
  const handleImageChange = (key: string, file: File | null) => {
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setFile(file); // Store the file
    setImagePreview((prev) => ({
      ...prev,
      [key]: fileUrl,
    }));

    handleChange(key, fileUrl);
  };

  return (
    <div className="flex flex-col gap-4">
      {formValues.map(({ key, type, format, default: value }) => {
        switch (type) {
          case "string":
            if (format === "image") {
              return (
                <div key={key} className="space-y-2">
                  <p className="text-sm font-medium">{key}</p>
                  <FileInput
                    placeholder="Upload Image"
                    accept="image/*"
                    onChange={(event) => handleImageChange(key, event)}
                  />
                  {imagePreview[key] && (
                    <Image
                      src={imagePreview[key]}
                      alt={`${key} preview`}
                      className="mt-2 h-full rounded-md shadow"
                    />
                  )}
                </div>
              );
            }
            return (
              <TextInput
                key={key}
                label={key}
                value={value ?? ""}
                onChange={(event) => handleChange(key, event.target.value)}
              />
            );

          case "boolean":
            return (
              <Checkbox
                key={key}
                label={key}
                checked={!!value}
                onChange={(event) =>
                  handleChange(key, event.currentTarget.checked)
                }
              />
            );

          default:
            return (
              <TextInput
                key={key}
                label={key}
                value={value ?? ""}
                onChange={(event) => handleChange(key, event.target.value)}
              />
            );
        }
      })}

      <Button
        onClick={() => {
          console.log("Calling onSave with:", file);
          onSave(formValues, file);
        }}
        fullWidth
      >
        Save Changes
      </Button>
    </div>
  );
}
