import { useState, useEffect, ChangeEvent, KeyboardEvent, useRef } from "react";
import { CircularProgress, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { colorsList } from "./data/colors.list";
import styles from "./css/ManageTagsInModal.module.css";
import { ITag, ITagsDataService } from "./model/tag";
import OneTagModalManage from "./OneTagModalManage";
import { ClearOutlinedIcon } from "./icons/ClearOutlined";
import { MoreHorizIcon } from "./icons/MoreHoriz";
import { DragIndicatorIcon } from "./icons/DragIndicator";

const bgColors = colorsList.map((c) => c.bgcolor);
interface IRecord {
  _id: string;
  tags: ITag[];
}
interface IProps<RecordType> {
  openModal: boolean;
  handleCloseModal: () => void;
  rect: any;
  setOpenModal: (val: boolean) => void;
  dataService: ITagsDataService;
  record: RecordType;
  sx?: any;
  recordModel: string;
}
const ManageTagsInModal = <RecordType extends IRecord>({
  openModal,
  handleCloseModal,
  setOpenModal,
  rect,
  record,
  dataService,
  recordModel,
  sx = {},
}: IProps<RecordType>) => {
  //console.log(record);
  const modalInner = useRef<HTMLElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [style, setStyle] = useState({
    ...sx,
    top: rect.top,
    left: rect.left,
  });

  const [serverTags, setServerTags] = useState<ITag[]>([]);
  const [filteredTags, setFilteredTags] = useState<ITag[]>([]);
  const [items, setItems] = useState<ITag[]>([]);

  const [mouseWasInContainer, setMouseWasInContainer] = useState(false);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [bgcolor, setBgcolor] = useState<null | string>(null);

  const childrenRef = useRef<HTMLDivElement>(null);
  const [lastActiveChild, setLastActiveChild] = useState<HTMLElement | null>(
    null
  );

  const [openModalOneTag, setOpenModalOneTag] = useState(true);
  const [currentTag, setCurrentTag] = useState<ITag | null>(null);

  // rule of hover
  const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (event.target) {
      const element = event.target as HTMLElement;
      if (element) {
        setLastActiveChild(element.parentElement);
      }
    }
  };

  const handleMouseLeave = () => {
    if (childrenRef.current) {
      const children = Array.from(
        childrenRef.current.children
      ) as HTMLDivElement[];

      children.forEach((child) => {
        if (child.firstChild) {
          const firstChild = child.firstChild as HTMLElement;
          firstChild.style.backgroundColor = "";
          if (firstChild === lastActiveChild) {
            firstChild.style.backgroundColor = "rgba(55, 53, 47, 0.08)"; // Цвет при сохраненном активном элементе
          }
        }
      });
    }
  };
  const handleMouseEnter = () => {
    if (lastActiveChild) {
      lastActiveChild.style.backgroundColor = "";
    }
    setMouseWasInContainer(true);
  };
  // end rule of hover
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setMouseWasInContainer(false);
  };
  //console.log(search);

  const deleteTag = async (tag: ITag, i: number) => {
    if (input.current) {
      input.current.value = "";
    }
    setSearch("");
    items.splice(i, 1);
    setItems([...items]);
    const event = new CustomEvent("deleteTagInRecord", {
      detail: {
        [recordModel]: record._id,
        tagId: tag._id,
      },
    });
    window.dispatchEvent(event);
  };
  const createTag = async () => {
    //console.log(search);
    setLoading(true);
    if (input.current) {
      input.current.value = "";
    }
    setSearch("");
    let archRecordTags: ITag[];
    let tag = serverTags.find((t) => t.name === search);
    if (!tag) {
      const data = {
        [recordModel]: record._id,
        name: search,
        color: bgcolor || "",
      };
      const newTag = {
        name: search,
        color: bgcolor || "",
        _id: "newTag",
      };
      items.push(newTag);
      setItems([...items]);
      setServerTags([...serverTags, newTag]);
      try {
        // const res = await dataService.createOneTag<
        //   typeof data,
        //   { fileRecord: RecordType; tags: ITag[]; tag: ITag }
        // >(data);
        const res = await dataService.createOneTag<typeof data, ITag>(data);
        //console.log(res);
        if (res && !res._id) {
          res._id = res.id || "";
          const ut = await dataService.updagteOneTag(res);
          console.log(ut);
        }

        // archRecordTags = res.fileRecord.tags;
        // setServerTags([...res.tags]);

        // const event = new CustomEvent("updateRecord", {
        //   detail: { ...record, tags: [...archRecordTags] },
        // });
        // window.dispatchEvent(event);
        dataService.getAllTags().then((res: any) => {
          setServerTags(res.items || res);
        });

        addTagInRecord(res);
      } catch (error) {
        console.log(error);
        const event = new CustomEvent("updateRecord", {
          detail: { ...record },
        });
        window.dispatchEvent(event);
        //setServerTags((prev) => prev.filter((t) => t._id !== "newTag"));
      } finally {
        setLoading(false);
        handleSuscribeReloadTagsList();
      }
    } else {
      addTagInRecord(tag);
    }
  };
  const enterKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTag();
    }
  };
  const addTagInRecord = async (tag: ITag) => {
    if (input.current) {
      input.current.value = "";
    }
    setSearch("");
    if (!items.find((t) => t._id === tag._id)) {
      items.push(tag);
      setItems([...items]);
      const event = new CustomEvent("addTagInRecord", {
        detail: {
          [recordModel]: record._id,
          tagId: tag._id,
        },
      });
      window.dispatchEvent(event);
    }
  };

  const closeOneTagModal = () => {
    setOpenModalOneTag(false);
  };

  const handleSuscribeUpdateTagColor = (event: CustomEvent) => {
    const data: { color: string; tagId: string } = event.detail;

    setServerTags((prev) =>
      prev.map((t) => {
        return t._id === data.tagId ? { ...t, color: data.color } : t;
      })
    );
    setItems((prev) =>
      prev.map((t) => {
        return t._id === data.tagId ? { ...t, color: data.color } : t;
      })
    );
  };
  const handleSuscribeUpdateTagName = (event: CustomEvent) => {
    const data: { name: string; tagId: string } = event.detail;
    setServerTags((prev) =>
      prev.map((t) => {
        return t._id === data.tagId ? { ...t, name: data.name } : t;
      })
    );
    setItems((prev) =>
      prev.map((t) => {
        return t._id === data.tagId ? { ...t, name: data.name } : t;
      })
    );
  };
  const handleSuscribeDeleteTag = (event: CustomEvent) => {
    const data: { tagId: string } = event.detail;
    setServerTags((prev) =>
      prev.filter((t) => {
        return t._id !== data.tagId;
      })
    );
    setItems((prev) =>
      prev.filter((t) => {
        return t._id !== data.tagId;
      })
    );
  };
  const handleSuscribeReloadTagsList = () => {
    dataService.getAllTags().then((res: any) => {
      setServerTags(res.items || res);
    });
  };

  useEffect(() => {
    getTags();
    async function getTags() {
      try {
        const res = await dataService.getAllTags();
        setServerTags(res.items || res);
        //console.log(res);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    window.addEventListener(
      "reloadTagsList",
      handleSuscribeReloadTagsList as EventListener
    );
    window.addEventListener(
      "updateTagColor",
      handleSuscribeUpdateTagColor as EventListener
    );
    window.addEventListener(
      "updateTagName",
      handleSuscribeUpdateTagName as EventListener
    );
    window.addEventListener(
      "deleteTag",
      handleSuscribeDeleteTag as EventListener
    );
    return () => {
      window.removeEventListener(
        "reloadTagsList",
        handleSuscribeReloadTagsList as EventListener
      );
      window.removeEventListener(
        "updateTagName",
        handleSuscribeUpdateTagName as EventListener
      );
      window.removeEventListener(
        "updateTagColor",
        handleSuscribeUpdateTagColor as EventListener
      );
      window.removeEventListener(
        "deleteTag",
        handleSuscribeDeleteTag as EventListener
      );
    };
  }, []);
  const filterList = (el: ITag) => {
    //console.log(el);
    const regEx = new RegExp(search, "gi");
    return el.name.match(regEx);
  };
  useEffect(() => {
    //console.log(serverTags);
    setFilteredTags(serverTags.filter(filterList));
    if (search && !bgcolor) {
      setBgcolor(bgColors[Math.floor(Math.random() * bgColors.length)]);
    } else if (!search) {
      setBgcolor(null);
    }
    return () => {};
  }, [serverTags, search]);

  useEffect(() => {
    setItems([...record.tags]);
  }, [record]);
  useEffect(() => {
    setTimeout(() => {
      if (modalInner.current) {
        const top = rect.cellRectTop; //+ window.scrollY;
        const screenHeight = window.innerHeight;
        const modalMaxHeight = modalInner.current.offsetHeight;
        setStyle((s: any) => ({
          ...s,
          top:
            top + modalMaxHeight > screenHeight
              ? screenHeight - modalMaxHeight - 5
              : top,
        }));
      }
    }, 100);
  }, [filteredTags]);
  //console.log(items);
  return (
    <>
      {currentTag && openModal && openModalOneTag && (
        <OneTagModalManage
          openModalOneTag={openModalOneTag}
          tag={currentTag}
          style={style}
          mainModal={modalInner.current}
          closeModal={closeOneTagModal}
          setLoadind={setLoading}
          dataService={dataService}
        />
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          "& .MuiModal-backdrop": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Box sx={style} ref={modalInner} className={styles.modalWindowTagList}>
          <Box
            id="selected_and_search"
            className={styles.selected_and_search_style}
          >
            {items.map((tag, i) => (
              <Box
                className={styles.tag_in_select_style}
                sx={{ backgroundColor: tag.color }}
                key={tag._id}
              >
                <Box className={styles.wrap_text_in_tag}>
                  <Typography className={styles.text_in_tag}>
                    {tag.name}
                  </Typography>
                </Box>
                <Box
                  role="button"
                  className={styles.tag_delete_button}
                  onClick={() => deleteTag(tag, i)}
                >
                  <ClearOutlinedIcon
                    color="#37352f73"
                    width="8px"
                    height="8px"
                    // className={styles.del_icon}
                  />
                </Box>
                <Box />
              </Box>
            ))}
            <Box className={styles.input_wrap}>
              <input
                disabled={loading}
                ref={input}
                className={styles.input_style}
                onChange={handleInput}
                onKeyDown={enterKeyPress}
              ></input>
            </Box>
          </Box>

          <Box id="wrapForListAndCreate" className={styles.secondblock}>
            <Box className={styles.secondblockwrap}>
              <Box id="tags_list" className={styles.listwrap1}>
                <Box id="tags_list" className={styles.listwrap2}>
                  Select an option or create one
                </Box>
                <Box sx={{ ml: "auto", display: "flex" }}>
                  {loading && (
                    <CircularProgress
                      sx={{
                        height: "1em !important",
                        width: "1em !important",
                        opacity: 1,
                        transformOrigin: "center",
                      }}
                    />
                  )}
                </Box>
              </Box>

              <Box
                className={styles.reatewrap1}
                ref={childrenRef}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
              >
                {filteredTags.map((t, i) => (
                  <Box
                    className={[styles.createwrap20, "child"].join(" ")}
                    key={t._id || t.id}
                  >
                    <Box
                      className={[styles.createwrap21, "chirstChild"].join(" ")}
                      onMouseOver={handleMouseOver}
                      sx={{
                        background:
                          i === 0 && search && !mouseWasInContainer
                            ? "rgba(55, 53, 47, 0.08)"
                            : "undefined",
                      }}
                    >
                      <Box className={styles.createwrap22}>
                        <Box className={styles.existtaginlistblock1}>
                          <DragIndicatorIcon
                            color="#37352f73"
                            width="12px"
                            height="12px"
                            // className={styles.dotstyle}
                          />
                        </Box>
                        <Box
                          className={styles.existtaginlistblock2}
                          onClick={() => addTagInRecord(t)}
                        >
                          <Box sx={{ display: "flex" }}>
                            <Box
                              className={styles.wrap1taginlist}
                              sx={{ backgroundColor: t.color }}
                            >
                              <Box className={styles.wrapwtaginlist}>
                                <span className={styles.spantagtext}>
                                  {t.name}
                                </span>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          className={styles.existtaginlistblock3}
                          onClick={() => {
                            // console.log(t.name);
                            if (loading) {
                              return;
                            }
                            setCurrentTag({ ...t });
                            setOpenModalOneTag(true);
                          }}
                        >
                          <Box className={styles.wrapforiconforedit}>
                            <MoreHorizIcon
                              color="#37352f73"
                              width="14px"
                              height="4px"
                              // className={styles.editiconstyle}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
                {search && !serverTags.find((t) => t.name === search) && (
                  <Box
                    className={styles.createwrap2}
                    onMouseOver={handleMouseOver}
                  >
                    <Box
                      className={styles.createwrap3}
                      sx={{
                        background: filteredTags.length
                          ? "undefined"
                          : "rgba(55, 53, 47, 0.08)",
                      }}
                    >
                      <Box className={styles.createwrap4}>
                        <Box className={styles.createwrap5}>
                          <Box className={styles.createwrap6}>
                            <Box
                              className={styles.createwrap7}
                              onClick={createTag}
                            >
                              <Box
                                className={styles.createtext}
                                sx={{ cursor: "pointer" }}
                              >
                                Create
                              </Box>
                              <Box
                                className={styles.wraptext}
                                sx={{ background: bgcolor || "" }}
                              >
                                <Box className={styles.wraptext2}>
                                  <span className={styles.textspan}>
                                    {search}
                                  </span>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ManageTagsInModal;

function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}
// setServerTags([
//   {
//     _id: "65ae8886212d300631d71cc8",
//     name: "ddd",
//     color: "rgb(227, 226, 224)",
//     createdAt: "2024-01-22T15:23:50.095Z",
//     updatedAt: "2024-01-22T15:23:50.095Z",
//   },
//   {
//     _id: "65ae41fa9377bfc78a51228e",
//     name: "test",
//     color: "rgb(232, 222, 238)",
//     createdAt: "2024-01-22T10:22:50.945Z",
//     updatedAt: "2024-01-22T10:22:50.945Z",
//   },
//   {
//     _id: "656f3e57dbffbe3175e681a2",
//     name: "test query",
//     color: "rgb(211, 229, 239)",
//     createdAt: "2023-12-05T15:14:31.263Z",
//     updatedAt: "2023-12-05T15:14:31.263Z",
//   },
//   {
//     _id: "656f3d67dbffbe3175e6814e",
//     name: "New tag3",
//     color: "rgb(232, 222, 238)",
//     createdAt: "2023-12-05T15:10:31.576Z",
//     updatedAt: "2023-12-05T15:10:31.576Z",
//   },
//   {
//     _id: "656f16e4ea245f99cdc241ff",
//     name: "new",
//     color: "rgb(219, 237, 219)",
//     createdAt: "2023-12-05T12:26:12.024Z",
//     updatedAt: "2023-12-05T12:26:12.024Z",
//   },
//   {
//     _id: "656f13f9ddf0a67d9728031f",
//     name: "tag4",
//     color: "rgb(238, 224, 218)",
//     createdAt: "2023-12-05T12:13:45.796Z",
//     updatedAt: "2023-12-05T12:13:45.796Z",
//   },
//   {
//     _id: "656f11990c90620875db5eca",
//     name: "tag2",
//     color: "rgb(238, 224, 218)",
//     createdAt: "2023-12-05T12:03:37.422Z",
//     updatedAt: "2023-12-05T12:03:37.422Z",
//   },
//   {
//     _id: "656f10a70c90620875db5e97",
//     name: "tag3",
//     color: "rgb(211, 229, 239)",
//     createdAt: "2023-12-05T11:59:35.177Z",
//     updatedAt: "2023-12-05T11:59:35.177Z",
//   },
// ]);
// setLoading(false);
