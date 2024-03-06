import createImageUrlBuilder from "@sanity/image-url"
import type { Image } from "sanity"
import { client } from "./sanity"

const clientData = client;

const ImageBuilder = createImageUrlBuilder ({
    dataset: "production",
    projectId: "sds9vkem",
})

export const urlForImage = (source: Image) => {
    return ImageBuilder?.image(source).auto("format").fit("max")
}