import {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  SetStateAction,
  Dispatch,
} from "react";
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
  items: ITag[];
  setItems: Dispatch<SetStateAction<ITag[]>>;
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
  items,
  setItems,
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
  const dispatchTagsEvent = (type: string, data: any) => {
    const event = new CustomEvent(type, {
      detail: data,
    });
    window.dispatchEvent(event);
  };

  const deleteTag = async (tag: ITag, i: number) => {
    if (input.current) {
      input.current.value = "";
    }
    setSearch("");
    items.splice(i, 1);
    setItems([...items]);
    dispatchTagsEvent("deleteTagInRecord", {
      [recordModel]: record._id,
      tagId: tag._id,
    });
  };
  const createTag = async () => {
    //console.log(search);
    setLoading(true);
    if (input.current) {
      input.current.value = "";
    }
    setSearch("");
    let tag = serverTags.find((t) => t.name === search);
    if (!tag) {
      const newTag = {
        name: search,
        color: bgcolor || "",
        _id: "newTag",
      };
      items.push(newTag);
      setItems([...items]);
      setServerTags([...serverTags, newTag]);
      try {
        const res = await dataService.createOneTag(newTag);
        // only for examples json-server
        if (res && !res._id) {
          res._id = res.id || "";
          await dataService.updagteOneTag(res);
        }
        setItems((prev) =>
          prev.map((item) => (item._id === "newTag" ? res : item))
        );
        dataService.getAllTags().then((res: any) => {
          setServerTags(res);
        });

        addTagInRecord(res);
      } catch (error) {
        console.log(error);
        dispatchTagsEvent("updateRecord", { ...record });
        setServerTags((prev) => prev.filter((t) => t._id !== "newTag"));
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
      dispatchTagsEvent("addTagInRecord", {
        [recordModel]: record._id,
        tagId: tag._id,
      });
    }
  };

  const closeOneTagModal = () => {
    setOpenModalOneTag(false);
  };

  const handleSuscribeUpdateTag = (event: CustomEvent) => {
    const data: ITag = event.detail;
    setServerTags((prev) =>
      prev.map((t) => {
        return t._id === data._id ? { ...data } : t;
      })
    );
    // setItems((prev) =>
    //   prev.map((t) => {
    //     return t._id === data._id ? { ...data } : t;
    //   })
    // );
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
      setServerTags(res);
    });
  };

  useEffect(() => {
    getTags();
    async function getTags() {
      try {
        const res = await dataService.getAllTags();
        setServerTags(res);
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
      "updateTag",
      handleSuscribeUpdateTag as EventListener
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
        "updateTag",
        handleSuscribeUpdateTag as EventListener
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
