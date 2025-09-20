// src/lib/utils/normalize.ts
export function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // diacritics
    .replace(/[^a-z\s]/g, "") // keep letters/spaces only
    .replace(/\s+/g, " ")
    .trim();
}
