import {ItemPreview, Slate} from "../types";
import { promises as fs } from 'fs'
import path from 'path'

export async function getSlatesConfig() : Promise<Slate[]> {
  const filePath = path.join(process.cwd(), 'data', 'slate_configs.json');
  const fileContents = await fs.readFile(filePath, 'utf8');

  const slates = JSON.parse(fileContents);

  return slates as Slate[];
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
