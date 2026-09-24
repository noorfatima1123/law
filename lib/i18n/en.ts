import type { Dictionary } from "./types";

export const en: Dictionary = {
  site: {
    name: "Hamed Dehlawi & Saud Laradhi Company",
    nameShort: "Hamed Dehlawi & Saud Laradhi",
    tagline: "Trusted legal counsel in Saudi Arabia since 1991.",
    established: "Established 1991 · Jeddah, Saudi Arabia",
  },

  nav: {
    home: "Home",
    practiceAreas: "Practice Areas",
    foreignInvestors: "Foreign Investors",
    about: "About",
    faq: "FAQ",
    contact: "Contact",
    langSwitch: "عربي",
    menu: "Menu",
    skipToContent: "Skip to content",
  },

  home: {
    heroTagline: "Trusted legal counsel in Saudi Arabia since 1991.",
    heroExplore: "Explore Practice Areas",
    heroContact: "Contact Us",
    credentialEstablished: "Established 1991",
    credentialEstablishedLabel: "Jeddah, Saudi Arabia",
    credentialMember: "Member",
    credentialMemberLabel: "Saudi Bar Association",
    credentialBilingual: "Serving Arabic & English speaking clients",
    credentialVerified: "Verified",
    credentialVerifiedLabel: "on the SBA Directory",
    audienceTitle: "Which Best Describes You?",
    audienceSubtitle:
      "Choose your situation and we'll take you straight to the relevant areas of practice.",
    audienceIndividualTitle: "An Individual or Family",
    audienceIndividualDesc:
      "Personal status, inheritance, property, and civil disputes before the Sharia courts.",
    audienceBusinessTitle: "A Business",
    audienceBusinessDesc:
      "Company formation, contracts, commercial disputes, labor matters, HR compliance, and trademark protection.",
    audienceInvestorTitle: "A Foreign Investor",
    audienceInvestorDesc:
      "Market entry, business setup, licensing, contracts, real estate, and IP for businesses entering the Kingdom.",
    audienceCta: "See relevant areas",
    practiceTitle: "How We Can Help",
    practiceSubtitle:
      "Twelve areas of practice, handled by lawyers who take the time to understand your matter before advising on it.",
    practiceViewAll: "View All Practice Areas",
    practiceLearnMore: "Learn more",
    aboutTitle: "A Practice Built on Direct Relationships",
    aboutBody:
      "Established in Jeddah in 1991, Hamed Dehlawi & Saud Laradhi Company is a member of the Saudi Bar Association, serving Arabic- and English-speaking clients across the Kingdom for over three decades.",
    aboutCta: "Learn More About Us",
    stepsTitle: "How a Consultation Works",
    stepsSubtitle:
      "A straightforward process, from your first message to a clear plan of action.",
    step1Title: "Reach Out",
    step1Body:
      "Contact us by phone or email with a short description of your matter.",
    step2Title: "Initial Consultation",
    step2Body:
      "We review your situation in Arabic or English and give you an honest assessment.",
    step3Title: "Engagement & Action",
    step3Body:
      "Once engaged, we set out next steps and keep you informed at every stage.",
  },

  practiceAreas: {
    title: "Practice Areas",
    subtitle:
      "A full-service practice covering the matters most relevant to individuals, families, and businesses in Saudi Arabia.",
    filterAll: "All Areas",
    filterIndividuals: "Individuals & Families",
    filterBusiness: "Businesses",
    filterInvestors: "Foreign Investors",
    areas: [
      {
        slug: "legal-consultations",
        title: "Legal Consultations",
        desc: "We provide clear, practical legal advice to individuals, families, and businesses on matters governed by Saudi law and regulation. Every consultation is grounded in an honest assessment of your position before any course of action is recommended.",
        tags: ["individuals", "business"],
        icon: "consult",
      },
      {
        slug: "sharia-litigation",
        title: "Sharia Court Litigation",
        desc: "Our lawyers represent clients before the Sharia courts in personal status, inheritance, and civil disputes, preparing each case with careful attention to evidence and procedure.",
        tags: ["individuals"],
        icon: "scales",
      },
      {
        slug: "contracts",
        title: "Contract Drafting & Review",
        desc: "We draft and review commercial, employment, and personal contracts to make sure the terms you sign reflect your actual intentions and protect you if circumstances change.",
        tags: ["business", "investors"],
        icon: "contract",
      },
      {
        slug: "commercial",
        title: "Commercial Cases",
        desc: "We handle commercial disputes between companies, partners, and trading parties, from contract breaches to shareholder disagreements.",
        tags: ["business"],
        icon: "briefcase",
      },
      {
        slug: "labor",
        title: "Labor Cases",
        desc: "We advise and represent both employers and employees in disputes over termination, wages, end-of-service benefits, and workplace rights under Saudi labor law.",
        tags: ["business"],
        icon: "labor",
      },
      {
        slug: "execution",
        title: "Execution & Rights Recovery",
        desc: "When a judgment or a debt goes unpaid, we pursue enforcement through the Execution Court to recover what is rightfully owed to you.",
        tags: ["individuals", "business"],
        icon: "gavel",
      },
      {
        slug: "real-estate",
        title: "Real Estate Cases",
        desc: "We handle disputes and transactions involving property ownership, leasing, off-plan sales, and construction contracts.",
        tags: ["individuals", "investors"],
        icon: "realestate",
      },
      {
        slug: "trademarks",
        title: "Trademarks & IP",
        desc: "We register and protect trademarks, and advise on copyright and other intellectual property matters, so that the names and creative work behind your business remain yours.",
        tags: ["business", "investors"],
        icon: "trademark",
      },
      {
        slug: "settlements",
        title: "Settlements & Mediation",
        desc: "Not every dispute needs a courtroom. We negotiate settlements and act as mediators between parties who prefer a faster, less adversarial resolution.",
        tags: ["individuals", "business"],
        icon: "handshake",
      },
      {
        slug: "hr",
        title: "HR Services",
        desc: "We support businesses with the legal side of human resources: employment contracts, workplace policies, and compliance with Saudi labor regulations.",
        tags: ["business"],
        icon: "hr",
      },
      {
        slug: "foreign-investors",
        title: "Foreign Investor Services",
        desc: "We guide foreign investors and companies entering the Saudi market through licensing, contracts, and the legal formalities of doing business in the Kingdom.",
        tags: ["investors"],
        icon: "globe",
      },
      {
        slug: "formation",
        title: "Business Setup & Company Formation",
        desc: "We help new businesses get established in Saudi Arabia from the ground up: choosing the right legal structure, registering with the Ministry of Commerce, securing licenses, and drafting founding documents and bylaws.",
        tags: ["individuals", "business", "investors"],
        icon: "formation",
      },
    ],
  },

  about: {
    title: "About the Firm",
    subtitle: "Three decades of legal practice in Jeddah, Saudi Arabia.",
    historyTitle: "Our History",
    historyBody1:
      "Hamed Dehlawi & Saud Laradhi Company was established in 1991 in Jeddah, Saudi Arabia. For more than three decades, the firm has advised individuals, families, and businesses on matters of Saudi law, building a practice grounded in direct client relationships rather than volume.",
    historyBody2:
      "The firm is a member of the Saudi Bar Association, and its lawyers appear regularly before the Sharia courts, the Commercial Courts, the Labor Courts, and the Execution Court across the Kingdom.",
    historyBody3:
      "We work with clients who speak Arabic and clients who speak English in equal measure, and every matter is handled in the language our client is most comfortable in, from the first consultation to the final document.",
    statEstablished: "1991",
    statEstablishedLabel: "Year established",
    statYears: "30+",
    statYearsLabel: "Years of practice",
    statAreas: "12",
    statAreasLabel: "Practice areas",
    statLanguages: "2",
    statLanguagesLabel: "Working languages",
    trustMattersHandledLabel: "Matters handled",
    trustMattersHandledValue: "[TBD]",
    trustForeignInvestorShareLabel: "Foreign-investor matters",
    trustForeignInvestorShareValue: "[TBD]",
    trustTopIndustriesLabel: "Top industries served",
    trustTopIndustriesValue: "[TBD]",
    trustTopClientCountriesLabel: "Top client countries",
    trustTopClientCountriesValue: "[TBD]",
    trustResponseTimeLabel: "Typical response time",
    trustResponseTimeValue: "[TBD]",
    trustFreeConsultationLabel: "Free initial consultation",
    trustFreeConsultationValue: "[TBD]",
    trustAdditionalMembershipsLabel: "Additional memberships",
    trustAdditionalMembershipsValue: "[TBD]",
    trustAdditionalLanguagesLabel: "Additional languages",
    trustAdditionalLanguagesValue: "[TBD]",
    teamTitle: "Our Team",
    teamSubtitle: "The firm is led by its two founding partners.",
    teamEditorialLine1: "TRUSTED",
    teamEditorialLine2: "COUNSEL,",
    teamEditorialLine3: "DISTINGUISHED",
    teamEditorialLine4: "LEADERSHIP",
    teamHamed: "Hamed Dehlawi",
    teamHamedRole: "Founding Partner",
    teamSaud: "Saud Laradhi",
    teamSaudRole: "Founding Partner",
    teamMembers: [
      {
        slug: "hamed-dehlawi",
        name: "Hamed Dehlawi",
        role: "Founding Partner",
        avatar: "/images/avatars/avatar-1.png",
        bio: "Hamed Dehlawi co-founded the firm in 1991 and has led its practice for over three decades. He advises individuals, families, and businesses on a broad range of Saudi legal matters, with particular depth in Sharia court litigation and commercial disputes.",
        focus: [
          "Sharia Court Litigation",
          "Commercial Disputes",
          "Legal Consultations",
          "Saudi Bar Association member",
        ],
        education: [
          "Bachelor of Laws (LL.B.) — King Abdulaziz University",
          "Admitted to the Saudi Bar Association",
        ],
        languages: ["Arabic (native)", "English (professional)"],
        memberships: [
          "Saudi Bar Association — Registered Member",
          "SBA Directory No. 9908",
        ],
        email: "hdehlawi@gmail.com",
        phone: "+966 50 560 3354",
      },
      {
        slug: "saud-laradhi",
        name: "Saud Laradhi",
        role: "Founding Partner",
        avatar: "/images/avatars/avatar-2.png",
        bio: "Saud Laradhi co-founded the firm in 1991 and oversees its contract, real estate, and foreign investor practice areas. He has advised clients on market entry into the Kingdom and on complex commercial transactions across multiple sectors.",
        focus: [
          "Contract Drafting & Review",
          "Real Estate Cases",
          "Foreign Investor Services",
          "Business Setup & Company Formation",
        ],
        education: [
          "Bachelor of Laws (LL.B.) — King Saud University",
          "Admitted to the Saudi Bar Association",
        ],
        languages: ["Arabic (native)", "English (professional)"],
        memberships: [
          "Saudi Bar Association — Registered Member",
          "SBA Directory No. 9908",
        ],
        email: "hdehlawi@gmail.com",
        phone: "+966 50 560 3354",
      },
    ],
    detailFocusLabel: "Practice Focus",
    detailEducationLabel: "Education & Admissions",
    detailLanguagesLabel: "Languages",
    detailMembershipsLabel: "Professional Memberships",
    detailContactLabel: "Contact",
    detailBackLabel: "Back to About",
    detailCtaTitle: "Work With Us",
    detailCtaBody:
      "Reach out to discuss your matter with the right partner on our team.",
    detailCtaButton: "Request a Consultation",
  },

  contact: {
    title: "Contact Us",
    subtitle:
      "We are based in Jeddah and welcome consultations in Arabic or English.",
    officeTitle: "Jeddah Office",
    officeAddress:
      "Building No. 3243, Al-Muaadi Street, Ar Ruwais District, Jeddah 23211, Saudi Arabia",
    phoneTitle: "Phone",
    phoneValue: "+966 50 560 3354",
    emailTitle: "Email",
    emailValue: "hdehlawi@gmail.com",
    hoursTitle: "Office Hours",
    hoursValue: "Sunday – Thursday, 9:00 AM – 5:00 PM",
    note: "Contact details above are drawn from the firm's registration with the Saudi Bar Association. To reach us directly, please use the phone number or email above, or tap \"Call the Firm\" below.",
    mapLocation: "Ar Ruwais District, Jeddah",
    mapCta: "Get Directions",
  },

  faq: {
    title: "Frequently Asked Questions",
    subtitle:
      "Answers to the questions clients ask most, organized by category.",
    filterAll: "All Questions",
    filterGeneral: "General",
    filterForeign: "Foreign Clients",
    filterServices: "Legal Services",
    filterTrust: "Trust & Verification",
    categories: {
      general: "General",
      foreign: "Foreign Clients",
      services: "Legal Services",
      trust: "Trust & Verification",
    },
    items: [
      {
        category: "general",
        q: "What types of legal matters do you handle?",
        a: "Legal consultations, Sharia court litigation, contract drafting and review, commercial and labor cases, real estate, trademarks and IP, settlements and mediation, HR services, and foreign investor services.",
      },
      {
        category: "general",
        q: "Do you provide consultations in English?",
        a: "Yes. We serve Arabic- and English-speaking clients in equal measure, and every matter is handled in the language you are most comfortable in.",
      },
      {
        category: "foreign",
        q: "Can I establish a business without a Saudi partner?",
        a: "Whether a local partner is required depends on your specific business activity and current MISA regulations. We confirm this for your case.",
      },
      {
        category: "foreign",
        q: "Can consultations be conducted remotely?",
        a: "Initial consultations can often be arranged remotely, though company formation itself requires a physical office presence and a GM Iqama.",
      },
      {
        category: "foreign",
        q: "Can you assist with company formation and licensing?",
        a: "Yes — see our Foreign Investors page for details on the process.",
      },
      {
        category: "services",
        q: "What happens during the initial consultation?",
        a: "We review your situation in Arabic or English and give you an honest assessment before recommending next steps.",
      },
      {
        category: "services",
        q: "Do you provide contract review and drafting?",
        a: "Yes, for commercial, employment, and personal contracts.",
      },
      {
        category: "services",
        q: "Do you handle labor and employment matters?",
        a: "Yes, we advise and represent both employers and employees in disputes over termination, wages, and workplace rights.",
      },
      {
        category: "trust",
        q: "How can I verify your lawyers?",
        a: "All our lawyers are registered members of the Saudi Bar Association and can be verified through Najiz, the Ministry of Justice's official platform.",
      },
      {
        category: "trust",
        q: "Where can I verify your firm's professional credentials?",
        a: "Our firm's profile is listed on the Saudi Bar Association directory.",
      },
    ],
  },

  foreignInvestors: {
    title: "Legal Support for Foreign Investors",
    subtitle:
      "Arabic legal proceedings. English explanations. Guidance through market entry, licensing, and company formation in Saudi Arabia.",
    qas: [
      {
        q: "Do I need a Saudi partner?",
        a: "Whether a local partner is required depends on the specific business activity and applicable regulations. We assess your case and confirm your options under current MISA rules.",
        icon: "globe",
      },
      {
        q: "Can I operate remotely?",
        a: "Saudi regulations require a physical office presence and an Iqama for the General Manager. We guide you through which steps require local presence and which can be handled remotely.",
        icon: "formation",
      },
      {
        q: "How long does formation take?",
        a: "Timelines vary by sector and licensing requirements. After reviewing your activity, we give you a realistic, firm-specific estimate rather than a generic figure.",
        icon: "clock",
      },
      {
        q: "How do I verify my lawyer?",
        a: "All our lawyers are registered members of the Saudi Bar Association and can be verified through Najiz, the Ministry of Justice's official platform.",
        icon: "scale-small",
      },
      {
        q: "What licenses will I need?",
        a: "Requirements depend on your sector and planned activity. We provide a personalized licensing checklist once we understand your business.",
        icon: "contract",
      },
      {
        q: "Do you work in English?",
        a: "Yes. Our team serves both Arabic and English-speaking clients throughout the process, from initial consultation to final documentation.",
        icon: "consult",
      },
    ],
    ctaTitle: "Start Your Application",
    ctaBody:
      "Tell us about your planned activity and we will confirm ownership rules, licensing steps, and a realistic timeline for your case.",
    ctaButton: "Request a Consultation",
  },

  footer: {
    quickLinks: "Quick Links",
    office: "Office",
    officeAddress:
      "Building No. 3243, Al-Muaadi Street, Ar Ruwais District, Jeddah 23211, Saudi Arabia",
    rights: "All rights reserved.",
    verifiedSba: "Verified SBA Directory Profile",
    established:
      "Established in Jeddah in 1991. Member of the Saudi Bar Association.",
  },

  stickyCall: "Call the Firm",

  shared: {
    learnMore: "Learn more",
    callTheFirm: "Call the Firm",
  },
};