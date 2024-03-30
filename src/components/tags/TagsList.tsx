import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ITagsDataService, ITag } from "./model/tag";
import { Box, Typography } from "@mui/material";

import styles from "./css/TagsList.module.css";
import ManageTagsInModal from "./ManageTagsInModal";
interface IRecord {
  _id: string;
  tags: ITag[];
}

interface ITagsListProps {
  bgcolorForAddTags?: string;
  classForCell?: string;
  quantity?: number;
  record: IRecord;
  dataService: ITagsDataService;
  onlyView?: boolean;
  recordModel: string;
  EmptyIcon?: React.ElementType;
  insertTagInRecord: (d: any) => Promise<any>;
  removeTagFromRecord: (d: any) => Promise<any>;
}

const TagsList = forwardRef<HTMLDivElement, ITagsListProps>(
  (
    {
      quantity = 3,
      record,
      dataService,
      onlyView,
      recordModel,
      insertTagInRecord,
      removeTagFromRecord,
      EmptyIcon,
      bgcolorForAddTags,
      classForCell,
    },
    ref
  ) => {
    // const TagsList = <RecordType extends IRecord>({
    //   quantity = 3,
    //   record,
    //   dataService,
    //   onlyView,
    //   recordModel,
    //   insertTagInRecord,
    //   removeTagFromRecord,
    //   EmptyIcon,
    // }: {
    //   quantity?: number;
    //   record: RecordType;
    //   dataService: ITagsDataService;
    //   onlyView?: boolean;
    //   recordModel: string;
    //   EmptyIcon?: React.ElementType;
    //   insertTagInRecord: (d: any) => Promise<any>;
    //   removeTagFromRecord: (d: any) => Promise<any>;
    // }) => {
    const [openModal, setOpenModal] = useState(false);
    const [items, setItems] = useState<ITag[]>([]);
    const [initTags, setInitTags] = useState<ITag[]>([]);
    const [remainingItemCount, setRemainingItemCount] = useState(0);
    const [rect, setRect] = useState<any>();
    const wrapper = useRef<HTMLInputElement>(null);
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation(); // prevent
      //console.log(" click");
      const div = e.target as HTMLElement;
      //console.log(window.scrollY);

      const parent = div.parentElement;
      //console.log(parent.getBoundingClientRect());
      if (parent) {
        const cellRect = parent.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const modalWidth = 300;
        const modalMaxHeight = 300;

        const left = cellRect.left; //+ window.scrollX;
        const top = cellRect.top; //+ window.scrollY;

        const right =
          left + modalWidth > screenWidth ? screenWidth - modalWidth : left;
        const bottom =
          top + modalMaxHeight > screenHeight
            ? screenHeight - modalMaxHeight
            : top;
        setRect({ left: right, top: bottom, cellRectTop: cellRect.top });
        setOpenModal(true);
      }
    };
    useEffect(() => {
      if (record && record.tags) {
        setInitTags(record.tags);
      }
    }, [record]);
    useEffect(() => {
      const data = initTags.slice(0, quantity);
      setRemainingItemCount(initTags.length - data.length);
      setItems([...data]);
    }, [initTags]);

    const handleSuscribeUpdateTag = (event: CustomEvent) => {
      const data: ITag = event.detail;
      setInitTags((prev) => [
        ...prev.map((t) => {
          return t._id === data._id ? { ...data } : t;
        }),
      ]);
    };
    const handleSuscribeDeleteTag = (event: CustomEvent) => {
      const data: { tagId: string } = event.detail;
      setInitTags((prev) =>
        prev.filter((t) => {
          return t._id !== data.tagId;
        })
      );
    };

    useEffect(() => {
      const handleScroll = () => {
        setOpenModal(false);
      };

      const handleResize = () => {
        setOpenModal(false);
      };
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
      window.addEventListener(
        "updateTag",
        handleSuscribeUpdateTag as EventListener
      );
      window.addEventListener(
        "deleteTag",
        handleSuscribeDeleteTag as EventListener
      );
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener(
          "updateTag",
          handleSuscribeUpdateTag as EventListener
        );
        window.removeEventListener(
          "deleteTag",
          handleSuscribeDeleteTag as EventListener
        );
      };
    }, []);

    return (
      <>
        {!onlyView && openModal && rect && (
          <ManageTagsInModal
            dataService={dataService}
            openModal={openModal}
            handleCloseModal={() => setOpenModal(false)}
            //setOpenModal={setOpenModal}
            items={initTags}
            setItems={setInitTags}
            record={record}
            rect={rect}
            recordModel={recordModel}
            insertTagInRecord={insertTagInRecord}
            removeTagFromRecord={removeTagFromRecord}
          />
        )}
        <Box className={styles.wrap1}>
          <Box className={styles.wrap2}>
            <Box className={styles.wrap3}>
              <Box className={styles.wrap4}>
                {items.length > 0 ? (
                  <>
                    <Box
                      ref={ref}
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                        cursor: !onlyView ? "pointer" : "auto",
                      }}
                      onClick={handleClick}
                    ></Box>

                    {items.map((item: ITag, index: number) => (
                      <Box
                        className={styles.tagWrap1}
                        key={item._id}
                        sx={{ background: item.color }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Box className={styles.tagWrap2} key={item._id}>
                          <span
                            className={
                              classForCell ? classForCell : styles.tagText
                            }
                            style={{
                              color: "#183347",
                            }}
                          >
                            {item.name}
                          </span>
                        </Box>
                      </Box>
                    ))}
                  </>
                ) : (
                  <Box>
                    <Box
                      ref={ref}
                      sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                        cursor: !onlyView ? "pointer" : "auto",
                      }}
                      onClick={handleClick}
                    ></Box>

                    {!EmptyIcon ? "Click here to manage tags" : <EmptyIcon />}
                  </Box>
                )}
                {remainingItemCount !== 0 && (
                  <Box
                    className={styles.remainigItemsCount}
                    style={{
                      ...(bgcolorForAddTags
                        ? { backgroundColor: bgcolorForAddTags }
                        : {}),
                    }}
                  >
                    <span
                      className={`${
                        classForCell ? classForCell : "body-xs-regular"
                      }`}
                      style={{
                        color: "#183347",
                        // fontSize: "12px",
                        // fontWeight: 400,
                        // lineHeight: "18px",
                      }}
                    >
                      +{remainingItemCount}
                    </span>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  }
);

export default TagsList;
