export enum EventId {
  CONNECTIONS = "connections",
  QUIZ = "quiz",
  POSTER = "poster",
  MEME = "meme",
  TREASURE_HUNT = "treasure_hunt",
  IOT = "iot",
  APPLICATION_DISPLAY = "application_display",
}

export interface EventDetail {
  id: EventId;
  name: string;
  prefix: string;
  teamSize: number;
  description: string;
  rules: string[];
  rounds?: {
    name: string;
    details: string;
  }[];
  criteria?: string[];
  whatsappLink: string;
  staffCoordinator?: string;
  studentCoordinator: string;
  studentContact: string;
}

export interface TeamRegistration {
  id?: string;
  team_code: string;
  event_id: EventId;
  event_name: string;
  department: string;
  email: string;
  phone: string;
  member1: string;
  member2: string;
  member3?: string;
  member4?: string;
  member5?: string;
  member6?: string;
  created_at?: string;
}
