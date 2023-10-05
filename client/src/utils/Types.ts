export const validProductTypes = ['hamburguesa', 'salchipapa', 'alitas'];

export type Product = {
    product: [
        {
          product_type: string;
          product_name: string;
          product_version: string;
          image: string;
          price: string;
          description: string;
          disable: boolean;
          offers: number;
          rating: [
            {
              stars: number[];
              totalStars: number;
              comments: string[];
            }
          ];
        }
      ];
    
}