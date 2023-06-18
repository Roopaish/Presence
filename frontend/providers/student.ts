import api, { SimpleResponse } from "./api";

export async function saveImages({ images }: { images: { src: string }[] }) {
  const formData = new FormData();
  images.forEach((image, index) => {
    formData.append("image", dataURItoBlob(image.src), `${index}.png`);
  });

  const res = await api.post<SimpleResponse>("/users/save-images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

const dataURItoBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeString });
};
