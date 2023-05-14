import utilStyles from "../styles/utils.module.css";
import styles from "../components/layout.module.css";
import Layout from "../components/layout";
import { request } from "../lib/datocms";
import { Image } from "react-datocms";

export default function Home(props) {
  const { data } = props;
  const posts = data.allArticles;
  const footer = data.footer;
  const content = data.frontpageContent;
  return (
    <Layout home posts={posts} footer={footer} formImage={data.frontpageContent.formImage} meta={content._seoMetaTags}>
      <header className={styles.header}>
        <h1 className={utilStyles.heading2Xl}>{content.name}</h1>
        <Image data={content.image.responsiveImage} alt={"Profile picture of fox"} className={"rounded-full my-8"} objectFit={"cover"} />
        <h2 className={"text-center max-w-lg"}>{content.description}</h2>
      </header>
      <main className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <div className={"w-full h-0.5 bg-gray-500 my-16"}></div>
        <h2 className={utilStyles.headingXl}>Blog</h2>
      </main>
    </Layout>
  );
}

const HOMEPAGE_QUERY = `
query MyQuery {
  frontpageContent {
    image {
      responsiveImage {
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        base64
        aspectRatio
        alt
      }
    }
    name
    description
    formImage {
      responsiveImage {
        alt
        aspectRatio
        base64
        bgColor
        height
        sizes
        src
        srcSet
        title
        webpSrcSet
        width
      }
    }
    _seoMetaTags {
      tag
      content
      attributes
    }
  }
  footer {
    description
    image {
      responsiveImage {
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        base64
        aspectRatio
        alt
      }
    }
  }
  allArticles {
    author {
      name
    }
    content {
      value
    }
    coverImage {
      responsiveImage {
        width
        webpSrcSet
        title
        srcSet
        src
        sizes
        height
        bgColor
        base64
        aspectRatio
        alt
      }
    }
    excerpt
    id
    publishDate
    slug
    title
  }
}
`;
export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
  });
  return {
    props: { data },
  };
}
