// pages/index.js
import Link from "next/link";
import { client } from "../libs/client";
import styles from "../styles/Home.module.scss";
import { groupBy } from "../libs/util";

export default function Home({ blog, monthlyIndex }) {
  return (
    <div className={styles.archive}>
      <div>
        <h3>月別アーカイブ</h3>
        <ul key={monthlyIndex}>
          {Object.keys(monthlyIndex).map((index) => (
            <li>
              <Link href={`archive/${index}`}>
                {index.split("_")[0] + "年" + index.split("_")[1] + "月"}
              </Link>
              （{monthlyIndex[index].length}）
            </li>
          ))}
        </ul>
      </div>
    </div>
    // <div className={styles.home}>
    //   <h1>ブログ一覧</h1>
    //   <ul>
    //     {blog.map((blog) => (
    //       <li key={blog.id}>
    //         <Link href={`/blog/${blog.id}`}>
    //           <a>{blog.title}</a>
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog", queries: { limit: 3000 } });
  const monthlyIndex = groupBy(data.contents);
  // console.log(monthlyIndex);
  return {
    props: {
      blog: data.contents,
      monthlyIndex: monthlyIndex,
    },
  };
};

// // ＃＃＃＃＃＃＃以下が元のコード＃＃＃＃＃＃＃

// // データをテンプレートに受け渡す部分の処理を記述します
// export const getStaticProps = async () => {
//   const data = await client.get({
//     endpoint: "blog",
//   });

//   return {
//     props: {
//       blog: data.contents,
//     },
//   };
// };
