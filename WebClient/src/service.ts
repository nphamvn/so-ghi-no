import { Folder } from "./Folder";
import { Item } from "./Item";

export const getFolder = async (id: number) => {
  const response = await fetch(`http://localhost:5066/?id=${id}`);
  const data = (await response.json()) as Folder;
  return data;
};

export const createFolder = async (id: number, name: string) => {
  await fetch(`http://localhost:5066/?id=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
};

export const getItem = async (id: number) => {
  const response = await fetch(`http://localhost:5066/Items/${id}`);
  const data = (await response.json()) as Item;
  return data;
};

export const createItem = async (
  folderId: number,
  date: string,
  name: string,
  amount: number,
  paidDate?: string
) => {
  const response = await fetch(`http://localhost:5066/Items/?id=${folderId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date, name, amount, paidDate }),
  });
  const data = (await response.json()) as Item;
  return data;
};

export const updateItem = async (
  id: number,
  date: string,
  name: string,
  amount: number,
  paidDate?: string
) => {
  const response = await fetch(`http://localhost:5066/Items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date, name, amount, paidDate }),
  });
  const data = (await response.json()) as Item;
  return data;
};
