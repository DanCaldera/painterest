export interface Image {
  account_id: number
  account_url: string
  ad_config: any
  ad_type: number
  ad_url: string
  comment_count: number
  cover: string
  cover_height: number
  cover_width: number
  datetime: number
  description: string | null
  downs: number
  favorite: boolean
  favorite_count: number
  id: number
  images: string[]
  images_count: number
  in_gallery: boolean
  in_most_viral: boolean
  include_album_ads: boolean
  is_ad: boolean
  is_album: boolean
  layout: string
  link: string
  nsfw: boolean
  points: number
  privacy: string
  score: number
  section: number
  tags: string[]
  title: string
  topic: string | null
  topic_id: string | null
  ups: number
  views: number
  vote: any
}
