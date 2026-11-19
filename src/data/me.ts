// Edit everything about you in this one file.
export const me = {
  name: 'Hridal',
  pronunciation: '/ rih · dul /',
  soundsLike: 'the H is silent',
  origin: 'Sanskrit name',
  meaning: [
    'Of the heart.',
    'One who is pure of heart.',
  ],
  etymology: 'From hriday (Sanskrit hṛdaya), “heart”.',
  tagline: 'Welcome, and thanks for stopping by. This is a little window into my life and what I\u2019m up to. I study Materials Science and Engineering at Imperial and sit on the AI Society committee, because I care a lot about AI research and how it gets used. In my spare time I write essays, and when I\u2019m not doing that I\u2019m probably bouldering. Have a look around.',
  about: [
    "I'm Hridal, a Materials Science and Engineering student at Imperial College London. I've spent my summers at Roland Berger, IBM and Wood Group, and I like problems that sit somewhere between the technical and the commercial. At Imperial I'm on the AI Society committee and I'm the Materials department's EDI rep.",
    "Outside the degree I write essays on my Substack, play netball, go bouldering, and paint when I get the chance.",
  ],
  // The "Currently" section on the homepage. Change these whenever you like.
  currently: [
    { label: 'Reading', icon: 'book', title: 'Brave New World', note: 'Aldous Huxley' },
    { label: 'Writing', icon: '✎', title: 'Create More Than You Consume', note: 'An essay on individuality and doomscrolling' },
    { label: 'Listening to', icon: '♫', title: 'Depeche Mode', note: 'plus a lot of rock and indie rock' },
    { label: 'Watching', icon: 'film', title: 'The Mentalist', note: 'On Netflix' },
    { label: 'Learning', icon: '◎', title: 'AI safety', note: 'Fresh off an AI Safety and Practices course' },
    { label: 'Playing', icon: '♡', title: 'Netball', note: 'and bouldering whenever I can' },
  ],
  facts: [
    { label: 'Studying', value: 'MEng, Imperial' },
    { label: 'Based in', value: 'London' },
    { label: 'Interested in', value: 'Consulting, markets, AI' },
  ],
  education: [
    { school: 'Imperial College London', detail: 'MEng Materials Science and Engineering', period: 'Sep 2024 — Jun 2028' },
    { school: 'Kendrick School', detail: 'A Levels: Mathematics, Physics, Philosophy; AS Economics, AS Further Mathematics. Gold Medal, British Physics Olympiad; Gold Award, UKMT Senior Mathematical Challenge.', period: 'Sep 2017 — Jun 2024' },
  ],
  projects: [
    { title: 'Smart Bracelet Start-up (Entrepreneurship module, team of 4)', period: 'Oct 2026 — Present' },
    { title: 'Machine Learning Classification of Materials', period: 'Oct 2025 — Dec 2025' },
  ],
  skills: [
    { group: 'Technical', items: ['Python (data analysis, machine learning)', 'SQL', 'Excel (financial modelling)', 'PowerPoint', 'Git and GitHub', 'Claude Code'] },
    { group: 'Communication', items: ['LAMDA Public Speaking, Gold Medal with Distinction'] },
    { group: 'Courses', items: ['AI Safety and Practices', 'Agile Foundations', 'Project Management Fundamentals'] },
    { group: 'Languages', items: ['English (native)', 'Hindi (fluent)', 'Gujarati (fluent)'] },
    { group: 'Interests', items: ['Investing and markets', 'Coding with AI', 'Writing essays', 'Netball', 'Bouldering', 'Painting'] },
  ],
  // What shows on the laptop screen on the About page (matches my LinkedIn).
  linkedin: {
    fullName: 'Hridal Gujrati',
    headline: 'Materials Engineering @ Imperial College London | Junior Consultant Intern @ Roland Berger',
    location: 'Reading, England, United Kingdom',
    connections: '500+ connections',
    followers: '1,002 followers',
    photo: '/logos/avatar.png',
    current: { name: 'Imperial College London', logo: '/logos/imperial.png' },
    about: [
      'I am a third year Materials Science and Engineering student at Imperial College London.',
      'Last summer I interned at Roland Berger as a Junior Consultant Intern. Previously, I worked at IBM as an analyst supporting an NHS HR and payroll platform, gaining experience in large-scale, high-stakes environments. Outside of my studies, I’m the External Relations Officer for Imperial’s Netball Club, one of the largest female societies at the university, developing skills in stakeholder engagement and leadership.',
      'I’m always open to connecting with people who share an interest in consulting, tech, or entrepreneurship!',
    ],
    latestPost: 'I’m excited to announce that I will be joining Roland Berger in their London office this summer as a Junior Consultant!',
    logos: { 'Roland Berger': '/logos/roland-berger.png', 'IBM': '/logos/ibm.png', 'Wood Group': '/logos/wood.png', 'Imperial': '/logos/imperial.png', 'Kendrick School': '/logos/kendrick.png' } as Record<string, string>,
  },
  email: 'hridal.gujrati@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hridal' },
    { label: 'Substack', href: 'https://substack.com/' },
  ],
};
