import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Kpi from '../components/kpis/KpiDashboard';
import PList from '../components/patients/PatientList';
import AList from '../components/appointments/AppointmentList';
import Cal from '../components/calendar/CalendarView';
import { FiGrid, FiUsers, FiCalendar, FiClipboard, FiLogOut } from 'react-icons/fi';

const getDoc = () => {
  return JSON.parse(localStorage.getItem('doctor')) || {
    name: 'Naveen Pamujula',
    email: 'naveen.pamujula@entnt.com',
    role: 'Dentist',
    profilePic: 'https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg?w=400'
  };
};
const greet = (h, n) => {
  const f = n.split(' ')[0];
  if (h >= 5 && h < 12) return `Good Morning, Dr. ${f}`;
  if (h >= 12 && h < 16) return `Good Afternoon, Dr. ${f}`;
  if (h >= 16 && h < 20) return `Good Evening, Dr. ${f}`;
  return `Good Night, Dr. ${f}`;
};
const getToday = () => {
  const apps = JSON.parse(localStorage.getItem('appointments') || '[]');
  const t = new Date();
  return apps.filter(e => {
    if (!e.appointmentDate) return false;
    const d = new Date(e.appointmentDate);
    return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
  });
};
const SidebarBtn = ({ icon, text, act, click }) => {
  const cMap = { Dashboard: 'text-gray-900', Patients: 'text-blue-900', Appointments: 'text-purple-900', Calendar: 'text-green-900' };
  const hMap = { Dashboard: 'hover:bg-yellow-200', Patients: 'hover:bg-yellow-200', Appointments: 'hover:bg-yellow-200', Calendar: 'hover:bg-yellow-200' };
  const cCls = cMap[text] || 'text-gray-900';
  const hCls = hMap[text] || 'hover:bg-gray-200';

  return (
    <button onClick={click} className={`flex items-center gap-4 px-4 py-3 rounded-lg font-bold transition duration-300 transform hover:scale-105 ${act ? 'bg-white/30 shadow-inner backdrop-blur' : hCls}`}>
      <span className={`text-xl ${cCls}`}>{icon}</span>
      <span className={`text-lg ${cCls}`}>{text}</span>
    </button>
  );
};

const AdminDash = () => {
  const { setUser } = useContext(UserContext);
  const nav = useNavigate();
  const [tab, setTab] = useState('dashboard');
  const [now, setNow] = useState(new Date());
  const [today, setToday] = useState(getToday());
  const doc = getDoc();

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (tab === 'dashboard') setToday(getToday());
  }, [tab]);

  const logout = () => {
    localStorage.removeItem('sessionUser');
    setUser(null);
    nav('/');
  };

  const dStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  const isDay = h >= 6 && h < 18;
  const sAng = s * 6, mAng = m * 6 + s * 0.1, hAng = ((h % 12) + m / 60) * 30;
  const gr = greet(h, doc.name);

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-cyan-500 to-indigo-700 opacity-30 z-0"></div>
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
        <aside className="w-full md:w-72 backdrop-blur-md bg-white/20 border-r border-white/30 text-white flex flex-col p-6 space-y-4 shadow-xl">
          <div className="flex flex-col items-center mb-8">
            <img src={doc.profilePic} alt="Doc" className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-2 object-cover" />
            <div className="text-xl font-bold text-blue-900">{doc.name}</div>
            <div className="text-sm text-blue-800">{doc.role}</div>
            <div className="text-xs text-blue-700">{doc.email}</div>
          </div>
          <SidebarBtn icon={<FiGrid />} text="Dashboard" act={tab === 'dashboard'} click={() => setTab('dashboard')} />
          <SidebarBtn icon={<FiUsers />} text="Patients" act={tab === 'patients'} click={() => setTab('patients')} />
          <SidebarBtn icon={<FiClipboard />} text="Appointments" act={tab === 'appointments'} click={() => setTab('appointments')} />
          <SidebarBtn icon={<FiCalendar />} text="Calendar" act={tab === 'calendar'} click={() => setTab('calendar')} />
          <button onClick={logout} className="flex items-center justify-center gap-3 mt-auto p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition transform hover:scale-105">
            <FiLogOut className="text-xl" /> Logout
          </button>
        </aside>
        <main className="flex-1 p-8 md:p-12 relative overflow-y-auto text-gray-900">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 z-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1588776814546-9a839e8dce6e?fit=crop&w=1400)' }}></div>
          <div className="relative z-10 space-y-8">
            {tab === 'dashboard' && (
              <div className="space-y-8">
                <div className="w-full flex flex-col items-center justify-center mb-2">
                  <div className="text-2xl md:text-3xl font-bold text-indigo-900 mb-2">Welcome, Dr. {doc.name}</div>
                </div>
                <section className="bg-gradient-to-br from-cyan-400 via-indigo-300 to-purple-300 rounded-3xl shadow-2xl p-10 flex flex-col items-center justify-center mb-10 relative overflow-hidden">
                  <div className="absolute top-6 right-10 md:right-20">
                    {isDay ? (
                      <span className="animate-spin-slow">
                        <svg width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="18" fill="#FFD93B" /><g stroke="#FFD93B" strokeWidth="4"><line x1="30" y1="4" x2="30" y2="16" /><line x1="30" y1="44" x2="30" y2="56" /><line x1="4" y1="30" x2="16" y2="30" /><line x1="44" y1="30" x2="56" y2="30" /><line x1="13" y1="13" x2="21" y2="21" /><line x1="39" y1="39" x2="47" y2="47" /><line x1="13" y1="47" x2="21" y2="39" /><line x1="39" y1="21" x2="47" y2="13" /></g></svg>
                      </span>
                    ) : (
                      <span className="animate-pulse">
                        <svg width="60" height="60" viewBox="0 0 60 60"><circle cx="36" cy="30" r="18" fill="#F6C065" /><path d="M36 12a18 18 0 1 1-12 30A18 18 0 0 0 36 12z" fill="#2D3748" /></svg>
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-xl font-semibold text-indigo-900 mb-2">{gr}</div>
                    <div className="text-5xl font-extrabold text-white drop-shadow mb-2 tracking-wider">{dStr}</div>
                    <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                      <svg width="120" height="120" viewBox="0 0 120 120" className="absolute">
                        <circle cx="60" cy="60" r="56" fill="#fff" stroke="#e0e7ef" strokeWidth="4" />
                        <line x1="60" y1="60" x2={60 + 28 * Math.sin((Math.PI / 180) * hAng)} y2={60 - 28 * Math.cos((Math.PI / 180) * hAng)} stroke="#2d3748" strokeWidth="5" strokeLinecap="round" />
                        <line x1="60" y1="60" x2={60 + 38 * Math.sin((Math.PI / 180) * mAng)} y2={60 - 38 * Math.cos((Math.PI / 180) * mAng)} stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" />
                        <line x1="60" y1="60" x2={60 + 46 * Math.sin((Math.PI / 180) * sAng)} y2={60 - 46 * Math.cos((Math.PI / 180) * sAng)} stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="60" cy="60" r="4" fill="#6366f1" />
                      </svg>
                      <span className="sr-only">Clock</span>
                    </div>
                    <div className="text-3xl font-bold text-indigo-900 mb-2 tracking-widest animate-pulse">{now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                  </div>
                  <div className="w-full mt-8"><Kpi /></div>
                </section>
                <section className="bg-gradient-to-br from-emerald-100 to-emerald-300 rounded-2xl shadow-xl p-6 flex flex-col items-center">
                  <div className="text-2xl font-bold text-emerald-900 mb-2">Today's Appointments</div>
                  <div className="text-5xl font-extrabold text-emerald-700">{today.length}</div>
                  <div className="text-base text-emerald-800 mt-2">{today.length === 0 ? "No appointments today." : `You have ${today.length} appointment${today.length > 1 ? "s" : ""} today.`}</div>
                </section>
                <section className="bg-gradient-to-br from-blue-100 to-blue-300 rounded-2xl shadow-xl p-6 flex flex-col items-center mt-6">
                  <div className="text-2xl font-bold text-blue-900 mb-2">Quick Links</div>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition" onClick={() => setTab('patients')}>View Patients</button>
                    <button className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition" onClick={() => setTab('appointments')}>View Appointments</button>
                    <button className="px-6 py-2 rounded-lg bg-cyan-600 text-white font-semibold shadow hover:bg-cyan-700 transition" onClick={() => setTab('calendar')}>Calendar</button>
                  </div>
                </section>
              </div>
            )}
            {tab === 'patients' && <PList />}
            {tab === 'appointments' && <AList />}
            {tab === 'calendar' && <Cal />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDash;
