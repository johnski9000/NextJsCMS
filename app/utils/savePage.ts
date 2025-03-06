export const SavePage = async ({
  selectedPage,
  savedItems,
}: {
  selectedPage: string;
  savedItems: any[];
}) => {
  try {
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
  } catch (error) {
    return { error: (error as Error).message };
  }
};
