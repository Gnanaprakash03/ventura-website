"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import SocialMedia from '../social/page';
import { FaEnvelope, FaPhoneAlt, FaCheck } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// ✅ Cloudflare Turnstile — SSR disabled (required)
const Turnstile = dynamic(() => import('react-turnstile'), { ssr: false });

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeInUp: Variants = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

const floatingIcon: Variants = {
  animate: {
    y: [0, -5, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
};

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ContactUsData {
  address: string;
  phone: string;
  email: string;
}

// ─── Helper: safe JSON parse from fetch response ───────────────────────────────
// Prevents the "Unexpected token '<'" crash when the server returns HTML

async function safeJson(res: Response): Promise<any> {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    console.error("Non-JSON response from API:", text.slice(0, 200));
    return { error: "Unexpected server response. Please try again." };
  }
}

// ─── Form Component ────────────────────────────────────────────────────────────

export function ContactUsFormWithReCaptcha({
  contactUsData,
}: {
  contactUsData: ContactUsData | null;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');
  const [otherInterest, setOtherInterest] = useState('');
  const [showOtherField, setShowOtherField] = useState(false);

  // ✅ Cloudflare Turnstile token
  const [cfToken, setCfToken] = useState<string | null>(null);

  // ✅ Phone validation
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const availableInterests = [
    {
      name: 'FIDAS Software',
      tag: 'software',
      description: 'Our flagship fabric inspection and data analysis solution',
    },
    {
      name: 'Hardware Solutions',
      tag: 'hardware',
      description: 'Cutting-edge hardware for fabric inspection systems',
    },
    {
      name: 'Technical Support',
      tag: 'support',
      description: '24/7 technical assistance and customer support',
    },
    {
      name: 'Business Inquiry',
      tag: 'business',
      description: 'Partnership opportunities and business collaboration',
    },
    {
      name: 'Partnership',
      tag: 'partnership',
      description: 'Strategic alliances and integration possibilities',
    },
    {
      name: 'Product Demo',
      tag: 'demo',
      description: 'Live demonstration of our products and solutions',
    },
    {
      name: 'Others',
      tag: 'others',
      description: 'Custom requirements or specific inquiries',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      // 🧠 Honeypot — stop bots immediately
      if ((e.target as any)._gotcha?.value) {
        setIsSubmitting(false);
        return;
      }

      // ✅ Phone length check
      if (phoneError) {
        setSubmitError('Please enter a valid phone number.');
        setIsSubmitting(false);
        return;
      }

      // ✅ Cloudflare Turnstile check
      if (!cfToken) {
        setSubmitError('Please verify you are not a bot.');
        setIsSubmitting(false);
        return;
      }

      const formData = {
        firstName,
        workEmail,
        phoneNumber,
        jobTitle,
        companyName,
        message,
        interests: selectedInterest,
        ...(selectedInterest === 'others' && { otherInterest }),
        cfToken,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // ✅ Safe parse — never crashes on HTML error pages
      const result = await safeJson(response);

      if (response.ok) {
        setIsSubmitted(true);
        setFirstName('');
        setWorkEmail('');
        setPhoneNumber('');
        setJobTitle('');
        setCompanyName('');
        setMessage('');
        setSelectedInterest('');
        setOtherInterest('');
        setCfToken(null);
        setPhoneError(null);
      } else {
        console.error('API Error:', result);
        setSubmitError(result?.error || 'Failed to submit form. Please try again.');
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      setSubmitError(error?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-clear success state after 5 seconds
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => setIsSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <form
      className="space-y-6 sm:space-y-8 w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8"
      onSubmit={handleSubmit}
    >
      {/* Honeypot */}
      <input
        type="text"
        name="_gotcha"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Interested In */}
      <div>
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Interested In <span className="text-red-600">*</span>
        </label>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <select
            value={selectedInterest}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedInterest(value);
              setShowOtherField(value === 'others');
            }}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 text-sm sm:text-base"
          >
            <option value="">Select an option</option>
            {availableInterests.map((interest) => (
              <option key={interest.tag} value={interest.tag}>
                {interest.name}
              </option>
            ))}
          </select>
        </motion.div>

        {selectedInterest && (
          <motion.p
            key={selectedInterest}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs sm:text-sm text-gray-500"
          >
            {availableInterests.find((i) => i.tag === selectedInterest)?.description}
          </motion.p>
        )}

        {showOtherField && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3"
          >
            <input
              type="text"
              placeholder="Please specify your interest"
              value={otherInterest}
              onChange={(e) => setOtherInterest(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 text-sm sm:text-base"
            />
          </motion.div>
        )}
      </div>

      {/* Name */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
        >
          Name <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 text-sm sm:text-base"
          required
        />
      </div>

      {/* Work Email */}
      <div>
        <label
          htmlFor="workEmail"
          className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
        >
          Work Email <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          id="workEmail"
          value={workEmail}
          onChange={(e) => setWorkEmail(e.target.value)}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 text-sm sm:text-base"
          required
        />
      </div>

      {/* Phone Number — react-phone-input-2 */}
      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
        >
          Phone Number <span className="text-red-600">*</span>
        </label>
        <PhoneInput
          country={'in'}
          value={phoneNumber}
          onChange={(phone, country: any) => {
            setPhoneNumber(phone);
            // format looks like "+.. .........." — count ALL dots = total expected digits
            const expectedLength = country?.format?.replace(/[^.]/g, '').length ?? 10;
            if (phone.length > 0 && phone.length < expectedLength) {
              setPhoneError(`Enter a valid ${country?.name ?? ''} number.`);
            } else {
              setPhoneError(null);
            }
          }}
          inputProps={{ id: 'phoneNumber', required: true }}
          containerClass="!w-full"
          inputClass={`!w-full !py-2.5 sm:!py-3 !rounded-lg !border-2 !text-sm sm:!text-base focus:!border-blue-500 ${
            phoneError ? '!border-red-400' : '!border-gray-300'
          }`}
          buttonClass="!border-2 !border-gray-300 !rounded-l-lg"
        />
        {phoneError && (
          <p className="mt-1 text-xs text-red-500">{phoneError}</p>
        )}
      </div>

      {/* Job Title + Company Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label
            htmlFor="jobTitle"
            className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
          >
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 text-sm sm:text-base"
          />
        </div>
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
          >
            Company Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 text-sm sm:text-base"
            required
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm sm:text-base font-medium text-gray-700 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300 text-sm sm:text-base"
        />
      </div>

      {/* ✅ Cloudflare Turnstile */}
      <Turnstile
        sitekey={process.env.NEXT_PUBLIC_CF_SITE_KEY!}
        onVerify={(token) => setCfToken(token)}
      />

      {/* Error Message */}
      {submitError && (
        <div className="text-red-600 text-sm sm:text-base">{submitError}</div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className={`w-full px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-base sm:text-lg font-semibold transition-colors duration-300 flex items-center justify-center
          ${
            isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : isSubmitted
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        whileHover={!isSubmitting && !isSubmitted ? { scale: 1.05 } : {}}
        whileTap={!isSubmitting && !isSubmitted ? { scale: 0.95 } : {}}
      >
        {isSubmitting ? (
          'Sending...'
        ) : isSubmitted ? (
          <>
            <FaCheck className="mr-2" />
            Message Sent!
          </>
        ) : (
          'Send Message'
        )}
      </motion.button>
    </form>
  );
}

// ─── Page Wrapper ──────────────────────────────────────────────────────────────

export function ContactUsClient({
  contactUsData,
}: {
  contactUsData: ContactUsData | null;
}) {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt- pb-8">

        {/* Heading */}
        <div className="relative md:sticky z-30 top-[4.3rem] py-4 mb-12 overflow-hidden bg-white">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Contact Us
          </motion.h1>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{
              x: ['-200%', '200%'],
              transition: { repeat: Infinity, duration: 10, ease: 'linear' },
            }}
          />
        </div>

        {/* Grid */}
        <motion.div
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Form Card */}
          <motion.div
            variants={fadeInUp}
            className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-10 rounded-2xl border border-gray-200 shadow-xl"
          >
            <h2 className="text-3xl font-semibold mb-8 text-blue-600">Get in Touch</h2>
            <ContactUsFormWithReCaptcha contactUsData={contactUsData} />
          </motion.div>

          {/* Info Card */}
          <motion.div>
            <motion.div
              variants={fadeInUp}
              className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-10 rounded-2xl border border-gray-200 shadow-xl h-fit"
            >
              <h2 className="text-3xl font-semibold mb-8 text-blue-600">Contact Information</h2>
              <div className="space-y-6">
                {contactUsData?.phone && (
                  <div className="flex items-center">
                    <motion.div variants={floatingIcon} animate="animate">
                      <FaPhoneAlt className="text-blue-600 mr-4 text-2xl" />
                    </motion.div>
                    <p className="text-lg">
                      <strong>Phone:</strong> {contactUsData.phone}
                    </p>
                  </div>
                )}
                {contactUsData?.email && (
                  <div className="flex items-center">
                    <motion.div variants={floatingIcon} animate="animate">
                      <FaEnvelope className="text-blue-600 mr-4 text-2xl" />
                    </motion.div>
                    <p className="text-lg">
                      <strong>Email:</strong> {contactUsData.email}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div className="w-full bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800 min-h-screen">
              <SocialMedia />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}