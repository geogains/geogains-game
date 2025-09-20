// src/lib/data/schema.ts
import { z } from "zod";

export const TierSchema = z.object({
  clue: z.string().min(3),
  fact: z.string().min(3),
});

export const CountryEntrySchema = z.object({
  iso3: z.string().length(3),
  name: z.string().min(2),
  tiers: z.array(TierSchema).length(10),
});

export const DatasetSchema = z.array(CountryEntrySchema).min(1);

export type Tier = z.infer<typeof TierSchema>;
export type CountryEntry = z.infer<typeof CountryEntrySchema>;
