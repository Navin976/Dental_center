import React, { useState, useEffect } from 'react';

const PatientForm = ({ initialData, onSubmit, onCancel }) => {
  const [n, setN] = useState('');
  const [dob, setDob] = useState('');
  const [cn, setC] = useState('');
  const [healthInfo, setHealthInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nw = {
      id: initialData?.id || `p${Date.now()}`,
      name: n,
      dob,
      contact: cn,
      healthInfo,
    };
    onSubmit(nw);
  };

  useEffect(() => {
    if (initialData) {
      setN(initialData.name || '');
      setDob(initialData.dob || '');
      setC(initialData.contact || '');
      setHealthInfo(initialData.healthInfo || '');
    }
  }, [initialData]);

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cyan-200/60 via-fuchsia-100/70 to-amber-100/80 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-3xl shadow-2xl border-0 bg-white/90 p-0 overflow-hidden flex flex-col"
        style={{ minWidth: 340 }}
      >
        
        <div className="bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-amber-300 px-8 py-6 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-wider drop-shadow">
            {initialData ? 'Edit Patient' : 'Add Patient'}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="text-white text-3xl font-bold hover:text-red-200 transition"
            title="Close"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col gap-6 px-8 py-8 bg-white/90">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-xs font-bold text-cyan-700 mb-2 uppercase tracking-widest">Full Name</label>
              <input
                type="text"
                value={n}
                onChange={e => setN(e.target.value)}
                className="w-full rounded-xl border-0 bg-cyan-50 focus:bg-cyan-100 px-4 py-3 text-fuchsia-900 font-semibold shadow-inner focus:ring-2 focus:ring-cyan-400 transition"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-cyan-700 mb-2 uppercase tracking-widest">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                className="w-full rounded-xl border-0 bg-amber-50 focus:bg-amber-100 px-4 py-3 text-fuchsia-900 font-semibold shadow-inner focus:ring-2 focus:ring-amber-400 transition"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-cyan-700 mb-2 uppercase tracking-widest">Contact</label>
            <input
              type="text"
              value={cn}
              onChange={e => {
                const value = e.target.value.replace(/[^0-9+]/g, '');
                setC(value);
              }}
              className="w-full rounded-xl border-0 bg-fuchsia-50 focus:bg-fuchsia-100 px-4 py-3 text-fuchsia-900 font-semibold shadow-inner focus:ring-2 focus:ring-fuchsia-400 transition"
              placeholder="Contact"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-cyan-700 mb-2 uppercase tracking-widest">Health Info</label>
            <textarea
              value={healthInfo}
              onChange={e => setHealthInfo(e.target.value)}
              className="w-full rounded-xl border-0 bg-cyan-50 focus:bg-cyan-100 px-4 py-3 text-fuchsia-900 font-semibold shadow-inner focus:ring-2 focus:ring-cyan-400 transition min-h-[80px]"
              required
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end gap-4 px-8 py-6 bg-gradient-to-r from-cyan-100 via-fuchsia-50 to-amber-50 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-full bg-gray-400 text-white hover:bg-gray-500 transition font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition font-semibold"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
