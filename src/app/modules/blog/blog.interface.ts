export type Categories = "government" | "private" | "autonomous";


export type TBlogPost = {
  slug: string;
  title: string;
  companyName: string;
  banner: string;
  images: string[];
  vacancy: string;
  deadline: string;
  categories: Categories;
  departments: string[];
  description: string;
  views: number;
}