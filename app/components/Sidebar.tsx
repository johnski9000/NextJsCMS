"use client";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Button, Modal, List, ThemeIcon, Divider } from "@mantine/core";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { FaPlus, FaEdit, FaSignOutAlt, FaBars } from "react-icons/fa";
import { SidebarEditScreen } from "./SidebarEditScreen";

function Sidebar({ refreshPage }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example list of pages/elements

  useEffect(() => {
    async function fetchElements() {
      try {
        const response = await fetch("http://localhost:3001/api/pages/all"); // Adjust API endpoint if needed
        if (!response.ok) throw new Error("Failed to fetch elements");

        const data = await response.json();
        const sanitizedObjects = data.map((page) => {
          const { key, value } = page;
          return { key, value: JSON.parse(value) };
        });
        console.log(sanitizedObjects);
        setPages(sanitizedObjects);
      } catch (error) {
        console.error("Error fetching elements:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchElements();
  }, []);
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
      <Drawer opened={opened} onClose={close} title="CMS Menu" padding="xl">
        <List spacing="md" size="md">
          {loading && <List.Item>Loading...</List.Item>}
          {pages.map((page, index) => (
            <List.Item
              key={index}
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  <FaEdit />
                </ThemeIcon>
              }
              className="cursor-pointer hover:text-blue-600 flex items-center"
              onClick={() => {
                setSelectedElement(page);
                setEditModalOpen(true);
              }}
            >
              {page.key}
            </List.Item>
          ))}
        </List>

        {/* Add New Element Button */}
        <Button
          fullWidth
          mt="md"
          variant="outline"
          onClick={() => setAddModalOpen(true)}
        >
          Add New Element
        </Button>

        {/* Sign Out Button */}
        <Button fullWidth mt="md" color="red" onClick={() => signOut()}>
          Sign Out
        </Button>
      </Drawer>

      {/* Edit Element Modal */}
      <Modal
        centered
        opened={editModalOpen}
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

        {/* Content Area (Scrollable if needed) */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          <SidebarEditScreen
            selectedElement={selectedElement}
            refreshPage={refreshPage}
          />
        </div>
      </Modal>

      {/* Add New Element Modal */}
      <Modal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Element"
      >
        {/* Form for adding new element */}
        <p>Form for adding a new element</p>
      </Modal>
    </>
  );
}

export default Sidebar;
