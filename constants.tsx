
import React from 'react';
import { EventId, EventDetail } from './types';

export const EVENTS: EventDetail[] = [
  {
    id: EventId.CONNECTIONS,
    name: "Connections",
    prefix: "CON",
    teamSize: 2,
    description: "A high-stakes, three-round challenge testing logical sequencing and visual identification. Total capacity: 50 teams.",
    whatsappLink: "https://chat.whatsapp.com/H5EVZnsEYm09Hp3knZ77S0",
    staffCoordinator: "Ms.S.V.Kavitha",
    studentCoordinator: "Mahalakshmi",
    studentContact: "8248863560",
    rounds: [
      {
        name: "ROUND 1 – GUESS THE WORD",
        details: "25 questions. Each has 4 related images. Identify the single common word connecting them. Top 25 teams advance."
      },
      {
        name: "ROUND 2 – REARRANGE THE STORY",
        details: "20 questions. A process name is given with 4 jumbled images. Arrange images in the correct logical sequence. Top 10 teams advance."
      },
      {
        name: "ROUND 3 – BUZZER BLITZ",
        details: "12 questions with 2-3 images. First team to press the buzzer answers within 10 seconds. Pass-on rules apply."
      }
    ],
    rules: [
      "Team size: 2 participants per team",
      "Approx. 7–8 teams per department allowed",
      "Use of mobile phones or external help is strictly prohibited",
      "Answers once submitted cannot be changed",
      "Teams must maintain discipline and fair play",
      "The decision of the judges is final and binding"
    ],
    criteria: [
      "Connection Accuracy",
      "Logical Sequencing",
      "Buzzer Response Time",
      "Fair Play"
    ]
  },
  {
    id: EventId.QUIZ,
    name: "Quiz",
    prefix: "QU",
    teamSize: 2,
    description: "Test your scientific prowess in this time-based competitive event.",
    whatsappLink: "https://chat.whatsapp.com/KnLZ7UZgVO1Au3fDS63J2R",
    staffCoordinator: "Dr.V.Gayathri",
    studentCoordinator: "Thamarai Selvi",
    studentContact: "8925027937",
    rounds: [
      {
        name: "Round 1: Prelims",
        details: "Conducted on Kahoot. All teams participate. Top 10–15 teams with highest score & maximum correct answers qualify."
      },
      {
        name: "Round 2: Finals",
        details: "Live questions. Teams raise hand / object to answer. First team gets the chance."
      }
    ],
    criteria: [
      "Correctness and response time",
      "Judges' decision is final"
    ],
    rules: [
      "Type: Time-based competitive event",
      "Duration: Approximately 2–3 hours",
      "Participation: Team event (2 members per team)"
    ]
  },
  {
    id: EventId.POSTER,
    name: "Poster Presentation",
    prefix: "PP",
    teamSize: 2,
    description: "Visualize and present cutting-edge scientific concepts.",
    whatsappLink: "https://chat.whatsapp.com/JRfKlAoTbDW5D6Q3dl9vPD",
    staffCoordinator: "Ms.A.Swarnamugi",
    studentCoordinator: "Bharath Kumar",
    studentContact: "9566707595",
    rounds: [
      {
        name: "Round 1: Prelims (Odd One Out – Visual Puzzle)",
        details: "Consists of 20 questions. 4 images will be shown on the screen for each question. 3 images related to the concept and 1 image is odd. Identify the odd image. Selection based on marks & time."
      },
      {
        name: "Round 2: Finals",
        details: "Poster topic will be given. The presentation must be related only to the given topic. AI-generated presentation not allowed. Presentation Time: 5 to 10 minutes."
      }
    ],
    criteria: [
      "Creativity",
      "Clarity",
      "Understanding of topic",
      "Presentation skills & confidence"
    ],
    rules: [
      "Duration: Approximately 3 hours",
      "Participation: Team event (2 members)"
    ]
  },
  {
    id: EventId.MEME,
    name: "Science Meme Creation",
    prefix: "SMC",
    teamSize: 2,
    description: "Combine humor and science in this creative digital challenge.",
    whatsappLink: "https://chat.whatsapp.com/LnPUPuwABojCgy9seMIrrc",
    staffCoordinator: "Ms.S.V.Kavitha",
    studentCoordinator: "Kavin Murugu",
    studentContact: "7339670909",
    rules: [
      "Only teams of 2 members",
      "Meme must be related to science and scientific concepts",
      "Created during competition time only",
      "No plagiarism or offensive content",
      "Any digital tool allowed, but content must be original",
      "Judges' decision is final"
    ]
  },
  {
    id: EventId.TREASURE_HUNT,
    name: "Treasure Hunt",
    prefix: "TH",
    teamSize: 4,
    description: "The ultimate scientific adventure. Solve clues and find the hidden treasure.",
    whatsappLink: "https://chat.whatsapp.com/JHliurZGlUhDRPLvaBT3cF",
    staffCoordinator: "Ms.A.Swarnamugi",
    studentCoordinator: "Arun Gopi",
    studentContact: "7395817044",
    rounds: [
      {
        name: "Preliminary Round: Jumbled Words",
        details: "Offline/Written. Teams will be given 20 jumbled words related to scientific concepts. Teams must identify and write the correct sentence. Top 10 teams with highest score qualify for the final round."
      },
      {
        name: "Final Round: The Hunt",
        details: "10 clues across 10 locations. Each clue leads to next location. First team to find treasure wins."
      }
    ],
    rules: [
      "Team size: 4 members",
      "Max 3 teams per department",
      "No mobile, internet, or gadgets allowed during the hunt",
      "Teams must move together",
      "Respect environment - no damage to locations",
      "Judges' decision is final"
    ]
  },
  {
    id: EventId.IOT,
    name: "IoT Project Display",
    prefix: "IOT",
    teamSize: 6,
    description: "Showcase your Internet of Things project with innovative solutions and smart technology.",
    whatsappLink: "https://chat.whatsapp.com/KrRnwdm0xdm40YPQ5KtBb5",
    studentCoordinator: "Jennifer",
    studentContact: "9342824414",
    rules: [
      "Team size: 6 members per team",
      "Complete your IoT project a day before the event",
      "Participants should purchase and bring all the IoT materials required for their project",
      "Incase of need extension cords,participants must arrange for it themselves",
      "Teams can choose their own topic",
      "Judges' decision is final"
    ]
  },
  {
    id: EventId.APPLICATION_DISPLAY,
    name: "Application Display",
    prefix: "APP",
    teamSize: 2,
    description: "Present your innovative application that solves real-world problems through technology.",
    whatsappLink: "https://chat.whatsapp.com/KrRnwdm0xdm40YPQ5KtBb5",
    studentCoordinator: "Jennifer",
    studentContact: "9342824414",
    rules: [
      "Each team must consist of 2 members",
      "Participants should bring their own laptop",
      "Internet reqiurements should be arranged by the participants themselves",
      "Teams are free to choose their own topic",
      "The chosen topic should provide a solution to a real-world problem",
      "Judges' decision is final"
    ]
  }
];
