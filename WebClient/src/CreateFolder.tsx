import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createFolder } from "./service";

type Inputs = { folderName: string };

export default function CreateFolder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = parseInt(searchParams.get("id") || "1");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    await createFolder(id, data.folderName);
    navigate(`/?id=${id}`);
  };

  if (id === 1) {
    return (
      <div className="p-2">
        <h1 className="font-bold">
          TẠO SỔ MỚI
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          <div>
            <label>TÊN SỔ</label>
            <input
              type="text"
              {...register("folderName", {
                required: "HÃY NHẬP TÊN SỔ",
              })}
              className="w-full block p-2"
              placeholder="NHẬP TÊN SỔ"
            />
            {errors.folderName && (
              <p className="text-red-500">{errors.folderName.message}</p>
            )}
          </div>
          <div className="mt-2 flex space-x-1">
            <Link
              to={"/"}
              className="bg-gray-500 text-white rounded px-3 py-2 ms-auto"
            >
              QUAY LẠI
            </Link>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-3 py-2"
            >
              LƯU
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="p-2">
        <h1 className="font-bold">
          TẠO HỘ GIA ĐÌNH MỚI
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
          <div>
            <label>TÊN HỘ GIA ĐÌNH</label>
            <input
              type="text"
              {...register("folderName", {
                required: "HÃY NHẬP TÊN HỘ GIA ĐÌNH",
              })}
              className="w-full block p-2"
              placeholder="NHẬP TÊN HỘ GIA ĐÌNH"
            />
            {errors.folderName && (
              <p className="text-red-500">{errors.folderName.message}</p>
            )}
          </div>
          <div className="mt-2 flex space-x-1">
            <Link
              to={"/"}
              className="bg-gray-500 text-white rounded px-3 py-2 ms-auto"
            >
              QUAY LẠI
            </Link>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-3 py-2"
            >
              LƯU
            </button>
          </div>
        </form>
      </div>
    );
  }
}
