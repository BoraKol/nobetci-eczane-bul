# 💊 AI-Powered On-Duty Pharmacy Finder (Turkey)

An intelligent application that locates **"Nöbetçi Eczaneler" (On-Duty Pharmacies)** in Turkey for any given date and city. 

Unlike traditional apps that rely on static databases, this project uses **Google Gemini 1.5 Flash** equipped with **Google Search Grounding**. It performs real-time web searches to fetch the most up-to-date pharmacy schedules from official sources (Chambers of Pharmacists) and visualizes them on **Google Maps**.

## 🚀 Features

* **Real-Time Data:** Fetches dynamic data that changes daily (no stale databases).
* **AI-Driven Parsing:** Uses Gemini 1.5 to parse unstructured web search results into structured JSON data.
* **Location Visualization:** Pins pharmacies on an interactive Google Map using the Maps JavaScript API.
* **Smart Fallbacks:** Handles date queries intelligently (e.g., automatically switching to "Today" if future lists aren't published).

## 🏗️ Architecture

1.  **User Input:** User selects City, District, and Date.
2.  **AI Engine (Backend):** * Python script connects to Google Gemini API.
    * **Grounding:** The model uses the built-in Google Search tool to query specific terms (e.g., *"Antalya Muratpaşa nöbetçi eczane bugün"*).
    * **Extraction:** The model extracts Pharmacy Name, Address, and Phone from the search snippets and returns a clean JSON.
3.  **Frontend:** The JSON data is processed and rendered on the UI (e.g., Streamlit/Web), placing markers on Google Maps via the Maps Platform.

## 🛠️ Tech Stack

* **AI & LLM:** Google Gemini 1.5 Flash (via `google-generativeai` SDK)
* **Grounding:** Google Search Tool (for Retrieval-Augmented Generation context)
* **Maps & Geocoding:** Google Maps JavaScript API, Places API, Geocoding API
* **Language:** Python 3.10+
* **Data Format:** JSON

## ⚙️ Setup & Installation

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/BoraKol/nobetci-eczane-bul.git](https://github.com/BoraKol/nobetci-eczane-bul.git)
    cd nobetci-eczane-bul
    ```

2.  **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory and add your Google Cloud API keys:
    ```env

    GEMINI_API_KEY="your_ai_api_key_here"

    ```

4.  **Run the Application**
    ```bash
    python main.py
    # OR if using Streamlit
    streamlit run app.py
    ```

## 🔑 API Permissions

To run this project, ensure the following APIs are enabled in your [Google Cloud Console](https://console.cloud.google.com/):

* **Google Generative Language API** (For Gemini)
* **Maps JavaScript API** (For map visualization)
* **Places API (New)** (For location details)
* **Geocoding API** (Optional: For address-to-coordinate conversion)

## ⚠️ Disclaimer

This application relies on the accuracy of data retrieved by Google Search and the generative capabilities of the AI model. While it aims for high accuracy, **always verify** the pharmacy's status by calling the phone number provided before traveling, especially in emergency situations. This is an open-source project and not an official government service.

---

**Author:** [Bora Kol]  
**Contact:** [borakol07@gmail.com / https://www.linkedin.com/in/borakol/]

## 🚀 Demo of the project below: 

https://nobetci-eczane-bul-tau.vercel.app/
