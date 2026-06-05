/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  price: number;
  image: string;
  bgColor: string; // Tailwind class or hex color
  textColor?: string;
  specs: string[];
  sizes: string[];
  bannerImage?: string;
  galleryImages?: string[];
  limitedEdition?: boolean;
}

export interface CartItem {
  id: string; // combo of product.id + '-' + size
  product: Product;
  size: string;
  quantity: number;
}
