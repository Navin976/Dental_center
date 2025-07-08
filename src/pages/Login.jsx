import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function Auth() {
  const loc = useLocation();
  const [adm, setAdm] = useState(loc.state && loc.state.showPatient ? false : true);
  const [load] = useState(false); // fixed here: removed unused setLoad
  const [aE, setAE] = useState('');
  const [aP, setAP] = useState('');
  const [pE, setPE] = useState('');
  const [pP, setPP] = useState('');
  const { setUser } = useContext(UserContext);
  
  const toggle = () => setAdm(!adm);
  const nav = useNavigate();
  const sub = (e) => {
    e.preventDefault();

    const u = [
      { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
      { id: '2', role: 'Patient', email: 'john@entnt.in', password: 'patient123', patientId: 'p1' },
    ];
    const pw = adm ? aP : pP;
    const em = adm ? aE : pE;
    const login = () => {
      const usr = u.find(
        z =>
          z.email.toLowerCase() === em.toLowerCase() &&
          z.password === pw &&
          ((adm && z.role === "Admin") || (!adm && z.role === "Patient"))
      );

      if (usr) {
        localStorage.setItem("sessionUser", JSON.stringify(usr));
        setUser(usr);
        setTimeout(() => {
          if (usr.role === "Admin") nav("/admin");
          else if (usr.role === "Patient") nav("/patient");
        }, 0);
      } else {
        alert("Invalid credentials");
      }
    };

    login();
  };

  if (load) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="loader mb-4"></div>
          <div className="text-xl font-bold text-indigo-600 animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-['Helvetica'] bg-gray-100">
      {adm ? (
        <>
          <div className="w-1/2 flex items-center justify-center p-8 bg-white order-1 login-panel">
            <form
              onSubmit={sub}
              className="w-full max-w-md rounded-xl shadow-xl p-8 space-y-6 transform hover:scale-105 transition-transform duration-500 border-2 border-indigo-400"
            >
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-700 form-title">
                Admin Login
              </h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded focus:outline-none focus:ring-4 focus:ring-indigo-300"
                value={aE}
                onChange={(e) => setAE(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded focus:outline-none focus:ring-4 focus:ring-indigo-300"
                value={aP}
                onChange={(e) => setAP(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full p-3 rounded font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-500"
              >
                Login as Admin
              </button>
            </form>
          </div>

          <div className="w-1/2 flex flex-col justify-center items-center text-white p-8 order-2 relative overflow-hidden login-panel">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
              style={{ filter: 'brightness(0.5)' }}
            >
              <source src="/dentist-video.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10 w-full flex flex-col items-center">
              <img
                src="https://img.icons8.com/?size=96&id=OLeuR4KeEuOj&format=png"
                alt="Logo"
                className="mb-4 w-20 h-20 drop-shadow-lg animate-bounce"
              />
              <h1 className="text-4xl font-extrabold mb-6 mt-2 relative text-center">
                <span className="block bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-indigo-600 bg-clip-text text-transparent animate-gradient-move drop-shadow-lg">
                  Welcome {adm ? 'Admin' : 'Patient'}
                </span>
              </h1>
              <div className="flex items-center space-x-4">
                <span className={`text-lg font-semibold ${adm ? 'text-indigo-400' : 'text-gray-300'}`}>
                  Admin
                </span>
                <div
                  className={`
                    w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-700
                    ${adm ? 'justify-start' : 'justify-end'}
                    bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl relative overflow-hidden
                  `}
                  onClick={toggle}
                >
                  <div className="bg-white w-6 h-6 rounded-full shadow-xl transform duration-500"></div>
                </div>
                <span className={`text-lg font-semibold ${!adm ? 'text-emerald-400' : 'text-gray-300'}`}>
                  Patient
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-1/2 flex flex-col justify-center items-center text-white p-8 order-1 relative overflow-hidden login-panel">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
              style={{ filter: 'brightness(0.5)' }}
            >
              <source src="/patient-video.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10 w-full flex flex-col items-center">
              <img
                src="https://img.icons8.com/?size=96&id=OLeuR4KeEuOj&format=png"
                alt="Logo"
                className="mb-4 w-20 h-20 drop-shadow-lg animate-bounce"
              />
              <h1 className="text-4xl font-extrabold mb-6 mt-2 relative text-center">
                <span className="block bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-600 bg-clip-text text-transparent animate-gradient-move drop-shadow-lg">
                  Welcome Patient
                </span>
              </h1>
              <div className="flex items-center space-x-4">
                <span className={`text-lg font-semibold ${adm ? 'text-indigo-400' : 'text-gray-300'}`}>
                  Admin
                </span>
                <div
                  className={`
                    w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-700
                    ${adm ? 'justify-start' : 'justify-end'}
                    bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl relative overflow-hidden
                  `}
                  onClick={toggle}
                >
                  <div className="bg-white w-6 h-6 rounded-full shadow-xl transform duration-500"></div>
                </div>
                <span className={`text-lg font-semibold ${!adm ? 'text-emerald-400' : 'text-gray-300'}`}>
                  Patient
                </span>
              </div>
            </div>
          </div>

          <div className="w-1/2 flex items-center justify-center p-8 bg-white order-2 login-panel">
            <form
              onSubmit={sub}
              className="w-full max-w-md rounded-xl shadow-xl p-8 space-y-6 transform hover:scale-105 transition-transform duration-500 border-2 border-emerald-400"
            >
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-700 form-title">
                Patient Login
              </h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded focus:outline-none focus:ring-4 focus:ring-emerald-300"
                value={pE}
                onChange={(e) => setPE(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded focus:outline-none focus:ring-4 focus:ring-emerald-300"
                value={pP}
                onChange={(e) => setPP(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full p-3 rounded font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors duration-500"
              >
                Login as Patient
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Auth;
