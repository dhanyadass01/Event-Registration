
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRegistrations, deleteTeamRegistration } from '../supabaseService';
import { TeamRegistration } from '../types';
import { EVENTS } from '../constants';
import * as XLSX from 'xlsx';

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<TeamRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check if user is authenticated as admin
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin-auth');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const data = await getAllRegistrations();
      setRegistrations(data);
    } catch (err) {
      console.error('Error fetching registrations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (registrationId: string | undefined, teamCode: string) => {
    if (!registrationId) return;
    
    const confirmDelete = window.confirm(`Are you sure you want to delete team ${teamCode}? This action cannot be undone.`);
    if (!confirmDelete) return;

    try {
      await deleteTeamRegistration(registrationId);
      // Refresh the registrations list
      const data = await getAllRegistrations();
      setRegistrations(data);
      alert('Team registration deleted successfully.');
    } catch (error) {
      console.error('Error deleting registration:', error);
      alert('Failed to delete team registration.');
    }
  };

  const handleExport = () => {
    if (!selectedSector) {
      alert('Please select a specific sector to export.');
      return;
    }

    const filteredData = registrations.filter(r => r.event_id === selectedSector);
    
    if (filteredData.length === 0) {
      alert('No mission records found for this sector.');
      return;
    }

    const event = EVENTS.find(e => e.id === selectedSector);
    const eventName = event?.name || 'Event';
    const teamSize = event?.teamSize || 2;

    try {
      // Dynamically build the object based on team size
      const excelData = filteredData.map(r => {
        const row: any = {
          'Team Code': r.team_code,
          'Event Name': r.event_name,
          'Department': r.department,
          'Email ID': r.email,
          'Phone Number': r.phone,
          'Member 1': r.member1,
          'Member 2': r.member2,
        };

        // For teams with more than 2 members, add Member 3 and Member 4
        if (teamSize > 2) {
          row['Member 3'] = r.member3 || 'N/A';
          row['Member 4'] = r.member4 || 'N/A';
        }

        // For teams with 5 members, add Member 5
        if (teamSize > 4) {
          row['Member 5'] = r.member5 || 'N/A';
        }

        // For teams with 6 members, add Member 6
        if (teamSize > 5) {
          row['Member 6'] = r.member6 || 'N/A';
        }

        row['Registration Date'] = r.created_at ? new Date(r.created_at).toLocaleString() : 'N/A';
        return row;
      });

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

      // Adjust column widths based on whether we have 2 or 4 members
      const wscols = [
        { wch: 15 }, // Team Code
        { wch: 25 }, // Event Name
        { wch: 25 }, // Department
        { wch: 30 }, // Email
        { wch: 15 }, // Phone
        { wch: 20 }, // Member 1
        { wch: 20 }, // Member 2
      ];

      if (teamSize > 2) {
        wscols.push({ wch: 20 }, { wch: 20 }); // Member 3 & 4
      }

      if (teamSize > 4) {
        wscols.push({ wch: 20 }); // Member 5
      }

      if (teamSize > 5) {
        wscols.push({ wch: 20 }); // Member 6
      }

      wscols.push({ wch: 25 }); // Date
      worksheet['!cols'] = wscols;

      XLSX.writeFile(workbook, `${eventName.replace(/\s+/g, '_')}_Registry_2026.xlsx`);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please ensure the Excel library is loaded correctly.');
    }
  };

  // Filter logic: Only show records for the selected sector
  // If no sector is selected, we show all (optional, but as per prompt "show only in the specified sector")
  const filteredRegistrations = registrations.filter(r => {
    const matchesSector = !selectedSector || r.event_id === selectedSector;
    const matchesSearch = 
      r.team_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.member1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSector && matchesSearch;
  });

  return (
    <div className="space-y-12 py-6">
      <button 
        onClick={() => navigate('/')}
        className="mb-4 text-amber-400 font-black uppercase text-xs tracking-widest hover:text-amber-300 transition-colors flex items-center gap-2"
      >
        ← Back to Home
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">Registered teams</h2>
          <p className="text-slate-400 font-bold">
            {selectedSector 
              ? `Displaying ${filteredRegistrations.length} records for ${EVENTS.find(e => e.id === selectedSector)?.name}` 
              : `Real-time status of ${registrations.length} total squads across all sectors.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          <select 
            title="Select a sector to filter registrations"
            className="flex-grow lg:flex-none px-6 py-3.5 bg-white/5 border border-amber-900/40 rounded-2xl text-xs font-black uppercase tracking-widest text-white outline-none focus:ring-2 focus:ring-amber-500"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          >
            <option value="" className="bg-black">All Events</option>
            {EVENTS.map(e => (
              <option key={e.id} value={e.id} className="bg-black">{e.name}</option>
            ))}
          </select>
          <button 
            onClick={handleExport}
            disabled={!selectedSector || filteredRegistrations.length === 0}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-400 to-amber-600 text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-3 shadow-xl shadow-amber-500/20"
          >
            Export Data (.xlsx)
          </button>
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] border border-amber-900/30 overflow-hidden premium-shadow">
        <div className="p-6 border-b border-amber-900/30 bg-white/5">
          <input 
            type="text"
            placeholder="Search filtered registry by code, name, or department..."
            className="w-full px-6 py-4 bg-black/50 border border-amber-900/20 rounded-2xl text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-amber-500 transition-all font-bold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-amber-500/5 text-amber-600 text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-6">Team Code</th>
                <th className="px-8 py-6">Event Name</th>
                <th className="px-8 py-6">Participants</th>
                <th className="px-8 py-6">Department</th>
                <th className="px-8 py-6">Email ID</th>
                <th className="px-8 py-6">Phone No</th>
                <th className="px-8 py-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-900/20">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
                      <span className="font-black text-xs tracking-widest text-amber-500 uppercase">Synchronizing Records...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-32 text-center text-slate-500 font-bold tracking-widest text-xs uppercase opacity-50">
                    {selectedSector ? "No records found for this sector." : "No registry data found."}
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-amber-500/5 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs">
                        {reg.team_code}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-black text-white group-hover:text-amber-400 transition-colors uppercase text-xs tracking-tight">{reg.event_name}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-xs font-bold text-slate-300">
                        {reg.member1}, {reg.member2}
                        {reg.member3 && <span className="text-slate-500">, {reg.member3}</span>}
                        {reg.member4 && <span className="text-slate-500">, {reg.member4}</span>}
                        {reg.member5 && <span className="text-slate-500">, {reg.member5}</span>}
                        {reg.member6 && <span className="text-slate-500">, {reg.member6}</span>}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-black uppercase tracking-widest text-amber-700 group-hover:text-amber-500 transition-colors">{reg.department}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-[10px] font-bold text-amber-400 uppercase">{reg.email}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-[10px] text-slate-300 font-bold group-hover:text-white transition-colors">{reg.phone}</div>
                    </td>
                    <td className="px-8 py-6">
                      <button
                        onClick={() => handleDelete(reg.id, reg.team_code)}
                        className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg hover:shadow-red-500/30"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
