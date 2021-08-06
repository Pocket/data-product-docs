import {Link} from "@material-ui/core";
import {getSlateLineupConfig} from "../../data/local/slateLineups";
import {getAllSurfaces} from "../../lib/api";
import {Surface} from "../../types";

export default function SurfaceIndex({surfaces}: {surfaces: Surface[]}) {
  return (
    <ul>
      {surfaces.map(s => <li key={s.slug}><Link href={`/surface/${s.slug}`}>{s.name}</Link></li>)}
    </ul>
  );
}


export async function getStaticProps({params}: {params: any}) {
  const surfaces = getAllSurfaces();

  return {
    props: {
      surfaces,
    },
  }
}
