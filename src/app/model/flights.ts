export interface Flights {
     id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;   
  arrivalTime: string;     
  durationMinutes: number;
  price: number;
  stops: number;
  aircraft: string;
  cabinClass: string;
  baggage: string;
  layovers: string[];
}


export interface SearchParams {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
}

export interface FlightFilters {
  maxPrice: number;
  stops: number | null;    
  airlines: string[];     
}