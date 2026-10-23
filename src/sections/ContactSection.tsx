import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { PROFILE_CONFIG } from '../data/profile';
import { Mail, Send, CheckCircle2, AlertCircle, Copy, Check, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/common/SocialIcons';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name or organization.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please provide a subject line.';
    if (!formData.message.trim()) errs.message = 'Please include message details or role description.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      
      // If email is configured or placeholder, create mailto URL with formatted body
      const mailtoRecipient = PROFILE_CONFIG.isEmailConfigured ? PROFILE_CONFIG.email : 'somashekharjavooru@gmail.com';
      const mailtoSubject = encodeURIComponent(`[Engineering Inquiry] ${formData.subject}`);
      const mailtoBody = encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}\n\n-- Sent via Somashekhar Javooru Engineering Portfolio`
      );
      
      // Open native mailto client
      window.location.href = `mailto:${mailtoRecipient}?subject=${mailtoSubject}&body=${mailtoBody}`;
    }
  };

  const copyEmailPlaceholder = () => {
    navigator.clipboard.writeText(PROFILE_CONFIG.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#070b14] border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          moduleCode="// MODULE: 07 // DIRECT DISPATCH & RECRUITER CONTACT"
          title="Initiate Direct"
          highlightText="Engineering Dialogue"
          description="Interested in discussing Embedded Software, Firmware Development, RTOS, or Connected IoT roles? Get in touch via official channels."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Official Connect Channels & Recruiter Callout */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#090f1d] border border-cyan-500/25 space-y-5 shadow-xl">
              <h3 className="text-xl font-bold text-white font-mono-tech flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Recruitment & Opportunities
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Currently open to full-time engineering positions and technical internships in{' '}
                <strong className="text-cyan-300">Embedded Software Engineering</strong>,{' '}
                <strong className="text-cyan-300">Firmware Development</strong>, and{' '}
                <strong className="text-cyan-300">IoT Systems</strong> starting 2026.
              </p>

              {/* Status Indicator */}
              <div className="p-3.5 rounded-xl bg-[#050b16] border border-slate-800 text-xs font-mono-tech space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold">STATUS: AVAILABLE</span>
                </div>
                <div className="text-slate-400">
                  Target Graduation: June 2026 (BIET Davangere)
                </div>
                <div className="text-slate-400">
                  Preferred Location: Bengaluru, KA / Remote
                </div>
              </div>

              {/* Channels List */}
              <div className="space-y-3 pt-2">
                {/* LinkedIn */}
                <a
                  href={PROFILE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#0b1324] hover:bg-[#0e1a32] border border-slate-800 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sky-950/60 border border-sky-500/30 text-sky-400">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono-tech text-slate-400">LinkedIn Network</div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        in/somashekhar-javooru
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono-tech text-slate-500 group-hover:text-cyan-400">
                    Connect →
                  </span>
                </a>

                {/* GitHub */}
                <a
                  href={PROFILE_CONFIG.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#0b1324] hover:bg-[#0e1a32] border border-slate-800 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono-tech text-slate-400">Code Repositories</div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        github.com/Somujavooru
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono-tech text-slate-500 group-hover:text-cyan-400">
                    Inspect →
                  </span>
                </a>

                {/* Email Channel */}
                <div className="p-3.5 rounded-xl bg-[#0b1324] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono-tech text-slate-400">Email Address</div>
                        <div className="text-xs sm:text-sm font-mono-tech font-bold text-cyan-300 break-all">
                          {PROFILE_CONFIG.email}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={copyEmailPlaceholder}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Copy email address"
                      aria-label="Copy email"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {!PROFILE_CONFIG.isEmailConfigured && (
                    <div className="text-[11px] text-amber-300/80 bg-amber-950/20 p-2 rounded border border-amber-500/20 font-mono-tech">
                      CONFIG NOTICE: Placeholder active. You can set your real email in <code>src/data/profile.ts</code> anytime.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#090f1d] border border-slate-800/90 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-white font-bold font-mono-tech text-base">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <span>DISPATCH_MESSAGE</span>
                </div>
                <span className="text-[11px] font-mono-tech text-slate-500">
                  SECURE & DIRECT
                </span>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-bold text-white font-mono-tech">
                    Message Formatted for Dispatch
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Your native email client has been initiated with this drafted message.
                    If your client did not launch automatically, you may send your inquiry directly to{' '}
                    <code className="text-cyan-300 font-mono-tech">{PROFILE_CONFIG.email}</code>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono-tech text-slate-300"
                  >
                    Send Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono-tech text-slate-300 uppercase mb-1.5">
                        Your Name / Organization <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Elena Vance / Intel"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#060b16] border ${
                          errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-400'
                        } text-white placeholder-slate-600 text-sm focus:outline-none transition-colors`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-mono-tech">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono-tech text-slate-300 uppercase mb-1.5">
                        Your Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#060b16] border ${
                          errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-400'
                        } text-white placeholder-slate-600 text-sm focus:outline-none transition-colors`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-mono-tech">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-300 uppercase mb-1.5">
                      Subject / Role Discussion <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Embedded Software Engineer Position"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#060b16] border ${
                        errors.subject ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-400'
                      } text-white placeholder-slate-600 text-sm focus:outline-none transition-colors`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-mono-tech">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono-tech text-slate-300 uppercase mb-1.5">
                      Message Details <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding the role, requirements, or technical inquiry..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#060b16] border ${
                        errors.message ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-400'
                      } text-white placeholder-slate-600 text-sm focus:outline-none transition-colors resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1 font-mono-tech">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                    >
                      <Send className="w-4 h-4" />
                      <span>Dispatch Communication</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 font-mono-tech text-center mt-3">
                    Submitting opens your native mail client with this drafted message pre-populated,
                    ensuring zero third-party data tracking.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
