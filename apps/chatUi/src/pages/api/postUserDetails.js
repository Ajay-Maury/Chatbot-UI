import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data, authToken } = req.body;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ISB_BACKEND_BASE_URL}/api/user/updatedetails/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log('response====================',response);
      res.status(200).json({ message: response.data });
    } catch (error) {
      console.error("Error handling ==============================", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Method not allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
