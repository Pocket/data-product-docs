import Layout from '../../components/layout'
import ReactMarkdown from 'react-markdown'
import {getAllSurfaces, getSurfaceBySlug} from "../../lib/api";
import {Surface} from "../../types";

export default function SurfacePage({ surface }: {surface: Surface}) {
  return (
    <Layout>
      <ReactMarkdown>{surface.content}</ReactMarkdown>
    </Layout>
  )
}

export async function getStaticProps({ params }: {params: {slug: string}}) {
  const surface = getSurfaceBySlug(params.slug)

  if (!surface) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      surface,
    },
  }
}

export async function getStaticPaths() {
  const surfaces = getAllSurfaces()

  return {
    paths: surfaces.map((surface) => {
      return {
        params: {
          slug: surface.slug,
        },
      }
    }),
    fallback: false,
  }
}
