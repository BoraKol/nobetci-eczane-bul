import React, { useState, useEffect } from 'react';
import { AppState, SearchParams } from './types';
import { fetchPharmacies } from './services/geminiService';
import InputForm from './components/InputForm';
import PharmacyCard from './components/PharmacyCard';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    loading: false,
    data: null,
    error: null,
    sources: [],
  });

  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    // Get geolocation on mount to improve maps grounding context
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          console.log("Geolocation permission denied or error:", err);
        }
      );
    }
  }, []);

  const handleSearch = async (params: SearchParams) => {
    setState(prev => ({ ...prev, loading: true, error: null, data: null, sources: [] }));
    
    try {
      const { data, sources } = await fetchPharmacies(
        params.city, 
        params.district, 
        params.date, 
        coords?.lat, 
        coords?.lng
      );
      
      setState({
        loading: false,
        data,
        error: null,
        sources
      });
    } catch (err: any) {
      setState({
        loading: false,
        data: null,
        error: err.message || "An error occurred while fetching pharmacy data. Please try again.",
        sources: []
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto no-scrollbar">
      
      {/* Hero Header */}
      <header className="bg-pharmacy-600 pb-20 pt-10 px-4 shadow-lg text-white relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-pharmacy-500 opacity-30"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-pharmacy-700 opacity-30"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white p-2 rounded-lg shadow-md">
              <span className="text-3xl">💊</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Nöbetçi Eczane Bulucu</h1>
          </div>
          <p className="text-pharmacy-100 max-w-xl text-lg">
            Find accurate, real-time on-duty pharmacy information across Turkey. 
            Powered by Google Search & Gemini to bring you the latest official schedules.
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          
          <InputForm onSubmit={handleSearch} loading={state.loading} />

          {/* Error State */}
          {state.error && (
            <div className="mt-8 bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm max-w-4xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{state.error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Grid */}
          {state.data && (
            <div className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Results for {state.data.city} {state.data.date}
                </h2>
                <span className="text-sm bg-slate-200 text-slate-600 py-1 px-3 rounded-full">
                  {state.data.results.length} found
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.data.results.map((pharmacy, idx) => (
                  <PharmacyCard key={`${pharmacy.name}-${idx}`} pharmacy={pharmacy} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State / Initial Instructions */}
          {!state.data && !state.loading && !state.error && (
             <div className="mt-20 text-center opacity-50">
               <div className="mx-auto h-24 w-24 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-4xl">
                 📍
               </div>
               <h3 className="text-lg font-medium text-slate-600">Enter your location to start</h3>
               <p className="text-slate-500">We search official pharmacist chamber lists.</p>
             </div>
          )}

          {/* Source Grounding Info */}
          {state.sources.length > 0 && (
            <div className="mt-12 border-t border-slate-200 pt-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Information Sources (Grounding)
              </h4>
              <ul className="space-y-1">
                {state.sources.map((source, idx) => (
                  <li key={idx} className="text-xs text-slate-500 truncate">
                    <a href={source.uri} target="_blank" rel="noreferrer" className="hover:text-pharmacy-600 hover:underline flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                      {source.title || source.uri}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;