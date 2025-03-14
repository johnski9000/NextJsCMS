export const SavePage = async ({
  selectedPage,
  savedItems,
}: {
  selectedPage: string;
  savedItems: any[] | { compKey: string; props: object };
}) => {
  try {
    console.log("selectedPage", selectedPage);
    console.log("savedItems", savedItems);
    if (
      selectedPage === "Navigation" ||
      selectedPage === "Footer" ||
      selectedPage === "Metadata"
    ) {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: selectedPage,
          pageData: savedItems,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save page");
      }
      const data = await response.json();
      return data;
    } else {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: selectedPage,
          pageData: { slug: selectedPage, components: [...savedItems] },
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save page");
      }
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return { error: (error as Error).message };
  }
};
