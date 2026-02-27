import axios from "axios";

const BASE_URL="https://www.alphavantage.co/query";

export async function getQuote(symbol) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: "GLOBAL_QUOTE",
        symbol: symbol,
        apikey: process.env.EXPO_PUBLIC_ALPHA_VANTAGE_API_KEY
      }
    });
    //console.log(response.data)
    return response.data["Global Quote"];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}