import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) {
    return {
      url: () => "",
      width: () => ({ url: () => "", height: () => ({ url: () => "" }) }),
      height: () => ({ url: () => "" }),
      format: () => ({ url: () => "" }),
    };
  }
  return builder.image(source).auto("format").fit("max");
}
