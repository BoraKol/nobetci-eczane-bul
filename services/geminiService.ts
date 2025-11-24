import { GoogleGenAI } from "@google/genai";
import { SearchResponse, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchPharmacies = async (
  city: string, 
  district: string, 
  date: string,
  latitude?: number,
  longitude?: number
): Promise<{ data: SearchResponse, sources: GroundingSource[] }> => {
  
  const modelId = "gemini-2.5-flash"; // Optimized for speed and tools
  
  // Construct the prompt based on the specific requirements
  const prompt = `
    You are an intelligent backend assistant for a "Turkish On-Duty Pharmacy Finder" application.
    
    Task: Find "Nöbetçi Eczaneler" (On-Duty Pharmacies) in City: "${city}", District: "${district}" for the date: "${date}".
    
    Instructions:
    1. Use Google Search to find the official list of on-duty pharmacies for this specific city/district and date. Look for "Eczacı Odası" (Chamber of Pharmacists) sources.
    2. Extract the Pharmacy Name, Address, Phone Number, and District.
    3. Return the result strictly as a JSON object. 
    4. Do not include any conversational text outside the JSON block.
    
    Expected JSON Format:
    {
      "city": "${city}",
      "date": "${date}",
      "results": [
        {
          "name": "Pharmacy Name",
          "address": "Full Address",
          "phone": "+90...",
          "district": "District Name",
          "google_maps_query": "Pharmacy Name ${city} map" 
        }
      ]
    }
  `;

  try {
    const config: any = {
      tools: [{ googleSearch: {} }, { googleMaps: {} }],
      // We pass location to help Google Maps grounding if used implicitly
      toolConfig: (latitude && longitude) ? {
        retrievalConfig: {
          latLng: {
            latitude: latitude,
            longitude: longitude
          }
        }
      } : undefined
    };

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: config
    });

    const text = response.text || "";
    
    // Parse Sources (Grounding Metadata)
    const sources: GroundingSource[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          sources.push({ uri: chunk.web.uri, title: chunk.web.title });
        }
        if (chunk.maps?.uri && chunk.maps?.title) { // Assuming map chunks might follow similar structure or just exist
           sources.push({ uri: chunk.maps.uri, title: "Google Maps Data" });
        }
      });
    }

    // Extract JSON from the text response
    // The model might wrap it in ```json ... ```
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("Failed to parse pharmacy data. The model did not return valid JSON.");
    }

    const jsonData = JSON.parse(jsonMatch[0]) as SearchResponse;

    return {
      data: jsonData,
      sources: sources
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};