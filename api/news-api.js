import axios from "axios";

const BASE_URL="https://newsapi.org/v2/everything"; // put your web 4 api domain here

export async function getNews(topic) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: topic,
        apiKey: process.env.EXPO_PUBLIC_NEWS_API_KEY,   // token here?
        pageSize: 50
      }
    });
    console.log(response.data);
    return response.data.articles
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}