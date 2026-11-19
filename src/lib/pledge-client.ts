/** Don't show a public count until it's big enough to look credible. */
export const MIN_PUBLIC_COUNT = 25;

const DEVICE_KEY = "civicplay:device";

/** A random id kept on this device, so one device is counted once. */
export function getDeviceId(): string {
  try {
    let id = window.localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export async function recordPledge(
  state: string,
): Promise<{ total: number; counted: boolean } | null> {
  try {
    const res = await fetch("/api/pledge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId: getDeviceId(), state }),
    });
    if (!res.ok) return null;
    return (await res.json()) as { total: number; counted: boolean };
  } catch {
    return null;
  }
}