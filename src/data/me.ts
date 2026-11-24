// Edit everything about you in this one file.
export const me = {
  name: 'Hridal',
  surname: 'Gujrati',
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
    "I'm Hridal, a Materials Science and Engineering student at Imperial College London. This summer I was a Junior Consultant Intern at Roland Berger, where I worked on a review of a client's graduate programme and worked on a commercial due diligence and an M&A pitch. Before that I supported NHS ESR at IBM, the HR and payroll system behind 1.3 million NHS staff, and worked on bridge design options at Wood Group.",
    "At Imperial I sit on the AI Society's research team, and I helped with operations and logistics throughout AI Week, which had speakers from Anthropic and Google DeepMind and finished with Imperial AI Hack, a hackathon with 350 participants. I was also elected EDI rep for around 500 students in the Department of Materials. I care about AI research and how it gets applied, and I like building things too, from a machine learning model that predicts the properties of materials to the start-up I'm working on now.",
    "I write essays too, which I publish here on this site, and I'm really interested in web design, digital design and UX, from designing the branding for Imperial AI Hack to building this site. Away from all that, I play netball, go bouldering and paint when I get the chance.",
  ],
  // The "Currently" section on the homepage. Change these whenever you like.
  // The profile card beside the welcome text on the homepage.
  // Set `status` to '' to hide the line with the dot.
  profile: {
    status: '',
    rows: [
      { label: 'Studying', value: 'MEng Materials Science, Imperial (Year 3)' },
      { label: 'Latest role', value: 'Junior Consultant Intern, Roland Berger' },
      { label: 'Based in', value: 'London' },
      { label: 'At Imperial', value: 'AI Society research team, EDI rep for Materials' },
    ],
  },
  // Change this whenever you update the Currently cards below.
  currentlyUpdated: 'November 2026',
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
    { label: 'Experience in', value: 'Consulting, AI and data' },
  ],
  education: [
    { school: 'Imperial College London', detail: 'MEng Materials Science and Engineering', period: 'Sep 2024 — Jun 2028', body: 'Current modules: Materials Processing, Nanomaterials, Optoelectronics, Nuclear Fusion, Maths and Quantum Mechanics, Research Techniques, Entrepreneurship, Managerial Economics, and Mathematics and Computing.' },
    { school: 'Kendrick School', detail: 'A Levels: Mathematics, Physics, Philosophy; AS Economics, AS Further Mathematics. Gold Medal, British Physics Olympiad; Gold Award, UKMT Senior Mathematical Challenge.', period: 'Sep 2017 — Jun 2024' },
  ],
  projects: [
    { title: 'Portfolio risk dashboard', period: 'Oct 2026 \u2014 Present', body: 'Before I started investing I wanted to understand how the portfolios I was considering actually behave, so I built a dashboard in Python that compares four of them since 2012. It replays each one through real market shocks like Covid and the 2022 bond sell-off, shows what fees and inflation cost over twenty years, and tests whether a lump sum beats investing monthly. Every run checks its own data first, including against a second price source, and it rebuilds itself every weekday through GitHub Actions. I also keep a decision journal in it so I can judge decisions by the reasoning, not just the outcome.' },
    { title: 'Jewellness (Start-up)', period: 'Oct 2026 — Present', body: 'Jewellness is my start-up idea for fitness jewellery: a bracelet designed to track health and safety for women without looking like a tracker. The idea came from my own experience. I wanted something that did what a fitness tracker does but that I\u2019d actually want to wear, and I couldn\u2019t find it. It started in my Entrepreneurship module. I interviewed around 30 potential customers and 73% were interested, which told me the gap was real. I built the market sizing and financial model, and I\u2019m now testing demand with a low-cost pretotype.' },
    { title: 'Materials property predictor', period: 'Oct 2025 — Present', body: 'This began as a university computing challenge where my models scored 100% on synthetic data, until I found that one column decided every label and the rest was noise. I rebuilt it on nearly 5,000 real, experimentally measured compounds, using only the chemical formula. It predicts whether a compound is a metal with 91.9% accuracy and estimates band gaps to within 0.40 eV on average, and it is live as an app.' },
  ],
  skills: [
    { group: 'Technical', items: ['Python (data analysis, machine learning)', 'SQL', 'Excel (financial modelling)', 'PowerPoint', 'Git and GitHub', 'Claude Code'] },
    { group: 'Communication', items: ['LAMDA Public Speaking, Gold Medal with Distinction'] },
    { group: 'Courses', items: ['AI Safety and Practices', 'Agile Foundations', 'Project Management Fundamentals'] },
    { group: 'Languages', items: ['English (native)', 'Hindi (fluent)', 'Gujarati (fluent)'] },
    { group: 'Interests', items: ['Investing and markets', 'Coding with AI', 'Web design', 'Digital design and UX', 'Writing essays', 'Netball', 'Bouldering', 'Painting'] },
  ],
  // What shows on the laptop screen on the About page (matches my LinkedIn).
  linkedin: {
    fullName: 'Hridal Gujrati',
    headline: 'Materials Engineering @ Imperial | Prev @ Roland Berger, IBM',
    location: 'Reading, England, United Kingdom',
    connections: '500+ connections',
    followers: '1,012 followers',
    photo: '/logos/avatar.png',
    current: { name: 'Imperial College London', logo: '/logos/imperial.png' },
    about: [
      'I’m a third-year Materials Science and Engineering student at Imperial College London, with interests spanning consulting, technology and entrepreneurship. Alongside my degree, I’m taking an entrepreneurship module and working with a team of three to develop a startup, giving me the chance to put business ideas into practice.',
    ],
    // Leave empty ('') to hide the post card, as on LinkedIn when there are no recent posts.
    latestPost: '',
    logos: { 'Roland Berger': '/logos/roland-berger.png', 'IBM': '/logos/ibm.png', 'Wood Group': '/logos/wood.png', 'Imperial': '/logos/imperial.png', 'Kendrick School': '/logos/kendrick.png' } as Record<string, string>,
  },
  email: 'hridal.gujrati@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hridal' },
  ],
};
