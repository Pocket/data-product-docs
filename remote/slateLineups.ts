import {SlateLineup} from "../types";
import { promises as fs } from 'fs'
import path from 'path'

export async function getSlateLineupsConfig() : Promise<SlateLineup[]> {
  const filePath = path.join(process.cwd(), 'data', 'slate_lineup_configs.json');
  const fileContents = await fs.readFile(filePath, 'utf8');

  const slates = JSON.parse(fileContents);

  return slates as SlateLineup[];
}

export async function getSlateLineupConfig(id: string) : Promise<SlateLineup | undefined> {
  const lineups = await getSlateLineupsConfig();
  return lineups.find((sl: SlateLineup) => sl.id === id);
}

export async function getSlateLineupBySlateId(id: string) : Promise<SlateLineup[]> {
  const lineups = await getSlateLineupsConfig();

  return lineups.filter(l => l.experiments.find(e => e.slates.includes(id)));
}
