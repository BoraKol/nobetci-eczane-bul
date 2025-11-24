import React from 'react';
import { PharmacyResult } from '../types';

interface PharmacyCardProps {
  pharmacy: PharmacyResult;
}

const PharmacyCard: React.FC<PharmacyCardProps> = ({ pharmacy }) => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pharmacy.google_maps_query + ' ' + pharmacy.address)}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between mb-2">
          <div className="bg-pharmacy-50 text-pharmacy-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
            {pharmacy.district || "Merkez"}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-1">{pharmacy.name}</h3>
        
        <div className="flex items-start mt-3 space-x-2 text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-pharmacy-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm leading-relaxed">{pharmacy.address}</p>
        </div>

        <div className="flex items-center mt-3 space-x-2 text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pharmacy-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <a href={`tel:${pharmacy.phone}`} className="text-sm font-semibold hover:text-pharmacy-600 underline decoration-dotted">
            {pharmacy.phone}
          </a>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
         <a 
          href={`tel:${pharmacy.phone}`}
          className="flex items-center justify-center w-full py-2 px-4 border border-pharmacy-200 text-pharmacy-700 text-sm font-medium rounded-lg hover:bg-pharmacy-50 transition-colors"
        >
           Call
        </a>
        <a 
          href={mapUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full py-2 px-4 bg-pharmacy-600 text-white text-sm font-medium rounded-lg hover:bg-pharmacy-700 transition-colors shadow-sm shadow-pharmacy-200"
        >
          Navigate
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default PharmacyCard;