import axios from "axios";

describe("Upload API", () => {
  const BASE_URL = "http://localhost:5000";

  it("should successfully upload an image with metadata", async () => {
    const formData = new FormData();
    formData.append("reefImage", new File(["dummy"], "reef.jpg"));
    formData.append("latitude", "15.973");
    formData.append("longitude", "108.251");
    formData.append("notes", "Shallow reef with minor bleaching");

    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("file");
  });

  it("should reject upload when no image is provided", async () => {
    try {
      await axios.post(`${BASE_URL}/upload`, {});
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });
});
