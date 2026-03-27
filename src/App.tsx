/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Droplets, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Instagram, 
  Facebook, 
  Twitter,
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'about' | 'services' | 'contact';

interface Tip {
  id: number;
  title: string;
  content: string;
  icon: React.ReactNode;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
}

// --- Data ---
const TIPS: Tip[] = [
  {
    id: 1,
    title: "Stay Hydrated",
    content: "Drinking enough water is the first step to glowing skin. Aim for at least 8 glasses a day.",
    icon: <Droplets className="w-6 h-6 text-blue-400" />
  },
  {
    id: 2,
    title: "Sun Protection",
    content: "Always wear SPF 30 or higher, even on cloudy days, to prevent premature aging.",
    icon: <ShieldCheck className="w-6 h-6 text-orange-400" />
  },
  {
    id: 3,
    title: "Gentle Cleansing",
    content: "Avoid harsh soaps. Use a gentle cleanser that matches your skin type twice daily.",
    icon: <Sparkles className="w-6 h-6 text-purple-400" />
  },
  {
    id: 4,
    title: "Consistent Routine",
    content: "Skincare is a marathon, not a sprint. Stick to your routine for at least 4-6 weeks to see results.",
    icon: <Heart className="w-6 h-6 text-red-400" />
  }
];

const SERVICES: Service[] = [
  { id: 1, name: "Deep Pore Cleansing", description: "A thorough facial that removes impurities and balances your skin.", price: "$85" },
  { id: 2, name: "Hydrating Facial", description: "Intense moisture treatment for dry or dehydrated skin types.", price: "$95" },
  { id: 3, name: "Anti-Aging Therapy", description: "Advanced treatment targeting fine lines and skin elasticity.", price: "$120" },
  { id: 4, name: "Chemical Peel", description: "Professional exfoliation for a brighter and smoother complexion.", price: "$110" }
];

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = (page: Page) => {
    setActivePage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2d2d2d] font-sans selection:bg-[#e8d5c4] selection:text-[#2d2d2d]">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={() => navigate('home')}
            className="text-2xl font-serif italic font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            Glow <span className="font-sans font-light text-sm uppercase tracking-widest ml-1 opacity-60">Skin Care</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {(['home', 'about', 'services', 'contact'] as Page[]).map((page) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-[#c4a484] ${activePage === page ? 'text-[#c4a484]' : 'text-[#2d2d2d]/70'}`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {(['home', 'about', 'services', 'contact'] as Page[]).map((page) => (
              <button
                key={page}
                onClick={() => navigate(page)}
                className={`text-2xl font-serif italic ${activePage === page ? 'text-[#c4a484]' : 'text-[#2d2d2d]'}`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {activePage === 'home' && <HomeSection key="home" navigate={navigate} />}
          {activePage === 'about' && <AboutSection key="about" />}
          {activePage === 'services' && <ServicesSection key="services" />}
          {activePage === 'contact' && <ContactSection key="contact" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif italic">Glow</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Dedicated to revealing your natural radiance through science-backed skincare and holistic wellness.
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
              <Facebook className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
              <Twitter className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6 opacity-40">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => navigate('home')} className="hover:text-[#c4a484] transition-colors">Home</button></li>
              <li><button onClick={() => navigate('about')} className="hover:text-[#c4a484] transition-colors">About Us</button></li>
              <li><button onClick={() => navigate('services')} className="hover:text-[#c4a484] transition-colors">Services</button></li>
              <li><button onClick={() => navigate('contact')} className="hover:text-[#c4a484] transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6 opacity-40">Contact</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li className="flex items-center space-x-3"><MapPin className="w-4 h-4" /> <span>123 Radiance Blvd, Skin City</span></li>
              <li className="flex items-center space-x-3"><Phone className="w-4 h-4" /> <span>+1 (555) 012-3456</span></li>
              <li className="flex items-center space-x-3"><Mail className="w-4 h-4" /> <span>hello@glowskincare.com</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-6 opacity-40">Newsletter</h4>
            <p className="text-sm text-white/60 mb-4">Join for exclusive tips and offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/10 border-none px-4 py-2 text-sm w-full focus:ring-1 focus:ring-[#c4a484] outline-none"
              />
              <button className="bg-[#c4a484] px-4 py-2 hover:bg-[#b39373] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Glow Skin Care. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

// --- Section Components ---

function HomeSection({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-32"
    >
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=2000" 
            alt="Skincare background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f6] via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl space-y-8"
          >
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-[#c4a484]">Est. 2024</span>
            <h1 className="text-6xl md:text-8xl font-serif italic leading-[1.1] tracking-tight">
              Reveal Your <br />
              <span className="text-[#c4a484]">Natural</span> Radiance
            </h1>
            <p className="text-lg text-[#2d2d2d]/70 leading-relaxed max-w-lg">
              Experience the perfect blend of botanical wisdom and modern dermatology. Your journey to healthier, glowing skin starts here.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => navigate('services')}
                className="bg-[#2d2d2d] text-white px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-[#404040] transition-all transform hover:-translate-y-1"
              >
                Explore Services
              </button>
              <button 
                onClick={() => navigate('about')}
                className="border border-[#2d2d2d] text-[#2d2d2d] px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-[#2d2d2d] hover:text-white transition-all transform hover:-translate-y-1"
              >
                Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skincare Tips Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl font-serif italic">Expert Skincare Tips</h2>
          <p className="text-[#2d2d2d]/60 max-w-xl mx-auto">Small habits lead to big changes. Here are our top recommendations for maintaining a healthy glow.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TIPS.map((tip, idx) => (
            <motion.div
              key={tip.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-[#f0eee9] hover:shadow-md transition-shadow group"
            >
              <div className="mb-6 p-3 bg-[#faf9f6] inline-block rounded-xl group-hover:scale-110 transition-transform">
                {tip.icon}
              </div>
              <h3 className="text-xl font-serif italic mb-4">{tip.title}</h3>
              <p className="text-sm text-[#2d2d2d]/70 leading-relaxed">{tip.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Product/Visual Section */}
      <section className="bg-[#e8d5c4]/30 py-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#c4a484]/20 rounded-full blur-3xl" />
            <img 
              src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1000" 
              alt="Skincare products" 
              className="rounded-3xl shadow-2xl relative z-10"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="text-5xl font-serif italic leading-tight">Pure Ingredients, <br />Proven Results</h2>
            <p className="text-[#2d2d2d]/70 leading-relaxed">
              We believe in transparency. Every product we use and recommend is free from parabens, sulfates, and artificial fragrances. We source only the highest quality organic botanicals.
            </p>
            <ul className="space-y-4">
              {['100% Organic Extracts', 'Cruelty-Free Testing', 'Dermatologist Approved', 'Sustainable Packaging'].map((item) => (
                <li key={item} className="flex items-center space-x-3 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#c4a484]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-6 py-20 space-y-20"
    >
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-serif italic">Our Story</h1>
        <p className="text-xl text-[#2d2d2d]/60 italic font-serif">"Beauty begins the moment you decide to be yourself."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <img 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
          alt="Our Team" 
          className="rounded-2xl shadow-lg"
          referrerPolicy="no-referrer"
        />
        <div className="space-y-6">
          <h2 className="text-3xl font-serif italic">Rooted in Science, Inspired by Nature</h2>
          <p className="text-[#2d2d2d]/70 leading-relaxed">
            Founded in 2024, Glow Skin Care was born out of a desire to simplify skincare. In a world of complex routines and harsh chemicals, we wanted to return to what truly works: pure ingredients and consistent care.
          </p>
          <p className="text-[#2d2d2d]/70 leading-relaxed">
            Our team of licensed estheticians and dermatological consultants work together to curate treatments that don't just mask issues, but heal your skin from within.
          </p>
        </div>
      </div>

      <div className="bg-white p-12 rounded-3xl border border-[#f0eee9] text-center space-y-8">
        <h3 className="text-2xl font-serif italic">Our Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Integrity</h4>
            <p className="text-sm text-[#2d2d2d]/60">We only recommend what your skin truly needs.</p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Innovation</h4>
            <p className="text-sm text-[#2d2d2d]/60">Constantly evolving with the latest skin science.</p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-2">Kindness</h4>
            <p className="text-sm text-[#2d2d2d]/60">Kind to your skin, kind to the planet.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServicesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-6 py-20"
    >
      <div className="text-center space-y-4 mb-20">
        <h1 className="text-6xl font-serif italic">Our Services</h1>
        <p className="text-[#2d2d2d]/60 max-w-xl mx-auto">Tailored treatments designed for your unique skin profile. Every session includes a professional consultation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES.map((service) => (
          <div key={service.id} className="bg-white p-10 rounded-3xl border border-[#f0eee9] flex justify-between items-start group hover:border-[#c4a484] transition-colors">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif italic">{service.name}</h3>
              <p className="text-[#2d2d2d]/60 max-w-sm">{service.description}</p>
              <button className="text-xs uppercase tracking-widest font-bold text-[#c4a484] flex items-center space-x-2 group-hover:translate-x-2 transition-transform">
                <span>Book Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <span className="text-2xl font-serif italic text-[#c4a484]">{service.price}</span>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-[#2d2d2d] text-white p-16 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="space-y-4">
          <h2 className="text-4xl font-serif italic">Custom Skin Consultation</h2>
          <p className="text-white/60 max-w-md">Not sure what your skin needs? Book a 30-minute deep analysis with our lead esthetician.</p>
        </div>
        <button className="bg-white text-[#2d2d2d] px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-[#e8d5c4] transition-colors whitespace-nowrap">
          Schedule Analysis — $45
        </button>
      </div>
    </motion.div>
  );
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-6 py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-6">
            <h1 className="text-6xl font-serif italic leading-tight">Get in <span className="text-[#c4a484]">Touch</span></h1>
            <p className="text-[#2d2d2d]/70 leading-relaxed text-lg">
              Have questions about our treatments or products? We're here to help you on your journey to better skin.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-[#e8d5c4]/30 rounded-2xl">
                <MapPin className="w-6 h-6 text-[#c4a484]" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Visit Us</h4>
                <p className="text-[#2d2d2d]/60">123 Radiance Blvd, Skin City, SC 90210</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-[#e8d5c4]/30 rounded-2xl">
                <Phone className="w-6 h-6 text-[#c4a484]" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Call Us</h4>
                <p className="text-[#2d2d2d]/60">+1 (555) 012-3456</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="p-4 bg-[#e8d5c4]/30 rounded-2xl">
                <Mail className="w-6 h-6 text-[#c4a484]" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Email Us</h4>
                <p className="text-[#2d2d2d]/60">hello@glowskincare.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 rounded-3xl shadow-sm border border-[#f0eee9]">
          {submitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="w-20 h-20 bg-[#e8d5c4]/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-[#c4a484]" />
              </div>
              <h3 className="text-3xl font-serif italic">Message Sent!</h3>
              <p className="text-[#2d2d2d]/60">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs uppercase tracking-widest font-bold text-[#c4a484] hover:underline"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-40">Full Name</label>
                  <input required type="text" className="w-full bg-[#faf9f6] border-none px-4 py-4 rounded-xl focus:ring-1 focus:ring-[#c4a484] outline-none" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-40">Email Address</label>
                  <input required type="email" className="w-full bg-[#faf9f6] border-none px-4 py-4 rounded-xl focus:ring-1 focus:ring-[#c4a484] outline-none" placeholder="jane@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold opacity-40">Subject</label>
                <select className="w-full bg-[#faf9f6] border-none px-4 py-4 rounded-xl focus:ring-1 focus:ring-[#c4a484] outline-none appearance-none">
                  <option>General Inquiry</option>
                  <option>Booking a Service</option>
                  <option>Product Question</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold opacity-40">Message</label>
                <textarea required rows={5} className="w-full bg-[#faf9f6] border-none px-4 py-4 rounded-xl focus:ring-1 focus:ring-[#c4a484] outline-none resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#2d2d2d] text-white py-5 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-[#404040] transition-all transform hover:-translate-y-1">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
