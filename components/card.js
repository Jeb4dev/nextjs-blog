import Image from 'next/image';
import Date from "./date";

export default function Card({img, title, date}) {
    return (
        <div className={"drop-shadow shadow-2xl w-full rounded-xl relative"}>
            <Image className={"w-full h-32 object-cover rounded-t-xl"} src={"/images/" + img} alt={"Illustrative image"} height={100}
                   width={100}></Image>
            <div className={"p-2"}>
                <h3 className={"font-bold text-xl pb-16"}>{title}</h3>
                <span className={"absolute bottom-1 right-3 text-gray-600 font-sm"}><Date dateString={date}/></span>
            </div>
        </div>);
}
