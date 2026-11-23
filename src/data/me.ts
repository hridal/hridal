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
    "I'm Hridal, a Materials Science and Engineering student at Imperial College London. This summer I was a Junior Consulting Intern at Roland Berger, where I led a review of a client's graduate programme and worked on a commercial due diligence and an M&A pitch. Before that I supported NHS ESR at IBM, the HR and payroll system behind 1.3 million NHS staff, and worked on bridge design options at Wood Group.",
    "At Imperial I sit on the AI Society's research team, where I organised AI Week with speakers from Anthropic and Google DeepMind, and I was elected EDI rep for around 500 students in the Department of Materials. I care about AI research and how it gets applied, and I like building things too, from a machine learning model for alloy classification to the start-up I'm working on now.",
    "I also write essays, which I publish here on this site. Away from all that, I play netball, go bouldering and paint when I get the chance.",
  ],
  // The "Currently" section on the homepage. Change these whenever you like.
  currently: [
    { label: 'Reading', icon: 'book', title: 'Brave New World', note: 'Aldous Huxley' },
    { label: 'Writing', icon: 'pen', title: 'Create More Than You Consume', note: 'An essay on individuality and doomscrolling' },
    { label: 'Listening to', icon: 'music', title: 'Depeche Mode', note: 'plus a lot of rock and indie rock' },
    { label: 'Watching', icon: 'film', title: 'The Mentalist', note: 'On Netflix' },
    { label: 'Learning', icon: 'spark', title: 'AI safety', note: 'Fresh off an AI Safety and Practices course' },
    { label: 'Playing', icon: 'ball', title: 'Netball', note: 'and bouldering whenever I can' },
  ],
  facts: [
    { label: 'Studying', value: 'MEng, Imperial' },
    { label: 'Based in', value: 'London' },
    { label: 'Interested in', value: 'Consulting, markets, AI' },
  ],
  education: [
    { school: 'Imperial College London', detail: 'MEng Materials Science and Engineering', period: 'Sep 2024 — Jun 2028', body: 'Current modules: Materials Processing, Nanomaterials, Optoelectronics, Nuclear Fusion, Maths and Quantum Mechanics, Research Techniques, Entrepreneurship, Managerial Economics, and Mathematics and Computing.' },
    { school: 'Kendrick School', detail: 'A Levels: Mathematics, Physics, Philosophy; AS Economics, AS Further Mathematics. Gold Medal, British Physics Olympiad; Gold Award, UKMT Senior Mathematical Challenge.', period: 'Sep 2017 — Jun 2024' },
  ],
  projects: [
    { title: 'Portfolio Risk Dashboard', period: 'Oct 2026 \u2014 Present', body: 'Before I started investing I wanted to understand how the portfolios I was considering actually behave, so I built a dashboard in Python that compares four of them since 2012. It replays each one through real market shocks like Covid and the 2022 bond sell-off, shows what fees and inflation cost over twenty years, and tests whether a lump sum beats investing monthly. Every run checks its own data first, including against a second price source, and it rebuilds itself every weekday through GitHub Actions. I also keep a decision journal in it so I can judge decisions by the reasoning, not just the outcome.' },
    { title: 'Jewellness (Start-up)', period: 'Oct 2026 — Present', body: 'Jewellness is fitness jewellery: a luxury bracelet that tracks health and safety for women without looking like a tracker. The idea came from my own experience. I wanted something that did what a fitness tracker does but that I\u2019d actually want to wear, and I couldn\u2019t find it. It started in my Entrepreneurship module. I interviewed around 30 potential customers and 73% were interested, which told me the gap was real. I built the market sizing and financial model, and I\u2019m now testing demand with a low-cost pretotype.' },
    { title: 'Materials Property Predictor', period: 'Oct 2025 — Present', body: 'This began as a university computing challenge where my models scored 100% on synthetic data, until I found that one column decided every label and the rest was noise. I rebuilt it on nearly 5,000 real, experimentally measured compounds, using only the chemical formula. It predicts whether a compound is a metal with 91.9% accuracy and estimates band gaps to within 0.40 eV on average, and it is live as an app.' },
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
  ],
};
