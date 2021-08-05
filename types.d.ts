export type SlateExperiment = {
  description: string;
  rankers: string[];
  candidateSets: string[];
}

export type Slate = {
  id: string;
  displayName: string;
  description: string;
  sla: string;
  refresh: string;
  experiments: SlateExperiment[];
}

export type SlateLineupExperiment = {
  description: string;
  rankers: string[];
  slates: string[];
}

export type SlateLineup = {
  id: string;
  description: string;
  experiments: SlateLineupExperiment[]
}

export type ItemPreview = {
  topImageUrl: string;
  title: string;
  resolvedUrl: string;
  excerpt: string;
}
