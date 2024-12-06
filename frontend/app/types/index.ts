// types/index.ts

export type SettingsType = {
  _id: string;
  siteName: string;
  address: string;
  footerDescription: string;
  rightReservedText: string;
  logo: {
    alt: string;
    image: string;
  };
  headerItems: {
    _key: string;
    _type: string;
    navTitle: string;
  }[];
  externalLinks: {
    _key: string;
    _type: string;
    externalLinkImage: string;
    externalUrl: string;
  }[];
  contactUs: string;
  contactNumber: string;
  contactIcon: string;
};

export type WatyLearningHomepageType = {
  title: string;
  header: {
    motto: string;
    headerTitle: string;
    headerDescription: string;
    firstLinkTitle: string;
    secondLinkTitle: string;
  };
  about: {
    aboutTitle: string;
    aboutDescription: string;
    aboutContent: string;
    firstLinkTitle: string;
    firstLinkDescription: string;
    secondLinkTitle: string;
    secondLinkDescription: string;
    image: {
      alt: string;
      image: string;
    };
  };
  vision: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
      image: string;
    }[];
  };
  events: {
    title: string;
    description: string;
    items: {
      courseTitle: string;
      courseDescription: string;
      courseDateTitle: string;
      courseDate: string;
      coursePeriodTitle: string;
      coursePeriod: string;
      enrollNowAction: string;
      image: string;
      price: string;
      discountedPrice: string;
    }[];
  };
  courses: {
    title: string;
    subTitle: string;
    description: string;
    items: {
      courseCategory: string;
      courses: {
        courseTitle: string;
        courseDuration: string;
        Tag: string;
        price: string;
        discountedPrice: string;
        enrollNowAction: string;
        image: string;
        courseDate: string;
        courseDescription: string;
      }[];
    }[];
  };
  testimonials: {
    title: string;
    items: {
      reviewer: string;
      reviewerRole: string;
      review: string;
      reviewerImage: string;
    }[];
  };
  gallery: {
    title: string;
    items: {
      image: string;
    }[];
  };
  form: {
    nameTitle: string;
    emailTitle: string;
    phoneTitle: string;
    contactEmail:string;
    emailContent: string;
    emailContentForUs: string;
  };
};
