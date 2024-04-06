import Departures from '@/components/Departures.vue'
import { mount } from '@vue/test-utils'

describe('Departures', () => {
  it('renders properly', () => {
    const wrapper = mount(Departures, { props: { departures: [] } })
    const title = wrapper.find('h1').text()
    const tableHead = wrapper.find('thead > tr')

    expect(title).toContain('Departures')
    expect(tableHead.findAll('th')).toHaveLength(6)
  })
  it('renders a row properly', () => {
    const departure = {
      id: '2',
      departureTime: 'Mon Feb 05 2024 00:48:42',
      arrivalAirport: 'Paris',
      code: 'MUN',
      airline: 'EasyJet',
      gates: '14',
      status: 'GATE_OPEN',
      statusText: 'GATE_OPEN'
    }
    const wrapper = mount(Departures, { props: { departures: [departure] } })
    const row = wrapper.find('tbody > tr')
    // console.log(wrapper.html())
    const tds = row.findAll('td')

    expect(tds[0].text()).toContain('00:48')
    expect(tds[1].text()).toContain(departure.arrivalAirport)
    expect(tds[2].text()).toContain(departure.code)
    expect(tds[3].text()).toContain(departure.airline)
    expect(tds[4].text()).toContain(departure.gates)
    expect(tds[5].text()).toContain(departure.status)
    expect(tds[5].text()).toContain(departure.statusText)
  })
})
