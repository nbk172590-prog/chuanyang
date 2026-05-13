export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    description?: string;
    material?: string;
    waterMode?: string;
    colors?: string;
    code?: string;
    category?: string;
    details?: string;
    color?: string;
    isNew?: boolean;
    discount?: number | undefined ;
    rating?: number | undefined ;
    reviewCount?: number | undefined ;
    createdAt?:  string | number | Date
}