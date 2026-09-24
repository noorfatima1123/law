/* ============================================================
   Dictionary shape — English and Arabic must both satisfy this.
   If a key is missing in either, TypeScript will complain.
   ============================================================ */

export type Locale = "en" | "ar";

/* ----------------------------------------------------------
   Team member detail (used by /team/[slug] pages)
   ---------------------------------------------------------- */
export interface TeamMemberDetail {
  slug: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  focus: string[];
  education: string[];
  languages: string[];
  memberships: string[];
  email: string;
  phone: string;
}

/* ----------------------------------------------------------
   Main dictionary shape
   ---------------------------------------------------------- */
export interface Dictionary {
  /* ----------------------------------------------------------
     Site-wide
     ---------------------------------------------------------- */
  site: {
    name: string;
    nameShort: string;
    tagline: string;
    established: string;
  };

  /* ----------------------------------------------------------
     Navigation
     ---------------------------------------------------------- */
  nav: {
    home: string;
    practiceAreas: string;
    foreignInvestors: string;
    about: string;
    faq: string;
    contact: string;
    langSwitch: string;
    menu: string;
    skipToContent: string;
  };

  /* ----------------------------------------------------------
     Home page
     ---------------------------------------------------------- */
  home: {
    heroTagline: string;
    heroExplore: string;
    heroContact: string;
    credentialEstablished: string;
    credentialEstablishedLabel: string;
    credentialMember: string;
    credentialMemberLabel: string;
    credentialBilingual: string;
    credentialVerified: string;
    credentialVerifiedLabel: string;
    audienceTitle: string;
    audienceSubtitle: string;
    audienceIndividualTitle: string;
    audienceIndividualDesc: string;
    audienceBusinessTitle: string;
    audienceBusinessDesc: string;
    audienceInvestorTitle: string;
    audienceInvestorDesc: string;
    audienceCta: string;
    practiceTitle: string;
    practiceSubtitle: string;
    practiceViewAll: string;
    practiceLearnMore: string;
    aboutTitle: string;
    aboutBody: string;
    aboutCta: string;
    stepsTitle: string;
    stepsSubtitle: string;
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step3Body: string;
  };

  /* ----------------------------------------------------------
     Practice Areas page
     ---------------------------------------------------------- */
  practiceAreas: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterIndividuals: string;
    filterBusiness: string;
    filterInvestors: string;
    areas: Array<{
      slug: string;
      title: string;
      desc: string;
      tags: string[];
      icon: string;
    }>;
  };

  /* ----------------------------------------------------------
     About page
     ---------------------------------------------------------- */
  about: {
    title: string;
    subtitle: string;
    historyTitle: string;
    historyBody1: string;
    historyBody2: string;
    historyBody3: string;
    statEstablished: string;
    statEstablishedLabel: string;
    statYears: string;
    statYearsLabel: string;
    statAreas: string;
    statAreasLabel: string;
    statLanguages: string;
    statLanguagesLabel: string;
    /* Trust signals — 8 placeholder fields */
    trustMattersHandledLabel: string;
    trustMattersHandledValue: string;
    trustForeignInvestorShareLabel: string;
    trustForeignInvestorShareValue: string;
    trustTopIndustriesLabel: string;
    trustTopIndustriesValue: string;
    trustTopClientCountriesLabel: string;
    trustTopClientCountriesValue: string;
    trustResponseTimeLabel: string;
    trustResponseTimeValue: string;
    trustFreeConsultationLabel: string;
    trustFreeConsultationValue: string;
    trustAdditionalMembershipsLabel: string;
    trustAdditionalMembershipsValue: string;
    trustAdditionalLanguagesLabel: string;
    trustAdditionalLanguagesValue: string;
    teamTitle: string;
    teamSubtitle: string;
    teamEditorialLine1: string;
    teamEditorialLine2: string;
    teamEditorialLine3: string;
    teamEditorialLine4: string;
    teamHamed: string;
    teamHamedRole: string;
    teamSaud: string;
    teamSaudRole: string;
    /* Detail pages */
    teamMembers: TeamMemberDetail[];
    detailFocusLabel: string;
    detailEducationLabel: string;
    detailLanguagesLabel: string;
    detailMembershipsLabel: string;
    detailContactLabel: string;
    detailBackLabel: string;
    detailCtaTitle: string;
    detailCtaBody: string;
    detailCtaButton: string;
  };

  /* ----------------------------------------------------------
     Contact page
     ---------------------------------------------------------- */
  contact: {
    title: string;
    subtitle: string;
    officeTitle: string;
    officeAddress: string;
    phoneTitle: string;
    phoneValue: string;
    emailTitle: string;
    emailValue: string;
    hoursTitle: string;
    hoursValue: string;
    note: string;
    mapLocation: string;
    mapCta: string;
  };

  /* ----------------------------------------------------------
     FAQ page
     ---------------------------------------------------------- */
  faq: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterGeneral: string;
    filterForeign: string;
    filterServices: string;
    filterTrust: string;
    categories: {
      general: string;
      foreign: string;
      services: string;
      trust: string;
    };
    items: Array<{
      category: "general" | "foreign" | "services" | "trust";
      q: string;
      a: string;
    }>;
  };

  /* ----------------------------------------------------------
     Foreign Investors page
     ---------------------------------------------------------- */
  foreignInvestors: {
    title: string;
    subtitle: string;
    qas: Array<{
      q: string;
      a: string;
      icon: string;
    }>;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };

  /* ----------------------------------------------------------
     Footer
     ---------------------------------------------------------- */
  footer: {
    quickLinks: string;
    office: string;
    officeAddress: string;
    rights: string;
    verifiedSba: string;
    established: string;
  };

  /* ----------------------------------------------------------
     Sticky mobile call button
     ---------------------------------------------------------- */
  stickyCall: string;

  /* ----------------------------------------------------------
     Shared
     ---------------------------------------------------------- */
  shared: {
    learnMore: string;
    callTheFirm: string;
  };
}