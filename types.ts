export interface PharmacyResult {
  name: string;
  address: string;
  phone: string;
  district: string;
  google_maps_query: string;
}

export interface SearchResponse {
  city: string;
  date: string;
  results: PharmacyResult[];
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface AppState {
  loading: boolean;
  data: SearchResponse | null;
  error: string | null;
  sources: GroundingSource[];
}

export interface SearchParams {
  city: string;
  district: string;
  date: string;
}