"use client";

import { useState, memo } from "react";
import {
  TextInput,
  Checkbox,
  Button,
  FileInput,
  Image,
  NumberInput,
} from "@mantine/core";

interface PropItem {
  key?: string;
  type: string;
  format?: string | null;
  value: any;
  active?: boolean;
}

interface PropsEditorProps {
  props: Record<string, PropItem>;
  initialValues?: Record<string, any>;
  onSave: (
    updatedProps: Record<string, any>,
    files: Record<string, File>
  ) => void;
}

// Memoized Field Component for individual fields
const Field = memo(
  ({
    fieldDef,
    value,
    onChange,
  }: {
    fieldDef: PropItem;
    value: any;
    onChange: (newValue: any, file?: File) => void;
  }) => {
    switch (fieldDef.type) {
      case "string":
        return (
          <TextInput
            label={fieldDef.key}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "number":
        return (
          <NumberInput
            label={fieldDef.key}
            value={value}
            onChange={(val) => onChange(val)}
          />
        );
      case "boolean":
        return (
          <Checkbox
            label={fieldDef.key}
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
        );
      case "image":
        return (
          <div className="flex flex-col gap-4 items-center space-x-4">
            {value && <Image src={value} width={100} height={100} />}
            <FileInput
              onChange={(file) => {
                if (file) {
                  const fileUrl = URL.createObjectURL(file);
                  onChange(fileUrl, file);
                }
              }}
              accept="image/*"
              placeholder="Upload image"
            />
          </div>
        );
      default:
        return null;
    }
  },
  (prevProps, nextProps) =>
    prevProps.value === nextProps.value &&
    prevProps.fieldDef === nextProps.fieldDef &&
    prevProps.onChange === nextProps.onChange
);

// Memoized Item Component for array items
const Item = memo(
  ({
    item,
    subFieldDefs,
    onChange,
    onRemove,
  }: {
    item: Record<string, any>;
    subFieldDefs: Record<string, PropItem>;
    onChange: (subKey: string, newValue: any, file?: File) => void;
    onRemove: () => void;
  }) => (
    <div className="space-y-2 border p-3 rounded relative">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors"
        aria-label="Remove item"
      >
        ×
      </button>
      {Object.entries(subFieldDefs).map(([subKey, subFieldDef]) => (
        <Field
          key={subKey}
          fieldDef={{ ...subFieldDef, key: subKey }}
          value={item[subKey]}
          onChange={(newValue, file) => onChange(subKey, newValue, file)}
        />
      ))}
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.item === nextProps.item &&
    prevProps.subFieldDefs === nextProps.subFieldDefs &&
    prevProps.onChange === nextProps.onChange
);

// ArrayField Component for array-type fields
const ArrayField = ({
  fieldDef,
  value,
  onChange,
  onRemoveItem,
}: {
  fieldDef: PropItem;
  value: Record<string, any>[];
  onChange: (index: number, subKey: string, newValue: any, file?: File) => void;
  onRemoveItem: (index: number) => void;
}) => {
  // Assume the first item's structure defines sub-fields
  const subFieldDefs = fieldDef.value[0] as Record<string, PropItem>;
  return (
    <div className="space-y-4">
      <h2 className="font-semibold">{fieldDef.key}</h2>
      {value.map((item, index) => (
        <Item
          key={index}
          item={item}
          subFieldDefs={subFieldDefs}
          onChange={(subKey, newValue, file) =>
            onChange(index, subKey, newValue, file)
          }
          onRemove={() => onRemoveItem(index)}
        />
      ))}
    </div>
  );
};

export function PropsEditor({
  props,
  initialValues = {},
  onSave,
}: PropsEditorProps) {
  console.log("PropsEditor render", props);
  // Initialize formValues with actual values
  const [formValues, setFormValues] = useState<Record<string, any>>(() =>
    Object.fromEntries(
      Object.entries(props).map(([key, prop]) => [
        key,
        prop.type === "array"
          ? initialValues[key] ??
            prop.value.map((item: any) =>
              Object.fromEntries(
                Object.entries(item).map(([subKey, subProp]: [string, any]) => [
                  subKey,
                  subProp.value,
                ])
              )
            )
          : initialValues[key] ?? prop.value,
      ])
    )
  );

  const [files, setFiles] = useState<Record<string, File>>({});
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
    () =>
      Object.entries(props).reduce((acc, [key, value]) => {
        if (value.type === "array") {
          value.value.forEach((item: any, index: number) => {
            if (item.image?.type === "image") {
              acc[`${key}[${index}].image`] = item.image.value;
            }
          });
        } else if (value.format === "image") {
          acc[key] = initialValues[key] ?? value.value;
        }
        return acc;
      }, {} as Record<string, string>)
  );

  // Handle changes for simple fields
  const handleChange = (key: string, newValue: any, file?: File) => {
    setFormValues((prev) => ({ ...prev, [key]: newValue }));
    if (file) {
      setFiles((prev) => ({ ...prev, [key]: file }));
      setImagePreviews((prev) => ({ ...prev, [key]: newValue }));
    }
  };

  // Handle changes for array fields
  const handleArrayChange = (
    arrayKey: string,
    index: number,
    subKey: string,
    newValue: any,
    file?: File
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [arrayKey]: prev[arrayKey].map((item, i) =>
        i === index ? { ...item, [subKey]: newValue } : item
      ),
    }));
    if (file) {
      const fileKey = `${arrayKey}[${index}].${subKey}`;
      setFiles((prev) => ({ ...prev, [fileKey]: file }));
      setImagePreviews((prev) => ({ ...prev, [fileKey]: newValue }));
    }
  };

  // Save handler
  const handleSave = () => {
    onSave(formValues, files);
  };

  const addValue = (formValues: Record<string, any>, key: string) => {
    const updatedValues = {
      ...formValues,
      [key]: [
        ...formValues[key],
        Object.fromEntries(
          Object.entries(props[key].value[0]).map(([subKey, subProp]) => [
            subKey,
            subProp.value,
          ])
        ),
      ],
    };
    setFormValues(updatedValues);
  };
  const removeValue = (formValues: Record<string, any>, key: string) => {
    const updatedValues = {
      ...formValues,
      [key]: formValues[key].slice(0, -1),
    };
    setFormValues(updatedValues);
  };
  const removeItem = (arrayKey: string, index: number) => {
    setFormValues((prev) => ({
      ...prev,
      [arrayKey]: prev[arrayKey].filter((_, i) => i !== index),
    }));
    // Optionally clean up files and previews if needed
    const fileKeyPrefix = `${arrayKey}[${index}]`;
    setFiles((prev) => {
      const updatedFiles = { ...prev };
      Object.keys(updatedFiles).forEach((key) => {
        if (key.startsWith(fileKeyPrefix)) {
          delete updatedFiles[key];
        }
      });
      return updatedFiles;
    });
    setImagePreviews((prev) => {
      const updatedPreviews = { ...prev };
      Object.keys(updatedPreviews).forEach((key) => {
        if (key.startsWith(fileKeyPrefix)) {
          delete updatedPreviews[key];
        }
      });
      return updatedPreviews;
    });
  };
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(props).map(([key, fieldDef]) =>
        fieldDef.type === "array" ? (
          <div key={key} className="space-y-4">
            <h2 className="font-semibold">{key}</h2>
            <ArrayField
              key={key}
              fieldDef={fieldDef}
              value={formValues[key]}
              onChange={(index, subKey, newValue, file) =>
                handleArrayChange(key, index, subKey, newValue, file)
              }
              onRemoveItem={(index) => removeItem(key, index)}
            />
            <Button
              variant="light"
              onClick={() => addValue(formValues, key)}
              fullWidth
            >
              +
            </Button>
          </div>
        ) : (
          <div key={key} className="space-y-4">
            <h2 className="font-semibold">{key}</h2>{" "}
            <Field
              key={key}
              fieldDef={fieldDef}
              value={formValues[key]}
              onChange={(newValue, file) => handleChange(key, newValue, file)}
            />
          </div>
        )
      )}
      <Button onClick={handleSave} fullWidth>
        Save Changes
      </Button>
    </div>
  );
}
