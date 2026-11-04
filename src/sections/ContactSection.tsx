import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { PROFILE_CONFIG } from '../data/profile';
import { Mail, Send, CheckCircle2, AlertCircle, Copy, Check, MessageSquare, ExternalLink, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/common/SocialIcons';
import { ScrollSectionWrapper } from '../components/common/ScrollSectionWrapper';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
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

  const recipientEmail = PROFILE_CONFIG.isEmailConfigured && PROFILE_CONFIG.email 
    ? PROFILE_CONFIG.email 
    : 'somashekharjavooru@gmail.com';

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(`[Engineering Inquiry] ${formData.subject}`)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}\n\n-- Sent via Somashekhar Javooru Engineering Portfolio`)}`;

  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(`[Engineering Inquiry] ${formData.subject}`)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}\n\n-- Sent via Somashekhar Javooru Engineering Portfolio`)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || !accessKey.trim()) {
      setApiError('Web3Forms Access Key is not configured in .env. Please configure VITE_WEB3FORMS_ACCESS_KEY or use the direct mail links below.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey.trim(),
          name: formData.name,
          email: formData.email,
          subject: `[Engineering Inquiry] ${formData.subject}`,
          message: formData.message,
          from_name: formData.name,
          to_email: recipientEmail,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setApiError(null);
      } else {
        setApiError(data.message || 'Submission was not accepted by the email service. Please verify your Access Key or try again.');
      }
    } catch (err: any) {
      setApiError(err?.message || 'A network error occurred while dispatching the message. Please check your connection or send via direct email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <ScrollSectionWrapper
      id="contact"
      className="pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 relative bg-[#FAFAF7] border-t border-[#E5E9E6]"
    >
      <div className="max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <SectionHeader
          moduleCode="// 09"
          title="Initiate Direct"
          highlightText="Engineering Dialogue"
          description="Interested in discussing Embedded Software, Firmware Development, RTOS, or Connected IoT roles? Get in touch via official channels."
          className="mb-4 sm:mb-5 lg:mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Official Connect Channels & Recruiter Callout */}
          <motion.div
            className="lg:col-span-5 space-y-4 sm:space-y-5"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="bg-white border border-[#E5E9E6] card-shadow rounded-2xl p-5 sm:p-6 space-y-4 break-inside-avoid">
              <h3 className="text-lg sm:text-xl font-bold font-display flex items-center gap-2 text-[#15252B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#126B5B]" />
                Recruitment & Opportunities
              </h3>
              <p className="text-sm sm:text-[14.5px] leading-relaxed text-[#475569]">
                Currently open to full-time engineering positions and technical internships in{' '}
                <strong className="text-[#126B5B]">Embedded Software Engineering</strong>,{' '}
                <strong className="text-[#C99543]">Firmware Development</strong>, and{' '}
                <strong className="text-[#15252B]">Connected IoT Systems</strong> starting 2026.
              </p>

              {/* Status Indicator */}
              <div className="p-3.5 rounded-xl text-xs sm:text-[12.5px] font-mono space-y-1.5 border border-[#E5E9E6] bg-[#FAFAF7]">
                <div className="flex items-center gap-2 text-[#126B5B]">
                  <span className="w-2 h-2 rounded-full bg-[#126B5B] animate-ping" />
                  <span className="font-bold">STATUS: AVAILABLE FOR 2026 ROLES</span>
                </div>
                <div className="text-[#556368]">
                  Target Graduation: June 2026 (BIET Davangere)
                </div>
                <div className="text-[#556368]">
                  Location: Bengaluru, KA • CGPA: 8.75 / 10.0
                </div>
              </div>

              {/* Channels List */}
              <div className="space-y-2.5 pt-1">
                {/* LinkedIn */}
                <a
                  href={PROFILE_CONFIG.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-[#E5E9E6] bg-[#FAFAF7] hover:bg-[#E8F4F0] hover:border-[#126B5B]/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-[#E5E9E6] text-[#126B5B] group-hover:scale-105 transition-transform">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#556368]">LinkedIn Network</div>
                      <div className="text-[13px] sm:text-sm font-semibold text-[#15252B]">
                        in/somashekhar-javooru
                      </div>
                    </div>
                  </div>
                  <span className="text-xs sm:text-[13px] font-mono text-[#126B5B] font-bold">
                    Connect →
                  </span>
                </a>

                {/* GitHub */}
                <a
                  href={PROFILE_CONFIG.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-[#E5E9E6] bg-[#FAFAF7] hover:bg-[#FDF6EB] hover:border-[#C99543]/30 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-[#E5E9E6] text-[#C99543] group-hover:scale-105 transition-transform">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-[#556368]">Code Repositories</div>
                      <div className="text-[13px] sm:text-sm font-semibold text-[#15252B]">
                        github.com/Somujavooru
                      </div>
                    </div>
                  </div>
                  <span className="text-xs sm:text-[13px] font-mono text-[#C99543] font-bold">
                    Inspect →
                  </span>
                </a>

                {/* Email Channel */}
                <div className="p-3 rounded-xl border border-[#E5E9E6] bg-[#FAFAF7] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white border border-[#E5E9E6] text-[#15252B]">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono text-[#556368]">Email Address</div>
                        <div className="text-xs sm:text-[13.5px] font-mono font-bold text-[#15252B] break-all">
                          {PROFILE_CONFIG.email}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={copyEmail}
                      className="p-2 rounded-lg transition-colors border border-[#E5E9E6] bg-white text-[#68757A] hover:text-[#15252B] hover:border-[#126B5B] cursor-pointer"
                      title="Copy email address"
                      aria-label="Copy email"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-[#126B5B]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Dispatch Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 }}
          >
            <div className="p-5 sm:p-6 lg:p-7 rounded-2xl border border-[#E5E9E6] bg-white card-shadow space-y-4 sm:space-y-5 break-inside-avoid">
              <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-[#E5E9E6]">
                <div className="flex items-center gap-2 font-bold font-mono text-sm sm:text-base text-[#15252B]">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#126B5B]" />
                  <span>DISPATCH_MESSAGE</span>
                </div>
                <span className="text-[11px] font-mono text-[#68757A]">
                  SECURE & DIRECT EMAIL
                </span>
              </div>

              {submitted ? (
                <div className="p-6 sm:p-7 rounded-xl bg-[#E8F4F0] border border-[#126B5B]/30 text-center space-y-4 animate-in fade-in">
                  <CheckCircle2 className="w-12 h-12 text-[#126B5B] mx-auto" />
                  <h4 className="text-lg font-bold text-[#15252B] font-display">
                    Message Dispatched Directly to Inbox!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#404D53] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! Your message was transmitted directly to{' '}
                    <strong className="text-[#126B5B] font-mono">{recipientEmail}</strong>. Somashekhar will review your inquiry and reply promptly.
                  </p>

                  <div className="pt-3 border-t border-[#126B5B]/15">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-4 py-2 rounded-lg bg-white border border-[#E5E9E6] text-[#15252B] text-xs font-semibold hover:bg-[#FAFAF7] transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
                  {apiError && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold">{apiError}</p>
                        <div className="mt-2 flex flex-wrap gap-3">
                          <a
                            href={gmailWebUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-rose-800 hover:text-rose-900 underline font-semibold"
                          >
                            <span>Open in Gmail (Web)</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a
                            href={mailtoUrl}
                            className="inline-flex items-center gap-1 font-mono text-[11px] text-rose-800 hover:text-rose-900 underline font-semibold"
                          >
                            <span>Launch Desktop Mail</span>
                            <Send className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono uppercase mb-1.5 text-[#15252B] font-semibold">
                        Your Name / Organization <span className="text-[#126B5B]">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan / Intel"
                        className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#FAFAF7] border ${
                          errors.name ? 'border-rose-500' : 'border-[#E5E9E6] focus:border-[#126B5B]'
                        } text-[#15252B] placeholder-[#8A969B] text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono uppercase mb-1.5 text-[#15252B] font-semibold">
                        Your Email Address <span className="text-[#126B5B]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#FAFAF7] border ${
                          errors.email ? 'border-rose-500' : 'border-[#E5E9E6] focus:border-[#126B5B]'
                        } text-[#15252B] placeholder-[#8A969B] text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono uppercase mb-1.5 text-[#15252B] font-semibold">
                      Subject / Role Discussion <span className="text-[#126B5B]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Embedded Software Engineer Position"
                      className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#FAFAF7] border ${
                        errors.subject ? 'border-rose-500' : 'border-[#E5E9E6] focus:border-[#126B5B]'
                      } text-[#15252B] placeholder-[#8A969B] text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-mono uppercase text-[#15252B] font-semibold">
                        Message Details <span className="text-[#126B5B]">*</span>
                      </label>
                      <span className={`text-[11px] font-mono ${
                        formData.message.length > 950 ? 'text-amber-600 font-bold' : 'text-[#68757A]'
                      }`}>
                        {formData.message.length} / 1,000
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      maxLength={1000}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details regarding the role, requirements, or technical inquiry..."
                      className={`w-full px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#FAFAF7] border ${
                        errors.message ? 'border-rose-500' : 'border-[#E5E9E6] focus:border-[#126B5B]'
                      } text-[#15252B] placeholder-[#8A969B] text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md bg-[#126B5B] hover:bg-[#0e5246] text-white disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                      style={{
                        boxShadow: '0 6px 20px -4px rgba(18,107,91,0.3)',
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching Communication...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Dispatch Communication</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs font-mono text-center mt-2.5 text-[#556368]">
                    Submits directly to somashekharjavooru@gmail.com via Web3Forms with instant in-browser delivery.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollSectionWrapper>
  );
};
