// pages/blog/[id].js
import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";
import Link from "next/link";

export default function BlogId({ blog }) {
  return (
    <>
      <div className={styles.body}>
        <main className={styles.main}>
          <h1 className={styles.title}>🔥 {blog.title} 🔥</h1>
          <p className={styles.publishedAt}>{blog.publishedAt}</p>
          <p className="category">{blog.category && `${blog.category.name}`}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
            className={styles.post}
          />
          <Link href="/">一覧へ戻る</Link>
        </main>
      </div>
    </>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};
