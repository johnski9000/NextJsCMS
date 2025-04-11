import {
  Button,
  Divider,
  Input,
  Text,
  List,
  Paper,
  ThemeIcon,
} from "@mantine/core";
import React, { useState } from "react";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Define props interface
interface CreatePageProps {
  refreshSidebar: () => void;
  closeModal: () => void;
}

function CreatePage({ refreshSidebar, closeModal }: CreatePageProps) {
  const [slug, setSlug] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const slugRegex =
    /^[a-z0-9]+(?:[-a-z0-9]*[a-z0-9])?(?:\/[a-z0-9]+(?:[-a-z0-9]*[a-z0-9])?)*$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();

    // Allow user to type `/` freely but sanitize on submission
    setSlug(value);

    if (value && !slugRegex.test(value)) {
      setError(
        "Invalid format: Only lowercase letters, numbers, hyphens (-), and forward slashes (/) are allowed."
      );
    } else {
      setError("");
    }
  };

  // ✅ Ensure slug is sanitized before saving
  const addPage = async () => {
    if (!slug || error) return;

    // **Sanitization before sending to API**
    const cleanedSlug = slug
      .replace(/^\/+/, "") // Remove leading slashes
      .replace(/\/+$/, "") // Remove trailing slashes
      .replace(/\/{2,}/g, "/"); // Remove consecutive slashes

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: cleanedSlug,
        pageData: { components: [] },
      }),
    });

    if (response.ok) {
      console.log("Page created successfully!");
      setSuccess(true);
      refreshSidebar();
    } else {
      console.error("Failed to create page.");
    }
  };

  return (
    <div className="p-6 mx-auto">
      <Divider className="mb-4" />

      {/* Tutorial Section */}
      <Paper shadow="xs" p="md" className="mb-4 bg-gray-50 rounded-lg">
        <h2 className="text-gray-800 mb-2 font-semibold">
          How to Name Your Page:
        </h2>

        <List size="sm" spacing="xs" className="mb-3">
          <List.Item
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <FaCheck size={12} />
              </ThemeIcon>
            }
          >
            <strong>
              Use only lowercase letters, numbers, and hyphens (-).
            </strong>
          </List.Item>
          <List.Item>
            <strong>Examples:</strong> about-us, services, contact-page.
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <FaCheck size={12} />
              </ThemeIcon>
            }
          >
            <strong>
              Do not use spaces, special symbols, or capital letters.
            </strong>
          </List.Item>
          <List.Item>
            <strong>Wrong examples:</strong> About Us, contact_page, @home.
          </List.Item>
        </List>

        <Divider className="my-3" />

        <h2 className="text-gray-800 font-semibold mb-2">
          How Nested Pages Work:
        </h2>

        <List size="sm" spacing="xs">
          <List.Item>
            A nested page is a <strong>sub-page</strong> that belongs to another
            page.
          </List.Item>
          <List.Item>
            <strong>Example:</strong> If you create a &quot;team&quot; page, you
            might want to add a sub-page like &quot;team/john-doe&quot; to show
            details about a specific team member.
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <FaCheck size={12} />
              </ThemeIcon>
            }
          >
            <strong>Correct nested page examples:</strong> services/web-design,
            blog/first-post, about-us/history.
          </List.Item>
          <List.Item>
            <strong>Wrong examples:</strong> services_web_design, blog first
            post.
          </List.Item>
          <List.Item>
            Separate sections with a <strong>forward slash (/)</strong>, and do
            not use spaces or underscores.
          </List.Item>
        </List>
      </Paper>

      {/* Input & Button Section */}
      <div className="flex items-center space-x-3">
        <Input
          type="text"
          placeholder="Enter page URL name (e.g., about-us or services/web-design)"
          value={slug}
          onChange={handleChange}
          className="flex-grow"
          size="md"
          error={error}
        />
        <Button
          onClick={addPage}
          variant="filled"
          color="blue"
          size="md"
          className="shrink-0"
          disabled={!slug || !!error}
        >
          Create Page
        </Button>
      </div>

      {error && (
        <Text color="red" size="sm" className="mt-2">
          {error}
        </Text>
      )}

      {/* Success Message and Navigate Button */}
      {success && (
        <Paper shadow="xs" p="md" className="mt-4 bg-green-50 rounded-lg">
          <Text size="sm" color="green" className="!mb-4">
            ✅ Page created successfully!
          </Text>
          <Button
            variant="outline"
            color="green"
            size="md"
            fullWidth
            rightSection={<FaArrowRight />}
            onClick={() => router.push(`/${slug}`)}
          >
            Navigate and Start Editing
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default CreatePage;
