export type Category = {
    id: number,
    name: string;
}

export type Media = {
    content: string,
    type: string;
}

export type ArticleContent = {
    articleId: number,
    media: Array<Media>,
    paragraph: string;
}

export type Article = {
    category: Array<Category>,
    content: Array<ArticleContent>,
    cover: string,
    date?: string,
    email?: string,
    id?: number,
    name?: string,
    status?: string,
    surname?: string,
    title: string,
    userId?: number;
}