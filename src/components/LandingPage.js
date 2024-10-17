import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaDumbbell, FaUsers, FaYinYang, FaCalendar, FaApple, FaHeartbeat, FaTimes, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles.css';
import SignUpForm from './SignUpForm';


const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [backgroundHue, setBackgroundHue] = useState(0);
  const [heroText, setHeroText] = useState('');
  const fullHeroText = "Transform Your Body, Transform Your Life";
  const controls = useAnimation();

  useEffect(() => {
    setIsVisible(true);
    controls.start('visible');

    

    // Animate hero text
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      if (currentIndex <= fullHeroText.length) {
        setHeroText(fullHeroText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(textInterval);
      }
    }, 100);

    return () => {

      clearInterval(textInterval);
    };
  }, [controls]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="landing-container">
      <header className="header">
        <h1 className="logo">Gyme</h1>
        <nav className="main-nav">
          <ul>
            <li><a href="#home" onClick={() => scrollToSection('home')} className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')} className={activeSection === 'about' ? 'active' : ''}>About</a></li>
            <li><a href="#services" onClick={() => scrollToSection('services')} className={activeSection === 'services' ? 'active' : ''}>Services</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')} className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button className="btn-primary" onClick={() => setShowSignUp(true)}>Sign Up</button>
        </div>
      </header>

      <motion.section
        id="home"
        className="hero-section"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ duration: 0.8 }}
        style={{
          background: `#4c4cf5`,
        }}
      >
        <div className="hero-content">
          <h2 id="Text-title">
            {heroText}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            >
              |
            </motion.span>
          </h2>
          <p>Join Gyme and start your journey to a healthier you.</p>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSignUp(true)}
          >
            Start Your Transformation
          </motion.button>
        </div>
      </motion.section>

      {/* Sign In Form */}
      {showSignIn && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowSignIn(false)}><FaTimes /></button>
            <h2>Sign In</h2>
            <form className="auth-form">
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button className="btn-primary" type="submit">Sign In</button>
            </form>
          </div>
        </div>
      )}

      {/* Sign Up Form */}
      {showSignUp && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowSignUp(false)}><FaTimes /></button>
            {showSignUp && (
  <div className="modal-overlay">
    <div className="modal">
      <button className="close-btn" onClick={() => setShowSignUp(false)}><FaTimes /></button>
      
      {/* Render the actual SignUpForm component here */}
      <SignUpForm onClose={() => setShowSignUp(false)} />
    </div>
  </div>
)}
          </div>
        </div>
      )}

      <motion.section
        id="about"
        className="about-section"
        initial="hidden"
        animate={controls}
        variants={fadeIn}
      >
        <h2>About Gyme</h2>
        <p>At Gyme, we believe in empowering individuals to achieve their fitness goals and lead healthier lives. Our state-of-the-art facilities, expert trainers, and supportive community create the perfect environment for your fitness journey.</p>
      </motion.section>

      <motion.section
        id="services"
        className="services-section"
        initial="hidden"
        animate={controls}
        variants={staggerChildren}
      >
        <h2>Our Premium Services</h2>
        <div className="services-grid">
          {[{
            icon: FaDumbbell, title: "Personal Training", description: "One-on-one sessions tailored to your goals"
          },
          {
            icon: FaUsers, title: "Group Classes", description: "High-energy workouts in a motivating group setting"
          },
          {
            icon: FaYinYang, title: "Yoga & Meditation", description: "Find your inner balance and peace"
          },
          {
            icon: FaCalendar, title: "Customized Plans", description: "Fitness plans designed for your unique needs"
          },
          {
            icon: FaApple, title: "Nutrition Coaching", description: "Expert advice for a balanced, healthy diet"
          },
          {
            icon: FaHeartbeat, title: "Health Monitoring", description: "Track your progress with advanced tech"
          }].map((service, index) => (
            <motion.div key={index} className="service-card" variants={fadeIn}>
              <service.icon />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="cta-section"
        initial="hidden"
        animate={controls}
        variants={fadeIn}
      >
        <h2>Ready to Transform?</h2>
        <p>Join Gyme today and start your journey to a healthier, stronger you.</p>
        <motion.button
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSignUp(true)}
        >
          Sign Up Now
        </motion.button>
      </motion.section>

      <motion.section
        id="contact"
        className="contact-section"
        initial="hidden"
        animate={controls}
        variants={fadeIn}
      >
        <h2>Contact Us</h2>
        <div className="contact-info">
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <p>Phone: +212 622-095278</p>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <p>Email: Gyme.Support@Info.com</p>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <p>Address: 123 Fitness St, Beni Mellal City, Morocco</p>
          </div>
        </div>
      </motion.section>

      {/* Advanced Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>About Gyme</h3>
            <p>Gyme is dedicated to providing high-quality fitness services to help you achieve your health goals. Join us and be part of a community that inspires each other every day.</p>
          </div>
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email: info@gyme.com</p>
            <p>Phone: +212 622-095278</p>
            <p>Address: 123 Fitness St, Beni Mellal City, Morocco</p>
          </div>
          <div className="footer-section social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Gyme. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;