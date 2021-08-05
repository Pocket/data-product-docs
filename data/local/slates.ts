import {ItemPreview, Slate} from "../../types";
import { promises as fs } from 'fs'
import path from 'path'

let slates: Slate[];

export async function getSlatesConfig() : Promise<Slate[]> {
  /*
  We look up slates often. Memoize here to reduce the build time disk iops.
  If we have more momization in the future lets decide on a strategy.
  https://dev.to/nioufe/you-should-not-use-lodash-for-memoization-3441
   */
  if (slates) {
    return slates;
  }

  const filePath = path.join(process.cwd(), 'data', 'local', 'json', 'slate_configs.json');
  const fileContents = await fs.readFile(filePath, 'utf8');

  slates = JSON.parse(fileContents) as Slate[];

  return slates;
}

export async function getSlateConfig(id: string) : Promise<Slate | undefined> {
  const slates = await getSlatesConfig();
  return slates.find((s: Slate) => s.id === id);
}

export async function getSlatePreviewItems(id: string) : Promise<ItemPreview[] | undefined> {
  const body = JSON.stringify({
    query:"query Query($getSlateSlateId: String!) {\n  getSlate(slateId: $getSlateSlateId) {\n    recommendations {\n      item {\n        topImageUrl\n        title\n        resolvedUrl\n        excerpt\n      }\n    }\n  }\n}\n",
    variables:{
      getSlateSlateId:id
    },
    operationName:"Query",
  });

  const res = await fetch(`https://client-api.getpocket.com`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body,
  });
  const data = await res.json();

  return data.data.getSlate?.recommendations.map((r: {item: ItemPreview}) => r.item);
}
