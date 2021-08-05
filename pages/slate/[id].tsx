import Container from '@material-ui/core/Container';
import {ItemPreview, Slate, SlateLineup} from "../../types";
import {getSlateConfig, getSlatePreviewItems, getSlatesConfig} from "../../remote/slates";
import {SlateDetailEl} from "../../components/slate";
import {getSlateLineupBySlateId} from "../../remote/slateLineups";

export default function Index({slate, lineups,previewItems} : {slate: Slate, lineups: SlateLineup[], previewItems: ItemPreview[] | undefined}) {
  return (
      <SlateDetailEl slate={slate} previewItems={previewItems} slateLineups={lineups}/>
    )
}

export async function getStaticPaths() {
  const slates = await getSlatesConfig();

  return {
    paths: slates.map((slate: Slate) => ({ params: { id: slate.id } })),
    fallback: false,
  }
}

export async function getStaticProps({params}: {params: any}) {
  const {id} = params;
  const slate = await getSlateConfig(id);
  const lineups = await getSlateLineupBySlateId(id);
  // TODO: move previewItems to client side
  const previewItems = await getSlatePreviewItems(id) || null;

  if (!slate) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      slate,
      lineups,
      previewItems
    },
  }
}
