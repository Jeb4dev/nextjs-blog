import Date from "./date";
import { Image } from "react-datocms";
import Link from "next/link";

export default function Card({ img, title, date, slug }) {
  return (
    <div className={"drop-shadow shadow-2xl w-full rounded-xl relative"}>
      <Image data={img} alt={"Illustrative image"} className={"rounded-t-xl h-48 sm:h-36"} objectFit="cover" />
      <div className={"p-2"}>
        <Link href={"/posts/" + slug}>
          <h3 className={"font-bold text-xl pb-16 text-black"}>{title}</h3>
        </Link>
        <span className={"absolute bottom-3 right-6 text-[#8A8A8A] font-sm"}>
          <Date dateString={date} />
        </span>
      </div>
    </div>
  );
}
