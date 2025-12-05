import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateHeadlines = async (profile: string, clickHistory: string[]) => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Context: The user is in a simulator about the Brexit referendum (2016-2020 era).
      User Profile: ${profile}.
      User previously clicked: ${clickHistory.join(', ')}.
      
      Task: Generate 3 short, catchy social media headlines in CHINESE that a targeted algorithm would show this user to maximize engagement (outrage or validation). 
      Mix misinformation and biased real news. 
      Strictly output valid JSON array of strings. No markdown.
      Example: ["布鲁塞尔密谋窃取我们的鱼！", "欧盟内部NHS资金达到历史新低"]
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [
      "算法故障：偏见过滤器错误", 
      "突发：随着投票日临近，民调收紧",
      "观点：为什么这次投票比以往任何时候都重要"
    ];
  }
};

export const analyzeEchoChamber = async (year: number) => {
  try {
     const model = 'gemini-2.5-flash';
     const prompt = `
      Provide a 2-sentence academic insight in CHINESE on the state of social media polarization regarding Brexit in ${year}. 
      Focus on network topology or information bubbles.
     `;
     const response = await ai.models.generateContent({
       model,
       contents: prompt
     });
     return response.text || "分析暂时不可用。";
  } catch (e) {
    return "网络分析数据暂时不可用。";
  }
}