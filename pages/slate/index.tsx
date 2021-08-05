import Container from '@material-ui/core/Container';
import {SlatePreviewEl}  from "../../components/slate";
import {Slate} from "../../types";
import {getSlatesConfig} from "../../remote/slates";

export default function Home({slates} : {slates: Slate[]}) {
  return (
    <Container maxWidth="md">
      <h2>Slates</h2>
      { slates.map(slate => <SlatePreviewEl key={slate.id} slate={slate}/>) }<br/>
    </Container>
    )
}

export async function getStaticProps() {
  const slates = await getSlatesConfig();

  if (!slates) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      slates
    },
  }
}
