import Container from '@material-ui/core/Container';
import {SlateLineupPreviewEl}  from "../../components/slateLineup";
import {SlateLineup} from "../../types";
import {getSlateLineupsConfig} from "../../data/local/slateLineups";

export default function Home({slateLineups} : {slateLineups: SlateLineup[]}) {
  return (
    <Container maxWidth="md">
      <h2>Slate Lineups</h2>
      { slateLineups.map(slateLineup => <SlateLineupPreviewEl slateLineup={slateLineup} key={slateLineup.id}/>) }<br/>
    </Container>
    )
}

export async function getStaticProps() {
  const slateLineups = await getSlateLineupsConfig();

  if (!slateLineups) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      slateLineups
    },
  }
}
