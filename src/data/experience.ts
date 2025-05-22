type Experience = {
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  icon?: string;
}

const PAST_ROLES: Experience[] = [
  {
    company: 'Nester',
    role: 'Frontend Team Lead',
    description: 'Next-gen social network – Led frontend team, integrated a rich TextEditor and customized Timeline features using NextJS, Zustand, and Shadcn UI.',
    startDate: 'January 2024',
    endDate: 'Present',
    location: 'Japan',
    icon: '🧵'
  },
  {
    company: 'Atriv',
    role: 'Senior Frontend Developer',
    description: 'AI-powered NFT generation platform – Wallet integration, NFT minting, and payment processing with ReactJS and TypeScript.',
    startDate: 'March 2023',
    endDate: 'December 2023',
    location: 'Poland',
    icon: '🎭'
  },
  {
    company: '5S Job',
    role: 'Mobile Developer',
    description: 'Job and language learning app – Focused on bug fixing, optimization, and store deployment using React Native and Laravel.',
    startDate: 'January 2023',
    endDate: 'August 2023',
    location: 'Japan',
    icon: '🗣️'
  },
  {
    company: 'GS CEX / DRX',
    role: 'Frontend Developer',
    description: 'Crypto exchange platforms – Developed core trading functionalities and improved mobile UI/UX.',
    startDate: 'June 2021',
    endDate: 'February 2023',
    location: 'Korea & Hong Kong',
    icon: '💹'
  },
  {
    company: 'Vala',
    role: 'Junior Developer',
    description: 'Internal enterprise social network – Built media previews, handled maintenance, and automated app deployments.',
    startDate: 'August 2020',
    endDate: 'May 2022',
    location: 'Vietnam',
    icon: '🔄'
  }
];

export default PAST_ROLES;
