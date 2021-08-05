import {ItemPreview} from "../types";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export function ItemPreviewCard({item}: {item: ItemPreview}) {
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
