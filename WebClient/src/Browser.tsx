import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getFolder } from "./service";
import { Folder } from "./Folder";
import { useForm } from "react-hook-form";

type SearchInputs = { name: string };

export default function Browser() {
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "1");
  const [folder, setFolder] = useState<Folder>();
  const subFolders = folder?.subFolders.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  }) || [];

  const { register, handleSubmit, watch, getValues } = useForm<SearchInputs>();
  const name = watch("name");
  const onSubmit = (data: SearchInputs) => {
    console.log(data);
  };
  const fetchData = async () => {
    const folder = await getFolder(id, getValues("name"));
    setFolder(folder);
  };

  useEffect(() => {
    fetchData();
  }, [id, name]);

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <input
            type="search"
            {...register("name")}
            autoComplete="none"
            placeholder="NHẬP TÊN SỔ HOẶC TÊN HỘ GIA ĐÌNH"
            className="w-full block p-2"
          />
        </div>
      </form>
      <hr className="my-2" />
      {id === 1 && (
        <div>
          <Link
            to={"/CreateFolder"}
            className="bg-green-500 text-white rounded p-2"
          >
            THÊM SỔ MỚI
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
          <h4 className="mt-2 font-bold">DANH SÁCH <span className="text-red-500">{folder?.name}</span></h4>
        </div>
      )}
      <ul className="divide-y mt-2">
        {subFolders.map((f) => (
          <li key={f.id} className="px-2 py-3">
            <Link to={id === 1 ? `/?id=${f.id}` : `/Items?id=${f.id}`} className="block">{f.name.toUpperCase()}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
