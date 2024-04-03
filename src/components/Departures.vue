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
            <option v-for="option in currentDepatures.map(formatFlightOption)" :key="option.id" :value="option.id">
              {{ option.label}}
            </option>
          </select>
          <label for="floatingSelectGrid">Flight</label>
        </div>
      </div>
      <div class="col-md">
        <div class="form-floating">
            <select v-model="form.status"  class="form-select" >
              <option v-for="status in statuses" :key="status" >{{status}}</option>
            </select>
          <label for="floatingInputGrid" >Status</label>
        </div>
      </div>
      <div class="col-md">
        <div class="form-floating">
          <input v-model="form.statusText" name="browser" id="floatingInputGrid" type="text" class="form-control" placeholder="">
          <label for="floatingInputGrid" >Reason</label>
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
        <tr>
          <th class="headers">Departure time</th>
          <th class="headers">City Name</th>
          <th class="headers">Code</th>
          <th class="headers">Airline</th>
          <th class="headers">Gates</th>
          <th class="headers">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="departure in filtered()" :key="departure.id" class="flightbox">
          <td>{{ departure.departureTime }}</td>
          <td class="gold" >{{ departure.arrivalAirport }} <span class="arrivalcountry">- {{ departure.countryName }}</span></td>
          <td class="">{{ departure.code }}</td>
          <td class="">{{ departure.airline }}</td>
          <td class="gold ">{{ departure.gates }}</td>
          <td class="">
            <span :class="colors[departure.status]" class="status">
              {{ `${departure.statusText}`  }}
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
    
    formatFlightOption (departure: Departure) {
      const label = `${departure.departureTime} ${departure.cityName} to ${departure.arrivalAirport} : ${departure.status}`
      return {
        id: departure.id,
        label: label
      };
    },
    async updateFlightStatus() {
      console.log("bla bla bla ", this.form)
      const updated = this.currentDepatures.map((departure) => {
        if (Number(this.form.flight) === departure.id) {
          return {...departure, statusText: this.form.statusText, status: this.form.status}
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
        status: '',
        statusText: '',
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
        GO_TO_GATE: 'status--go-to-gate',
        GATE_OPEN: 'status--gate-open',
        BOARDING: 'status--go-to-gate',
        FLIGHT_CLOSING: 'status--fligh-closing',
        FINAL_CALL: 'status--final-call',
        DEPARTED: 'status--go-to-gate',
        WAIT: 'status--go-to-gate',
        DEPARTING: 'status--go-to-gate',
        UNKNOWN: 'status--go-to-gate',
        DIVERTED: 'status--go-to-gate',
        DELAYED: 'status--go-to-gate',
        CANCELLED: 'status--cancelled',
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
.arrivalcountry {
  color: burlywood;
}
.status {
  padding: 6px 10px 6px 6px;
  border-left: 1rem solid white;
  background-color: white;
  color: black;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  white-space: nowrap;
}
.status--go-to-gate {
  border-left-color: green;
  color: green;
}
.status--cancelled{
  border-left-color: red;
  color: red;
}
.status--gate-open {
  border-left-color: rgb(59, 176, 59);
  color: rgb(59, 176, 59);
}
.status--fligh-closing{
  border-left-color: rgb(255, 208, 0);
  color: rgb(255, 208, 0);
}
.status--final-call{
  border-left-color: rgb(250, 126, 2);
  color: rgb(250, 126, 2);
}
.headers {
  background-color: rgb(195, 195, 202);
  color: black;
  /* text-align: left; */
}

.flightbox {
  border-color: white;
}

.gold {
  color: darkgoldenrod;
}
</style>
