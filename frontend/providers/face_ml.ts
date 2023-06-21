import api, { SimpleResponse } from "./api";

export async function encodeImages() {
  const res = await api.get<SimpleResponse>("/face-ml/encode-images");
  return res.data;
}

export async function takeAttendance({
  display_video,
}: {
  display_video?: boolean;
}) {
  const res = await api.post<SimpleResponse>("/face-ml/take-attendance", {
    display_video,
  });
  return res.data;
}

export async function stopTakingAttendance() {
  const res = await api.post<SimpleResponse>("/face-ml/stop-taking-attendance");
  return res.data;
}
