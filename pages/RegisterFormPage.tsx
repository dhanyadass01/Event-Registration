
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EVENTS } from '../constants';
import { registerTeam } from '../supabaseService';

const RegisterFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = EVENTS.find(e => e.id === id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    email: '',
    phone: '',
    member1: '',
    member2: '',
    member3: '',
    member4: '',
    member5: '',
    member6: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!event) return <div className="text-white text-center py-20 font-bold text-xl">Event not found</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.department) newErrors.department = 'Selection required';
    if (!formData.email) newErrors.email = 'Email required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.phone) newErrors.phone = 'Contact required';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = '10 digits required';
    
    if (!formData.member1) newErrors.member1 = 'Name required';
    if (event.teamSize >= 2 && !formData.member2) newErrors.member2 = 'Name required';
    if (event.teamSize >= 3 && !formData.member3) newErrors.member3 = 'Name required';
    if (event.teamSize >= 4 && !formData.member4) newErrors.member4 = 'Name required';
    if (event.teamSize >= 5 && !formData.member5) newErrors.member5 = 'Name required';
    if (event.teamSize >= 6 && !formData.member6) newErrors.member6 = 'Name required';

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await registerTeam({
        event_id: event.id,
        event_name: event.name,
        department: formData.department,
        email: formData.email,
        phone: formData.phone,
        member1: formData.member1,
        member2: formData.member2,
        member3: formData.member3 || undefined,
        member4: formData.member4 || undefined,
        member5: formData.member5 || undefined,
        member6: formData.member6 || undefined
      }, event.prefix);
      
      navigate('/success', { state: { eventName: event.name } });
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = (fieldName: string) => `
    w-full px-4 py-3 bg-white/5 border rounded-xl focus:ring-4 focus:ring-amber-500/30 outline-none transition-all text-white placeholder:text-slate-500 font-bold text-sm
    ${errors[fieldName] ? 'border-red-500' : 'border-amber-900/40 hover:border-amber-500/40'}
  `;

  const labelStyles = "text-xs font-black uppercase tracking-[0.15em] text-amber-500 block mb-1.5 px-1 text-highlight";

  return (
    <div className="max-w-xl mx-auto py-4 animate-slide-up">
      <button 
        onClick={() => navigate('/events')}
        className="mb-4 text-amber-400 font-black uppercase text-xs tracking-widest hover:text-amber-300 transition-colors flex items-center gap-2"
      >
        ← Back to Events
      </button>

      <div className="glass-card rounded-2xl border border-amber-500/20 overflow-hidden premium-shadow">
        <div className="p-6 border-b border-amber-900/30 bg-white/5">
          <div className="text-amber-500 font-black text-[10px] tracking-widest uppercase mb-1.5">Registration Process</div>
          <h2 className="text-xl font-black text-white tracking-tight text-highlight uppercase">Register for {event.name}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-5">
            <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-6 h-[2px] bg-amber-600"></span>
              Participants Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className={labelStyles}>Member 1</label>
                <input 
                  type="text"
                  name="member1"
                  value={formData.member1}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className={inputStyles('member1')}
                />
                {errors.member1 && <p className="text-xs font-black text-red-500 px-1 mt-1 uppercase">{errors.member1}</p>}
              </div>

              <div className="space-y-1">
                <label className={labelStyles}>Member 2</label>
                <input 
                  type="text"
                  name="member2"
                  value={formData.member2}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className={inputStyles('member2')}
                />
                {errors.member2 && <p className="text-xs font-black text-red-500 px-1 mt-1 uppercase">{errors.member2}</p>}
              </div>

              {event.teamSize > 2 && (
                <>
                  <div className="space-y-1">
                    <label className={labelStyles}>Member 3</label>
                    <input 
                      type="text"
                      name="member3"
                      value={formData.member3}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className={inputStyles('member3')}
                    />
                    {errors.member3 && <p className="text-xs font-black text-red-500 px-1 mt-1 uppercase">{errors.member3}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className={labelStyles}>Member 4</label>
                    <input 
                      type="text"
                      name="member4"
                      value={formData.member4}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className={inputStyles('member4')}
                    />
                    {errors.member4 && <p className="text-xs font-black text-red-500 px-1 mt-1 uppercase">{errors.member4}</p>}
                  </div>
                  {event.teamSize > 4 && (
                    <>
                      <div className="space-y-1">
                        <label className={labelStyles}>Member 5</label>
                        <input 
                          type="text"
                          name="member5"
                          value={formData.member5}
                          onChange={handleInputChange}
                          placeholder="Full name"
                          className={inputStyles('member5')}
                        />
                        {errors.member5 && <p className="text-xs font-black text-red-500 px-1 mt-1 uppercase">{errors.member5}</p>}
                      </div>
                      {event.teamSize > 5 && (
                        <div className="space-y-1">
                          <label className={labelStyles}>Member 6</label>
                          <input 
                            type="text"
                            name="member6"
                            value={formData.member6}
                            onChange={handleInputChange}
                            placeholder="Full name"
                            className={inputStyles('member6')}
                          />
                          {errors.member6 && <p className="text-xs font-black text-red-500 px-1 mt-1 uppercase">{errors.member6}</p>}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-6 h-[2px] bg-amber-600"></span>
              Core Credentials
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className={labelStyles}>Department</label>
                <select 
                  title="Select your department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={inputStyles('department')}
                >
                  <option value="" className="bg-black text-white">Select...</option>
                  {(event.id === 'iot' || event.id === 'application_display') ? (
                    <>
                      <option value="Computer Science" className="bg-black text-white">Computer Science</option>
                      <option value="Computer Science with Data Analytics" className="bg-black text-white">Computer Science with Data Analytics</option>
                      <option value="Information Technology" className="bg-black text-white">Information Technology</option>
                      <option value="B.COM IT" className="bg-black text-white">B.COM IT</option>
                      <option value="Artificial Intelligence and Machine Learning" className="bg-black text-white">Artificial Intelligence and Machine Learning</option>
                    </>
                  ) : (
                    <>
                      <option value="Computer Science" className="bg-black text-white">Computer Science</option>
                      <option value="Computer Science with Data Analytics" className="bg-black text-white">Computer Science with Data Analytics</option>
                      <option value="Artificial Intelligence and Machine Learning" className="bg-black text-white">Artificial Intelligence and Machine Learning</option>
                      <option value="Information Technology" className="bg-black text-white">Information Technology</option>
                      <option value="B.COM IT" className="bg-black text-white">B.COM IT</option>
                      <option value="B.COM CA" className="bg-black text-white">B.COM CA</option>
                      <option value="B.COM PA" className="bg-black text-white">B.COM PA</option>
                      <option value="BBA CA" className="bg-black text-white">BBA CA</option>
                      <option value="CSHM" className="bg-black text-white">CSHM</option>
                    </>
                  )}
                </select>
                {errors.department && <p className="text-xs font-black text-red-500 px-1 mt-1 uppercase">{errors.department}</p>}
              </div>

              <div className="space-y-1">
                <label className={labelStyles}>Official Email ID</label>
                <input 
                  type="email"
                  title="Enter your official email address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder=""
                  className={inputStyles('email')}
                />
                {errors.email && <p className="text-xs font-black text-red-500 px-1 mt-1 uppercase">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelStyles}>Phone Number</label>
              <input 
                type="tel"
                title="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder=""
                className={inputStyles('phone')}
              />
              {errors.phone && <p className="text-xs font-black text-red-500 px-1 mt-1 uppercase">{errors.phone}</p>}
            </div>
          </div>

          <div className="pt-3">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black rounded-lg text-sm font-black transition-all shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-95 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-7 h-7 border-4 border-black/30 border-t-black rounded-full animate-spin" />
                  AUTHENTICATING...
                </>
              ) : 'CONFIRM REGISTRATION'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterFormPage;
