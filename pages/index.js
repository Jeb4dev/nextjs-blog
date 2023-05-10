import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import {getSortedPostsData} from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import Card from "../components/card";


export default function Home(props) {
    return (<Layout home posts={props.allPostsData}>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <div className={"w-full h-0.5 bg-gray-500 my-16"}></div>
            <h2 className={utilStyles.headingXl}>Blog</h2>
            <div className={"flex gap-4 pt-8"}>
                {props.allPostsData.map((post, i) => <Card key={post.title} img={post.img} title={post.title} date={post.date} />)}
            </div>
        </section>
    </Layout>);
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

