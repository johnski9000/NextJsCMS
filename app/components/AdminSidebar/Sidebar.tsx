"use client";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import {
  Drawer,
  Button,
  Modal,
  List,
  ThemeIcon,
  Divider,
  ScrollArea,
} from "@mantine/core";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { FaPlus, FaEdit, FaSignOutAlt, FaBars } from "react-icons/fa";
import { SidebarEditScreen } from "./SidebarEditScreen";

function Sidebar({ slug, initialPageData }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [pages, setPages] = useState(initialPageData || []);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /** Refresh Sidebar Pages */
  const refreshSidebar = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/pages/all`,
        {
          cache: "no-store",
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setPages(
          updatedData.map((page) => ({
            key: page.key,
            value: JSON.parse(page.value),
          }))
        );
      }
    } catch (error) {
      console.error("Error refreshing sidebar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Menu Button */}
      <div
        className="fixed top-6 left-6 rounded-full p-4 shadow-lg bg-blue-600 text-white flex items-center space-x-2 z-50 cursor-pointer"
        onClick={open}
      >
        <FaBars />
      </div>

      {/* Sidebar Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        title="CMS Menu"
        padding="xl"
        classNames={{ body: "flex flex-col h-full max-h-[calc(100vh-100px)]" }}
      >
        <ScrollArea className="flex-grow">
          <List spacing="md" size="md">
            {loading ? (
              <List.Item>Loading...</List.Item>
            ) : (
              [...pages]
                .sort((a, b) =>
                  a.key === "home" ? -1 : b.key === "home" ? 1 : 0
                )
                .map((page, index) => (
                  <List.Item
                    key={index}
                    icon={
                      <ThemeIcon
                        color={page.key === slug ? "blue" : "gray"}
                        size={24}
                        radius="xl"
                      >
                        <FaEdit />
                      </ThemeIcon>
                    }
                    className={`cursor-pointer flex items-center transition-all ${
                      page.key === slug || (page.key === "home" && slug === "")
                        ? "text-blue-600 font-bold"
                        : "hover:text-blue-600"
                    }`}
                    onClick={() => {
                      if (page.key === "home") {
                        router.push("/");
                        return;
                      } else {
                        router.push(`/${page.key}`);
                      }
                    }}
                  >
                    {page.key} page
                  </List.Item>
                ))
            )}
          </List>

          <Divider className="my-3" />
        </ScrollArea>

        {/* Current Page Actions */}
        <div className="p-3 bg-gray-100 rounded-md shadow-sm">
          <h4 className="text-lg font-semibold text-gray-700">Current Page</h4>
          <p className="text-sm text-gray-500">{slug}</p>
          <Button
            fullWidth
            mt="md"
            variant="outline"
            onClick={() => {
              const currentPage = pages.find((p) => p.key === slug);
              setSelectedElement(currentPage);
              setEditModalOpen(true);
            }}
            className="font-semibold mt-2"
          >
            <FaEdit className="mr-2" /> Edit Page
          </Button>
        </div>

        <Divider className="my-3" />

        {/* Sign Out Button (Fixed at Bottom) */}
        <Button
          fullWidth
          color="red"
          onClick={() => signOut()}
          className="mt-auto font-semibold"
        >
          <FaSignOutAlt className="mr-2" /> Sign Out
        </Button>
      </Drawer>

      {/* Edit Element Modal */}
      <Modal
        centered
        opened={editModalOpen && selectedElement}
        onClose={() => setEditModalOpen(false)}
        title={
          <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
            <FaEdit className="text-blue-600" />
            <span>Edit {selectedElement?.key}</span>
          </div>
        }
        size="lg"
        radius="md"
        overlayProps={{ blur: 5, opacity: 0.2 }}
        transitionProps={{ transition: "pop", duration: 200 }}
        classNames={{
          modal: "p-6 rounded-lg shadow-xl bg-white",
          body: "space-y-4",
        }}
      >
        <Divider className="mb-4" />
        {selectedElement && (
          <div className="max-h-[400px] overflow-y-auto p-2">
            <SidebarEditScreen
              selectedElement={selectedElement}
              slug={slug}
              refreshSidebar={refreshSidebar}
            />
          </div>
        )}
      </Modal>

      {/* Add New Element Modal */}
      <Modal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title={`Add New Element to ${slug}`}
      >
        <p>Form for adding a new element</p>
      </Modal>
    </>
  );
}

export default Sidebar;
