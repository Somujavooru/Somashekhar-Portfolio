import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Briefcase, 
  IndianRupee, 
  Clock, 
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { FREELANCE_PRICING } from '../../data/startup';
import { PROFILE_CONFIG } from '../../data/profile';

export type QuoteServiceType = 'E-commerce Service' | 'Automation Solutions' | 'Engineering Projects';

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: QuoteServiceType;
}

export const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({
  isOpen,
  onClose,
  initialService = 'E-commerce Service',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: initialService,
    budget: '',
    timeline: '',
    requirements: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Sync initialService when modal opens or initialService prop updates
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        service: initialService,
      }));
      setErrors({});
      setApiError(null);
      setSubmitted(false);
    }
  }, [isOpen, initialService]);

  // Handle body scrolling & escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [isOpen, onClose]);

  const validatePhone = (num: string): boolean => {
    if (!num.trim()) return true; // Optional field
    const digitsOnly = num.replace(/\D/g, '');
    if (digitsOnly.length < 7 || digitsOnly.length > 15) return false;
    return /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(num.trim());
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (formData.phone.trim() && !validatePhone(formData.phone)) {
      errs.phone = 'Please enter a valid phone number (7–15 digits, optional +).';
    }
    if (!formData.service) {
      errs.service = 'Please select a service.';
    }
    if (!formData.requirements.trim()) {
      errs.requirements = 'Please describe your project requirements.';
    } else if (formData.requirements.length > 1000) {
      errs.requirements = 'Project requirements cannot exceed 1,000 characters.';
    }
    return errs;
  };

  const recipientEmail = PROFILE_CONFIG.isEmailConfigured && PROFILE_CONFIG.email 
    ? PROFILE_CONFIG.email 
    : 'somashekharjavooru@gmail.com';

  const getStartingPrice = (srv: string) => {
    switch (srv) {
      case 'E-commerce Service':
        return FREELANCE_PRICING.ecommerce.formattedPrice;
      case 'Automation Solutions':
        return FREELANCE_PRICING.automation.formattedPrice;
      case 'Engineering Projects':
        return FREELANCE_PRICING.engineering.formattedPrice;
      default:
        return 'Custom';
    }
  };

  const fallbackEmailBody = `Quote Request for ${formData.service}\n\n` +
    `Client Name: ${formData.name}\n` +
    `Email: ${formData.email}\n` +
    `Contact Number: ${formData.phone || 'Not provided'}\n` +
    `Company/Organization: ${formData.company || 'Not provided'}\n` +
    `Service: ${formData.service}\n` +
    `Expected Budget: ${formData.budget || 'Not specified'}\n` +
    `Preferred Timeline: ${formData.timeline || 'Not specified'}\n\n` +
    `Project Requirements:\n${formData.requirements}\n\n` +
    `-- Submitted via EduNova Forge Portfolio Quote Request`;

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${encodeURIComponent(`[Quote Request] ${formData.service} — ${formData.name}`)}&body=${encodeURIComponent(fallbackEmailBody)}`;
  const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(`[Quote Request] ${formData.service} — ${formData.name}`)}&body=${encodeURIComponent(fallbackEmailBody)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey || !accessKey.trim()) {
      setApiError('Web3Forms Access Key is not configured. Please use the direct email options below to transmit your quote request.');
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
          phone: formData.phone || 'Not provided',
          company: formData.company || 'Not provided',
          service: formData.service,
          budget: formData.budget || 'Not specified',
          timeline: formData.timeline || 'Not specified',
          subject: `[Freelance Quote Request] ${formData.service} — ${formData.name}`,
          message: fallbackEmailBody,
          from_name: `${formData.name} (Quote Request)`,
          to_email: recipientEmail,
        }),
      });

      const text = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Email service returned an unexpected response format. Please retry or use the direct email link below.');
      }

      if (data.success) {
        setSubmitted(true);
        setApiError(null);
      } else {
        setApiError(data.message || 'Submission was not accepted by the service. Please try again or use direct email.');
      }
    } catch (err: any) {
      setApiError(err?.message || 'A network error occurred while submitting your quote request. Please retry or dispatch via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: initialService,
      budget: '',
      timeline: '',
      requirements: '',
    });
    setErrors({});
    setApiError(null);
    setSubmitted(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-900/50 backdrop-blur-xs overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        data-lenis-prevent="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl border border-[#E5E9E6] shadow-2xl my-auto text-[#15252B] overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[90vh]"
          data-lenis-prevent="true"
        >
          {/* ========================================================
              MODAL HEADER (STATIONARY / PINNED)
             ======================================================== */}
          <div className="flex items-start justify-between p-4 sm:p-6 pb-3 sm:pb-4 border-b border-[#E5E9E6] bg-white shrink-0">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F4F0] border border-[#126B5B]/20 text-[#126B5B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono bg-[#FDF6EB] border border-[#C99543]/20 text-[#C99543] font-bold mb-1">
                  <span>EDUNOVA FORGE • FREELANCE PROPOSAL</span>
                </div>
                <h3 id="quote-modal-title" className="text-xl sm:text-2xl font-bold font-display text-[#15252B] leading-tight">
                  Request a Quote
                </h3>
                <p className="text-xs sm:text-[13.5px] text-[#556368] mt-0.5">
                  Share your project scope to receive a tailored technical estimate and delivery roadmap.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#FAFAF7] hover:bg-[#F0F2F0] border border-[#E5E9E6] text-[#68757A] hover:text-[#15252B] transition-colors shrink-0 cursor-pointer ml-2"
              aria-label="Close modal"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ========================================================
              MODAL BODY (SCROLLABLE ON SMALL SCREENS)
             ======================================================== */}
          <div className="overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-4 sm:space-y-5 flex-1" data-lenis-prevent="true">
            
            {/* Highlighted Selected-Service Panel */}
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#F4F9F6] via-[#F9FCFA] to-[#FFF9F2] border border-[#DCEBE5] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#126B5B] shrink-0 animate-pulse" />
                <div className="min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#68757A] block font-semibold">
                    Target Service Domain
                  </span>
                  <div className="text-sm sm:text-base font-bold text-[#15252B] font-display truncate">
                    {formData.service}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 px-3 py-1.5 rounded-xl bg-white border border-[#E5E9E6] text-xs font-mono shadow-2xs">
                <span className="text-[#68757A]">Starting:</span>
                <span className="text-[#EA580C] font-bold">
                  {getStartingPrice(formData.service)}
                </span>
              </div>
            </div>

            {/* ========================================================
                SUBMITTED SUCCESS STATE
               ======================================================== */}
            {submitted ? (
              <div className="py-6 sm:py-8 px-4 sm:px-6 rounded-2xl bg-[#E8F4F0] border border-[#126B5B]/30 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-2xl bg-white border border-[#126B5B]/20 text-[#126B5B] flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-8 h-8 text-[#126B5B]" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#15252B] font-display">
                    Quote Request Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#404D53] max-w-md mx-auto leading-relaxed mt-1">
                    Thank you, <strong className="text-[#15252B]">{formData.name}</strong>! Your quote request for{' '}
                    <strong className="text-[#126B5B]">{formData.service}</strong> has been transmitted directly to{' '}
                    <strong className="text-[#15252B] font-mono">{recipientEmail}</strong>. Somashekhar will review your requirements and respond within 24–48 hours.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/80 border border-[#E5E9E6] max-w-md mx-auto text-left text-xs font-mono space-y-1 text-[#404D53]">
                  <div><span className="text-[#68757A]">Client:</span> {formData.name}</div>
                  <div><span className="text-[#68757A]">Email:</span> {formData.email}</div>
                  {formData.phone && <div><span className="text-[#68757A]">Phone:</span> {formData.phone}</div>}
                  {formData.company && <div><span className="text-[#68757A]">Organization:</span> {formData.company}</div>}
                  {formData.budget && <div><span className="text-[#68757A]">Budget:</span> {formData.budget}</div>}
                  {formData.timeline && <div><span className="text-[#68757A]">Timeline:</span> {formData.timeline}</div>}
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={resetForm}
                    className="px-4 py-2.5 rounded-xl bg-white border border-[#E5E9E6] text-[#15252B] text-xs font-semibold hover:bg-[#FAFAF7] transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-[#126B5B] text-white text-xs font-bold hover:bg-[#0D4E42] transition-colors shadow-xs cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : (
              /* ========================================================
                  ACTIVE QUOTE FORM
                 ======================================================== */
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

                {/* Row 1: Full Name & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-mono uppercase mb-1.5 text-[#15252B] font-semibold">
                      <User className="w-3.5 h-3.5 text-[#126B5B]" />
                      <span>Full Name</span>
                      <span className="text-[#126B5B]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan / Organization"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] border ${
                        errors.name ? 'border-rose-500' : 'border-[#E5E9E6] focus:border-[#126B5B]'
                      } text-[#15252B] placeholder-[#8A969B] text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-mono uppercase mb-1.5 text-[#15252B] font-semibold">
                      <Mail className="w-3.5 h-3.5 text-[#126B5B]" />
                      <span>Email Address</span>
                      <span className="text-[#126B5B]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] border ${
                        errors.email ? 'border-rose-500' : 'border-[#E5E9E6] focus:border-[#126B5B]'
                      } text-[#15252B] placeholder-[#8A969B] text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Contact Number (Optional) & Company / Organization (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* Contact Number (Optional) */}
                  <div>
                    <label className="flex items-center justify-between text-xs font-mono uppercase mb-1.5 text-[#15252B] font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#126B5B]" />
                        <span>Contact Number</span>
                      </span>
                      <span className="text-[10px] text-[#8A969B] font-normal normal-case">Optional</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your contact number"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] border ${
                        errors.phone ? 'border-rose-500' : 'border-[#E5E9E6] focus:border-[#126B5B]'
                      } text-[#15252B] placeholder-[#8A969B] text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Company / Organization (Optional) */}
                  <div>
                    <label className="flex items-center justify-between text-xs font-mono uppercase mb-1.5 text-[#15252B] font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#126B5B]" />
                        <span>Company / Organization</span>
                      </span>
                      <span className="text-[10px] text-[#8A969B] font-normal normal-case">Optional</span>
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Corp / Studio / Individual"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] border border-[#E5E9E6] focus:border-[#126B5B] text-[#15252B] placeholder-[#8A969B] text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Service Dropdown, Expected Budget & Preferred Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                  {/* Service (Required Dropdown) */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-mono uppercase mb-1.5 text-[#15252B] font-semibold">
                      <Briefcase className="w-3.5 h-3.5 text-[#126B5B]" />
                      <span>Service</span>
                      <span className="text-[#126B5B]">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value as QuoteServiceType })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FAFAF7] border border-[#E5E9E6] focus:border-[#126B5B] text-[#15252B] text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="E-commerce Service">E-commerce Service</option>
                      <option value="Automation Solutions">Automation Solutions</option>
                      <option value="Engineering Projects">Engineering Projects</option>
                    </select>
                  </div>

                  {/* Expected Budget (Optional Dropdown) */}
                  <div>
                    <label className="flex items-center justify-between text-xs font-mono uppercase mb-1.5 text-[#15252B] font-semibold">
                      <span className="flex items-center gap-1.5">
                        <IndianRupee className="w-3.5 h-3.5 text-[#126B5B]" />
                        <span>Expected Budget</span>
                      </span>
                      <span className="text-[10px] text-[#8A969B] font-normal normal-case">Optional</span>
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FAFAF7] border border-[#E5E9E6] focus:border-[#126B5B] text-[#15252B] text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="">Select budget range...</option>
                      <option value="Under ₹5,000">Under ₹5,000</option>
                      <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000</option>
                      <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000</option>
                      <option value="₹30,000 – ₹60,000">₹30,000 – ₹60,000</option>
                      <option value="₹60,000+">₹60,000+ (Custom / Enterprise)</option>
                    </select>
                  </div>

                  {/* Preferred Timeline (Optional Dropdown) */}
                  <div>
                    <label className="flex items-center justify-between text-xs font-mono uppercase mb-1.5 text-[#15252B] font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#126B5B]" />
                        <span>Timeline</span>
                      </span>
                      <span className="text-[10px] text-[#8A969B] font-normal normal-case">Optional</span>
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FAFAF7] border border-[#E5E9E6] focus:border-[#126B5B] text-[#15252B] text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="">Select timeline...</option>
                      <option value="Urgent (< 1 week)">Urgent (&lt; 1 week)</option>
                      <option value="1 – 2 weeks">1 – 2 weeks</option>
                      <option value="2 – 4 weeks">2 – 4 weeks</option>
                      <option value="1 – 2 months">1 – 2 months</option>
                      <option value="Flexible timeline">Flexible timeline</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Project Requirements (Multiline Textarea with 1,000 char limit) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#15252B] font-semibold">
                      <MessageSquare className="w-3.5 h-3.5 text-[#126B5B]" />
                      <span>Project Requirements</span>
                      <span className="text-[#126B5B]">*</span>
                    </label>
                    <span className={`text-[11px] font-mono ${
                      formData.requirements.length > 950 ? 'text-amber-600 font-bold' : 'text-[#68757A]'
                    }`}>
                      {formData.requirements.length} / 1,000
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    maxLength={1000}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Describe your project scope, target features, architecture preferences, or specific deliverables..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#FAFAF7] border ${
                      errors.requirements ? 'border-rose-500' : 'border-[#E5E9E6] focus:border-[#126B5B]'
                    } text-[#15252B] placeholder-[#8A969B] text-xs sm:text-sm focus:outline-none focus:bg-white transition-colors resize-none leading-relaxed`}
                  />
                  {errors.requirements && (
                    <p className="mt-1 text-xs text-rose-500 flex items-center gap-1 font-mono">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.requirements}</span>
                    </p>
                  )}
                </div>

                {/* Row 5: Prominent Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md bg-[#126B5B] hover:bg-[#0D4E42] text-white disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                    style={{
                      boxShadow: '0 6px 20px -4px rgba(18,107,91,0.3)',
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Quote Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Quote Request</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Privacy Note */}
                <p className="text-xs text-[#556368] text-center max-w-lg mx-auto leading-relaxed pt-1">
                  Your information will only be used to respond to your inquiry. We respect your privacy and will not share your details unnecessarily.
                </p>
              </form>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
