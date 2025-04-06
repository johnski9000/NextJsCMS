import { Divider, Modal } from "@mantine/core";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { SidebarEditScreen } from "../SidebarEditScreen";

function EditPage({
  openModal,
  setOpenModal,
  selectedElement,
  slug,
  refreshSidebar,
}) {
  return (
    <Modal
      centered
      opened={openModal === "Edit Page" && !!selectedElement}
      onClose={() => setOpenModal(false)}
      title={
        <div className="flex items-center space-x-2 text-lg font-semibold ">
          <FaEdit className="text-blue-600" />
          <span>Edit {selectedElement?.key}</span>
        </div>
      }
      size="xl"
      radius="md"
      classNames={{
        inner: "animate-fadeUp",
        content: "p-2 rounded-lg shadow-xl ",
        body: "space-y-4",
      }}
    >
      <Divider className="mb-4" />
      {selectedElement && (
        <div className=" overflow-y-auto p-2">
          <SidebarEditScreen
            selectedElement={selectedElement}
            slug={slug}
            refreshSidebar={refreshSidebar}
          />
        </div>
      )}
    </Modal>
  );
}

export default EditPage;
