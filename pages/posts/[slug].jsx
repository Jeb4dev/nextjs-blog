import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import Link from "next/link";
import { request } from "../../lib/datocms";
import { Image, StructuredText } from "react-datocms";

export default function Post(props) {
  const data = props.postData;
  const footer = props.footer;

  return (
    <Layout posts={props.allPostsData} footer={footer} formImage={false} meta={data._seoMetaTags} article={data}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <article>
        <div className={"flex justify-between pb-2"}>
          <div className={"flex gap-3"}>
            <Image
              data={data.author.image.responsiveImage}
              alt={"Illustrative image"}
              className={"rounded-full h-full"}
            />
            <p className={"text-xl"}>{data.author.name}</p>
          </div>
          <div className={"text-gray-600"}>
            <Date dateString={data.publishDate} />
          </div>
        </div>

        <div className={"h-[10rem] sm:min-h-[15rem] md:h-[25rem]"}>
          <Image
            data={data.coverImage.responsiveImage}
            alt={"Illustrative image"}
            className={"h-full w-full"}
            objectFit={"cover"}
          />
        </div>

        <Link className={"text-black"} href="/">
          ← <span className={"underline"}>Back to home</span>
        </Link>

        <h1 className={"font-bold text-3xl md:text-5xl py-4"}>{data.title}</h1>

        <StructuredText
          data={data.content}
          renderBlock={({ record }) => {
            switch (record.__typename) {
              case "ImageRecord":
                return <Image data={record.image.responsiveImage} />;
              default:
                return null;
            }
          }}
        />
      </article>
      <div>
        <div className={"w-full h-0.5 bg-[#DEDEDE] my-12"}></div>
        <h2 className={"font-bold text-3xl pb-8"}>Other posts</h2>
      </div>
    </Layout>
  );
}

const PATHS_QUERY = `
query MyQuery {
  allArticles {
    slug
  }
}
`;
export async function getStaticPaths() {
  const slugQuery = await request({
    query: PATHS_QUERY,
  });

  let paths = [];
  slugQuery.allArticles.map((p) => paths.push(`/posts/${p.slug}`));

  return {
    paths,
    fallback: false,
  };
}

const POST_QUERY = `
query MyQuery($slug: String, $first: IntType = "33") {
  article(filter: {slug: {eq: $slug}}) {
    author {
      name
      image {
        responsiveImage(imgixParams: {fit: crop, w: 32, h: 32, auto: format}) {
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
    content {
      value
      blocks {
        __typename
        ... on ImageRecord {
          id
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
      }
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
    id
    publishDate
    slug
    title
    metadata {
      twitterCard
      title
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
    _seoMetaTags {
      tag
      content
      attributes
    }
  }
  allArticles(first: $first, filter: {slug: {neq: $slug}}) {
    publishDate
    slug
    title
    excerpt
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
}
`;
export const getStaticProps = async ({ params }) => {
  const post = await request({
    query: POST_QUERY,
    variables: {
      slug: params.slug,
      first: 3,
    },
  });

  return {
    props: {
      postData: post.article,
      allPostsData: post.allArticles,
      footer: post.footer,
    },
  };
};
