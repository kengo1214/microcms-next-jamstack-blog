// libs/util.js
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// UTC -> "2022_04" のフォーマットに変換
//記事が公開された月を表現できるようになる
export const formatDate = (date) => {
  const formattedDate = dayjs.utc(date).tz("Asia/Tokyo").format("YYYY_MM");
  return formattedDate;
};

//記事をグルーピングする処理（グループ化）
//上記で作成したformatDateも登場する
export const groupBy = function (contents) {
  return contents.reduce(function (group, x) {
    const yearMonthString = formatDate(new Date(x["publishedAt"]));
    (group[yearMonthString] = group[yearMonthString] || []).push(x);
    return group;
  }, {});
};
