export type AllDepartures = {
  allDepartures: DepartureData[]
}

export type DepartureData = {
  id: string
  flightDirection: string
  scheduledDepartureDateTime: string
  scheduledArrivalDateTime: string
  estimatedDepartureDateTime: string
  actualDepartureDateTime: string
  arrivalAirport: ArrivalAirport
  departureAirport: DepartureAirport
  flightNumber: string
  airline: Airline
  departureGate: DepartureGate
  arrivalTerminal: string
  departureTerminal: string
  status: string
}

type ArrivalAirport = {
  name: string
  cityName: string
  countryName: string
  code: string
}
type DepartureAirport = {
  name: string
  cityName: string
  countryName: string
  code: string
}

type Airline = {
  name: string
  code: string
}

type DepartureGate = {
  name: string
  number: string
  action: string
}

export type Departure = {
[x: string]: any
  id: string
  departureTime: string
  cityName: string
  code: string
  airline: string
  gates: string
  status: Status
  statusText: string
  arrivalAirport: string
}

export type Status =
  | 'GATE_OPEN'
  | 'GO_TO_GATE'
  | 'BOARDING'
  | 'FLIGHT_CLOSING'
  | 'FINAL_CALL'
  | 'DEPARTED'
  | 'WAIT'
  | 'DEPARTING'
  | 'UNKNOWN'
  | 'DIVERTED'
  | 'DELAYED'
  | 'CANCELLED'
