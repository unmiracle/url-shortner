import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "../utils/api";
import { URL } from "../models/url.model";
import { CreateUrlDto } from "../dto/create-url.dto";

const fetcher = async (values: CreateUrlDto) => {
  console.log("fetcher called", values);
  const { data, status } = await api.post("url", values);
  console.log("data", data);
  if (data.message) throw new AxiosError(data.message);
  if (status !== 201) throw new AxiosError("Unknown error");

  return data;
};

export const useCreateUrl = () => {
  // @ts-expect-error test
  return useMutation<URL, AxiosError>({ mutationFn: fetcher });
};
