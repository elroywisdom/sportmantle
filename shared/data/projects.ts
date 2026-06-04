export interface Project {
  id: number;
  slug: string;
  title: string;
  date: string;
  year: string;
  category: "Prayer" | "Outreach" | "Camps" | "Conference" | "Tournament" | "Meeting";
  tags: string[];
  image: string;
  gallery: string[];
  description: string;
  fullStory: string;
  featuredQuote?: string;
  details: {
    location: string;
    attendance?: string;
    impact?: string;
    partners?: string;
  };
  titleColor: string;
}

export const allProjects: Project[] = [
  {
    id: 1,
    slug: "when-athletes-pray-2nd-edition",
    title: "WHEN ATHLETES PRAY — 2nd Edition",
    date: "07.20.24",
    year: "2024",
    category: "Prayer",
    tags: ["Prayer", "Abuja", "Intercession"],
    image: "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 2.0/IMG_0463.webp",
    gallery: [
      "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 2.0/IMG_0463.webp",
      "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 2.0/IMG_0461.webp",
      "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 2.0/d45be235-6f91-453d-9276-9f6fcd0eaa6c.webp",
      "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 2.0/55f6608f-1a9c-4f93-9b3f-fb6b8903b6d3.webp"
    ],
    description: "When Athletes Pray 2.0 brought together athletes from across the city to intercede for the sports industry and consecrate their careers to God.",
    fullStory: "When Athletes Pray (2nd Edition) was a historic and transformational assembly that gathered elite and aspiring sports personalities, coaches, and intercessors in the heart of Abuja. The event served as a consecrated altar of spiritual alignment and active intercession for the global sports industry.\n\nFrom the opening worship, the atmosphere was thick with a collective desire to establish a righteous footprint in sports. The meeting combined intense, strategic prayer circles with direct, inspiring bible teachings regarding the dual identity of an athlete as both a competitor and a Kingdom representative.\n\nAthletes were challenged to look beyond secular metrics of success like fame and wealth, and to view their athletic careers as active pulpits for discipling nations. As the prayer sessions intensified, many experienced profound personal renewals, consecrating their careers, platforms, and families to the service of God.",
    featuredQuote: "An athlete in the place of prayer is a force of righteousness that cannot be stopped.",
    details: {
      location: "Bible Guest House, Zone 5, Wuse, Abuja",
      attendance: "70+ Dedicated Athletes",
      impact: "A robust intercessory network established; deep spiritual renewals recorded among Abuja-based competitors.",
      partners: "Abuja Sports Chapels"
    },
    titleColor: "text-white"
  },
  {
    id: 2,
    slug: "outreach-horvel-prime-football-academy",
    title: "Outreach — Horvel-Prime Football Academy",
    date: "03.10.25",
    year: "2025",
    category: "Outreach",
    tags: ["Outreach", "Nyanya", "Mentorship"],
    image: "/Images/projects/sportmantle-2025/HORVEL PRIME OUTREACH/IMG_5393.webp",
    gallery: [
      "/Images/projects/sportmantle-2025/HORVEL PRIME OUTREACH/IMG_5393.webp",
      "/Images/projects/sportmantle-2025/HORVEL PRIME OUTREACH/IMG_5394.webp",
      "/Images/projects/sportmantle-2025/HORVEL PRIME OUTREACH/IMG_5396.webp",
      "/Images/projects/sportmantle-2025/HORVEL PRIME OUTREACH/IMG_5408.webp"
    ],
    description: "Our outreach at Horvel Prime allowed us to share the gospel directly with young athletes and provide essential sporting equipment and mentorship.",
    fullStory: "The strategic outreach at Horvel-Prime Football Academy in Nyanya, Abuja, demonstrated Sportmantle's commitment to holistic discipleship—meeting physical needs while planting eternal seeds. Recognizing the unique challenges faced by young, aspiring footballers, our team spent a day directly discipling the academy players.\n\nThe outreach combined high-energy interactive sessions with direct sharing of the gospel of Jesus Christ. We addressed critical topics such as maintaining integrity in sports, resisting addictions, and understanding one's true identity in Christ beyond performance on the pitch.\n\nTo support their development, Sportmantle distributed vital training equipment, sports kits, and food resources. The outreach concluded with a powerful altar call where dozens of young athletes committed their hearts to Christ, laying a solid foundation for continuous mentorship and spiritual development.",
    featuredQuote: "We prepare the body for the game, but we prepare the heart for eternity.",
    details: {
      location: "Nyanya, FCT, Abuja",
      attendance: "80+ Young Players",
      impact: "Over 40 first-time decisions for Christ; established permanent weekly discipleship structures in the academy.",
      partners: "Horvel Prime Academy Management"
    },
    titleColor: "text-white"
  },
  {
    id: 3,
    slug: "aflame-holy-ghost-meeting",
    title: "AFLAME — Holy Ghost Meeting",
    date: "10.24.24",
    year: "2024",
    category: "Camps",
    tags: ["Spiritual", "Abuja", "Encounter"],
    image: "/Images/projects/sportmantle-2024/AFLAME/IMG_1739.webp",
    gallery: [
      "/Images/projects/sportmantle-2024/AFLAME/IMG_1739.webp",
      "/Images/projects/sportmantle-2024/AFLAME/IMG_0169.webp",
      "/Images/projects/sportmantle-2024/AFLAME/IMG_0241.webp",
      "/Images/projects/sportmantle-2024/AFLAME/IMG_1716.webp"
    ],
    description: "The Aflame camp ignited a passion for Christ in the next generation of football players, combining rigorous physical training with deep spiritual discipleship.",
    fullStory: "The AFLAME Holy Ghost Meeting in Abuja was a divine combustion of prayer, passion, and purpose. It gathered young players, coaches, and sports advocates hungry for an authentic spiritual encounter that would transcend the sports stadium.\n\nThe meeting was structured as a deep, intensive sanctuary of consecration. Teachings focused heavily on overcoming the moral and peer pressures prevalent in modern professional football, teaching athletes how to remain uncompromised, righteous, and focused on their heavenly calling.\n\nThe highlight was a powerful movement of prayer where athletes stood hand-in-hand, interceding for their colleagues and academies. AFLAME succeeded in igniting a spiritual fire in the hearts of the players, creating a visible, passionate army of sports disciples determined to be light in their respective academies.",
    featuredQuote: "Set yourself on fire for God on the field, and the world will watch you burn.",
    details: {
      location: "City of Abuja",
      attendance: "120+ Academicians & Youth",
      impact: "Catalyzed discipleship cells across 5 Abuja football academies; delivered many from career anxiety and secular compromise.",
      partners: "Sportmantle Discipleship Network"
    },
    titleColor: "text-[#E30A0A]"
  },
  {
    id: 4,
    slug: "sportmantle-7-a-side-youth-tournament",
    title: "Sportmantle 7-a-Side Youth Tournament",
    date: "06.12.25",
    year: "2025",
    category: "Tournament",
    tags: ["Tournament", "Nasarawa", "Competition"],
    image: "/Images/projects/sportmantle-2025/SPORTMANTLE JUNIOR TOURNAMENT /IMG_6721.webp",
    gallery: [
      "/Images/projects/sportmantle-2025/SPORTMANTLE JUNIOR TOURNAMENT /IMG_6721.webp",
      "/Images/projects/sportmantle-2025/SPORTMANTLE JUNIOR TOURNAMENT /IMG_6763.webp",
      "/Images/projects/sportmantle-2025/SPORTMANTLE JUNIOR TOURNAMENT /IMG_6770.webp",
      "/Images/projects/sportmantle-2025/SPORTMANTLE JUNIOR TOURNAMENT /IMG_6794.webp"
    ],
    description: "The Sportmantle Junior Tournament brought together academies for a week of competitive football and intense gospel-centered teaching.",
    fullStory: "Executing sports evangelism with dynamic athletic brilliance, the first-ever Sportmantle 7-a-Side Youth Tournament was held in Nasarawa State. The tournament partnered closely with the Karu Football Academy to assemble the finest local youth academies for a week of intense, professional competition.\n\nWhile the tactical and athletic standards on display were stellar, the event's ultimate target was the hearts of the competitors. Every match day was integrated with character-building workshops, team prayer sessions, and direct discipleship circles before kick-offs and during halftime breaks.\n\nThe tournament successfully proved that competitive sports can be run with premium organizational excellence, absolute fairness, and a central devotion to spreading the Word of God. It set a new benchmark for youth tournaments, leaving both players and coaches spiritually refreshed and united.",
    featuredQuote: "We compete with maximum intensity, but our ultimate goal is to win crowns that do not fade.",
    details: {
      location: "Karu, Nasarawa State",
      attendance: "12+ Academies, 150+ Players",
      impact: "Nurtured character and integrity in competition; distributed scriptures and resources to all participating clubs.",
      partners: "Karu Football Academy (KFA)"
    },
    titleColor: "text-white"
  },
  {
    id: 5,
    slug: "when-athletes-pray-1st-edition",
    title: "WHEN ATHLETES PRAY — 1st Edition",
    date: "02.05.24",
    year: "2024",
    category: "Prayer",
    tags: ["Prayer", "Zuba", "Foundational"],
    image: "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 2.0/IMG_0461.webp",
    gallery: [
      "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 2.0/IMG_0461.webp",
      "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 1.0/253ee99a-11e5-4738-a478-3de038f69e59.webp",
      "/Images/projects/sportmantle-2024/WHEN ATHLETES PRAY 1.0/39b5fe1b-6f29-467f-acf8-20c05b1feb45.webp"
    ],
    description: "The inaugural edition of When Athletes Pray set the foundation for a movement of intercession among young sportsmen and women.",
    fullStory: "The movement of sports-focused intercession began with 'When Athletes Pray — 1st Edition'. Held in Zuba, FCT, this foundational meeting drew an enthusiastic audience of young athletes from across the Federal Capital Territory and neighboring Nasarawa State.\n\nRecognizing that young athletes lacked safe, spiritually-enriching spaces to discuss their unique career journeys, Sportmantle established this sanctuary. It was a day characterized by deep, earnest prayers, sincere fellowship, and solid bible teaching focused on finding purpose and strength in God.\n\nThis initial meeting successfully broke territorial and cultural barriers, uniting competitors from different backgrounds under a single banner of prayer. The fire lit in Zuba proved that athletes were hungry for spiritual growth, setting the stage for subsequent city-wide editions.",
    featuredQuote: "The foundation of every great victory is laid on our knees in prayer.",
    details: {
      location: "Zuba, FCT",
      attendance: "50+ Pioneer Athletes",
      impact: "Broke regional silos; birthed a permanent prayer cell of young players across Nasarawa and Abuja.",
      partners: "Zuba Community Outreach"
    },
    titleColor: "text-white"
  },
  {
    id: 6,
    slug: "karu-football-academy-outreach",
    title: "Karu Football Academy Outreach",
    date: "11.22.24",
    year: "2024",
    category: "Outreach",
    tags: ["Outreach", "Nasarawa", "Mentorship"],
    image: "/Images/projects/sportmantle-2024/AFLAME/IMG_1716.webp",
    gallery: [
      "/Images/projects/sportmantle-2024/AFLAME/IMG_1716.webp",
      "/Images/projects/sportmantle-2024/Other OUTREACHES- 4Square church youth, KFA./IMG_0473.webp",
      "/Images/projects/sportmantle-2024/Other OUTREACHES- 4Square church youth, KFA./IMG_5566.webp",
      "/Images/projects/sportmantle-2024/AFLAME/IMG_1718.webp"
    ],
    description: "A targeted outreach at the Karu Football Academy providing boots, jerseys, and sharing the message of righteousness and justice.",
    fullStory: "Our targeted outreach at the Karu Football Academy (KFA) in Nasarawa was a deeply practical display of Christ's love. By focusing on a single, high-potential academy, Sportmantle was able to deliver targeted support that directly affected the daily training of the athletes.\n\nWe spent quality time on the field running technical clinics, which served as natural icebreakers. Following the physical training, our directors held a powerful discipling session, teaching on righteousness, justice, and accountability as fundamental pillars for a sustainable and impactful athletic career.\n\nTo ease financial burdens and enhance their game, we distributed professional football boots, training jerseys, and educational bibles. The players were profoundly encouraged, and many dedicated their sports career journeys to the path of Christian discipleship.",
    featuredQuote: "Righteousness on the field translates to justice in the community.",
    details: {
      location: "Karu, Nasarawa State",
      attendance: "65+ Academy Athletes",
      impact: "Dozens equipped with essential boots and jerseys; established ongoing mentorship link with KFA coaches.",
      partners: "Karu Football Academy Management"
    },
    titleColor: "text-[#E30A0A]"
  },
  {
    id: 7,
    slug: "spirituals-righteousness-of-god",
    title: "SPIRITUALS — The Righteousness of God",
    date: "03.25.25",
    year: "2025",
    category: "Conference",
    tags: ["Conference", "Anniversary", "Abuja"],
    image: "/Images/projects/sportmantle-2025/2nd Anniversary- Spiritual - the righteousness of God/IMG_0138.webp",
    gallery: [
      "/Images/projects/sportmantle-2025/2nd Anniversary- Spiritual - the righteousness of God/IMG_0138.webp",
      "/Images/projects/sportmantle-2025/2nd Anniversary- Spiritual - the righteousness of God/IMG_0154.webp",
      "/Images/projects/sportmantle-2025/2nd Anniversary- Spiritual - the righteousness of God/IMG_0161.webp",
      "/Images/projects/sportmantle-2025/2nd Anniversary- Spiritual - the righteousness of God/IMG_1950.webp",
      "/Images/projects/sportmantle-2025/2nd Anniversary- Spiritual - the righteousness of God/IMG_5482.webp"
    ],
    description: "A teaching meeting held to celebrate Sportmantle's 2-year anniversary, honoring God's faithfulness and establishing righteousness in the hearts of athletes.",
    fullStory: "To mark two incredible years of raising righteous voices in the sports industry, Sportmantle convened 'SPIRITUALS — The Righteousness of God'. This special teaching conference was dedicated to reinforcing the structural spiritual foundations of our community.\n\nThe conference went deep into scripture, examining what it means to uphold righteousness and justice in the competitive, secular sports market. Led by our founders and guest ministers, the sessions broke down the theological concept of righteousness into practical, day-to-day choices for athletes.\n\nIt was a beautiful time of celebration, thanksgiving, and forward-looking prophetic alignment. Partners, athletes, and team members left with renewed clarity, equipped to represent the Kingdom of God with maximum integrity, love, and excellence.",
    featuredQuote: "Our anniversary is not just a milestone of time, but a testament to God's building hand.",
    details: {
      location: "City of Abuja",
      attendance: "100+ Athletes & Partners",
      impact: "Deepened the theological understanding of righteousness; reinforced community bonds; celebrated 2 years of impact.",
      partners: "Beta Boys Project & Abuja Ministers"
    },
    titleColor: "text-white"
  },
  {
    id: 8,
    slug: "kaduna-outreach-beta-boys",
    title: "Kaduna Outreach (with Beta Boys Project)",
    date: "09.15.25",
    year: "2025",
    category: "Outreach",
    tags: ["Outreach", "Kaduna", "Empowerment"],
    image: "/Images/projects/website-placeholder images-section/founder-speaking-to-young-players.jpeg",
    gallery: [
      "/Images/projects/website-placeholder images-section/founder-speaking-to-young-players.jpeg",
      "/Images/projects/website-placeholder images-section/happy-children.jpeg",
      "/Images/projects/sportmantle-2024/Other OUTREACHES- 4Square church youth, KFA./IMG_5561.webp",
      "/Images/projects/website-placeholder images-section/team-members.jpeg"
    ],
    description: "A collaborative bootcamp outreach in Kaduna targeting boys aged 8–15, focusing on the gospel, purpose, identity, and skill empowerment.",
    fullStory: "Expanding our footprint across Nigeria, Sportmantle joined forces with the Beta Boys Project to conduct a high-impact, multi-day outreach bootcamp in Kaduna. Held at the Baptist Theological Seminary, the bootcamp targeted boys aged 8 to 15—a vital developmental stage for shaping values, character, and vision.\n\nThe bootcamp's curriculum was highly engaging, blending active soccer drills with spiritual and life-skills workshops. We taught the boys the Gospel of Jesus Christ, helping them discover their unique divine identity and purpose on earth beyond sports.\n\nThrough intense mentorship circles, we addressed crucial aspects of character, family responsibility, and scholastic dedication. The boys also received practical skill training. This Kaduna outreach established a powerful model for collaborative regional ministry, leaving a deep legacy of faith in the hearts of the youth.",
    featuredQuote: "If you build the boy today, you secure the man and save the nation tomorrow.",
    details: {
      location: "Baptist Theological Seminary, Kaduna",
      attendance: "90+ Young Boys",
      impact: "Provided extensive mentorship; distributed bibles and educational items; empowered youth with basic career guidance.",
      partners: "Beta Boys Project"
    },
    titleColor: "text-white"
  }
];
