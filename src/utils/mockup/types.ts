import { Dayjs } from "dayjs";

export type Category = {
  id: number;
  name: string;
};

export type Media = {
  content: string;
  type: string;
};

export type ArticleContent = {
  articleId: number;
  media: Array<Media>;
  paragraph: string;
};

export type Article = {
  category: Array<Category>;
  content: Array<ArticleContent>;
  cover: string;
  date?: string;
  email?: string;
  id?: number;
  name?: string;
  status?: string;
  surname?: string;
  title: string;
  userId?: number;
};

export type Banner = {
  btnText1: string;
  btnText2: string;
  id?: number;
  link: string;
  subtitle: string;
  title: string;
};

export type Contacts = {
  address: string;
  email: string;
  fiscalCode: string;
  id?: number;
  site: string;
  vatNumber: string;
};

export type Palette = {
  bgColor: string;
  id?: number;
  name: string;
  textColor: string;
};

export type SectionWork = {
  email: string;
  text: string;
};

export type Customization = {
  websiteName: string;
  logo: string;
  banner: Banner;
  contacts: Contacts;
  palette: Array<Palette>;
  sectionWork: SectionWork;
};

export type Donation = {
  name: string;
  surname: string;
  userId: number;
  amount: number;
  donationDate: string;
};

export type Event = {
  cover?: string;
  description?: string;
  eventDate?: string | Dayjs;
  place?: string;
  requirements?: string;
  title?: string;
  id?: Number | null;
};

export type AboutContent = {
  id: number;
  mediaContent: string;
  mediaType: string;
  paragraph: string;
};

export type AboutHero = {
  image: string;
  subtitle: string;
  text: string;
};

export type AboutTitle = {
  id: number;
  title: string;
};

export type AboutType = {
  content: Array<AboutContent>;
  hero: AboutHero;
  title: AboutTitle;
};

export type SupportContent = {
  id: number;
  mediaContent: string;
  mediaType: string;
  paragraph: string;
};

export type SupportHero = {
  image: string;
  subtitle: string;
  text: string;
};

export type SupportTitle = {
  id: number;
  title: string;
};

export type Support = {
  content: Array<AboutContent>;
  hero: AboutHero;
  title: AboutTitle;
};
