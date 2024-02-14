<template>
  <div class="top-bar">
    <h1 class="title">
    <i class="fas fa-plane"></i> Departures
  </h1>
  </div>
  <div>
    <form class="row g-3" @submit.prevent="updateFlightStatus">
      <div class="col-md">
        <div class="form-floating">
          <select v-model="form.flight" id="floatingSelectGrid" class="form-select">
            <option disabled selected value="">Choose an option</option>
            <option v-for="option in currentDepatures.map(flightOption)" :key="option.id" :value="option.id">
              {{ option.label}}
            </option>
          </select>
          <label for="floatingSelectGrid">Flight</label>
        </div>
      </div>
      <div class="col-md">
        <div class="form-floating">
          <input v-model="form.status" list="browsers" name="browser" id="floatingInputGrid" type="text" class="form-control" placeholder="">

            <datalist id="browsers">
              <option v-for="status in statuses" :key="status" >{{status}}</option>
            </datalist>
          <label for="floatingInputGrid" >Update Status</label>
        </div>
      </div>
      <div class="col-md">
        <button type="submit" class="btn btn-primary mb-3">Update</button>
      </div>
    </form>
  </div>
  <div>
    <form class="row g-3" @submit.prevent="resetFilter">
      <div class="col-md">
        <div class="form-floating">
          <select v-model="statusForm.activeFilter" class="form-control" id="floatingSelectGrid" >
            <option value="NONE">NONE</option>
            <option value="DEPARTED">DEPARTED</option>
            <option value="FINAL CALL">FINAL CALL</option>
          </select>
          <label id="floatingSelectGrid" >Filter by status</label>
        </div>
      </div>
      <div class="col-md">
        <div class="form-floating">
          <select v-model="airlineForm.activeFilter" class="form-control" id="floatingSelectGrid">
            <option value="NONE">NONE</option>
            <option value="Turkish Airlines">Turkish Airlines</option>
            <option value="Lufthansa">Lufthansa</option>
          </select>
          <label id="floatingSelectGrid">Filter by Airline</label>
        </div>
      </div>
      <div class="col-md">
        <button type="submit" class="btn btn-primary mb-3">Reset</button>
      </div>
    </form>
  </div>
  <div class="display">
    <table id="results" class="table table-dark table-hover">
      <thead>
        <tr class="headers">
          <th>Departure time</th>
          <th>City Name</th>
          <th>Code</th>
          <th>Airline</th>
          <th>Gates</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="departure in filtered()" :key="departure.id">
          <td>{{ departure.departureTime }}</td>
          <td class="gold">{{ departure.arrivalAirport }}</td>
          <td>{{ departure.code }}</td>
          <td>{{ departure.airline }}</td>
          <td class="gold">{{ departure.gates }}</td>
          <td>
            <span :class="colors[departure.status]">
              {{ `${departure.statusText}` }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script lang="ts">
import type { Status, Departure } from '@/types'

export default {
  props: {
    departures: {
      type: Array,
      default: [],
    }
  },
  watch: {
     departures(info) {
       this.currentDepatures = this.departures;
     }
  },

  methods: {
    filtered() {
    return this.currentDepatures.filter((departure) => {
      if (this.statusForm.activeFilter === 'NONE' && this.airlineForm.activeFilter === 'NONE') {
        return true; // No filters applied, return all departures
      }
      if (this.statusForm.activeFilter !== 'NONE' && departure.status !== this.statusForm.activeFilter) {
        return false; // Status filter applied but does not match departure status
      }
      if (this.airlineForm.activeFilter !== 'NONE' && departure.airline !== this.airlineForm.activeFilter) {
        return false; // Airline filter applied but does not match departure airline
      }
      return true; // Departure matches both filters or no filters applied
    });
    },

    resetFilter() {
      this.statusForm.activeFilter = 'NONE';
      this.airlineForm.activeFilter = 'NONE';
    },
    
    flightOption (departure: Departure) {
      const label = `${departure.departureTime} ${departure.cityName} to ${departure.arrivalAirport} : ${departure.statusText}`
      return {
        id: departure.id,
        label: label
      };
    },
    async updateFlightStatus() {
      console.log("bla bla bla ", this.form)
      const updated = this.currentDepatures.map((departure) => {
        if (Number(this.form.flight) === departure.id) {
          return {...departure, statusText: this.form.status}
        }

        return departure
      });
      this.currentDepatures = updated;
    }
  },

  data() {
    return {
      statusForm: {
        activeFilter: 'NONE'
      },
      airlineForm: {
        activeFilter: 'NONE'
      },
      form: {
        flight: '',
        status: ''
      },
      statuses: [
        "WAIT",
        "BOARDING",
        "DELAYED",
        "CANCELLED",
        "DEPARTED",
        "DIVERTED",
        "GATE_OPEN",
      ] as Status[],
      
      colors: {
        GO_TO_GATE: 'go-to-gate',
        GATE_OPEN: 'gate-open',
        BOARDING: 'go-to-gate',
        FLIGHT_CLOSING: 'fligh-closing',
        FINAL_CALL: 'final-call',
        DEPARTED: 'go-to-gate',
        WAIT: 'go-to-gate',
        DEPARTING: 'go-to-gate',
        UNKNOWN: 'go-to-gate',
        DIVERTED: 'go-to-gate',
        DELAYED: 'go-to-gate',
        CANCELLED: 'cancelled',
      },
      currentDepatures: [...this.departures],
      flightOptions: []
    }
  }
}

</script>

<style scoped>
.top-bar {
  background-color: antiquewhite;
  flex: auto;
  flex-direction: row;
  color: #111010;
  text-align: left;
}
.display {
  background-color: rgb(76, 74, 74);
  color: rgb(196, 45, 45);
  flex: auto;
  padding: 2%;
  text-align: center;
}

.go-to-gate {
  background-color: white;
  color: black;
}
.cancelled{
  background-color: white;
  color: red;
}
.gate-open {
  background-color: white;
  color: green;
}
.fligh-closing{
  background-color: white;
  color: orange;
}
.final-call{
  background-color: white;
  color: rgb(252, 208, 127);
}
.headers {
  background-color: blue;
}

.gold {
  color: darkgoldenrod;
}
</style>
