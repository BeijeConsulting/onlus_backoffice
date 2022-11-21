import { Dayjs } from "dayjs";

export type Category = {
  id: number;
  name: string;
};

export type Media = {
  id?: number;
  content: string;
  type: string;
  contentId?: number;
  title: string
};

export type ArticleContent = {
  id?: number;
  articleId?: number;
  paragraph: string;
  media: Array<Media>
};

export type Article = {
  id?: number;
  userId?: number;
  name?: string;
  surname?: string;
  email?: string;
  title: string;
  status: string;
  coverContent: string;
  coverTitle: string;
  coverType: string;
  category: Array<Category>;
  date?: string;
  content: Array<ArticleContent>;
};

export type User = {
  disableDate?: string;
  email: string;
  id?: number;
  language: string;
  name: string;
  surname: string;
  password: string;
  phone: string;
  publishedArticles?: number;
  role: Array<string> | number;
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
  id?: number;
  websiteName: string;
  logoContent: string;
  logoTitle: string;
  logoType: string;
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
  coverContent: string;
  coverTitle: string;
  coverType: string;
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
  mediaTitle: string;
  mediaType: string;
  paragraph: string;
};

export type AboutHero = {
  mediaContent: string;
  mediaTitle: string;
  mediaType: string;
  subtitle?: string;
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

export type SingleSocial = {
  footerOn: boolean;
  homepageOn: boolean;
  iconContent: string;
  iconTitle: string;
  iconType: string;
  id?: Number;
  link: string;
  name: string;
};

export type SupportContent = {
  id: number;
  mediaContent: string;
  mediaTitle: string;
  mediaType: string;
  paragraph: string;
};

export type SupportHero = {
  mediaContent: string;
  mediaTitle: string;
  mediaType: string;
  subtitle: string;
  text: string;
};

export type SupportTitle = {
  id: number;
  title: string;
};

export type Support = {
  content: Array<SupportContent>;
  hero: SupportHero;
  title: SupportTitle;
};
