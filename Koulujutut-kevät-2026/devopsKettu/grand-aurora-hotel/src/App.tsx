import React, { useState, useEffect } from 'react';

export default function App() {
  // --- MOCK DATABASE & STATE ---
  const [rooms, setRooms] = useState([
    { id: 1, name: "Aurora Standard Double", type: "Standard", price: 120, capacity: 2, image: "https://placehold.co/600x400/1e2d4f/d4af37?text=Standard+Room", desc: "Kodikas ja valoisa huone parivuoteella, sopii erinomaisesti pariskunnille." },
    { id: 2, name: "Nordic Deluxe King", type: "Deluxe", price: 180, capacity: 2, image: "https://placehold.co/600x400/2d4373/d4af37?text=Deluxe+King", desc: "Tilava deluxe-huone upeilla näköaloilla, king size -vuode ja sauna." },
    { id: 3, name: "Lapland Panorama Suite", type: "Suite", price: 320, capacity: 4, image: "https://placehold.co/600x400/141e36/d4af37?text=Panorama+Suite", desc: "Luksussviitti lasikatolla, oma poreallas ja takka revontulien katseluun." },
    { id: 4, name: "Aurora Twin Standard", type: "Standard", price: 110, capacity: 2, image: "https://placehold.co/600x400/1e2d4f/d4af37?text=Twin+Standard", desc: "Kaksi erillistä vuodetta, moderni skandinaavinen sisustus ja työpiste." },
    { id: 5, name: "Arctic Superior Family", type: "Deluxe", price: 240, capacity: 4, image: "https://placehold.co/600x400/2d4373/d4af37?text=Family+Suite", desc: "Perhehuone kahdella makuuhuoneella ja tilavalla oleskelutilalla." },
    { id: 6, name: "Royal Aurora Penthouse", type: "Suite", price: 490, capacity: 6, image: "https://placehold.co/600x400/0a101f/d4af37?text=Royal+Penthouse", desc: "Hotellin hulppein kattohuoneisto omalla saunalla ja panoraamaterassilla." }
  ]);

  const [bookings, setBookings] = useState([
    { id: "RES-8492", guestName: "Anna Virtanen", email: "anna.virtanen@gmail.com", roomId: 2, checkIn: "2026-10-22", checkOut: "2026-10-25", totalPrice: 540, status: "Vahvistettu" },
    { id: "RES-9102", guestName: "Juha Korhonen", email: "juha.k@outlook.com", roomId: 3, checkIn: "2026-10-28", checkOut: "2026-10-30", totalPrice: 640, status: "Vahvistettu" }
  ]);

  const [currentTab, setCurrentTab] = useState('rooms');
  const [calendarCurrentMonth, setCalendarCurrentMonth] = useState(9); // October (0-indexed)
  const [calendarCurrentYear, setCalendarCurrentYear] = useState(2026);

  const [apiLogs, setApiLogs] = useState([
    `[${new Date().toLocaleTimeString()}] [Information] Initialized HotelDbContext with 6 rooms and 2 seed bookings.`,
    `[${new Date().toLocaleTimeString()}] [Information] GET /api/calendar/availability?month=10&year=2026 executed successfully.`
  ]);

  const [toasts, setToasts] = useState([]);

  // Modal states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [modalCheckIn, setModalCheckIn] = useState('');
  const [modalCheckOut, setModalCheckOut] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const [isSimulationModalOpen, setIsSimulationModalOpen] = useState(false);
  const [roomTypeFilter, setRoomTypeFilter] = useState('all');

  const [filterCheckIn, setFilterCheckIn] = useState('');
  const [filterCheckOut, setFilterCheckOut] = useState('');

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 2);

    setFilterCheckIn(today.toISOString().split('T')[0]);
    setFilterCheckOut(tomorrow.toISOString().split('T')[0]);
  }, []);

  const logApiAction = (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    setApiLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 30));
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // --- ROOMS FILTERING ---
  const filteredRooms = roomTypeFilter === 'all' 
    ? rooms 
    : rooms.filter(r => r.type === roomTypeFilter);

  // --- BOOKING MODAL ACTIONS ---
  const handleOpenBookingModal = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room) return;

    setSelectedRoomId(roomId);
    setModalCheckIn(filterCheckIn || new Date().toISOString().split('T')[0]);
    
    const nextDay = new Date(filterCheckIn || new Date());
    nextDay.setDate(nextDay.getDate() + 2);
    setModalCheckOut(filterCheckOut || nextDay.toISOString().split('T')[0]);
    
    setIsBookingModalOpen(true);
  };

  const calculateNights = (inDate, outDate) => {
    const start = new Date(inDate);
    const end = new Date(outDate);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return isNaN(nights) || nights <= 0 ? 1 : nights;
  };

  const currentSelectedRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];
  const calculatedNights = calculateNights(modalCheckIn, modalCheckOut);
  const calculatedTotal = calculatedNights * (currentSelectedRoom?.price || 0);

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const nights = calculateNights(modalCheckIn, modalCheckOut);
    const totalPrice = nights * currentSelectedRoom.price;

    const newBooking = {
      id: "RES-" + Math.floor(1000 + Math.random() * 9000),
      guestName,
      email: guestEmail,
      roomId: currentSelectedRoom.id,
      checkIn: modalCheckIn,
      checkOut: modalCheckOut,
      totalPrice,
      status: "Vahvistettu"
    };

    setBookings([newBooking, ...bookings]);
    setIsBookingModalOpen(false);
    setGuestName('');
    setGuestEmail('');
    showToast(`Varaus ${newBooking.id} tallennettu onnistuneesti!`, "success");
    logApiAction(`POST /api/reservations -> 201 Created (${newBooking.id})`);
  };

  const cancelBooking = (id) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Peruutettu" } : b));
    showToast(`Varaus ${id} peruutettu.`, "success");
    logApiAction(`PUT /api/reservations/${id}/cancel -> 200 OK`);
  };

  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    showToast(`Varaus ${id} poistettu järjestelmästä.`, "success");
    logApiAction(`DELETE /api/reservations/${id} -> 204 No Content`);
  };

  const exportBookingsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(bookings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "hotel_reservations_export.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Varaukset viety JSON-tiedostona.", "success");
    logApiAction(`GET /api/reservations/export -> 200 OK`);
  };

  const confirmedBookingsCount = bookings.filter(b => b.status === "Vahvistettu").length;

  // --- CALENDAR MATRIX ---
  const monthNames = ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"];
  const daysInMonth = new Date(calendarCurrentYear, calendarCurrentMonth + 1, 0).getDate();

  return (
    <div className="bg-[#0a101f] text-slate-100 min-h-screen flex flex-col selection:bg-[#d4af37] selection:text-[#0a101f] font-sans">
      
      {/* Toast Notification System */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className={`${t.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'} text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-sm font-medium border border-white/10`}>
            <i className={`fa-solid ${t.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'} text-lg`}></i>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Main Header */}
      <header className="bg-[#141e36] border-b border-slate-700 shadow-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentTab('rooms')}>
            <div className="w-12 h-12 bg-[#d4af37] rounded-xl flex items-center justify-center text-[#0a101f] font-bold text-2xl shadow-lg shadow-[#d4af37]/20">
              <i className="fa-solid fa-hotel"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide text-white">Grand Aurora Hotelli</h1>
            </div>
          </div>

          {/* Navigation Tabs (Poistettu C# Arkkitehtuuri) */}
          <nav className="hidden md:flex space-x-1 bg-[#0a101f] p-1.5 rounded-xl border border-slate-700">
            <button onClick={() => setCurrentTab('rooms')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentTab === 'rooms' ? 'bg-[#1e2d4f] text-white shadow' : 'text-slate-400 hover:text-white'}`}>
              <i className="fa-solid fa-bed mr-2 text-[#d4af37]"></i>Huoneet & Varaus
            </button>
            <button onClick={() => setCurrentTab('calendar')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentTab === 'calendar' ? 'bg-[#1e2d4f] text-white shadow' : 'text-slate-400 hover:text-white'}`}>
              <i className="fa-solid fa-calendar-days mr-2 text-[#d4af37]"></i>Kalenteri-API
            </button>
            <button onClick={() => setCurrentTab('bookings')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${currentTab === 'bookings' ? 'bg-[#1e2d4f] text-white shadow' : 'text-slate-400 hover:text-white'}`}>
              <i className="fa-solid fa-book-bookmark mr-2 text-[#d4af37]"></i>Varausten Hallinta
              {confirmedBookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#0a101f] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {confirmedBookingsCount}
                </span>
              )}
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <button onClick={() => setIsSimulationModalOpen(true)} className="hidden sm:flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-2 rounded-lg text-xs font-mono text-[#d4af37] transition">
              <i className="fa-solid fa-terminal"></i>
              <span>API Logs</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-700 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-bold">
              AD
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around bg-[#0a101f] border-t border-slate-800 p-2">
          <button onClick={() => setCurrentTab('rooms')} className={`flex flex-col items-center text-xs ${currentTab === 'rooms' ? 'text-[#d4af37]' : 'text-slate-400'}`}>
            <i className="fa-solid fa-bed text-lg mb-1"></i>Huoneet
          </button>
          <button onClick={() => setCurrentTab('calendar')} className={`flex flex-col items-center text-xs ${currentTab === 'calendar' ? 'text-[#d4af37]' : 'text-slate-400'}`}>
            <i className="fa-solid fa-calendar-days text-lg mb-1"></i>Kalenteri
          </button>
          <button onClick={() => setCurrentTab('bookings')} className={`flex flex-col items-center text-xs relative ${currentTab === 'bookings' ? 'text-[#d4af37]' : 'text-slate-400'}`}>
            <i className="fa-solid fa-book-bookmark text-lg mb-1"></i>Varaukset
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* TAB 1: ROOMS & BOOKING WIZARD */}
        {currentTab === 'rooms' && (
          <section className="space-y-8">
            <div className="bg-gradient-to-r from-[#141e36] to-[#1e2d4f] rounded-2xl p-6 md:p-10 border border-slate-700 shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <span className="bg-[#d4af37]/20 text-[#d4af37] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border border-[#d4af37]/30">Varausjärjestelmä</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">Ylellistä majoitusta pohjoismaisella mukavuudella</h2>
                <p className="text-slate-300 mt-2 text-sm md:text-base">Hae saatavuutta, valitse täydellinen huone ja tee varaus reaaliajassa.</p>
              </div>

              <div className="mt-8 bg-[#0a101f]/90 p-4 rounded-xl border border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-inner">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1"><i className="fa-regular fa-calendar mr-1"></i> Sisäänkirjautuminen</label>
                  <input type="date" value={filterCheckIn} onChange={e => setFilterCheckIn(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1"><i className="fa-regular fa-calendar mr-1"></i> Uloskirjautuminen</label>
                  <input type="date" value={filterCheckOut} onChange={e => setFilterCheckOut(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]" />
                </div>
                <div className="flex items-end">
                  <button onClick={() => { showToast("Tarkistettu saatavuus onnistuneesti!", "success"); logApiAction(`GET /api/rooms/availability -> 200 OK`); }} className="w-full bg-[#d4af37] hover:bg-amber-500 text-[#0a101f] font-bold py-2.5 px-4 rounded-lg text-sm transition shadow-lg shadow-[#d4af37]/20 flex items-center justify-center space-x-2">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <span>Tarkista Saatavuus</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Hotellihuoneet & Sviitit</h3>
                <p className="text-xs text-slate-400">Valitse haluamasi huonetyyppi ja siirry varaukseen</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Suodata tyypin mukaan:</span>
                <select value={roomTypeFilter} onChange={e => setRoomTypeFilter(e.target.value)} className="bg-[#141e36] border border-slate-700 rounded-lg text-xs px-3 py-1.5 text-white focus:outline-none">
                  <option value="all">Kaikki huoneet</option>
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Sviitti</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map(room => (
                <div key={room.id} className="bg-[#141e36] rounded-2xl border border-slate-700 overflow-hidden shadow-xl flex flex-col justify-between transition hover:border-[#d4af37]/50">
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover transition duration-300 hover:scale-105" />
                      <span className="absolute top-3 left-3 bg-[#0a101f]/80 backdrop-blur text-[#d4af37] text-xs font-semibold px-3 py-1 rounded-full border border-[#d4af37]/30">
                        {room.type}
                      </span>
                      <span className="absolute top-3 right-3 bg-[#d4af37] text-[#0a101f] text-xs font-bold px-2.5 py-1 rounded-lg">
                        {room.price} € / yö
                      </span>
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="text-lg font-bold text-white">{room.name}</h4>
                      <p className="text-xs text-slate-300 line-clamp-2">{room.desc}</p>
                      <div className="flex items-center space-x-4 pt-2 text-xs text-slate-400">
                        <span><i className="fa-solid fa-user-group text-[#d4af37] mr-1"></i> Max {room.capacity} hlö</span>
                        <span><i className="fa-solid fa-wifi text-[#d4af37] mr-1"></i> Wi-Fi</span>
                        <span><i className="fa-solid fa-snowflake text-[#d4af37] mr-1"></i> Ilmastointi</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 pt-0">
                    <button onClick={() => handleOpenBookingModal(room.id)} className="w-full bg-[#1e2d4f] hover:bg-[#d4af37] hover:text-[#0a101f] text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition flex items-center justify-center space-x-2 border border-slate-600">
                      <i className="fa-solid fa-calendar-plus"></i>
                      <span>Varaa Huone</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 2: CALENDAR API */}
        {currentTab === 'calendar' && (
          <section className="space-y-6">
            <div className="bg-[#141e36] p-6 rounded-2xl border border-slate-700 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded border border-[#d4af37]/20">GET /api/calendar/availability</span>
                  <h2 className="text-2xl font-bold text-white mt-1">Interaktiivinen Kalenteri & Varaustilanne</h2>
                  <p className="text-sm text-slate-400">Tarkastele huonekohtaista varaustilannetta päiväkohtaisesti.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => {
                    let m = calendarCurrentMonth - 1;
                    let y = calendarCurrentYear;
                    if (m < 0) { m = 11; y--; }
                    setCalendarCurrentMonth(m);
                    setCalendarCurrentYear(y);
                  }} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm transition">
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <span className="text-lg font-bold text-white min-w-[140px] text-center">{monthNames[calendarCurrentMonth]} {calendarCurrentYear}</span>
                  <button onClick={() => {
                    let m = calendarCurrentMonth + 1;
                    let y = calendarCurrentYear;
                    if (m > 11) { m = 0; y++; }
                    setCalendarCurrentMonth(m);
                    setCalendarCurrentYear(y);
                  }} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm transition">
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-slate-300 mb-6 bg-[#0a101f] p-3 rounded-xl border border-slate-800">
                <div className="flex items-center space-x-2"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span><span>Vapaana</span></div>
                <div className="flex items-center space-x-2"><span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span><span>Varattu</span></div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-[#0a101f] text-xs font-semibold text-slate-400 border-b border-slate-700">
                      <th className="p-3 sticky left-0 bg-[#0a101f] z-10 min-w-[160px]">Huone / Päivä</th>
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => (
                        <th key={d} className="p-2 text-center w-10">{d}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-sm">
                    {rooms.map(room => (
                      <tr key={room.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-medium text-white sticky left-0 bg-[#141e36] z-10 text-xs truncate max-w-[160px]">{room.name}</td>
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
                          const dateStr = `${calendarCurrentYear}-${String(calendarCurrentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                          const isReserved = bookings.some(b => {
                            if (b.roomId !== room.id || b.status === "Peruutettu") return false;
                            return dateStr >= b.checkIn && dateStr < b.checkOut;
                          });
                          return (
                            <td key={d} className="p-1 text-center">
                              <div onClick={() => {
                                if (!isReserved) {
                                  setFilterCheckIn(dateStr);
                                  setCurrentTab('rooms');
                                  handleOpenBookingModal(room.id);
                                }
                              }} className={`w-6 h-6 mx-auto rounded ${isReserved ? 'bg-rose-500/80' : 'bg-emerald-500/40 hover:bg-emerald-500'} transition cursor-pointer`} title={`${room.name} (${dateStr}): ${isReserved ? 'Varattu' : 'Vapaana'}`} />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: BOOKINGS MANAGEMENT */}
        {currentTab === 'bookings' && (
          <section className="space-y-6">
            <div className="bg-[#141e36] p-6 rounded-2xl border border-slate-700 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono text-[#d4af37] bg-[#d4af37]/10 px-2.5 py-1 rounded border border-[#d4af37]/20">GET /api/reservations</span>
                  <h2 className="text-2xl font-bold text-white mt-1">Varausten Hallinta</h2>
                  <p className="text-sm text-slate-400">Tarkastele, muokkaa tai peruuta tehtyjä varauksia.</p>
                </div>
                <div>
                  <button onClick={exportBookingsJSON} className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium px-3 py-2 rounded-lg transition flex items-center space-x-1.5">
                    <i className="fa-solid fa-download"></i><span>Vie JSON</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-700">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#0a101f] text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-700">
                      <th className="p-4">Varaus ID</th>
                      <th className="p-4">Asiakas</th>
                      <th className="p-4">Huone</th>
                      <th className="p-4">Ajankohta</th>
                      <th className="p-4">Hinta (€)</th>
                      <th className="p-4">Tila</th>
                      <th className="p-4 text-right">Toiminnot</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 text-sm">
                    {bookings.length === 0 ? (
                      <tr><td colSpan="7" className="p-6 text-center text-slate-400">Ei varauksia järjestelmässä.</td></tr>
                    ) : (
                      bookings.map(b => {
                        const room = rooms.find(r => r.id === b.roomId) || { name: "Tuntematon huone" };
                        const badgeClass = b.status === "Vahvistettu" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border-rose-500/30";
                        return (
                          <tr key={b.id} className="hover:bg-slate-800/50 transition">
                            <td className="p-4 font-mono text-xs text-[#d4af37] font-semibold">{b.id}</td>
                            <td className="p-4">
                              <div className="font-medium text-white">{b.guestName}</div>
                              <div className="text-xs text-slate-400">{b.email}</div>
                            </td>
                            <td className="p-4 text-slate-300 text-xs">{room.name}</td>
                            <td className="p-4 text-xs text-slate-300">{b.checkIn} &rarr; {b.checkOut}</td>
                            <td className="p-4 font-bold text-white">{b.totalPrice} €</td>
                            <td className="p-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${badgeClass}`}>{b.status}</span></td>
                            <td className="p-4 text-right space-x-2">
                              {b.status === 'Vahvistettu' && (
                                <button onClick={() => cancelBooking(b.id)} className="bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white text-xs px-3 py-1.5 rounded-lg transition">Peruuta</button>
                              )}
                              <button onClick={() => deleteBooking(b.id)} className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-2.5 py-1.5 rounded-lg transition"><i className="fa-solid fa-trash"></i></button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-[#141e36] border-t border-slate-700 mt-12 py-6 text-center text-xs text-slate-400">
        <p>&copy; 2026 Grand Aurora Hotelli &bull; Rakennettu Reactilla ja Tailwind CSS:llä</p>
      </footer>

      {/* BOOKING MODAL WIZARD */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#141e36] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsBookingModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg">
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold">
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Vahvista Huonevaraus</h3>
                <p className="text-xs text-[#d4af37]">{currentSelectedRoom.name} &bull; {currentSelectedRoom.price} € / yö</p>
              </div>
            </div>

            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Sisäänkirjautuminen</label>
                  <input type="date" value={modalCheckIn} onChange={e => setModalCheckIn(e.target.value)} required className="w-full bg-[#0a101f] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Uloskirjautuminen</label>
                  <input type="date" value={modalCheckOut} onChange={e => setModalCheckOut(e.target.value)} required className="w-full bg-[#0a101f] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Varaajan Nimi</label>
                <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Matti Meikäläinen" required className="w-full bg-[#0a101f] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]" />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Sähköposti</label>
                <input type="email" value={guestEmail} onChange={e => setGuestEmail(e.target.value)} placeholder="matti@esimerkki.fi" required className="w-full bg-[#0a101f] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37]" />
              </div>

              <div className="bg-[#0a101f] p-4 rounded-xl border border-slate-700 space-y-2 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Yöt yhteensä:</span>
                  <span className="text-white font-medium">{calculatedNights} yö{calculatedNights > 1 ? 'tä' : ''}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Hinta per yö:</span>
                  <span className="text-white font-medium">{currentSelectedRoom.price} €</span>
                </div>
                <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-white text-base">
                  <span>Yhteensä maksettavaa:</span>
                  <span className="text-[#d4af37]">{calculatedTotal} €</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setIsBookingModalOpen(false)} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm transition">Peruuta</button>
                <button type="submit" className="bg-[#d4af37] hover:bg-amber-500 text-[#0a101f] font-bold px-6 py-2 rounded-lg text-sm transition shadow-lg shadow-[#d4af37]/20">Vahvista Varaus</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* API SIMULATION LOGS MODAL */}
      {isSimulationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-[#141e36] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
            <button onClick={() => setIsSimulationModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg">
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <i className="fa-solid fa-terminal"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">API Lokitiedot & Tapahtumat</h3>
                <p className="text-xs text-slate-400">Reaaliaikainen HTTP Request / Response -seuranta</p>
              </div>
            </div>
            <div className="bg-[#0a101f] p-4 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 max-h-80 overflow-y-auto space-y-2">
              {apiLogs.map((log, idx) => (
                <div key={idx}>{log}</div>
              ))}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button onClick={() => setApiLogs([])} className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-1.5 rounded-lg transition">Tyhjennä lokit</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}