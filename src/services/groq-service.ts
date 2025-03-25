
import axiosInstance from "@/lib/axios-config";
import axios from "axios";

const GROQ_API_KEY = "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";
const MODEL = "llama3-8b-8192"; // Using Llama3 8B model which is fast and effective

interface GroqResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

const GroqService = {
  async getChatResponse(message: string, context?: string): Promise<string> {
    try {
      // Create a system prompt that tells the AI about the site
      const systemPrompt = `You are Saggle's AI chatbot, a smart and friendly virtual assistant that helps users with their queries about Saggle's products, services, orders, and support. 

Your tone is professional yet engaging, ensuring users feel assisted and valued. You provide **accurate, concise, and helpful responses** while keeping interactions **smooth, polite, and on-brand**.

Key Functions:
- **Product Assistance:** Provide details on Saggle's goodies, T-shirts, stickers, and other merchandise.
- **Order Management:** Help users place, track, and modify orders.
- **Payments & Billing:** Answer questions about accepted payment methods, invoices, and refunds.
- **Account Support:** Guide users on login issues, profile updates, and security settings.
- **Customer Support:** Resolve common issues and escalate complex cases when needed.
- **Personalized Assistance:** Address users by name (if provided) and offer relevant solutions.
- **Quick & Natural Conversations:** Maintain a balance between efficiency and engagement.`;

      const response = await axios.post<GroqResponse>(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 500,
        },
        {
          headers: {
            "Authorization": `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error getting response from Groq:", error);
      return "Sorry, I'm having trouble connecting right now. Please try again later or contact our support team for immediate assistance.";
    }
  }
};

export default GroqService;
