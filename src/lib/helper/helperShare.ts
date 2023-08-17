import "share-api-polyfill";
import { SITE_LINK } from "../../const/data.ts";

export const share = async (title: string, text: string, url: string): Promise<void> => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = new URL(url, SITE_LINK).toString();
  }
  return await navigator.share({
    title,
    text,
    url,
  });
};
