"use client";
import { useState } from "react";
import { TextInput, Checkbox, Button, FileInput } from "@mantine/core";

interface PropsEditorProps {
  props: Record<string, any>;
  initialValues?: Record<string, any>;
  onSave: (updatedProps: Record<string, any>) => void;
}

export function PropsEditor({
  props,
  initialValues = {},
  onSave,
}: PropsEditorProps) {
  const [formValues, setFormValues] = useState(
    Object.entries(props).reduce((acc, [key, value]) => {
      acc[key] = initialValues[key] ?? value.default;
      return acc;
    }, {} as Record<string, any>)
  );

  const handleChange = (key: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(props).map(([key, value]) => {
        if (value.type === "string" && value.format === "image") {
          return (
            <div key={key}>
              <p className="text-sm font-medium">{key}</p>
              <FileInput
                placeholder="Upload Image"
                onChange={(file) =>
                  handleChange(key, file ? URL.createObjectURL(file) : "")
                }
              />
              {formValues[key] && (
                <img
                  src={formValues[key]}
                  alt="Preview"
                  className="mt-2 h-16 rounded-md shadow"
                />
              )}
            </div>
          );
        } else if (value.type === "boolean") {
          return (
            <Checkbox
              key={key}
              label={key}
              checked={formValues[key]}
              onChange={(event) =>
                handleChange(key, event.currentTarget.checked)
              }
            />
          );
        } else {
          return (
            <TextInput
              key={key}
              label={key}
              value={formValues[key]}
              onChange={(event) => handleChange(key, event.target.value)}
            />
          );
        }
      })}

      <Button onClick={() => onSave(formValues)}>Save Changes</Button>
    </div>
  );
}
