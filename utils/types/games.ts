export type GameDto = {
  title: string
  description: string
  imageLink: string
  publisherId: string
  ageRestriction: number
  releaseYear: number
  genres: string[]
  platforms: string[]
  ratings: string[]
  comments: string[]
}

export type GameFormType = {
  title: string
  description: string
  gameImage: string
  publisherId: string
  ageRestriction: string
  releaseYear: string
  genres: {
    value: 'string',
    label: 'string'
  }[]
  platforms: {
    value: 'string',
    label: 'string'
  }[]
}

export type PublisherType = {
  id: string,
  name: string
}

export type GenreType = PublisherType;
export type PlatformsType = PublisherType;