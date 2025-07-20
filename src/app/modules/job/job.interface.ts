export type Categories = "government" | "private" | "news" | "suggestion";


export type TJobPost = {
  slug: string;
  title: string;
  companyName: string;
  banner: string;
  images: string[];
  vacancy: number;
  websiteLink: string;
  published: string;
  applyStart: string;
  deadline: string;
  technology: string[];
  categories: Categories;
  description: string;
  views: number; //default
}