import { TeamRegistration, EventId } from "./types";

// Storage key for local data
const STORAGE_KEY = "nsd_2026_registrations";

/**
 * Helper to get all registrations from local storage
 */
const getLocalData = (): TeamRegistration[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

/**
 * Helper to save registrations to local storage
 */
const saveLocalData = (data: TeamRegistration[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const registerTeam = async (
  data: Omit<TeamRegistration, "team_code">,
  prefix: string,
): Promise<TeamRegistration> => {
  const registrations = getLocalData();

  // 1. Calculate next team code based on existing event entries
  const eventRegistrations = registrations.filter(
    (r) => r.event_id === data.event_id,
  );
  const nextNumber = eventRegistrations.length + 1;
  const teamCode = `${prefix}${nextNumber.toString().padStart(3, "0")}`;

  // 2. Prepare the new record
  const newRegistration: TeamRegistration = {
    ...data,
    id: crypto.randomUUID(),
    team_code: teamCode,
    created_at: new Date().toISOString(),
  };

  // 3. Save to storage
  registrations.push(newRegistration);
  saveLocalData(registrations);

  // Simulate network delay for UI feedback
  await new Promise((resolve) => setTimeout(resolve, 800));

  return newRegistration;
};

export const getAllRegistrations = async (): Promise<TeamRegistration[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const data = getLocalData();

  // Sort by created_at descending
  return data.sort((a, b) => {
    return (
      new Date(b.created_at || "").getTime() -
      new Date(a.created_at || "").getTime()
    );
  });
};

export const deleteTeamRegistration = async (
  registrationId: string,
): Promise<void> => {
  const registrations = getLocalData();
  const filteredRegistrations = registrations.filter(
    (r) => r.id !== registrationId,
  );
  saveLocalData(filteredRegistrations);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
};

export const getRegistrationsByEvent = async (
  eventId: EventId,
): Promise<TeamRegistration[]> => {
  const data = getLocalData();
  return data
    .filter((r) => r.event_id === eventId)
    .sort((a, b) => a.team_code.localeCompare(b.team_code));
};
