"use client";
import { useRouter } from "next/navigation";
import { Divider, ScrollArea, Box, Loader, Transition } from "@mantine/core";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaFileAlt,
  FaCog,
  FaBars,
  FaColumns,
  FaFile,
  FaTags,
} from "react-icons/fa";
import { Button } from "@mantine/core";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { FiRefreshCcw } from "react-icons/fi";
import { showToast } from "@/app/utils/toast";
import MenuItems from "./MenuItems";
import AddPage from "./Modals/AddPage";
import EditPage from "./Modals/EditPage";
import Footer from "./Modals/Footer";
import Navigation from "./Modals/Navigation";
import Metadata from "./Modals/Metadata";
import Settings from "./Modals/Settings";
import Templates from "./Modals/Templates";
interface PageData {
  key: string;
  value: any;
}

interface SidebarProps {
  slug: string;
  initialPageData: PageData[];
}

function Sidebar({ initialPageData, slug }: SidebarProps) {
  const [confirmDelete, setConfirmDelete] = useState(false as string | false);
  const [openModal, setOpenModal] = useState(false as string | false);
  const [selectedElement, setSelectedElement] = useState<PageData | null>(null);
  const [pages, setPages] = useState<PageData[]>([]);
  const router = useRouter();
  const [isPagesOpen, setIsPagesOpen] = useState(false);

  /** Refresh Sidebar Pages */
  const refreshSidebar = async () => {
    try {
      await getAllPageData(); // Ensure latest data is fetched
    } catch (error) {
      console.error("Error refreshing sidebar:", error);
    }
  };

  const getAllPageData = async () => {
    try {
      const response = await fetch(`/api/pages/all`);

      if (!response.ok) {
        throw new Error("Failed to fetch pages");
      }

      const data: PageData[] = await response.json();
      const pageData = data.map((page) => ({
        key: page.key,
        value: JSON.parse(page.value),
      }));

      setPages(pageData);
    } catch (error) {
      console.error("Error fetching all pages:", error);
      showToast.error("Failed to fetch pages!");
    }
  };

  // 🔹 Call `getAllPageData` only when the component mounts
  useEffect(() => {
    getAllPageData();
  }, []);

  const deletePage = async (slug: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/pages/delete/${slug}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        console.log("Page deleted successfully!");
        setPages((prev) => prev.filter((page) => page.key !== slug));
      } else {
        console.error("Failed to delete page.");
      }
    } catch (error) {
      console.error("Error deleting page:", error);
    } finally {
      refreshSidebar();
      showToast.success("Page deleted successfully!");
    }
  };

  const navigation = pages.find((page) => page.key === "Navigation");
  const footer = pages.find((page) => page.key === "Footer");
  const metaData = pages.find((page) => page.key === "Metadata");
  const menuItems = pages.filter(
    (page) =>
      page.key !== "Navigation" &&
      page.key !== "Settings" &&
      page.key !== "Metadata" &&
      page.key !== "Footer"
  );
  const RenderModals = () => {
    // const checkSlug =
    const checkSlug = () => {
      if (selectedElement) {
        if (selectedElement.key === slug) {
          return slug;
        } else {
          return selectedElement.key;
        }
      }
    };
    switch (openModal) {
      case "Add Page":
        return (
          <AddPage
            openModal={openModal}
            setOpenModal={setOpenModal}
            refreshSidebar={refreshSidebar}
          />
        );
      case "Edit Page":
        return (
          <EditPage
            openModal={openModal}
            setOpenModal={setOpenModal}
            selectedElement={selectedElement}
            slug={checkSlug()}
            refreshSidebar={refreshSidebar}
          />
        );
      case "Footer":
        return (
          <Footer
            openModal={openModal}
            setOpenModal={setOpenModal}
            footer={footer}
            refreshSidebar={refreshSidebar}
          />
        );
      case "Navigation":
        return (
          <Navigation
            openModal={openModal}
            setOpenModal={setOpenModal}
            navigation={navigation}
            refreshSidebar={refreshSidebar}
          />
        );
      case "Metadata":
        return (
          <Metadata
            savedMetaData={metaData ? metaData.value.props : {}}
            openModal={openModal}
            setOpenModal={setOpenModal}
            refreshSidebar={refreshSidebar}
          />
        );
      case "Settings":
        return <Settings openModal={openModal} setOpenModal={setOpenModal} />;
      case "Templates":
        return <Templates openModal={openModal} setOpenModal={setOpenModal} />;
    }
  };

  return (
    <Box
      title="CMS Menu"
      className="fixed left-0 top-0 bottom-0 max-h-screen flex flex-col  w-[250px] bg-white shadow-md"
      style={{ zIndex: 100 }}
    >
      <aside
        id="sidebar-multi-level-sidebar"
        className="flex flex-col justify-between flex-1"
        aria-label="Sidebar"
      >
        <ScrollArea className="flex-grow bg-white">
          <div className="flex-1 px-3 py-4 overflow-y-auto dark:bg-gray-800">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-white">
              Menu
            </h4>

            <Divider className="my-3" />
            <MenuItems
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
              deletePage={deletePage}
              slug={slug}
              isPagesOpen={isPagesOpen}
              setIsPagesOpen={setIsPagesOpen}
              pages={menuItems}
              setOpenModal={setOpenModal}
              setSelectedElement={setSelectedElement}
            />
          </div>
        </ScrollArea>
        <div className="p-4 bg-white flex flex-col gap-4">
          <Button
            fullWidth
            variant="light"
            className="mt-4 flex items-center gap-2 transition-all duration-200 font-medium"
            onClick={async () => {
              await refreshSidebar();
              showToast.success("Pages refreshed successfully!");
            }}
          >
            <FiRefreshCcw />
          </Button>
          <Button
            fullWidth
            variant="light"
            className="flex items-center gap-2  font-medium"
            leftSection={<FaPlus />}
            onClick={() => setOpenModal("Add Page")}
          >
            Add New Page
          </Button>

          <Button
            fullWidth
            variant="light"
            className="flex items-center gap-2 transition-all duration-200 font-medium"
            leftSection={<FaFileAlt />}
            onClick={() => {
              const currentPage = pages.find((p) => p.key === slug);
              setSelectedElement(currentPage || null);
              setOpenModal("Edit Page");
            }}
          >
            Edit Current Page
          </Button>

          <Button
            fullWidth
            color="red"
            variant="filled"
            className="mt-auto flex items-center gap-2 hover:bg-red-700 transition-all duration-200 font-semibold"
            leftSection={<FaSignOutAlt />}
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </div>
      </aside>
      {RenderModals()}
    </Box>
  );
}

export default Sidebar;
