export type TestimonialOrigin =
  | 'AppStore'
  | 'PlayStore'
  | 'WindowsStore'
  | 'Twitter'
  | 'LinkedIn'

export type TestimonialAuthor = {
  name: string
  title?: string
  profilePictureUrl?: string
  profileUrl?: string
}

export type Testimonial = {
  author: TestimonialAuthor
  content: string | JSX.Element
  rating?: number
  date: Date
  origin: TestimonialOrigin
  sourceUrl?: string
}

