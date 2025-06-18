'use client';
import React, { useRef, useState, useEffect } from "react";
import { SignIn } from "@clerk/nextjs";
import Footer from '../components/Footer'; // Import your Footer component


export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const howToApplyRef = useRef<HTMLDivElement>(null);

  // Detect scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to How to Apply section
  const scrollToHowToApply = () => {
    howToApplyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex flex-col">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">eM</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">eMediCard</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-transparent flex-1">
        <div className="max-w-7xl gap-x-16 mx-auto px-6 flex flex-col lg:flex-row items-center min-h-[70vh]">
          <div className="flex-1 flex-col justify-center items-start mb-10 lg:mb-0">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Your Health Card,<br />
              <span className="text-emerald-600">Digitized</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A mobile health card system that puts your care in your pocket.
            </p>
            <div className="flex gap-4">
              <button
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700"
                onClick={scrollToHowToApply}
              >
                Get Started
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end w-full">
            <img
              src="/images/human_mobile-application_uc2q.svg"
              alt="App Illustration"
              className="max-w-md w-full h-96"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* Spacer for scroll */}
      <section
        ref={howToApplyRef}
        className="pt-32 md:pt-3 bg-white"
        style={{ scrollMarginTop: '100px' }}
      ></section>

      {/* How to Apply */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Apply</h2>
          <p className="text-xl text-gray-600 mb-12">Simple steps to get your digital health card</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ['Download App', 'Get the eMediCard app from the store', '1'],
              ['Complete Registration', 'Fill out your personal and health info', '2'],
              ['Get Verified', 'Verify your identity and activate your card', '3'],
            ].map(([title, desc, num]) => (
              <div key={num} className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-lg">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">{num}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clerk Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-8 shadow-xl relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            <SignIn
              routing="hash"
              afterSignInUrl="/dashboard"
              afterSignUpUrl="/dashboard"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
