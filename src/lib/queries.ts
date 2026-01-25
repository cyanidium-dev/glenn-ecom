export const allRecordsQuery = `
  *[_type == "record"] | order(order asc) {
    title,
    "coverImage": coverImage{
      asset->{
        _id,
        url
      },
      crop,
      hotspot},
    "discImage": discImage{
      asset->{
        _id,
        url
      },
      crop,
      hotspot},
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
    "coverImage": coverImage{
      asset->{
        _id,
        url
      },
      crop,
      hotspot},
    description,
    "discImage": discImage{
      asset->{
        _id,
        url
      },
      crop,
      hotspot},
    "ogImage": ogImage{
      asset->{
        _id,
        url
      },
      crop,
      hotspot},
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
