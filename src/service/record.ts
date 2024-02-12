import { ITag } from "../components/tags/model/tag";
import RequestService from "./request";
export interface IRecodrs {
  _id: string;
  name: string;
  tags: ITag[];
}

export const getRecodrs = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/records`,

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
export const getRecord = (id: string): Promise<IRecodrs> => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/records/${id}`,
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
export const createOneRecord = (body: any): Promise<IRecodrs> => {
  if (body._id) {
    delete body._id;
  }
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/records`,
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
export const updagteOneRecord = (body: any): Promise<IRecodrs> => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/records/${body._id}`,
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
export const addTagRecord = (body: any): Promise<IRecodrs> => {
  return new Promise((resolve, reject) => {
    var req = {
      url: ` http://localhost:3000/records/add-tag`,
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
export const deleteTagRecord = (body: any): Promise<IRecodrs> => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `  http://localhost:3000/records/delete-tag`,
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
export const changeStatusRecord = (body: any): Promise<IRecodrs> => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/records/change-status`,
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
export const changeStatusRecodrs = (body: any): Promise<IRecodrs> => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/records/change-status-many`,
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

export const deleteOneRecord = (id: string) => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/records/${id}`,
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
export const deleteManyRecodrs = (body: any) => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/records/delete-many`,
      method: "DELETE",
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
export const importFileFromExel = (body: any) => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/records/import-excel`,
      method: "POST",
      body: body,
      multipart: true,
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
export const sendFileWithEmail = (body: any) => {
  return new Promise((resolve, reject) => {
    var req = {
      url: `http://localhost:3000/records/send-file`,
      method: "POST",
      body: body,
      multipart: true,
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
