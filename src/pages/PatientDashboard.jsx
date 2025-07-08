import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const doc = {
  name: 'Dr. Arjun Mehra',
  email: 'arjun.mehra@entnt.com',
  profilePic: 'https://img.freepik.com/free-photo/portrait-smiling-handsome-male-doctor-man_171337-5055.jpg?w=400',
  role: 'Dentist'
};

const PatDash = () => {
  const { setUser } = useContext(UserContext);
  const nav = useNavigate();
  const usr = JSON.parse(localStorage.getItem('sessionUser'));
  const pats = JSON.parse(localStorage.getItem('patients')) || [];
  const pat = pats.find(p => p.id === usr?.patientId);
  const apps = JSON.parse(localStorage.getItem('appointments')) || [];
  const inc = apps.filter(a => a.patientId === pat?.id);

  const out = () => {
    localStorage.removeItem('sessionUser');
    setUser(null);
    nav('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] flex flex-col items-center py-0 px-0">
      <header className="w-full bg-gradient-to-r from-[#43cea2] to-[#185a9d] shadow-lg py-6 px-2 sm:py-8 sm:px-4 flex flex-col md:flex-row items-center justify-between rounded-b-3xl">
        <div className="flex items-center gap-6">
          <img src={doc.profilePic} alt="Doc" className="w-20 h-20 rounded-full border-4 border-white shadow-lg" />
          <div>
            <div className="text-3xl font-extrabold text-white tracking-wide mb-1">Welcome, {pat ? pat.name : 'Patient'}!</div>
            <div className="text-lg text-white/80">Your dental dashboard</div>
          </div>
        </div>
        <button onClick={out} className="mt-6 md:mt-0 flex items-center gap-2 px-5 py-2 rounded-full border-2 border-white bg-white/10 text-white font-semibold shadow hover:bg-white/20 transition">
          <img src="https://cdn0.iconfinder.com/data/icons/simpline-mix/64/simpline_43-512.png" alt="Out" className="w-6 h-6" />
          Logout
        </button>
      </header>

      <main className="w-full max-w-[98vw] md:max-w-3xl lg:max-w-5xl flex flex-col md:flex-row md:flex-wrap gap-4 md:gap-6 mt-6 sm:mt-10 px-2 sm:px-4">
        <div className="flex-1 flex flex-col gap-4 md:gap-8">
          <section className="bg-white/90 rounded-3xl shadow-xl p-8 border-l-8 border-[#43cea2] flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#185a9d] mb-2">Your Profile</h2>
            {pat ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#185a9d]">
                <div><span className="font-semibold">Name:</span> {pat.name}</div>
                <div><span className="font-semibold">DOB:</span> {new Date(pat.dob).toLocaleDateString()}</div>
                <div><span className="font-semibold">Contact:</span> {pat.contact}</div>
                <div><span className="font-semibold">Health Info:</span> {pat.healthInfo}</div>
              </div>
            ) : (
              <div className="text-red-500">Patient details not found.</div>
            )}
          </section>

          <section className="bg-gradient-to-r from-[#43cea2]/90 to-[#185a9d]/90 rounded-3xl shadow-xl p-8 flex flex-col gap-2 border-l-8 border-[#185a9d]">
            <h2 className="text-2xl font-bold text-white mb-2">Doctor Info</h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 break-words">
              <img src={doc.profilePic} alt="Doc" className="w-16 h-16 rounded-full border-4 border-white shadow" />
              <div className="w-full">
                <div className="text-lg font-semibold text-white break-words">{doc.name}</div>
                <div className="text-white/80 break-words">{doc.role}</div>
                <div className="text-white/60 text-sm break-words">{doc.email}</div>
              </div>
            </div>
          </section>
        </div>

        <div className="flex-[1_1_0%] min-w-0 mt-6 md:mt-0">
          <section className="bg-white/90 rounded-3xl shadow-xl p-4 sm:p-6 border-l-4 sm:border-l-8 border-[#f7971e]">
            <h2 className="text-2xl font-bold text-[#f7971e] mb-4">Your Appointments & History</h2>
            {inc.length === 0 ? (
              <div className="text-[#f7971e] text-lg text-center py-12">No appointments or history found.</div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="min-w-[600px] w-full divide-y divide-[#f7971e]/30 text-xs sm:text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-[#f7971e] font-semibold">Date</th>
                      <th className="px-4 py-2 text-left text-[#f7971e] font-semibold">Title</th>
                      <th className="px-4 py-2 text-left text-[#f7971e] font-semibold">Status</th>
                      <th className="px-4 py-2 text-left text-[#f7971e] font-semibold">Cost</th>
                      <th className="px-4 py-2 text-left text-[#f7971e] font-semibold">Files</th>
                      <th className="px-4 py-2 text-left text-[#f7971e] font-semibold">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inc.map((i) => (
                      <tr key={i.id} className="hover:bg-[#f7971e]/10 transition">
                        <td className="px-4 py-2">{new Date(i.appointmentDate).toLocaleString()}</td>
                        <td className="px-4 py-2">{i.title}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${i.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {i.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">${i.cost}</td>
                        <td className="px-4 py-2">
                          {i.files && i.files.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {i.files.map((f, idx) => (
                                <a key={idx} href={f.url} target="_blank" rel="noopener noreferrer" className="text-[#185a9d] hover:underline">
                                  {f.name || `File ${idx + 1}`}
                                </a>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">No files</span>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          <details>
                            <summary className="cursor-pointer text-[#185a9d] underline">View</summary>
                            <div className="mt-2 text-sm text-[#185a9d]">
                              <div><span className="font-semibold">Description:</span> {i.description}</div>
                              <div><span className="font-semibold">Comments:</span> {i.comments}</div>
                              <div><span className="font-semibold">Next Date:</span> {i.nextDate || '-'}</div>
                              <div><span className="font-semibold">Treatment:</span> {i.treatment || '-'}</div>
                            </div>
                          </details>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="w-full text-center py-4 sm:py-6 mt-8 sm:mt-12 text-[#185a9d] bg-transparent text-xs sm:text-sm opacity-70">
        &copy; {new Date().getFullYear()} ENTNT Dental Center &mdash; Patient Dashboard
      </footer>
    </div>
  );
};

export default PatDash;
