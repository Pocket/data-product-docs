import React from "react";
import {SlateExperiment, Slate, ItemPreview, SlateLineup} from "../types";
import {Link, Tooltip} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import HelpIcon from '@material-ui/icons/Help';

function ExperimentPreviewEl({experiment}: {experiment: SlateExperiment}) {
  return (
    <div>
      <h4>{experiment.description}</h4>
      <div>
        Rankers
        <ul>
          {experiment.rankers.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </div>
      <div>
        Candidate Sets
        <ul>
          {experiment.candidateSets.map((cs) => <li key={cs}>{cs}</li>)}
        </ul>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function ItemPreviewCard({item}: {item: ItemPreview}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={item.resolvedUrl} target="_new">
        <CardMedia
          className={classes.media}
          image={item.topImageUrl}
          title={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function SlateDetailEl({slate, previewItems, slateLineups}: {slate: Slate, slateLineups: SlateLineup[], previewItems: ItemPreview[] | undefined}) {
  return (
    <React.Fragment>
      <h2>{slate.displayName}</h2>
      <pre>id: {slate.id}</pre>
      <p>{slate.description}</p>

      <h3>Experiments</h3>
      {slate.experiments.map(e => <ExperimentPreviewEl key={e.description} experiment={e}/>)}

      <h3>
        Slate Lineups
        <Tooltip title="List of slate lineups that include this slate.">
          <HelpIcon color="primary" fontSize="small"/>
        </Tooltip>
      </h3>
      {slateLineups.map(l => <p key={l.id}><Link href={`/slate-lineup/${l.id}`}>{l.description}</Link></p>)}


      <h3>Preview</h3>
      {previewItems?.map(item => <ItemPreviewCard key={item.resolvedUrl} item={item} />)}

    </React.Fragment>
  );
}
