import axios from "axios";

export const RESET_APPLICATION = "resetApplication";
export async function resetApplication() {
  const result = await axios.delete(`/application/reset`);
  return result.data;
}
