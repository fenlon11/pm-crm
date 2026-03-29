type BrandColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textLight: string;
};

type BrandLogo = {
  light: string;
  dark: string;
  icon: string;
};

type BrandMeta = {
  title: string;
  description: string;
  ogImage: string;
};

export type BrandConfig = {
  name: string;
  shortName: string;
  domain: string;
  colors: BrandColors;
  logo: BrandLogo;
  meta: BrandMeta;
};

const BRAND_CONFIGS: Record<string, BrandConfig> = {
  recruiter: {
    name: 'Persistent Recruiter',
    shortName: 'PM Recruiter',
    domain: 'persistentmomentum.com',
    colors: {
      primary: '#1a2332',
      secondary: '#1ABC9C',
      background: '#0f1923',
      surface: '#1a2332',
      text: '#ffffff',
      textLight: '#8b9bb4',
    },
    logo: {
      light: '/images/logo/pm-logo-light.svg',
      dark: '/images/logo/pm-logo-dark.svg',
      icon: '/images/logo/pm-icon.svg',
    },
    meta: {
      title: 'Persistent Recruiter',
      description: 'Modern recruiting CRM for high-performance teams.',
      ogImage: '/images/og/pm-recruiter-og.png',
    },
  },
  sales: {
    name: 'Persistent Momentum Sales',
    shortName: 'PM Sales',
    domain: 'persistentmomentum.com',
    colors: {
      primary: '#1a2332',
      secondary: '#3B82F6',
      background: '#0f1923',
      surface: '#1a2332',
      text: '#ffffff',
      textLight: '#8b9bb4',
    },
    logo: {
      light: '/images/logo/pm-logo-light.svg',
      dark: '/images/logo/pm-logo-dark.svg',
      icon: '/images/logo/pm-icon.svg',
    },
    meta: {
      title: 'Persistent Momentum Sales',
      description: 'Modern sales CRM for high-performance teams.',
      ogImage: '/images/og/pm-sales-og.png',
    },
  },
};

export const getBrandConfig = (brand?: string): BrandConfig => {
  const key =
    brand ??
    (typeof process !== 'undefined' ? process.env?.BRAND : undefined) ??
    'recruiter';
  return BRAND_CONFIGS[key] ?? BRAND_CONFIGS['recruiter'];
};
