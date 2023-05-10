import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Card from "./card";

const name = 'My Blog';
const desc = 'I\'m Jeb, a software developer with a passion for creating innovative solutions and ensuring cybersecurity.';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({children, home, posts}) {
    return (<div>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(siteTitle,)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle}/>
                <meta name="twitter:card" content="summary_large_image"/>
            </Head>
            <div className={styles.container}>
                <header className={styles.header}>
                    {home ? (<>
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                            <Image
                                priority
                                src="/images/profile.jpg"
                                className={utilStyles.borderCircle}
                                height={144}
                                width={144}
                                alt=""
                            />
                            <h2 className={"text-center max-w-lg"}>{desc}</h2>
                        </>) : (<>
                        </>)}
                </header>
                <main>{children}</main>
                {home ? (<>
                    </>) : (<>
                        <div className={"w-full h-1 bg-gray-50 my-8"}></div>
                        <h2 className={"font-bold text-xl"}>Other posts</h2>
                        <div className={"flex gap-4 pt-8 flex-row"}>
                            {posts.map((post, i) => <Card key={post.title} img={post.img} title={post.title} date={post.date} />)}
                        </div>
                    </>)}
            </div>

            <footer className={"bg-[#2D2A38] text-white w-screen py-8"}>
                <div className={styles.container}>
                    <div className={"flex gap-36"}>
                        <div>
                            <Image src={"/images/image 5.png"} alt={"Ikius logo"} width={98} height={34}></Image>
                            <p className={"max-w-[150px] my-4"}>Ikius recruitment task</p>
                        </div>
                        <div>
                            <h3 className={"font-bold mb-4"}>Blog posts</h3>

                            <ul>
                                <li className={"py-2"}><Link className={"underline text-white"} href={"/posts/1"}>
                                    Link to first post</Link></li>
                                <li className={"py-2"}><Link className={"underline text-white"} href={"/posts/2"}>
                                    Link to second post</Link></li>
                            </ul>

                        </div>
                    </div>
                </div>
            </footer>
        </div>);
}
