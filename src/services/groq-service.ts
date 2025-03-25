
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
      const systemPrompt = `You are a helpful assistant for a competitive coding platform called BattleCode. 
      This platform allows users to participate in coding competitions, host their own competitions, 
      and submit solutions. Users can upload training data, test data, and ideal data when hosting a competition. 
      The site has features like leaderboards to see rankings and competition details pages. 
      Your job is to help users navigate the site, understand how competitions work, and provide guidance
      on hosting or participating in competitions. Keep responses concise and friendly.`;

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
      return "Sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
    }
  }
};

export default GroqService;
