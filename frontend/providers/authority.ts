import api, { SimpleResponse } from "./api";

export async function encodeImages() {
  const res = await api.get<SimpleResponse>("/authority/encode-images");
  return res.data;
}
