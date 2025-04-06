import { SavePage } from "@/app/utils/savePage";
import { showToast } from "@/app/utils/toast";
import { Modal, TextInput, Button, Divider } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FaTags,
  FaGlobe,
  FaAlignLeft,
  FaImage,
  FaTwitter,
  FaLink,
} from "react-icons/fa";

function Metadata({ savedMetaData, openModal, setOpenModal, refreshSidebar }) {
  const router = useRouter();
  console.log("Metadata:", savedMetaData);
  // Default metadata fields
  const baseMetaData = {
    title: "Page Title",
    description: "Meta description for SEO",
    canonical: "https://example.com/page-url",
    "og:title": "Open Graph Title",
    "og:description": "Open Graph description for social sharing",
    "og:image": "https://example.com/og-image.jpg",
    "og:url": "https://example.com/page-url",
    "twitter:card": "summary_large_image",
    "twitter:title": "Twitter Title",
    "twitter:description": "Twitter description",
    "twitter:image": "https://example.com/twitter-image.jpg",
  };

  // Merge saved metadata with baseMetaData
  const mergedMetadata = { ...baseMetaData, ...savedMetaData };

  // State for metadata inputs
  const [metadata, setMetadata] = useState(mergedMetadata);

  // Save function
  const onSave = async (compKey: string, updatedProps: object) => {
    try {
      const response = await SavePage({
        selectedPage: "Metadata",
        savedItems: { compKey, props: { ...updatedProps } },
      });

      if (response?.success) {
        showToast.success("Metadata saved successfully");
      }
    } catch (error) {
      showToast.error("Failed to save Metadata");
    } finally {
      router.refresh();
      refreshSidebar();
    }
  };

  useEffect(() => {
    setMetadata(mergedMetadata);
  }, [savedMetaData]);

  // Handle input changes
  const handleChange = (key, value) => {
    setMetadata((prev) => ({ ...prev, [key]: value }));
  };

  // Metadata descriptions & icons
  const metadataInfo = {
    title: {
      desc: "The title of this page as it appears on search engines (e.g., Google).",
      icon: <FaGlobe className="text-blue-500" />,
    },
    description: {
      desc: "A short summary of this page (appears below the title in search results).",
      icon: <FaAlignLeft className="text-gray-500" />,
    },
    canonical: {
      desc: "The main URL of this page to help search engines avoid duplicates.",
      icon: <FaLink className="text-green-500" />,
    },
    "og:title": {
      desc: "The title used when this page is shared on social media.",
      icon: <FaGlobe className="text-blue-500" />,
    },
    "og:description": {
      desc: "The description shown when this page is shared on social media.",
      icon: <FaAlignLeft className="text-gray-500" />,
    },
    "og:image": {
      desc: "A preview image that appears when sharing on social media.",
      icon: <FaImage className="text-purple-500" />,
    },
    "og:url": {
      desc: "The link users will visit when clicking a social media preview.",
      icon: <FaLink className="text-green-500" />,
    },
    "twitter:card": {
      desc: "Defines how the preview appears on Twitter (usually 'summary_large_image').",
      icon: <FaTwitter className="text-blue-400" />,
    },
    "twitter:title": {
      desc: "The title used when this page is shared on Twitter.",
      icon: <FaTwitter className="text-blue-400" />,
    },
    "twitter:description": {
      desc: "The description shown when sharing on Twitter.",
      icon: <FaAlignLeft className="text-gray-500" />,
    },
    "twitter:image": {
      desc: "The image used when sharing this page on Twitter.",
      icon: <FaImage className="text-purple-500" />,
    },
  };

  return (
    <Modal
      centered
      opened={openModal === "Metadata"}
      onClose={() => setOpenModal(false)}
      title={
        <div className="flex items-center space-x-2 text-lg font-semibold">
          <FaTags className="text-green-600" />
          <span>Page Metadata</span>
        </div>
      }
      size="lg"
      radius="md"
      classNames={{
        inner: "animate-fadeUp",
        content: "p-4 rounded-lg shadow-xl",
      }}
    >
      {/* Scrollable Content */}
      <div
        style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "8px" }}
      >
        {Object.entries(metadata).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              {metadataInfo[key]?.icon}
              <span>{key.replace(/og:|twitter:/, "").toUpperCase()}</span>
            </label>
            <p className="text-xs text-gray-500 mb-1">
              {metadataInfo[key]?.desc}
            </p>
            <TextInput
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <Divider className="my-3" />

      {/* Save Button */}
      <Button
        fullWidth
        onClick={() => onSave("Metadata", metadata)}
        className="bg-green-600 hover:bg-green-700"
      >
        Save Metadata
      </Button>
    </Modal>
  );
}

export default Metadata;
