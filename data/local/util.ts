import {SlateLineup} from "../../types";

/*
import { promises as fs } from 'fs'
breaks rendering on react pages and in some contexts we need to filter data. This is a place
to put data utility functions without requiring access to the file system.
 */
export function getSlateLineupsBySlateIdFromLineup(id: string, lineups: SlateLineup[]) : SlateLineup[] {
  return lineups.filter(l => l.experiments.find(e => e.slates.includes(id)));
}
