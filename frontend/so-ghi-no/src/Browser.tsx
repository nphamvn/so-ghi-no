import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getFolder } from "./service";
import { Folder } from "./Folder";

export default function Browser() {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "1");
  const [contents, setContents] = useState<Folder>();
  const fetchData = async () => {
    const contents = await getFolder(id);
    setContents(contents);
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="p-2">
      <form>
        <div className="flex">
          <input
            type="search"
            placeholder="NHẬP TÊN XÓM HOẶC TÊN NGƯỜI"
            className="w-full block p-2"
          />
          <button
            type="submit"
            className="ms-auto bg-blue-500 text-white rounded"
          >
            TÌM KIẾM
          </button>
        </div>
      </form>
      <hr className="my-2" />
      {id === 1 && (
        <div>
          <Link
            to={"/CreateFolder"}
            className="bg-green-500 text-white rounded p-2"
          >
            THÊM XÓM
          </Link>
        </div>
      )}
      {id !== 1 && (
        <div className="mt-2">
          <div className="flex">
            <Link to={`/`} className="bg-green-500 text-white rounded p-2">
              QUAY LẠI
            </Link>
            <Link
              to={`/CreateFolder?id=${id}`}
              className="bg-blue-500 text-white rounded p-2 ms-auto"
            >
              TẠO NGƯỜI NỢ MỚI
            </Link>
          </div>
          <h4 className="mt-2 font-bold">DANH SÁCH {contents?.name}</h4>
        </div>
      )}
      <ul className="divide-y mt-2">
        {contents?.subFolders.map((f) => (
          <li key={f.id} className="px-2 py-3">
            <Link to={id === 1 ? `/?id=${f.id}`: `/Items?id=${f.id}`} className="block">{f.name.toUpperCase()}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
