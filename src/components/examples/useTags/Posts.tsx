import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  IRecodrs,
  getRecodrs,
  getRecord,
  updagteOneRecord,
} from "../../../service/record";
import { Box, SxProps, Theme } from "@mui/material";
import TagsList from "../../tags/TagsList";
import { getOneTag, tagsDataService } from "../../../service/tags";
import styles from "./Post.module.css";
import {
  outerHandlersAdd,
  outerHandlersRemove,
} from "../../tags/outerHandlers/outerHandlers";

const Posts = () => {
  const [items, setItems] = useState<IRecodrs[]>([]);
  const [loading, setLoading] = useState(true);

  const addTagRecord = async (data: any) => {
    console.log(data);
    const t: any = await getOneTag(data.tagId);

    const r: any = await getRecord(data.fileRecordId);
    if (!r.tags) {
      r.tags = [];
    }

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

  // const handleSuscribeUpdateTag = (event: CustomEvent) => {
  //   const data: ITag = event.detail;

  //   setItems((prev: any) =>
  //     prev.map((arch: any) => {
  //       arch.tags = arch.tags.map((t: any) => {
  //         return t._id === data._id ? { ...data } : t;
  //       });
  //       return { ...arch };
  //     })
  //   );
  // };

  // const handleSuscribeDeleteTag = (event: CustomEvent) => {
  //   const data: { tagId: string } = event.detail;
  //   setItems((prev: any) =>
  //     prev.map((arch: any) => {
  //       arch.tags = arch.tags.filter((t: any) => {
  //         return t._id !== data.tagId;
  //       });
  //       return { ...arch };
  //     })
  //   );
  // };

  useEffect(() => {
    getRecodrs()
      .then((res) => {
        setItems(res);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {});
    // outerHandlersAdd({
    //   handleSuscribeAddTagInRecord,
    //   handleSuscribeDeleteTagInRecord,
    // });
    window.addEventListener(
      "updateRecord",
      handleSuscribeUpdateRecord as EventListener
    );
    window.addEventListener(
      "reloadRecordcList",
      handleSuscribeReloadRecordcList as EventListener
    );

    return () => {
      // outerHandlersRemove({
      //   handleSuscribeAddTagInRecord,
      //   handleSuscribeDeleteTagInRecord,
      // });

      window.removeEventListener(
        "updateRecord",
        handleSuscribeUpdateRecord as EventListener
      );
      window.removeEventListener(
        "reloadRecordcList",
        handleSuscribeReloadRecordcList as EventListener
      );
    };
  }, []);

  return (
    <div>
      {items.map((item: any) => (
        <ItemWithTag
          item={item}
          key={item._id}
          addTagRecord={addTagRecord}
          deleteTagRecord={deleteTagRecord}
        />
      ))}
    </div>
  );
};

export default Posts;

const ItemWithTag = ({
  item,
  addTagRecord,
  deleteTagRecord,
}: {
  item: any;
  addTagRecord: (d: any) => Promise<any>;
  deleteTagRecord: (d: any) => Promise<any>;
}) => {
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
          //height: "24px",
          display: "flex",
          width: "100px",
        }}
      >
        <TagsList<any>
          EmptyIcon={EmptyIcon}
          record={item}
          dataService={tagsDataService}
          quantity={3}
          recordModel={"fileRecordId"}
          insertTagInRecord={addTagRecord}
          removeTagFromRecord={deleteTagRecord}
        />
      </Box>
    </Box>
  );
};
const EmptyIcon = ({ onClick }: { onClick: (e: any) => void }) => (
  <Box className={styles.emptyIconTagWrapper} onClick={onClick}>
    <Icon_shoppingmode onClick={onClick} />
  </Box>
);
interface IconProjectsProps {
  iconColor?: string;
  hoverColor?: string;
  sx?: SxProps<Theme> & { width?: string; height?: string };
  stroked?: boolean | undefined;
  onClick?: (e: any) => void;
  className?: string;
}

export const Icon_shoppingmode: React.FC<IconProjectsProps> = ({
  iconColor,
  hoverColor,
  sx,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      onClick={handleClick}
      className={className}
    >
      <mask
        id="mask0_2294_1137"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="12"
        height="12"
      >
        <rect width="12" height="12" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_2294_1137)">
        <path
          d="M6.2875 10.7C6.0875 10.9 5.85 11 5.575 11C5.3 11 5.0625 10.9 4.8625 10.7L1.2875 7.125C1.09583 6.93333 1 6.69792 1 6.41875C1 6.13958 1.09583 5.90417 1.2875 5.7125L5.6875 1.3C5.77917 1.20833 5.8875 1.13542 6.0125 1.08125C6.1375 1.02708 6.27083 1 6.4125 1H9.9875C10.2625 1 10.4979 1.09792 10.6938 1.29375C10.8896 1.48958 10.9875 1.725 10.9875 2V5.575C10.9875 5.71667 10.9604 5.85 10.9062 5.975C10.8521 6.1 10.7792 6.20833 10.6875 6.3L6.2875 10.7ZM8.7375 4C8.94583 4 9.12292 3.92708 9.26875 3.78125C9.41458 3.63542 9.4875 3.45833 9.4875 3.25C9.4875 3.04167 9.41458 2.86458 9.26875 2.71875C9.12292 2.57292 8.94583 2.5 8.7375 2.5C8.52917 2.5 8.35208 2.57292 8.20625 2.71875C8.06042 2.86458 7.9875 3.04167 7.9875 3.25C7.9875 3.45833 8.06042 3.63542 8.20625 3.78125C8.35208 3.92708 8.52917 4 8.7375 4ZM5.575 10L9.9875 5.575V2H6.4125L2 6.425L5.575 10Z"
          fill="#171717"
        />
      </g>
    </svg>
  );
};
