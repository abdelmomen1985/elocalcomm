// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type UserType = {
  id: number;
  name: string;
};

export type StoreCategoryType = {
  default_items_categories: any;
  ext_data: any;
  id: number;
  media: any;
  name: { ar: string; en: string };
};

export type StoreType = {
  id: string;
  category_id: number;
  description: { ar: string; en: string };
  media: { icon: string; cover: string };
  name: { ar: string; en: string };
  slug: { ar: string; en: string };
  store_category: StoreCategoryType;
};

export type BranchType = {
  id: string;
  store_id: string;
  store: StoreType;
  created_at: string;
  updated_at: string;
  ext_data: any;
  lat: number;
  lng: number;
  name: { ar: string; en: string };
  category_id: number;
  store_category: StoreCategoryType;
};
