import axios from "axios";

export async function getTodo() {
  const response = await axios.get(
    "http://localhost:3002/list"
  );
  return response.data;
}
