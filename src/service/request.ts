export interface IPaginate {
  totalItems: number;
  perPage: number;
  totalPages?: number;
  currentPage: number;
  search?: string;
  loaded?: boolean;
  query?: { [key: string]: any };
}
export interface IListResponse<T> {
  totalItems: number;
  perPage: number;
  totalPages?: number;
  currentPage: number;
  items: T[];
}
interface IRequestParams {
  url: string;
  method: string;
  body?: any;
  queryString?: any;
  multipart?: boolean;
  page?: number;
  perPage?: number;
  search?: string;
  headers?: { [key: string]: string };
}

type HeadersType = Record<string, string>;
interface IRequest {
  method: string;
  body?: any;
  headers: HeadersType;
}
const send = async (data: IRequestParams) => {
  const { url, request } = getUrlAndRequest(data);
  try {
    const response = await fetch(url, request);
    if (response.status < 300) {
      try {
        //console.log(response);
        const d = await response.json();
        return d;
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      const err = await response?.json();
      throw err;
    }
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

const getUrlAndRequest = (data: IRequestParams) => {
  const headers: HeadersType = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...data.headers,
  };
  const request: IRequest = {
    method: data.method.toUpperCase(),
    headers: headers,
  };

  if (data.multipart) {
    delete request.headers["Content-Type"];
  }

  if (data.method.toUpperCase() !== "GET" && data.body) {
    request["body"] = data.multipart ? data.body : JSON.stringify(data.body);
  }

  let params = "";
  if (data.queryString) {
    params = "?queryString=" + JSON.stringify(data.queryString);
  }
  if (typeof data.page !== "undefined") {
    const addChar = params ? "&" : "?";
    params += `${addChar}page=${data.page}`;
  }
  if (data.perPage) {
    const addChar = params ? "&" : "?";
    params += `${addChar}perPage=${data.perPage}`;
  }
  if (data.search) {
    const addChar = params ? "&" : "?";
    params += `${addChar}search=${data.search}`;
  }
  let url = data.url + params;
  return { url, request };
};
export default {
  send,
  //sendMultipart
};
