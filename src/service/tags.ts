import { ITag } from "../components/tags/model/tag";
import RequestService from "./request";

export const getAllTags = (): Promise<ITag[]> => {
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
export const getOneTag = (id: string): Promise<ITag> => {
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
export const createOneTag = (body: any): Promise<ITag> => {
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
export const updagteOneTag = (body: any): Promise<ITag> => {
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

export const deleteOneTag = (id: string): Promise<any> => {
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
export const deleteManyTags = (body: any): Promise<any> => {
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
