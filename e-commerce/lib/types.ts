export interface Product {
    id: string
    name: string
    price: number
    category: string
    image_url: string
    rating: number
    review_count: number
    short_description: string
    isNew?: boolean
    isFeatured?: boolean
    isOnsale?: boolean
    sale_price?: number
    [key: string]: any; // Allow additional properties if needed
  }