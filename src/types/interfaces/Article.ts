export interface Article {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default interface ArticleProps {
  article: Article;
}
