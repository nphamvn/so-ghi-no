import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getFolder } from "./service";
import { Folder } from "./Folder";

export default function ItemList() {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id")!);
  const [folder, setFolder] = useState<Folder>();
  const total = folder?.items.reduce((a, b) => a + b.amount, 0);
  const totalUnpaid = folder?.items
    .filter((i) => !i.paidDate)
    .reduce((a, b) => a + b.amount, 0);
  useEffect(() => {
    const fetchData = async () => {
      const contents = await getFolder(id);
      setFolder(contents);
    };
    fetchData();
  }, []);
  return (
    <div className="px-2">
      <h1>{folder?.name}</h1>
      <div className="mt-2 flex">
        <Link
          to={`/?id=${folder?.parentFolderId}`}
          className="bg-gray-500 text-white rounded p-2"
        >
          QUAY LẠI
        </Link>
        <Link
          to={`/Items/New?id=${id}`}
          className="ms-auto bg-blue-500 text-white rounded p-2"
        >
          GHI NỢ MỚI
        </Link>
      </div>
      <div className="flex mt-2">
        <div>TỔNG: {total}</div>
        <div className="ms-4">TỔNG CHƯA TRẢ: {totalUnpaid}</div>
      </div>
      <table className="mt-2 w-full">
        <thead>
          <tr>
            <th className="text-xs border">NGÀY NỢ</th>
            <th className="text-xs border">NỘI DUNG</th>
            <th className="text-xs border">SỐ TIỀN</th>
            <th className="text-xs border">THANH TOÁN</th>
            <th className="text-xs border"></th>
          </tr>
        </thead>
        <tbody>
          {folder?.items.map((item) => (
            <tr key={item.id} className={item.paidDate ? "line-through" : ""}>
              <td className="border px-1 py-2">
                {new Date(item.date).toLocaleDateString()}
              </td>
              <td className="border px-1 py-2">{item.name}</td>
              <td className=" border px-1 py-2">{item.amount}</td>
              <td className="border px-1 py-2">
                {item.paidDate ? "RỒI" : "CHƯA"}
              </td>
              <td className="border px-1 py-2">
                <Link
                  to={`/Items/${item.id}/?id=${id}`}
                  className="bg-blue-500 text-white rounded p-2"
                >
                  SỬA
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
