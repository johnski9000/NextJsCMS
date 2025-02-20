export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    if (data.success) {
      return data.url;
    } else {
      return data.error;
    }
  } catch (error) {
    return error;
  }
};
