import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import {getAllPostIds, getPostData, getSortedPostsData} from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import Image from "next/image";
import Link from "next/link";

export async function getStaticProps({params}) {
    const allPostsData = getSortedPostsData();
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
            allPostsData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths, fallback: false,
    };
}

export default function Post(props) {
    return (<Layout posts={props.allPostsData}>
        <Head>
            <title>{props.postData.title}</title>
        </Head>
        <article>
            <div className={"flex justify-between pb-2"}>
                <div className={"flex gap-2"}>
                    <Image src={"/images/profile.jpg"} alt={"profile picture"} width={20} height={20}
                           className="rounded-full w-8"></Image>
                    <p className={"text-2xl"}>{props.postData.author}</p>
                </div>
                <div className={utilStyles.lightText}>
                    <Date dateString={props.postData.date}/>
                </div>
            </div>

            <Image src={"/images/" + props.postData.img} alt={"Illustrative image"} width={421} height={144}
                   className={"w-full"}>
            </Image>

            <Link className={"text-black"} href="/">← <span className={"underline"}>Back to home</span></Link>

            <h1 className={"font-bold text-3xl py-4"}>{props.postData.title}</h1>

            <div dangerouslySetInnerHTML={{__html: props.postData.contentHtml}}/>
        </article>
    </Layout>);
}
