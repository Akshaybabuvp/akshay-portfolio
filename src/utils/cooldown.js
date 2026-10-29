// Spam protection: after a successful send, the visitor must wait before
// sending again. The time is remembered in the browser (localStorage).
const STORAGE_KEY = 'portfolio-contact-last-sent';
const COOLDOWN_MS = 60 * 1000;

export function getCooldownSecondsLeft() {
  try {
    const lastSent = Number(localStorage.getItem(STORAGE_KEY));
    if (!lastSent) return 0;
    const remaining = COOLDOWN_MS - (Date.now() - lastSent);
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
  } catch {
    return 0; // storage blocked (private mode): skip the cooldown
  }
}

export function markMessageSent() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // ignore: the form still works without the cooldown
  }
}
