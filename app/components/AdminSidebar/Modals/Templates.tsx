import { Modal } from "@mantine/core";
import React from "react";
import { FaFile } from "react-icons/fa";

function Templates({ openModal, setOpenModal }) {
  return (
    <Modal
      centered
      opened={openModal === "Templates"}
      onClose={() => setOpenModal(false)}
      title={
        <div className="flex items-center space-x-2 text-lg font-semibold ">
          <FaFile className="text-green-600" />
          <span>Templates</span>
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
      Template Bits
    </Modal>
  );
}

export default Templates;
