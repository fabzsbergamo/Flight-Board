<template>
  <div>
    <Departures :departures="items" />
  </div>
</template>

<script lang="ts">
import Departures from '@/components/Departures.vue'
import { AllDepartures, Departure, DepartureData, Status } from './types'


export default {
  components: {
    Departures
  },

  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetch<AllDepartures>('https://6315ae3e5b85ba9b11e4cb85.mockapi.io/departures/Flightdata')
        .then((response) => response.json())
        .then((response) => {
          // [].map
          // [].filter
          // [].reduce
          // [].concat
          this.items = response.allDepartures.map((data: DepartureData, index: number) => {
            return formatData(data, index)
          })
        })
        .catch((error) => {
          console.log('errror', error)
        })
    }
  }
}

// taking DepartureData and converting it to Departure
function formatData(data: DepartureData, index: number): Departure {
  return {
    id: index,
    departureTime: formatDate(data.actualDepartureDateTime),
    cityName: data.departureAirport.cityName,
    code: data.arrivalAirport.code,
    airline: data.airline.name,
    gates: data.departureGate?.number,
    status: formatStatus(data.status),
    statusText: data.status,
    arrivalAirport: data.arrivalAirport.cityName
  }
}

function formatDate(date: string) {
  const inputDate = new Date(date)
  const hours = inputDate.getHours()
  const minutes = inputDate.getMinutes()
  const formatHour = hours < 10 ? `0${hours}` : hours
  const formatMinutes = minutes < 10 ? `0${minutes}` : minutes

  return `${formatHour}:${formatMinutes}`
}

function formatStatus(text: string): Status {
  const textLower = text.toLowerCase()

  if (textLower.includes('go to gate')) {
    return 'GO_TO_GATE'
  } else if (textLower.includes('gate open')) {
    return 'GATE_OPEN'
  } else if (textLower.includes('boarding')) {
    return 'BOARDING'
  } else if (textLower.includes('flight closing')) {
    return 'FLIGHT_CLOSING'
  } else if (textLower.includes('final call')) {
    return 'FINAL_CALL'
  } else if (textLower.includes('departed')) {
    return 'DEPARTED'
  } else if (textLower.includes('wait')) {
    return 'WAIT'
  } else if (textLower.includes('departing')) {
    return 'DEPARTING'
  } else if (textLower.includes('delayed')) {
    return 'DELAYED'
  } else if (textLower.includes('cancelled')) {
    return 'CANCELLED'
  } else {
    return 'UNKNOWN'
  }
}
</script>

<style>
body {
  font-family: 'Montserrat', sans-serif;
  padding: 3rem;
}
</style>
