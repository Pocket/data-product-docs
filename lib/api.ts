import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import {Surface} from "../types";

const surfacesDirectory = join(process.cwd(), '_docs', 'surfaces')

export function getSurfaceSlugs() {
  return fs.readdirSync(surfacesDirectory)
}

export function getSurfaceBySlug(slug: string) : Surface {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(surfacesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    content: content,
    name: data.name,
  }
}

export function getAllSurfaces(): Surface[] {
  return getSurfaceSlugs().map((slug) => getSurfaceBySlug(slug))
}
