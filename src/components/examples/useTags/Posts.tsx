import { useEffect, useState } from "react";
import {
  IRecodrs,
  getRecodrs,
  getRecord,
  updagteOneRecord,
} from "../../../service/record";
import { Box } from "@mui/material";
import TagsList from "../../tags/TagsList";
import {
  getAllTags,
  getOneTag,
  tagsDataService,
  updagteOneTag,
} from "../../../service/tags";
import { ITag } from "../../tags/model/tag";

const Posts = () => {
  const [items, setItems] = useState<IRecodrs[]>([]);
  const [loading, setLoading] = useState(true);

  const addTagRecord = async (data: any) => {
    const t: any = await getOneTag(data.tagId);

    const r: any = await getRecord(data.fileRecordId);

    if (t && r && !r.tags.some((tag: any) => tag._id === data.tagId)) {
      r.tags.push(t);
      await updagteOneRecord(r);
    }

    return { ...r };
  };
  const deleteTagRecord = async (data: any) => {
    const t: any = await getOneTag(data.tagId);

    const r: any = await getRecord(data.fileRecordId);
    const i = r?.tags.findIndex((tag: any) => tag._id === data.tagId);
    //console.log(r, t, i);
    if (t && r && i > -1) {
      r.tags.splice(i, 1);
      await updagteOneRecord(r);
    }
    return { ...r };
  };

  // event Listeners ************************************************************************************************

  const handleSuscribeAddTagInRecord = (event: CustomEvent) => {
    const data: {
      fileRecordId: string;
      tagId: string;
    } = event.detail;

    setLoading(true);

    addTagRecord(data)
      .then((res: any) => {
        setItems((prev: any) => [
          ...prev.map((d: any) => {
            if (d._id === data.fileRecordId) {
              return { ...d, tags: res.tags };
            } else {
              return d;
            }
          }),
        ]);
      })
      .catch((error) => {
        console.log(error);
        setItems((prev) => [
          ...prev.map((d) => {
            if (d._id === data.fileRecordId) {
              return { ...d, tags: structuredClone(d.tags) };
            } else {
              return d;
            }
          }),
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSuscribeDeleteTagInRecord = (event: CustomEvent) => {
    const data: {
      fileRecordId: string;
      tagId: string;
    } = event.detail;
    setLoading(true);
    deleteTagRecord(data)
      .then((res) => {
        if (res && res.tags) {
          setItems((prev: any) => [
            ...prev.map((d: any) => {
              if (d._id === data.fileRecordId) {
                return { ...d, tags: res.tags };
              } else {
                return d;
              }
            }),
          ]);
        }
      })
      .catch((error: any) => {
        console.log(error);
        setItems((prev) => [
          ...prev.map((d) => {
            if (d._id === data.fileRecordId) {
              return { ...d, tags: structuredClone(d.tags) };
            } else {
              return d;
            }
          }),
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSuscribeUpdateRecord = (event: CustomEvent) => {
    const data: any = event.detail;
    setItems((prev: any) => [
      ...prev.map((d: any) => {
        if (d._id === data._id) {
          return { ...d, ...data };
        } else {
          return d;
        }
      }),
    ]);
  };
  const handleSuscribeReloadRecordcList = (event: CustomEvent) => {
    getRecodrs()
      .then((res) => {
        setItems(res);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const handleSuscribeUpdateTag = (event: CustomEvent) => {
    const data: ITag = event.detail;
    // console.log(data);
    setItems((prev: any) =>
      prev.map((arch: any) => {
        arch.tags = arch.tags.map((t: any) => {
          return t._id === data._id ? { ...data } : t;
        });
        return { ...arch };
      })
    );
  };

  const handleSuscribeDeleteTag = (event: CustomEvent) => {
    const data: { tagId: string } = event.detail;
    setItems((prev: any) =>
      prev.map((arch: any) => {
        arch.tags = arch.tags.filter((t: any) => {
          return t._id !== data.tagId;
        });
        return { ...arch };
      })
    );
  };

  useEffect(() => {
    getRecodrs()
      .then((res) => {
        setItems(res);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {});

    window.addEventListener(
      "addTagInRecord",
      handleSuscribeAddTagInRecord as EventListener
    );
    window.addEventListener(
      "deleteTagInRecord",
      handleSuscribeDeleteTagInRecord as EventListener
    );
    window.addEventListener(
      "updateRecord",
      handleSuscribeUpdateRecord as EventListener
    );
    window.addEventListener(
      "reloadRecordcList",
      handleSuscribeReloadRecordcList as EventListener
    );
    window.addEventListener(
      "updateTag",
      handleSuscribeUpdateTag as EventListener
    );
    window.addEventListener(
      "deleteTag",
      handleSuscribeDeleteTag as EventListener
    );
    return () => {
      window.addEventListener(
        "deleteTagInRecord",
        handleSuscribeDeleteTagInRecord as EventListener
      );
      window.addEventListener(
        "addTagInRecord",
        handleSuscribeAddTagInRecord as EventListener
      );
      window.addEventListener(
        "updateRecord",
        handleSuscribeUpdateRecord as EventListener
      );
      window.addEventListener(
        "reloadRecordcList",
        handleSuscribeReloadRecordcList as EventListener
      );

      window.addEventListener(
        "updateTag",
        handleSuscribeUpdateTag as EventListener
      );
      window.addEventListener(
        "deleteTag",
        handleSuscribeDeleteTag as EventListener
      );
    };
  }, []);

  return (
    <div>
      {items.map((item: any) => (
        <ItemWithTag item={item} key={item._id} />
      ))}
    </div>
  );
};

export default Posts;

const ItemWithTag = ({ item }: { item: any }) => {
  return (
    <Box
      sx={{
        m: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        borderRadius: "6px",
        border: "1px solid #1F1F1F",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingRight: "10px",
          marginRight: "10px",
          borderRight: "1px solid #1F1F1F",
        }}
      >
        {item.name}
      </Box>
      <Box
        sx={{
          height: "24px",
          display: "flex",
          width: "200px",
        }}
      >
        <TagsList<any>
          record={item}
          dataService={tagsDataService}
          quantity={3}
          recordModel={"fileRecordId"}
        />
      </Box>
    </Box>
  );
};
