import { useEffect, useState } from "react";
import { createItem, getFolder, getItem, updateItem } from "./service";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Folder } from "./Folder";
import { useForm } from "react-hook-form";

type Inputs = {
  date: string;
  name: string;
  amount: number;
  paid: number;
};
export default function CreateItem() {
  const [searchParams] = useSearchParams();
  const folderId = parseInt(searchParams.get("id")!);
  const itemId = useParams()["id"];
  const [folder, setFolder] = useState<Folder>();
  const { register, handleSubmit, setValue, watch } = useForm<Inputs>({
    defaultValues: {
      date: "01-01-2021",
      name: "",
      amount: 0,
      paid: 0,
    },
  });

  const amount = watch("amount");
  const paid = watch("paid");
  const remain = amount - paid;

  useEffect(() => {
    getFolder(folderId).then((folder) => setFolder(folder));

    if (itemId) {
      getItem(parseInt(itemId)).then((item) => {
        setValue("date", item.date);
        setValue("name", item.name);
        setValue("amount", item.amount);
        setValue("paid", item.paid);
      });
    }
  }, []);

  const onSubmit = async (data: Inputs) => {
    if (itemId) {
      await updateItem(
        parseInt(itemId),
        data.date,
        data.name,
        data.amount,
        data.paid
      );
    } else {
      await createItem(folderId, data.date, data.name, data.amount, data.paid);
    }
  };

  return (
    <div className="p-2">
      <h1 className="font-bold">
        GHI NỢ MỚI CHO <span className="text-red-500">{folder?.name.toUpperCase()}</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <div>
          <label>NGÀY NỢ</label>
          <div className="flex space-x-1">
            <input
              type="date"
              className="w-full block p-2"
              {...register("date")}
            />
            <button
              type="button"
              className="bg-blue-500 text-white rounded p-2 min-w-24"
            >
              HÔM NAY
            </button>
          </div>
        </div>
        <div className="mt-2">
          <label>NỘI DUNG</label>
          <textarea
            {...register("name")}
            className="w-full block p-2">
          </textarea>
        </div>
        <div className="mt-2">
          <label>SỐ TIỀN</label>
          <input
            type="number"
            {...register("amount")}
            className="w-full block p-2"
          />
        </div>
        <div className="mt-2">
          <label className="">ĐÃ TRẢ</label>
          <div className="flex">
            <input
              type="number"
              {...register("paid")}
              className="w-full block p-2"
            />
            <button
              type="button"
              onClick={() => setValue("paid", amount)}
              className="bg-blue-500 text-white rounded p-2 min-w-24"
            >
              TOÀN BỘ
            </button>
          </div>
        </div>
        <div className="mt-2">
          <label>CÒN THIẾU: <span className={remain === 0 ? "text-green-500" : 'text-red-500'}>{remain}</span></label>
        </div>

        <div className="mt-2 flex space-x-1">
          <Link
            to={`/Items?id=${folderId}`}
            className="bg-gray-500 text-white rounded px-3 py-2 ms-auto"
          >
            QUAY LẠI
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-3 py-2 ms-auto"
          >
            LƯU
          </button>
        </div>
      </form >
    </div >
  );
}
