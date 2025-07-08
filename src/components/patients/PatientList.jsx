import React, { useState, useEffect } from 'react';
import { getPatients, addPatient, updatePatient, deletePatient } from '../../utils/patientStorage';
import PatientForm from './PatientForm';

const PatList = () => {
  const [pts, setPts] = useState([]);
  const [editPt, setEditPt] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewPt, setViewPt] = useState(null);
  const [delId, setDelId] = useState(null);
  const [showDel, setShowDel] = useState(false);
  const [q, setQ] = useState('');
const refresh = () => setPts(getPatients());

  useEffect(() => {
    setPts(getPatients());
  }, []);

  
const confDel = () => {
    if (delId) {
      deletePatient(delId);
      refresh();
      setDelId(null);
      setShowDel(false);
    }
  };
  const addNew = () => {
    setEditPt(null);
    setShowForm(true);
  };

  

  const onSubmit = (pt) => {
    if (editPt) {
      updatePatient(pt);
    } else {
      addPatient(pt);
    }
    setShowForm(false);
    refresh();
  };
const onEdit = (pt) => {
    setEditPt(pt);
    setShowForm(true);
  };
  const filtPts = pts.filter(
    (p) =>
      p.name?.toLowerCase().includes(q.toLowerCase()) ||
      p.contact?.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-cyan-50 to-amber-100 py-10 px-2 md:px-8 rounded-xl shadow-2xl">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
          <h2 className="text-4xl font-extrabold text-fuchsia-800 tracking-tight drop-shadow text-center md:text-left">
            Patient Directory
          </h2>
          <button
            type="button"
            onClick={addNew}
            className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full shadow-lg flex items-center gap-2 px-6 py-3 text-lg font-semibold transition duration-200 w-full sm:w-auto justify-center"
          >
            <span className="text-2xl">+</span>
            <span className="inline">Add Patient</span>
          </button>
        </div>

        <div className="flex justify-end mb-8">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search by Name or Contact"
              value={q}
              onChange={e => setQ(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full border-2 border-fuchsia-400 focus:border-cyan-400 outline-none bg-white text-fuchsia-900 placeholder:text-cyan-400 shadow transition text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtPts.length === 0 && (
            <div className="col-span-3 text-center text-cyan-400 text-lg py-12">
              No patients found.
            </div>
          )}
          {filtPts.map((p) => (
            <div
              key={p.id}
              className="bg-white/80 rounded-2xl shadow-md p-6 flex flex-col gap-3 border-2 border-fuchsia-200 hover:shadow-xl transition relative min-h-[220px] md:min-h-[240px] lg:min-h-[240px] justify-between"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-fuchsia-100 text-fuchsia-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow">
                  {p.name?.[0]?.toUpperCase() || "P"}
                </div>
                <div>
                  <div className="text-xl font-bold text-fuchsia-900">{p.name}</div>
                  <div className="text-xs font-bold text-fuchsia-800 bg-fuchsia-100 px-2 py-1 rounded inline-block mt-1 tracking-wide shadow-sm border border-fuchsia-200">
                    DOB: {p.dob ? new Date(p.dob).toLocaleDateString('en-GB') : ''}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-cyan-900 text-sm flex-1">
                <div><span className="font-semibold">Contact:</span> {p.contact}</div>
                <div><span className="font-semibold">Health Info:</span> {p.healthInfo}</div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setViewPt(p)}
                  className="px-3 py-1 rounded-full text-cyan-700 bg-cyan-100 hover:bg-cyan-200 hover:text-cyan-900 transition text-sm font-semibold"
                  title="View"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(p)}
                  className="px-3 py-1 rounded-full text-amber-700 bg-amber-100 hover:bg-amber-200 hover:text-amber-900 transition text-sm font-semibold"
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDelId(p.id);
                    setShowDel(true);
                  }}
                  className="px-3 py-1 rounded-full text-red-700 bg-red-100 hover:bg-red-200 hover:text-red-900 transition text-sm font-semibold"
                  title="Delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-10 border-2 border-cyan-200 relative">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
                style={{ zIndex: 10 }}
              >
                &times;
              </button>
              <PatientForm
                initialData={editPt}
                onSubmit={onSubmit}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {viewPt && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-fuchsia-50 rounded-2xl shadow-2xl p-8 w-full max-w-md relative border-2 border-cyan-200">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl"
                onClick={() => setViewPt(null)}
              >
                &times;
              </button>
              <h3 className="text-2xl font-bold mb-4 text-fuchsia-800">Patient Details</h3>
              <div className="space-y-2 text-fuchsia-900">
                <div><span className="font-semibold">Name:</span> {viewPt.name}</div>
                <div><span className="font-semibold">DOB:</span> {viewPt.dob ? new Date(viewPt.dob).toLocaleDateString('en-GB') : ''}</div>
                <div><span className="font-semibold">Contact:</span> {viewPt.contact}</div>
                <div><span className="font-semibold">Health Info:</span> {viewPt.healthInfo}</div>
              </div>
            </div>
          </div>
        )}

        {showDel && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-red-50 rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-sm text-center relative border-2 border-red-200">
              <h3 className="text-xl font-bold mb-4 text-red-700">Delete Patient</h3>
              <p className="mb-6 text-fuchsia-900">Are you sure you want to delete this patient?</p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
                  onClick={confDel}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
                  onClick={() => setShowDel(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatList;
