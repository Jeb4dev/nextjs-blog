import Head from "next/head";
import {useRouter} from "next/router";
import {Image, renderMetaTags} from "react-datocms";
import styles from "./layout.module.css";
import Link from "next/link";
import Card from "./card";

export default function Layout({children, posts, footer, formImage, meta, article}) {

    const document = {
        "type": "root",
            "children": [
            {
                "type": "paragraph",
                "children": [
                    {
                        "type": "span",
                        "value": "Vercel is a cloud platform for serverless deployment that enables developers to easily deploy and manage their web applications and APIs. Here's a step-by-step guide to deploying your code into Vercel:"
                    }
                ]
            },
            {
                "type": "list",
                "style": "numbered",
                "children": [
                    {
                        "type": "listItem",
                        "children": [
                            {
                                "type": "paragraph",
                                "children": [
                                    {
                                        "type": "span",
                                        "value": "Create a Vercel Account: The first step to deploying your code into Vercel is to create an account on the Vercel website."
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "listItem",
                        "children": [
                            {
                                "type": "paragraph",
                                "children": [
                                    {
                                        "type": "span",
                                        "value": "Connect Your Repository: Once you have a Vercel account, you can connect your code repository by linking it to your GitHub, GitLab, or Bitbucket account."
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "listItem",
                        "children": [
                            {
                                "type": "paragraph",
                                "children": [
                                    {
                                        "type": "span",
                                        "value": "Configure Your Project: After connecting your repository, you can configure your project settings such as the deployment environment and build command."
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "listItem",
                        "children": [
                            {
                                "type": "paragraph",
                                "children": [
                                    {
                                        "type": "span",
                                        "value": "Deploy Your Project: Once you've configured your project, you can deploy your code by clicking the \"Deploy\" button in the Vercel dashboard."
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "listItem",
                        "children": [
                            {
                                "type": "paragraph",
                                "children": [
                                    {
                                        "type": "span",
                                        "value": "Test Your Deployment: After the deployment is complete, you can test your application to ensure that everything is working as expected."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "type": "paragraph",
                "children": [
                    {
                        "type": "span",
                        "value": "While deploying code into Vercel is a straightforward process, there are some best practices to keep in mind, such as using a continuous integration and deployment (CI/CD) pipeline, optimizing your application for speed, and monitoring performance. By following these tips and utilizing the features of Vercel, you can deploy your code with confidence and ensure a seamless user experience."
                    }
                ]
            }
        ]
    }

    const router = useRouter();
    return (<div>
            <Head>
                {renderMetaTags(meta)}
                {article ?
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: `
                            { "@context": "https://schema.org", 
                             "@type": "BlogPosting",
                             "headline": "${article.title}",
                             "image": "${article.coverImage.responsiveImage.src}",
                             "keywords": "${article.title.split(" ").join(", ")}",
                             "publisher": "SaTo Solutions",
                             "url": "https://blog.jeb4.dev${router.asPath}",
                             "datePublished": "${article.publishDate}",
                             "description": "${article.metadata.description}",
                             "articleBody": "${
                                article.content.value.document.children.map((item) => {
                                    if (item.type === "paragraph") {
                                        return item.children.map((item) => {
                                            if (item.type === "span") {
                                                return item.value
                                            }
                                        }).join(" ")
                                    }
                                }).join(" ")
                            }",
                               "author": {
                                "@type": "Person",
                                "name": "${article.author.name}"
                              }
                            }
                        `,
                        }}
                        key="product-jsonld"
                    />
                    : null
                }
            </Head>
            <div className={styles.container}>
                <div> {children} </div>

                <div className={"grid sm:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {posts.map((post) => (<Card
                            key={post.title}
                            img={post.coverImage.responsiveImage}
                            title={post.title}
                            date={post.publishDate}
                            slug={post.slug}
                        />))}
                </div>
            </div>

            {formImage ? (<>
                    <div className={"w-full bg-[#2D2A38]"}>
                        <div className={styles.container + "mb-0"}>
                            <div className={"py-8 flex flex-col items-center gap-12"}>
                                <h1 className={"max-w-[20rem] text-white text-4xl font-semibold text-center"}>
                                    This is to test your{" "}
                                    <span
                                        className={"underline underline-offset-8 decoration-4 text-cyan-500"}>css</span> skills.
                                </h1>
                                <p className={"text-white text-center max-w-[34rem]"}>
                                    No real function for this, but this will give us a good indication for your level of
                                    expertise with
                                    css. Feel free to show off in case this feels too easy.
                                </p>
                            </div>
                            <div className={"bg-white md:flex relative"}>
                                <div className={"md:flex-1"}>
                                    <div className="relative h-[400px] group overflow-hidden">
                                        <Image
                                            data={formImage.responsiveImage}
                                            alt={"Illustrative image"}
                                            objectFit={"cover"}
                                            className={"h-full blur-sm md:blur-0 transform md:group-hover:scale-110 transition duration-300 ease-in-out"}
                                        />
                                        <div
                                            className="absolute inset-0 bg-white hidden md:block"
                                            style={{clipPath: "polygon(67% 0, 100% 0, 100% 100%, 100% 100%)"}}
                                        />
                                    </div>
                                </div>
                                <div className={"md:flex-1 absolute inset-0 md:relative md:inset-auto"}>
                                    <form className={"h-full flex flex-col items-center justify-center px-4"} action="">
                                        <div className="py-8 flex justify-center items-center">
                                            <label className="relative cursor-pointer">
                                                <input
                                                    type="text"
                                                    placeholder="Input text"
                                                    className="bg-white bg-opacity-0 md:bg-opacity-100 h-20 w-full md:w-96 px-6 text-2xl text-white md:text-gray-500 border-white md:border-gray-500 border-2 rounded-lg md:border-opacity-50 outline-none focus:border-purple-700 placeholder-white md:placeholder-gray-500 md:placeholder-opacity-0 placeholder-opacity-0 focus:text-white md:focus:text-gray-700 focus:placeholder-opacity-100 transition duration-200"
                                                />
                                                <span
                                                    className="text-2xl text-gray-200 md:text-gray-500 md:bg-white md:text-opacity-80 absolute left-5 top-5 px-1 transition duration-200 input-text">
                          Label
                        </span>
                                            </label>
                                        </div>

                                        <div className="py-8 flex justify-center items-center">
                                            <label className="relative cursor-pointer">
                                                <input
                                                    type="text"
                                                    placeholder="Input text"
                                                    className="bg-white bg-opacity-0 md:bg-opacity-100 h-20 w-full md:w-96 px-6 text-2xl text-white md:text-gray-500 border-white md:border-gray-500 border-2 rounded-lg md:border-opacity-50 outline-none focus:border-purple-700 placeholder-white md:placeholder-gray-500 md:placeholder-opacity-0 placeholder-opacity-0 focus:text-white md:focus:text-gray-700 focus:placeholder-opacity-100 transition duration-200"
                                                />
                                                <span
                                                    className="text-2xl text-gray-200 md:text-gray-500 md:bg-white md:text-opacity-80 absolute left-5 top-5 px-1 transition duration-200 input-text">
                          Label
                        </span>
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>) : null}

            <footer className={"bg-[#2D2A38] text-white w-screen py-8"}>
                <div className={styles.container}>
                    <div className={"flex flex-col sm:flex-row px-8 gap-8 sm:gap-36"}>
                        <div className={"w-48"}>
                            <Image data={footer.image.responsiveImage}/>
                            <p className={"max-w-[150px] my-4"}>{footer.description}</p>
                        </div>
                        <div>
                            <h3 className={"font-bold mb-4"}>Blog posts</h3>

                            <ul className={"list-none p-0"}>
                                <li className={"py-2"}>
                                    <Link className={"underline text-white"} href={"/posts/" + posts[0].slug}>
                                        Link to first post
                                    </Link>
                                </li>
                                <li className={"py-2"}>
                                    <Link className={"underline text-white"} href={"/posts/" + posts[1].slug}>
                                        Link to second post
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>);
}
