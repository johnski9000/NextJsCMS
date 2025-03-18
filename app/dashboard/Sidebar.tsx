"use client";

import { useState } from "react";
import { ScrollArea, Box } from "@mantine/core";
import { Button, ActionIcon } from "@mantine/core";
import { FaPlus, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { signOut } from "next-auth/react";
import Image from "next/image";
import MenuItems from "./MenuItems";
import { FaAnglesLeft } from "react-icons/fa6";

function Sidebar({ session }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <div
        className={`${
          isExpanded ? "w-[60px] md:w-[200px]" : "w-[60px]"
        } transition-all duration-300`}
      />

      <Box
        title="CMS Menu"
        className={`fixed top-0 left-0 bottom-0 flex flex-col ${
          isExpanded ? "w-[200px]" : "w-[60px]"
        } bg-black shadow-md transition-all duration-300`}
        style={{ zIndex: 100 }}
      >
        <aside
          id="sidebar-multi-level-sidebar"
          className="flex flex-col justify-between flex-1"
        >
          {/* Sidebar Toggle Button */}
          <div
            className="p-3 flex justify-between items-center absolute top-0  right-[-25px] z-40"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ActionIcon
              color="orange"
              variant="filled"
              className={
                "transition-all duration-300" +
                (isExpanded ? "" : " mx-auto rounded-full")
              }
            >
              {isExpanded ? <FaAnglesLeft size={18} /> : <FaAnglesLeft size={18} className="rotate-180" />}
            </ActionIcon>
          </div>

          {/* Scrollable Menu */}
          <ScrollArea className="flex-grow">
            <div className="flex-1 px-3 py-4">
              {!isExpanded ? (
                <h4 className="text-lg font-semibold text-gray-700 dark:text-white mt-[15px]">
                  <Image
                    src="/mobileLogo.png"
                    alt="Logo"
                    width={40}
                    height={50}
                  />
                </h4>
              ) : (
                <Image src="/newLogo.png" alt="Logo" width={150} height={150}  />
              )}
            </div>
            <MenuItems session={session} isExpanded={isExpanded} />
          </ScrollArea>

          {/* Buttons Section */}
          <div
            className={` flex flex-col gap-4 ${
              isExpanded ? "p-3" : "p-2 pr-0"
            }`}
          >
            <Button
              fullWidth
              color="green"
              variant="filled"
              className={`!text-xs flex items-center justify-center gap-2 font-medium    ${
                !isExpanded
                  ? "justify-center !p-0 !rounded-tr-none !rounded-bl-none"
                  : ""
              }`}
              leftSection={isExpanded && <FaPlus />}
              onClick={() => console.log("Add new page")}
            >
              {isExpanded && "Add New Website"}
              {!isExpanded && <FaPlus />}
            </Button>
            <Button
              fullWidth
              color="red"
              variant="filled"
              className={`!text-xs mt-auto flex items-center gap-2 hover:bg-red-700 transition-all duration-200 font-semibold ${
                !isExpanded
                  ? "justify-center !p-0 !rounded-tr-none !rounded-bl-none"
                  : ""
              }`}
              leftSection={isExpanded && <FaSignOutAlt />}
              onClick={() => signOut()}
            >
              {isExpanded ? "Sign Out" : <FaSignOutAlt />}
            </Button>
          </div>
        </aside>
      </Box>
    </div>
  );
}

export default Sidebar;
