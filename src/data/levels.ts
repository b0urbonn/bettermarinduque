/**
 * Government levels used across the portal. Information is organized by the
 * level of government responsible for it: barangay and municipal halls first,
 * then the province, then national agencies.
 */
export type LevelKey = 'barangay' | 'municipal' | 'provincial' | 'national';

/** Nearest level first — the order most residents deal with government. */
export const levelOrder: readonly LevelKey[] = [
  'barangay',
  'municipal',
  'provincial',
  'national',
] as const;
