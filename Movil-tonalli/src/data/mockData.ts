export const MODULES = [
  {
    id: "m1",
    title: "Blockchain Fundamentals",
    emoji: "⛓️",
    description: "Learn the basics of blockchain technology",
    totalLessons: 5,
    completedLessons: 3,
    xpReward: 500,
    locked: false,
    color: "#FF6B35",
  },
  {
    id: "m2",
    title: "Stellar Network",
    emoji: "⭐",
    description: "Deep dive into the Stellar ecosystem",
    totalLessons: 6,
    completedLessons: 1,
    xpReward: 600,
    locked: false,
    color: "#FFD700",
  },
  {
    id: "m3",
    title: "DeFi & Smart Contracts",
    emoji: "📜",
    description: "Decentralized finance concepts",
    totalLessons: 8,
    completedLessons: 0,
    xpReward: 800,
    locked: true,
    color: "#00C896",
  },
  {
    id: "m4",
    title: "NFTs & Digital Assets",
    emoji: "🎨",
    description: "Understanding digital ownership",
    totalLessons: 5,
    completedLessons: 0,
    xpReward: 500,
    locked: true,
    color: "#9B59B6",
  },
];

export const LESSONS: Record<string, any[]> = {
  m1: [
    {
      id: "l1",
      moduleId: "m1",
      title: "What is Blockchain?",
      emoji: "🔗",
      xpReward: 100,
      duration: "5 min",
      completed: true,
      locked: false,
      content: [
        {
          type: "text",
          text: "A blockchain is a distributed, decentralized ledger that records transactions across many computers. Think of it as a shared Google Doc that no single person controls.",
        },
        {
          type: "highlight",
          text: "Key Insight: Once data is recorded on a blockchain, it's nearly impossible to change or delete.",
        },
        {
          type: "text",
          text: "Each 'block' contains a set of transactions. When a block is full, it gets chained to the previous block — hence the name 'blockchain'.",
        },
        {
          type: "bullets",
          items: [
            "Decentralized — no single owner",
            "Transparent — anyone can verify",
            "Immutable — data cannot be altered",
            "Secure — cryptographically protected",
          ],
        },
      ],
    },
    {
      id: "l2",
      moduleId: "m1",
      title: "How Transactions Work",
      emoji: "💸",
      xpReward: 100,
      duration: "6 min",
      completed: true,
      locked: false,
      content: [
        {
          type: "text",
          text: "A blockchain transaction is a record of value transfer between two parties. Before it's added to the blockchain, it must be validated by the network.",
        },
        {
          type: "highlight",
          text: "Every transaction is signed with a private key — your digital signature that proves you authorized it.",
        },
        {
          type: "text",
          text: "Validators (or miners in some networks) check the transaction is valid and add it to the next block.",
        },
      ],
    },
    {
      id: "l3",
      moduleId: "m1",
      title: "Consensus Mechanisms",
      emoji: "🤝",
      xpReward: 100,
      duration: "7 min",
      completed: true,
      locked: false,
      content: [
        {
          type: "text",
          text: "A consensus mechanism is the method by which nodes on a blockchain network agree on the current state of the ledger.",
        },
        {
          type: "bullets",
          items: [
            "Proof of Work (PoW) — used by Bitcoin, energy intensive",
            "Proof of Stake (PoS) — validators stake tokens",
            "Stellar Consensus Protocol (SCP) — fast, low-energy",
          ],
        },
      ],
    },
    {
      id: "l4",
      moduleId: "m1",
      title: "Public & Private Keys",
      emoji: "🔑",
      xpReward: 100,
      duration: "5 min",
      completed: false,
      locked: false,
      content: [
        {
          type: "text",
          text: "Cryptographic key pairs are the foundation of blockchain identity. Your public key is your address, visible to everyone. Your private key is your password — never share it.",
        },
        {
          type: "highlight",
          text: "Warning: If you lose your private key, you lose access to your assets forever. No password reset exists.",
        },
      ],
    },
    {
      id: "l5",
      moduleId: "m1",
      title: "Wallets Explained",
      emoji: "👛",
      xpReward: 100,
      duration: "5 min",
      completed: false,
      locked: false,
      content: [
        {
          type: "text",
          text: "A crypto wallet doesn't actually store your crypto — it stores your private keys. The assets live on the blockchain.",
        },
        {
          type: "bullets",
          items: [
            "Hot wallets — connected to internet, convenient",
            "Cold wallets — offline, maximum security",
            "Custodial — third party holds keys",
            "Non-custodial — you hold your own keys",
          ],
        },
      ],
    },
  ],
  m2: [
    {
      id: "l6",
      moduleId: "m2",
      title: "Stellar Overview",
      emoji: "⭐",
      xpReward: 100,
      duration: "6 min",
      completed: true,
      locked: false,
      content: [
        {
          type: "text",
          text: "Stellar is an open-source, decentralized blockchain network focused on enabling fast, low-cost cross-border payments and financial inclusion.",
        },
        {
          type: "highlight",
          text: "Stellar processes transactions in 3-5 seconds with fees of just 0.00001 XLM (fractions of a cent).",
        },
        {
          type: "text",
          text: "Founded in 2014 by Jed McCaleb and Joyce Kim, Stellar's mission is to provide universal access to the global financial system.",
        },
      ],
    },
    {
      id: "l7",
      moduleId: "m2",
      title: "XLM — The Native Token",
      emoji: "💫",
      xpReward: 100,
      duration: "5 min",
      completed: false,
      locked: false,
      content: [
        {
          type: "text",
          text: "Lumens (XLM) is the native digital currency of the Stellar network. It serves as a bridge currency for cross-asset transactions and pays network fees.",
        },
        {
          type: "bullets",
          items: [
            "Minimum balance: 1 XLM to open an account",
            "Transaction fee: 0.00001 XLM",
            "Total supply: 50 billion XLM",
            "No mining — all XLM was created at genesis",
          ],
        },
      ],
    },
  ],
};

export const QUIZZES: Record<string, any> = {
  l1: {
    lessonId: "l1",
    questions: [
      {
        id: "q1",
        question: "What is a blockchain?",
        options: [
          "A centralized database owned by one company",
          "A distributed ledger that records transactions across many computers",
          "A type of cryptocurrency",
          "A government financial system",
        ],
        correctIndex: 1,
        explanation:
          "A blockchain is a distributed, decentralized ledger that records transactions across many computers with no single owner.",
      },
      {
        id: "q2",
        question: "What happens to data once it's recorded on a blockchain?",
        options: [
          "It can be easily edited by admins",
          "It expires after 30 days",
          "It is nearly impossible to change or delete",
          "It gets automatically deleted after 1 year",
        ],
        correctIndex: 2,
        explanation:
          "Blockchain data is immutable — once recorded, it's cryptographically secured and nearly impossible to alter.",
      },
      {
        id: "q3",
        question: "What does each 'block' in a blockchain contain?",
        options: [
          "A single large file",
          "User passwords",
          "A set of transactions",
          "Browser cookies",
        ],
        correctIndex: 2,
        explanation:
          "Each block contains a set of validated transactions. When full, it's chained to the previous block.",
      },
      {
        id: "q4",
        question: "Which of these is NOT a characteristic of blockchain?",
        options: ["Decentralized", "Transparent", "Owned by banks", "Secure"],
        correctIndex: 2,
        explanation:
          "Blockchain is NOT owned by banks — it's decentralized with no single owner, making it open and trustless.",
      },
    ],
  },
  l6: {
    lessonId: "l6",
    questions: [
      {
        id: "q5",
        question: "How fast does Stellar process transactions?",
        options: ["10 minutes", "1 hour", "3-5 seconds", "24 hours"],
        correctIndex: 2,
        explanation:
          "Stellar is extremely fast, processing transactions in just 3-5 seconds.",
      },
      {
        id: "q6",
        question: "What is Stellar's primary focus?",
        options: [
          "Gaming NFTs",
          "Fast, low-cost cross-border payments",
          "Decentralized social media",
          "Cloud storage",
        ],
        correctIndex: 1,
        explanation:
          "Stellar focuses on enabling fast, low-cost cross-border payments and financial inclusion.",
      },
      {
        id: "q7",
        question: "When was Stellar founded?",
        options: ["2009", "2012", "2014", "2020"],
        correctIndex: 2,
        explanation:
          "Stellar was founded in 2014 by Jed McCaleb and Joyce Kim.",
      },
    ],
  },
};

export const CERTIFICATES = [
  {
    id: "cert1",
    title: "Blockchain Pioneer",
    emoji: "🏆",
    description: "Completed all Blockchain Fundamentals lessons",
    dateEarned: "2024-01-15",
    xpAwarded: 500,
    xlmAwarded: 5,
    moduleId: "m1",
    nftHash: "GBXXX...1234",
    color: "#FF6B35",
    rarity: "Rare",
  },
  {
    id: "cert2",
    title: "Stellar Explorer",
    emoji: "⭐",
    description: "First lesson on the Stellar Network",
    dateEarned: "2024-01-20",
    xpAwarded: 100,
    xlmAwarded: 1,
    moduleId: "m2",
    nftHash: "GBYYY...5678",
    color: "#FFD700",
    rarity: "Common",
  },
];

export const LEADERBOARD = [
  { rank: 1, name: "María González", xp: 12500, streak: 45, avatar: "👩‍🎓", badge: "🏆" },
  { rank: 2, name: "Carlos Ruiz", xp: 11200, streak: 38, avatar: "👨‍💻", badge: "🥈" },
  { rank: 3, name: "Ana López", xp: 10800, streak: 32, avatar: "👩‍🚀", badge: "🥉" },
  { rank: 4, name: "Diego Martín", xp: 9500, streak: 28, avatar: "🧑‍🎨", badge: "" },
  { rank: 5, name: "Sofía Herrera", xp: 8900, streak: 25, avatar: "👩‍🔬", badge: "" },
  { rank: 6, name: "Luis Torres", xp: 7800, streak: 20, avatar: "🧑‍💼", badge: "" },
  { rank: 7, name: "Valentina Cruz", xp: 6700, streak: 15, avatar: "👩‍🎤", badge: "" },
  { rank: 8, name: "Tú", xp: 3400, streak: 7, avatar: "😎", badge: "", isCurrentUser: true },
  { rank: 9, name: "Pablo Jiménez", xp: 3100, streak: 5, avatar: "🧑‍🍳", badge: "" },
  { rank: 10, name: "Isabella Moreno", xp: 2800, streak: 4, avatar: "👩‍🏫", badge: "" },
];
