import React, { useState } from 'react';
import { SearchParams } from '../types';

interface InputFormProps {
  onSubmit: (params: SearchParams) => void;
  loading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, loading }) => {
  const [city, setCity] = useState('İstanbul');
  const [district, setDistrict] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) return;
    onSubmit({ city, district, date });
  };

  const cities = [
    "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 max-w-4xl mx-auto -mt-10 relative z-10">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* City Select */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">City (İl)</label>
          <div className="relative">
             <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-pharmacy-500 text-slate-800"
              disabled={loading}
            >
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* District Input */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">District (İlçe)</label>
          <input
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="e.g. Kadıköy (Optional)"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pharmacy-500 text-slate-800"
            disabled={loading}
          />
        </div>

        {/* Date Picker */}
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-pharmacy-500 text-slate-800"
            disabled={loading}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg font-bold text-white shadow-lg transition-all
              ${loading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-pharmacy-600 to-pharmacy-500 hover:from-pharmacy-700 hover:to-pharmacy-600 shadow-pharmacy-200 hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Scanning...
              </span>
            ) : (
              "Find Pharmacies"
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default InputForm;