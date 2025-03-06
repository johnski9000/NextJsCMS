export const uploadImage = async (image: string | Blob) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      return data.url;
    } else {
      return data.error;
    }
  } catch (error) {
    return error;
  }
};
