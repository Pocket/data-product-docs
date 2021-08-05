import { promises as fs } from 'fs'
import {SlateLineup} from "../../types";
import path from 'path'
import {getSlateLineupsBySlateIdFromLineup} from "./util";

export async function getSlateLineupsConfig() : Promise<SlateLineup[]> {
  const filePath = path.join(process.cwd(), 'data', 'local', 'json', 'slate_lineup_configs.json');
  const fileContents = await fs.readFile(filePath, 'utf8');

  const slates = JSON.parse(fileContents);

  return slates as SlateLineup[];
}

export async function getSlateLineupConfig(id: string) : Promise<SlateLineup | undefined> {
  const lineups = await getSlateLineupsConfig();
  return lineups.find((sl: SlateLineup) => sl.id === id);
}

export async function getSlateLineupsBySlateId(id: string) : Promise<SlateLineup[]> {
  const lineups = await getSlateLineupsConfig();

  return getSlateLineupsBySlateIdFromLineup(id, lineups);
}
