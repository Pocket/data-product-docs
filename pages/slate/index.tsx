import Container from '@material-ui/core/Container';
import {Slate, SlateLineup} from "../../types";
import {getSlatesConfig} from "../../data/local/slates";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getSlateLineupsConfig} from "../../data/local/slateLineups";
import {getSlateLineupsBySlateIdFromLineup} from "../../data/local/util";
import {Link} from "@material-ui/core";

function getRow(slate: Slate, allLineups: SlateLineup[]) {
  const lineups = getSlateLineupsBySlateIdFromLineup(slate.id, allLineups);

  return {
    id: slate.id,
    description: slate.description,
    refresh: slate.refresh,
    experimentCount: slate.experiments.length,
    lineupCount: lineups.length,
  }
}

function SlateTable({slates, lineups}:{slates: Slate[], lineups: SlateLineup[]}) {
  const rows = slates.map(s => getRow(s, lineups));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Slates</TableCell>
            <TableCell align="right">Lineups</TableCell>
            <TableCell align="right">Refresh</TableCell>
            <TableCell align="right">Experiments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <div><Link href={`/slate/${row.id}`}>{row.description}</Link></div>
                <div>{row.id}</div>
              </TableCell>
              <TableCell align="right">{row.lineupCount}</TableCell>
              <TableCell align="right">{row.refresh}</TableCell>
              <TableCell align="right">{row.experimentCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Home({slates, lineups} : {slates: Slate[], lineups: SlateLineup[]}) {
  return (
    <Container maxWidth="md">
      <h2>Slates</h2>
      <SlateTable slates={slates} lineups={lineups}/>
    </Container>
    )
}

export async function getStaticProps() {
  const slates: Slate[] = await getSlatesConfig();
  const lineups: SlateLineup[] = await getSlateLineupsConfig();

  if (!slates) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      slates,
      lineups,
    },
  }
}
