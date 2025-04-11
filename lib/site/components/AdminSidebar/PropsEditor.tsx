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

// Define PropItem interface with specific types
interface PropItem {
  key?: string;
  type: "string" | "number" | "boolean" | "image" | "array";
  format?: string | null;
  value: any; // Could be refined further based on type
  active?: boolean;
}

// Define props interface with unified onSave signature
interface PropsEditorProps {
  props: Record<string, PropItem>;
  initialValues?: Record<string, any>;
  onSave: (
    compKeyOrProps: string | Record<string, any>,
    propsOrFiles: Record<string, any> | Record<string, File>,
    files?: Record<string, File>
  ) => void;
  navigationEditor?: boolean;
  compKey?: string;
}

// Memoized Field Component
// eslint-disable-next-line react/display-name
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
            value={(value as string) || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "number":
        return (
          <NumberInput
            label={fieldDef.key}
            value={value as number | undefined}
            onChange={(val) => onChange(val)}
          />
        );
      case "boolean":
        return (
          <Checkbox
            label={fieldDef.key}
            checked={value as boolean}
            onChange={(e) => onChange(e.target.checked)}
          />
        );
      case "image":
        return (
          <div className="flex flex-col gap-4 items-center space-x-4">
            {value && <Image src={value as string} width={100} height={100} />}
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

// Memoized Item Component
// eslint-disable-next-line react/display-name
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

// ArrayField Component
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
  navigationEditor = false,
  compKey,
}: PropsEditorProps) {
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

  const handleChange = (key: string, newValue: any, file?: File) => {
    setFormValues((prev) => ({ ...prev, [key]: newValue }));
    if (file) {
      setFiles((prev) => ({ ...prev, [key]: file }));
      setImagePreviews((prev) => ({ ...prev, [key]: newValue }));
    }
  };

  const handleArrayChange = (
    arrayKey: string,
    index: number,
    subKey: string,
    newValue: any,
    file?: File
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [arrayKey]: prev[arrayKey].map((item: any, i: number) =>
        i === index ? { ...item, [subKey]: newValue } : item
      ),
    }));
    if (file) {
      const fileKey = `${arrayKey}[${index}].${subKey}`;
      setFiles((prev) => ({ ...prev, [fileKey]: file }));
      setImagePreviews((prev) => ({ ...prev, [fileKey]: newValue }));
    }
  };

  const handleSave = () => {
    if (navigationEditor && compKey) {
      const file = files["logo"];
      onSave(compKey, formValues, { logo: file });
    } else {
      onSave(formValues, files);
    }
  };

  const addValue = (formValues: Record<string, any>, key: string) => {
    const updatedValues = {
      ...formValues,
      [key]: [
        ...formValues[key],
        Object.fromEntries(
          Object.entries(props[key].value[0]).map(([subKey, subProp]) => [
            subKey,
            (subProp as PropItem).value,
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
      [arrayKey]: prev[arrayKey].filter((_: any, i: number) => i !== index),
    }));
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
              fieldDef={fieldDef}
              value={formValues[key] as Record<string, any>[]}
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
            <h2 className="font-semibold">{key}</h2>
            <Field
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
