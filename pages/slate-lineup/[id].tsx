import {ItemPreview, SlateLineup} from "../../types";
import {getSlateLineupConfig, getSlateLineupsConfig} from "../../remote/slateLineups";
import {SlateLineupDetailEl} from "../../components/slateLineup";

export default function Index({slateLineup} : {slateLineup: SlateLineup}) {
  return (
      <SlateLineupDetailEl slateLineup={slateLineup}/>
    )
}

export async function getStaticPaths() {
  const slateLineups = await getSlateLineupsConfig();

  return {
    paths: slateLineups.map((slateLineup: SlateLineup) => ({ params: { id: slateLineup.id } })),
    fallback: false,
  }
}

export async function getStaticProps({params}: {params: any}) {
  const slateLineup = await getSlateLineupConfig(params.id);


  if (!slateLineup) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      slateLineup,
    },
  }
}
