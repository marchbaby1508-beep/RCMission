import { useMemo, useState } from 'react'
import './DashboardPage.css'

const busData = [
  {
    id: 1,
    company: 'Shakti Travels',
    type: 'Volvo AC',
    departure: '06:00',
    arrival: '12:45',
    duration: '6h 45m',
    price: 1299,
    ac: true,
    seats: 8,
    route: 'Mumbai → Pune',
  },
  {
    id: 2,
    company: 'CityLink Express',
    type: 'Semi-sleeper',
    departure: '09:30',
    arrival: '15:15',
    duration: '5h 45m',
    price: 899,
    ac: false,
    seats: 12,
    route: 'Mumbai → Pune',
  },
  {
    id: 3,
    company: 'A1 Travels',
    type: 'Volvo AC',
    departure: '13:00',
    arrival: '19:10',
    duration: '6h 10m',
    price: 1399,
    ac: true,
    seats: 5,
    route: 'Mumbai → Pune',
  },
  {
    id: 4,
    company: 'Dakshin Coach',
    type: 'Non-AC Sleeper',
    departure: '20:00',
    arrival: '02:15',
    duration: '6h 15m',
    price: 699,
    ac: false,
    seats: 20,
    route: 'Mumbai → Pune',
  },
]

const departureOptions = ['Any', 'Morning', 'Afternoon', 'Evening']
const arrivalOptions = ['Any', 'Before 12 PM', '12 PM - 6 PM', 'After 6 PM']

export default function DashboardPage() {
  const [from, setFrom] = useState('Mumbai')
  const [to, setTo] = useState('Pune')
  const [date, setDate] = useState('2026-05-01')
  const [busClass, setBusClass] = useState('Any')
  const [passengers, setPassengers] = useState(1)
  const [departureFilter, setDepartureFilter] = useState('Any')
  const [arrivalFilter, setArrivalFilter] = useState('Any')
  const [showAc, setShowAc] = useState(true)
  const [showNonAc, setShowNonAc] = useState(true)

  const filteredBuses = useMemo(() => {
    return busData.filter((bus) => {
      const matchesClass = busClass === 'Any' || bus.type.toLowerCase().includes(busClass.toLowerCase())
      const matchesAc = (showAc && bus.ac) || (showNonAc && !bus.ac)
      if (!matchesClass || !matchesAc) return false

      const departureHour = Number(bus.departure.split(':')[0])
      const arrivalHour = Number(bus.arrival.split(':')[0])

      if (departureFilter === 'Morning' && (departureHour < 6 || departureHour >= 12)) return false
      if (departureFilter === 'Afternoon' && (departureHour < 12 || departureHour >= 17)) return false
      if (departureFilter === 'Evening' && (departureHour < 17 || departureHour > 23)) return false

      if (arrivalFilter === 'Before 12 PM' && arrivalHour >= 12) return false
      if (arrivalFilter === '12 PM - 6 PM' && (arrivalHour < 12 || arrivalHour >= 18)) return false
      if (arrivalFilter === 'After 6 PM' && arrivalHour < 18) return false

      return true
    })
  }, [busClass, showAc, showNonAc, departureFilter, arrivalFilter])

  return (
    <div className="dashboard-page">
      <header className="top-header">
        <div className="brand-logo">chaloo</div>
        <nav className="top-nav">
          <a href="#">Home</a>
          <a href="#">IRCTC</a>
          <a href="#">Trains</a>
          <a href="#">Buses</a>
          <a href="#">Hotels</a>
          <button className="header-button">Login</button>
        </nav>
      </header>

      <section className="hero-card">
        <div>
          <h1>Bus bookings made simple</h1>
          <p>Search routes, compare fares, filter by time and bus type, then book your seat instantly.</p>
        </div>
      </section>

      <section className="search-card">
        <div className="search-grid">
          <label>
            From
            <input value={from} onChange={(e) => setFrom(e.target.value)} />
          </label>
          <label>
            To
            <input value={to} onChange={(e) => setTo(e.target.value)} />
          </label>
          <label>
            Travel date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            Class
            <select value={busClass} onChange={(e) => setBusClass(e.target.value)}>
              <option>Any</option>
              <option>Volvo</option>
              <option>AC</option>
              <option>Non-AC</option>
            </select>
          </label>
          <label>
            Passengers
            <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <section className="filters-panel">
        <div className="filter-block">
          <h3>Departure time</h3>
          <select value={departureFilter} onChange={(e) => setDepartureFilter(e.target.value)}>
            {departureOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="filter-block">
          <h3>Arrival time</h3>
          <select value={arrivalFilter} onChange={(e) => setArrivalFilter(e.target.value)}>
            {arrivalOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="filter-block checkbox-group">
          <h3>Bus type</h3>
          <label>
            <input type="checkbox" checked={showAc} onChange={(e) => setShowAc(e.target.checked)} />
            AC buses
          </label>
          <label>
            <input type="checkbox" checked={showNonAc} onChange={(e) => setShowNonAc(e.target.checked)} />
            Non-AC buses
          </label>
        </div>
      </section>

      <section className="results-section">
        <div className="results-header">
          <div>
            <h2>Available buses</h2>
            <p>{from} to {to} on {date}</p>
          </div>
          <div className="results-count">{filteredBuses.length} results</div>
        </div>

        {filteredBuses.length === 0 ? (
          <div className="no-results">No buses match your filters. Try another date or time.</div>
        ) : (
          <div className="bus-list">
            {filteredBuses.map((bus) => (
              <div key={bus.id} className="bus-card">
                <div className="bus-card-main">
                  <div>
                    <span className="badge">{bus.type}</span>
                    <h3>{bus.company}</h3>
                    <p className="route-label">{bus.route}</p>
                  </div>
                  <div className="price-block">
                    <span className="price">₹{bus.price}</span>
                    <span className="seats">{bus.seats} seats left</span>
                  </div>
                </div>
                <div className="bus-card-meta">
                  <div>
                    <strong>{bus.departure}</strong>
                    <span>Departure</span>
                  </div>
                  <div>
                    <strong>{bus.duration}</strong>
                    <span>Duration</span>
                  </div>
                  <div>
                    <strong>{bus.arrival}</strong>
                    <span>Arrival</span>
                  </div>
                </div>
                <div className="bus-card-actions">
                  <span className={`bus-chip ${bus.ac ? 'ac' : 'non-ac'}`}>{bus.ac ? 'AC' : 'Non-AC'}</span>
                  <button className="button-primary">Book seat</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
