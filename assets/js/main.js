// Supreme Immigration - Main JavaScript & Interactive Tools

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMobileMenu = document.getElementById('closeMobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });
  }
  if (closeMobileMenu && mobileMenu) {
    closeMobileMenu.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  // Consultation Modal Handlers
  const modal = document.getElementById('consultationModal');
  const modalTriggers = document.querySelectorAll('.open-consultation-modal');
  const closeModalBtns = document.querySelectorAll('.close-modal');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const country = btn.getAttribute('data-country') || 'Canada';
      const visaType = btn.getAttribute('data-visa') || 'Permanent Residency (PR)';
      
      const modalCountrySelect = document.getElementById('modalCountry');
      const modalVisaSelect = document.getElementById('modalVisaType');
      if (modalCountrySelect) modalCountrySelect.value = country;
      if (modalVisaSelect) modalVisaSelect.value = visaType;
      
      if (modal) modal.classList.remove('hidden');
    });
  });

  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) modal.classList.add('hidden');
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  }

  // Quick WhatsApp Direct Inquiry
  window.sendWhatsAppInquiry = function(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('heroName')?.value || 'Prospective Candidate';
    const phone = document.getElementById('heroPhone')?.value || '';
    const country = document.getElementById('heroCountry')?.value || 'Canada';
    const visa = document.getElementById('heroVisa')?.value || 'PR / Immigration';

    const message = `Hello Supreme Immigration Team,%0A%0AMy Name is ${encodeURIComponent(name)}.%0APhone: ${encodeURIComponent(phone)}%0AInterested Country: ${encodeURIComponent(country)}%0AVisa Category: ${encodeURIComponent(visa)}%0A%0AI would like to book a free profile evaluation at your Ahmedabad office (Iscon Emporio).`;
    window.open(`https://wa.me/919725009890?text=${message}`, '_blank');
  };

  // Modal Form Submission Handler
  const consultationForm = document.getElementById('consultationForm');
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalName').value;
      const phone = document.getElementById('modalPhone').value;
      const email = document.getElementById('modalEmail').value;
      const country = document.getElementById('modalCountry').value;
      const visaType = document.getElementById('modalVisaType').value;
      const notes = document.getElementById('modalNotes')?.value || 'None';

      const alertBox = document.getElementById('modalSuccessAlert');
      if (alertBox) {
        alertBox.classList.remove('hidden');
      }

      // WhatsApp redirection link
      const text = `*New Consultation Inquiry - Supreme Immigration*%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Email:* ${encodeURIComponent(email)}%0A*Target Country:* ${encodeURIComponent(country)}%0A*Visa:* ${encodeURIComponent(visaType)}%0A*Message:* ${encodeURIComponent(notes)}`;
      
      setTimeout(() => {
        window.open(`https://wa.me/919725009890?text=${text}`, '_blank');
      }, 1200);
    });
  }

  // General Contact Form
  const mainContactForm = document.getElementById('mainContactForm');
  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || 'Client';
      const phone = document.getElementById('contactPhone')?.value || '';
      const email = document.getElementById('contactEmail')?.value || '';
      const service = document.getElementById('contactService')?.value || 'General Consultation';
      const message = document.getElementById('contactMessage')?.value || '';

      const successBox = document.getElementById('contactSuccessMsg');
      if (successBox) successBox.classList.remove('hidden');

      const waMsg = `*Supreme Immigration Ahmedabad - Website Inquiry*%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Email:* ${encodeURIComponent(email)}%0A*Service:* ${encodeURIComponent(service)}%0A*Details:* ${encodeURIComponent(message)}`;
      setTimeout(() => {
        window.open(`https://wa.me/919725009890?text=${waMsg}`, '_blank');
      }, 1000);
    });
  }

  // FAQ Accordion
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector('.faq-icon');
      
      const isOpen = !content.classList.contains('hidden');
      
      // Close all others
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');
      
      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Country Tab Switcher (if on destinations section)
  const countryTabs = document.querySelectorAll('.country-tab-btn');
  const countryPanels = document.querySelectorAll('.country-detail-panel');

  if (countryTabs.length > 0) {
    countryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        countryTabs.forEach(t => {
          t.classList.remove('active', 'bg-blue-900', 'text-white');
          t.classList.add('bg-slate-100', 'text-slate-700');
        });
        tab.classList.remove('bg-slate-100', 'text-slate-700');
        tab.classList.add('active', 'bg-blue-900', 'text-white');

        const targetId = tab.getAttribute('data-target');
        countryPanels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.remove('hidden');
          } else {
            panel.classList.add('hidden');
          }
        });
      });
    });
  }

  // Interactive Canada & Australia CRS / Points Calculator Logic
  initPointsCalculator();
});

function initPointsCalculator() {
  const calcForm = document.getElementById('crsCalculatorForm');
  if (!calcForm) return;

  calcForm.addEventListener('change', calculateCRS);
  calcForm.addEventListener('input', calculateCRS);

  function calculateCRS() {
    const system = document.getElementById('calcSystem')?.value || 'canada';
    const age = parseInt(document.getElementById('calcAge')?.value || '28');
    const education = document.getElementById('calcEducation')?.value || 'masters';
    const experience = parseInt(document.getElementById('calcExperience')?.value || '3');
    const ieltsReading = parseFloat(document.getElementById('calcIeltsR')?.value || '7.0');
    const ieltsWriting = parseFloat(document.getElementById('calcIeltsW')?.value || '7.0');
    const ieltsListening = parseFloat(document.getElementById('calcIeltsL')?.value || '8.0');
    const ieltsSpeaking = parseFloat(document.getElementById('calcIeltsS')?.value || '7.0');
    const maritalStatus = document.getElementById('calcMarital')?.value || 'single';
    const hasJobOffer = document.getElementById('calcJobOffer')?.checked || false;

    let totalScore = 0;
    let verdict = '';
    let verdictColor = 'text-green-600';

    if (system === 'canada') {
      // Canada Express Entry CRS Approximation (Comprehensive Ranking System)
      // 1. Age Points
      let agePoints = 0;
      if (age >= 18 && age <= 19) agePoints = 90;
      else if (age >= 20 && age <= 29) agePoints = 110;
      else if (age === 30) agePoints = 105;
      else if (age === 31) agePoints = 99;
      else if (age === 32) agePoints = 94;
      else if (age === 33) agePoints = 88;
      else if (age === 34) agePoints = 83;
      else if (age === 35) agePoints = 77;
      else if (age >= 36 && age <= 40) agePoints = Math.max(0, 77 - (age - 35) * 11);
      else if (age >= 41 && age <= 44) agePoints = Math.max(0, 22 - (age - 40) * 5);
      else agePoints = 0;

      // 2. Education Points
      let eduPoints = 0;
      if (education === 'phd') eduPoints = 150;
      else if (education === 'masters') eduPoints = 135;
      else if (education === 'two_degrees') eduPoints = 128;
      else if (education === 'bachelors') eduPoints = 120;
      else if (education === 'diploma') eduPoints = 98;
      else eduPoints = 30;

      // 3. Language Points (CLB calculation)
      // CLB 9 requires L: 8.0, R: 7.0, W: 7.0, S: 7.0
      let clbPoints = 0;
      const getBandPoints = (score, isListening) => {
        if (isListening) {
          if (score >= 8.5) return 34; // CLB 10
          if (score >= 8.0) return 31; // CLB 9
          if (score >= 7.5) return 23; // CLB 8
          if (score >= 6.0) return 17; // CLB 7
          return 9;
        } else {
          if (score >= 8.0) return 34;
          if (score >= 7.0) return 31;
          if (score >= 6.5) return 23;
          if (score >= 6.0) return 17;
          return 9;
        }
      };

      clbPoints += getBandPoints(ieltsListening, true);
      clbPoints += getBandPoints(ieltsReading, false);
      clbPoints += getBandPoints(ieltsWriting, false);
      clbPoints += getBandPoints(ieltsSpeaking, false);

      // 4. Foreign Work Experience & Transferability Combinations
      let transferability = 0;
      const isCLB9Plus = (ieltsListening >= 8.0 && ieltsReading >= 7.0 && ieltsWriting >= 7.0 && ieltsSpeaking >= 7.0);
      
      // Edu + Language transferability
      if (education === 'masters' || education === 'two_degrees' || education === 'phd') {
        transferability += isCLB9Plus ? 50 : 25;
      } else if (education === 'bachelors') {
        transferability += isCLB9Plus ? 25 : 13;
      }

      // Foreign experience + Language
      if (experience >= 3) {
        transferability += isCLB9Plus ? 50 : 25;
      } else if (experience >= 1) {
        transferability += isCLB9Plus ? 25 : 13;
      }

      // 5. Job offer or PNP
      let additional = 0;
      if (hasJobOffer) additional += 50;

      totalScore = agePoints + eduPoints + clbPoints + transferability + additional;
      if (maritalStatus === 'married') totalScore = Math.round(totalScore * 0.95);

      if (totalScore >= 480) {
        verdict = 'Outstanding CRS Profile! High probability for Direct Express Entry ITA (Invitation to Apply).';
        verdictColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
      } else if (totalScore >= 430) {
        verdict = 'Competitive Profile! Excellent candidate for Express Entry Category-based draws (STEM, Healthcare, Trades) and Provincial Nominee Programs (OINP, SINP, Alberta, BC).';
        verdictColor = 'text-blue-800 bg-blue-50 border-blue-300';
      } else {
        verdict = 'Profile Eligible for Strategic PNP Pathways or Study-to-PR Bridge! Contact our MARA/RCIC consultants to boost your CRS score.';
        verdictColor = 'text-amber-800 bg-amber-50 border-amber-300';
      }

      document.getElementById('calcResultSystemName').innerText = 'Estimated Canada Express Entry CRS Score';
      document.getElementById('calcScoreDisplay').innerText = totalScore + ' / 1200';
      document.getElementById('calcVerdictText').className = `p-4 rounded-xl border text-sm font-medium ${verdictColor}`;
      document.getElementById('calcVerdictText').innerHTML = `<strong>Evaluation:</strong> ${verdict}`;
    } else {
      // Australia GSM Points Calculator (Subclass 189 / 190 / 491)
      let pts = 0;
      // Age
      if (age >= 18 && age <= 24) pts += 25;
      else if (age >= 25 && age <= 32) pts += 30;
      else if (age >= 33 && age <= 39) pts += 25;
      else if (age >= 40 && age <= 44) pts += 15;
      
      // Qualifications
      if (education === 'phd') pts += 20;
      else if (education === 'masters' || education === 'bachelors') pts += 15;
      else pts += 10;

      // English Language (Proficient = IELTS 7 each -> 10 pts, Superior = IELTS 8 each -> 20 pts)
      const minBand = Math.min(ieltsReading, ieltsWriting, ieltsListening, ieltsSpeaking);
      if (minBand >= 8.0) pts += 20;
      else if (minBand >= 7.0) pts += 10;
      else pts += 0;

      // Overseas Experience
      if (experience >= 8) pts += 15;
      else if (experience >= 5) pts += 10;
      else if (experience >= 3) pts += 5;

      // Marital / Partner
      if (maritalStatus === 'single') pts += 10;
      else pts += 5;

      totalScore = pts;

      if (totalScore >= 85) {
        verdict = 'Exceptional Australian GSM Profile! Direct invitation probability for Subclass 189 (Independent Skilled Visa).';
        verdictColor = 'text-emerald-700 bg-emerald-50 border-emerald-300';
      } else if (totalScore >= 65) {
        verdict = `Meets Australian PR Threshold (${totalScore} Points)! High nomination eligibility for State Nominated Subclass 190 (+5 pts) or Regional Subclass 491 (+15 pts).`;
        verdictColor = 'text-blue-800 bg-blue-50 border-blue-300';
      } else {
        verdict = `Current Score: ${totalScore} pts (Minimum 65 pts required). Our MARA registered experts can assist with NAATI CCL (+5 pts) and state sponsorship strategies.`;
        verdictColor = 'text-amber-800 bg-amber-50 border-amber-300';
      }

      document.getElementById('calcResultSystemName').innerText = 'Estimated Australia Skilled PR Points (189/190/491)';
      document.getElementById('calcScoreDisplay').innerText = totalScore + ' Points';
      document.getElementById('calcVerdictText').className = `p-4 rounded-xl border text-sm font-medium ${verdictColor}`;
      document.getElementById('calcVerdictText').innerHTML = `<strong>Australia GSM Verdict:</strong> ${verdict}`;
    }
  }

  // Initial run
  calculateCRS();
}
