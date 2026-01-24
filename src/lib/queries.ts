export const allRecordsQuery = `
  *[_type == "record"] | order(order asc) {
    title,
    "coverImage": coverImage.asset->url,
    "discImage": discImage.asset->url,
    "slug": slug.current,
    order
  }
`;

export const recordQuery = `
  *[_type == "record" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    priceCHF,
    releaseDate,
    "coverImage": coverImage.asset->url,
    description,
    "discImage": discImage.asset->url,
    "ogImage": ogImage.asset->url,
    careInstructionLink,
    "isCareInstructions": defined(careInstructionLink)
  }
`;

export const eventsQuery = `
  *[_type == "liveEvent" && date >= now()] | order(date asc) {
    _id,
    title,
    date,
    location,
    ticketLink
  }
`;
