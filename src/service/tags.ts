import RequestService, { IListResponse } from "./request";

export const getAllTags = <T>(): Promise<IListResponse<T>> => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/tags`,
      method: "GET",
    };
    RequestService.send(req).then(
      (res) => {
        return resolve(res);
      },
      (err) => {
        return reject(err);
      }
    );
  });
};
export const getOneTag = <T>(id: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/tags/${id}`,
      method: "GET",
    };
    RequestService.send(req).then(
      (res) => {
        return resolve(res);
      },
      (err) => {
        return reject(err);
      }
    );
  });
};
export const createOneTag = <T>(body: any): Promise<T> => {
  if (body._id) {
    delete body._id;
  }
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/tags`,
      method: "POST",
      body: body,
    };
    RequestService.send(req).then(
      (res) => {
        return resolve(res);
      },
      (err) => {
        return reject(err);
      }
    );
  });
};
export const updagteOneTag = <T>(body: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/tags/${body._id}`,
      method: "PUT",
      body: body,
    };
    RequestService.send(req).then(
      (res) => {
        return resolve(res);
      },
      (err) => {
        return reject(err);
      }
    );
  });
};

export const deleteOneTag = (id: string) => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/tags/${id}`,
      method: "DELETE",
    };
    RequestService.send(req).then(
      (res) => {
        return resolve(res);
      },
      (err) => {
        return reject(err);
      }
    );
  });
};
export const deleteManyTags = (body: any) => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/tags/delete-many`,
      method: "PUT",
      body: body,
    };
    RequestService.send(req).then(
      (res) => {
        return resolve(res);
      },
      (err) => {
        return reject(err);
      }
    );
  });
};
export const tagsDataService = {
  deleteManyTags,
  deleteOneTag,
  updagteOneTag,
  createOneTag,
  getOneTag,
  getAllTags,
};
