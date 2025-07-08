import React, { useEffect, useState } from 'react';

const Appts = () => {
  const [apts, setApts] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showF, setShowF] = useState(false);
  const [view, setView] = useState(null);
  const [delId, setDelId] = useState(null);
  const [showDel, setShowDel] = useState(false);
  const [srch, setSrch] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const d = JSON.parse(localStorage.getItem('appointments')) || [];
    setApts(d);
  }, []);
  const editApt = (a) => {
    setEdit(a);
    setFiles(a.files || []);
    setShowF(true);
  };
  const ref = () => {
    const d = JSON.parse(localStorage.getItem('appointments')) || [];
    setApts(d);
  };
  const add = () => {
    setEdit(null);
    setFiles([]);
    setShowF(true);
  };

  const delApt = (id) => {
    setDelId(id);
    setShowDel(true);
  };
  const remFile = (i) => {
    setFiles(p => p.filter((_, idx) => idx !== i));
  };
  const confDel = () => {
    const u = apts.filter((a) => a.id !== delId);
    localStorage.setItem('appointments', JSON.stringify(u));
    setShowDel(false);
    setDelId(null);
    ref();
  };
  const remAptFile = (id, idx) => {
    const u = apts.map(a => {
      if (a.id === id) {
        const nf = (a.files || []).filter((_, i) => i !== idx);
        return { ...a, files: nf };
      }
      return a;
    });
    setApts(u);
    localStorage.setItem('appointments', JSON.stringify(u));
  };

  const fileChg = (e) => {
    const f = Array.from(e.target.files);
    let l = 0;
    const nf = [];
    f.forEach((f, i) => {
      const r = new FileReader();
      r.onloadend = () => {
        nf.push({ name: f.name, url: r.result });
        l++;
        if (l === f.length) setFiles(p => [...p, ...nf]);
      };
      r.readAsDataURL(f);
    });
  };
  const save = (a) => {
    const u = apts.filter(x => x.id !== a.id);
    localStorage.setItem('appointments', JSON.stringify([...u, a]));
    setShowF(false);
    setFiles([]);
    ref();
  };
  const sub = (e) => {
    e.preventDefault();
    const f = e.target;
    const n = {
      id: edit?.id || `i${Date.now()}`,
      patientId: f.patientId.value,
      title: f.title.value,
      description: f.description.value,
      comments: f.comments.value,
      appointmentDate: f.appointmentDate.value,
      cost: f.cost.value,
      treatment: f.treatment.value,
      status: f.status.value,
      nextDate: f.nextDate.value,
      files,
    };
    save(n);
  };

  
  const fApts = apts
    .filter(a => a.patientId.toLowerCase().includes(srch.toLowerCase()) || a.title.toLowerCase().includes(srch.toLowerCase()))
    .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-emerald-50 to-stone-100 py-8 px-2 md:px-8 rounded-2xl md:rounded-3xl shadow-2xl">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <h2 className="text-3xl font-extrabold text-amber-900 tracking-tight drop-shadow">Appointments</h2>
          <div className="relative w-full md:w-56">
            <input
              type="text"
              placeholder="Search by Patient ID or Name"
              value={srch}
              onChange={e => setSrch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-amber-300 focus:border-emerald-400 outline-none bg-orange-50 text-amber-900 placeholder:text-amber-400 shadow-sm transition text-sm"
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
        </div>

        <button
          onClick={add}
          className="fixed bottom-8 right-8 z-50 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg flex items-center gap-2 px-6 py-3 text-lg font-semibold transition duration-200"
          title="Add Appointment"
        >
          <span className="text-2xl">+</span>
          <span className="hidden sm:inline">Add Appointment</span>
        </button>

        {showF && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <form onSubmit={sub} className="bg-orange-50 rounded-xl shadow-2xl w-full max-w-md space-y-4 relative border-2 border-amber-200 p-4 md:p-8" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
              <button type="button" onClick={() => setShowF(false)} className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl" title="Close" style={{ zIndex: 10 }}>&times;</button>
              <h3 className="text-2xl font-bold mb-2 text-indigo-700">{edit ? 'Edit Appointment' : 'New Appointment'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><input type="text" name="patientId" placeholder="Patient ID" defaultValue={edit?.patientId || ''} className="w-full border rounded p-2" required /></div>
                <div><input type="text" name="title" placeholder="Title" defaultValue={edit?.title || ''} className="w-full border rounded p-2" required /></div>
                <div className="md:col-span-2"><textarea name="description" placeholder="Description" defaultValue={edit?.description || ''} className="w-full border rounded p-2"></textarea></div>
                <div className="md:col-span-2"><textarea name="comments" placeholder="Comments" defaultValue={edit?.comments || ''} className="w-full border rounded p-2"></textarea></div>
                <div><input type="datetime-local" name="appointmentDate" defaultValue={edit?.appointmentDate || ''} className="w-full border rounded p-2" required /></div>
                <div><input type="number" name="cost" placeholder="Cost" defaultValue={edit?.cost || ''} className="w-full border rounded p-2" /></div>
                <div><input type="text" name="treatment" placeholder="Treatment" defaultValue={edit?.treatment || ''} className="w-full border rounded p-2" /></div>
                <div>
                  <select name="status" defaultValue={edit?.status || 'Pending'} className="w-full border rounded p-2">
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div><input type="date" name="nextDate" defaultValue={edit?.nextDate || ''} className="w-full border rounded p-2" /></div>
                <div>
                  <input type="file" className="w-full border rounded p-2" multiple onChange={fileChg} />
                  {files.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">{files.map((f, i) => (
                      <span key={i} className="flex items-center bg-emerald-100 px-2 py-1 rounded text-sm">
                        <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline mr-2">{f.name}</a>
                        <button type="button" onClick={() => remFile(i)} className="ml-1 text-red-500 hover:text-red-700 font-bold" title="Remove file">×</button>
                      </span>))}
                    </div>)}
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button type="button" onClick={() => setShowF(false)} className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition">Save</button>
              </div>
            </form>
          </div>
        )}

        {view && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-gradient-to-br from-emerald-50 via-orange-50 to-white rounded-3xl shadow-2xl p-10 w-full max-w-lg relative border-4 border-emerald-200">
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
        onClick={() => setView(null)}
        title="Close"
      >
        &times;
      </button>
      <h3 className="text-3xl font-extrabold mb-6 text-emerald-800 text-center tracking-tight drop-shadow">
        Appointment Details
      </h3>
      <div className="space-y-4 text-emerald-900 text-base">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Date:</span>
          <span className="inline-block text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-1 rounded tracking-wide shadow-sm border border-emerald-300">
            {(() => {
              const d = new Date(view.appointmentDate);
              const day = String(d.getDate()).padStart(2, '0');
              const month = String(d.getMonth() + 1).padStart(2, '0');
              const year = String(d.getFullYear()).slice(-2);
              return `${day}/${month}/${year}`;
            })()}
          </span>
        </div>
        <div><span className="font-semibold">Patient ID:</span> {view.patientId}</div>
        <div><span className="font-semibold">Title:</span> {view.title}</div>
        <div><span className="font-semibold">Status:</span> {view.status}</div>
        <div><span className="font-semibold">Cost:</span> ₹ {view.cost}</div>
        <div><span className="font-semibold">Treatment:</span> {view.treatment}</div>
        <div><span className="font-semibold">Description:</span> {view.description}</div>
        <div><span className="font-semibold">Comments:</span> {view.comments}</div>
        <div><span className="font-semibold">Next Date:</span> {view.nextDate}</div>
        {view.files && view.files.length > 0 && (
          <div>
            <span className="font-semibold">File:</span>{' '}
            <a
              href={view.files[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              {view.files[0].name}
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
)}


        {showDel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-emerald-50 rounded-xl shadow-2xl p-8 min-w-[320px] max-w-sm text-center relative border-2 border-orange-200">
              <h3 className="text-xl font-bold mb-4 text-red-700">Delete Appointment</h3>
              <p className="mb-6 text-gray-700">Are you sure you want to delete this appointment?</p>
              <div className="flex justify-center gap-4">
                <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition" onClick={confDel}>Delete</button>
                <button className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400 transition" onClick={() => { setShowDel(false); setDelId(null); }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 mt-8">
          {fApts.length === 0 ? (
            <div className="col-span-2 text-center text-emerald-400 text-lg py-12">No appointments available.</div>
          ) : fApts.map((a) => (
            <div key={a.id} className="bg-orange-50 rounded-2xl shadow-md p-4 sm:p-6 flex flex-col gap-2 relative hover:shadow-lg transition border-2 border-emerald-300 w-full max-w-full box-border overflow-x-auto md:min-w-[340px] md:max-w-[420px] md:mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-bold text-indigo-700">{a.title}</div>
                  <div className="inline-block text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-1 rounded mt-1 mb-1 tracking-wide shadow-sm border border-emerald-300">{(() => {
                    const d = new Date(a.appointmentDate);
                    const day = String(d.getDate()).padStart(2, '0');
                    const month = String(d.getMonth() + 1).padStart(2, '0');
                    const year = String(d.getFullYear()).slice(-2);
                    let h = d.getHours();
                    const m = String(d.getMinutes()).padStart(2, '0');
                    const ampm = h >= 12 ? 'pm' : 'am';
                    h = h % 12 || 12;
                    return `${day}/${month}/${year} ${h}:${m}${ampm}`;
                  })()}</div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${a.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{a.status}</span>
              </div>
              <div className="text-gray-700 mt-2 mb-1"><span className="font-semibold">Patient ID:</span> {a.patientId}</div>
              <div className="text-gray-700"><span className="font-semibold">Cost:</span> $ {a.cost}</div>
              <div className="text-gray-700"><span className="font-semibold">Treatment:</span> {a.treatment}</div>
              <div className="flex gap-2 mt-3">
                <button type="button" onClick={() => setView(a)} className="px-3 py-1 rounded text-blue-700 bg-transparent hover:bg-blue-100 hover:text-blue-900 transition text-sm font-semibold" title="View">View</button>
                <span className="text-gray-400">|</span>
                <button type="button" onClick={() => editApt(a)} className="px-3 py-1 rounded text-yellow-700 bg-transparent hover:bg-yellow-100 hover:text-yellow-900 transition text-sm font-semibold" title="Edit">Edit</button>
                <span className="text-gray-400">|</span>
                <button type="button" onClick={() => delApt(a.id)} className="px-3 py-1 rounded text-red-700 bg-transparent hover:bg-red-100 hover:text-red-900 transition text-sm font-semibold" title="Delete">Delete</button>
              </div>
              {a.files && a.files.length > 0 && (
                <div className="mt-2"><span className="font-semibold">Files:</span> {a.files.map((f, i) => (
                  <span key={i} className="inline-flex items-center"><a href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">{f.name}</a><button type="button" onClick={() => remAptFile(a.id, i)} className="ml-1 text-red-500 hover:text-red-700 font-bold" title="Remove file" style={{ fontSize: '1rem', lineHeight: 1 }}>×</button>{i < a.files.length - 1 && ', '}</span>))}
                </div>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appts;
