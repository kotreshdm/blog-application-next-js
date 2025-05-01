import { Url } from "next/dist/shared/lib/router/router";

export interface ErrorWithStatus {
  status: number;
  message: string;
}

export interface CreateRequestBody {
  name: string;
  _id?: string;
}

export interface DeleteRequestBody {
  id: string;
}

export interface PutRequestBody {
  _id: string;
  name: string;
  seoKeyword: string;
  category: string;
  shortDescription: string;
  seoDescription: string;
  description: string;
  image: Url;
  blogStatus: string;
}
