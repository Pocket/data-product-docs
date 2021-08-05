import React from "react";
import {SlateExperiment, Slate, ItemPreview, SlateLineup, SlateLineupExperiment} from "../types";
import {Link} from "@material-ui/core";

export function SlateLineupPreviewEl({slateLineup}: {slateLineup: SlateLineup}) {
  return (
    <p>
      <h3><Link href={`/slate-lineup/${slateLineup.id}`}>{slateLineup.description}</Link></h3>
      <div>Id: {slateLineup.id}</div>
    </p>
  );
}

function RankersEl(rankers: string[]) {
  if (rankers.length <= 0) {
    return <p>No Rankers</p>;
  }
  return (
    <ul>
      {rankers.map((r) => <li key={r}>{r}</li>)}
    </ul>
  )
}

function ExperimentPreviewEl({experiment}: {experiment: SlateLineupExperiment}) {
  return (
    <div>
      <h4>{experiment.description}</h4>
      <div>
        <h5>Rankers</h5>
        {RankersEl(experiment.rankers)}
      </div>
      <div>
        <h5>Slates</h5>
        <ul>
          {experiment.slates.map((s) => <li key={s}><Link href={`/slate/${s}`}>{s}</Link></li>)}
        </ul>
      </div>
    </div>
  );
}

export function SlateLineupDetailEl({slateLineup}: {slateLineup: SlateLineup}) {
  return (
    <React.Fragment>
      <h2>{slateLineup.id}</h2>
      <p>{slateLineup.description}</p>

      <h3>Experiments</h3>
      {slateLineup.experiments.map(e => <ExperimentPreviewEl key={e.description} experiment={e}/>)}

    </React.Fragment>
  );
}
