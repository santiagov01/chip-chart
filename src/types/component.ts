export interface ComponentSpec {
  key: string;
  value: string;
}

export interface Component {
  id: string;
  name: string;
  description: string;
  image?: string;
  datasheetUrl?: string;
  specifications: ComponentSpec[];
  subcategoryId: string;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  components: Component[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}
