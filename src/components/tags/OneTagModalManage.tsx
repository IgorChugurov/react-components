import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Box, Modal } from "@mui/material";

import { colorsList } from "./data/colors.list";
import styles from "./css/oneTagModal.module.css";
import { ITag, ITagsDataService } from "./model/tag";
import ConfirmModal from "./components/ConfirmModal";
import { useRefHeightMeasure } from "./hooks/useRefHeightMeasure";
import { CheckOutlinedIcon } from "./icons/CheckOutlinedIcon";
import { DeleteOutlineOutlinedIcon } from "./icons/DeleteOutlineOutlined";

const OneTagModalManage = ({
  openModalOneTag,
  tag,
  style,
  closeModal,
  setLoadind,
  dataService,
}: {
  tag: ITag;
  style: { top: number; left: number };
  mainModal: HTMLElement | null;
  setLoadind: (d: boolean) => void;
  openModalOneTag: boolean;
  closeModal: () => void;
  dataService: ITagsDataService;
}) => {
  const left = style.left + 200;
  const modalWidth = 230;
  const screenWidth = window.innerWidth;
  const [styleModal, setStyleModal] = useState({
    position: "absolute",
    top: style.top,
    left: left + modalWidth > screenWidth ? screenWidth - modalWidth : left,
    bgcolor: "background.default",
    borderRadius: "5px",
    "&:focus-visible": {
      outline: "none",
    },
    transition: ".3s top ease",
  });

  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState(tag);
  const [value, setValue] = useState(tag.name);
  const inputElemet = useRef<HTMLInputElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const deleteBoxWrap = useRef<HTMLDivElement>(null);

  const { height, refCallback } = useRefHeightMeasure();
  useEffect(() => {
    if (height) {
      setTimeout(() => {
        const top = style.top; //+ window.scrollY;
        const screenHeight = window.innerHeight;
        const modalMaxHeight = height || 0;

        setStyleModal((s: any) => ({
          ...s,
          top:
            top + modalMaxHeight > screenHeight
              ? screenHeight - modalMaxHeight - 5
              : top,
        }));
      });
    }
  }, [height]);
  // *********************************************
  //******************************************* */
  const dispatcUpdateTag = (tag: ITag) => {
    const event = new CustomEvent("updateTag", {
      detail: tag,
    });
    window.dispatchEvent(event);
  };
  const onChange = (event: any) => setValue(event.target.value);

  const changeColor = async (color: string) => {
    setLoadind(true);
    setItem({ ...item, color: color });
    try {
      await dataService.updagteOneTag({ _id: tag._id || tag.id, color });
      dispatcUpdateTag({ ...tag, color, id: tag._id }); //id:tag._id jnly for json-server for examples
      setLoadind(false);
    } catch (error) {
      setLoadind(false);
      console.log(error);
    }
  };
  const deleteTag = async () => {
    try {
      setLoadind(true);
      await dataService.deleteOneTag(tag._id || tag.id || "");
      const event = new CustomEvent("deleteTag", {
        detail: { tagId: tag._id || tag.id },
      });
      window.dispatchEvent(event);
      const event2 = new CustomEvent("reloadTagsList");
      window.dispatchEvent(event2);

      setLoadind(false);
      closeModal();
    } catch (error) {
      console.log(error);
      setLoadind(false);
    }
  };

  const saveTagName = async (val: string) => {
    setLoadind(true);
    try {
      await dataService.updagteOneTag({ _id: tag._id || tag.id, name: val });
      dispatcUpdateTag({ ...tag, name: val, id: tag._id });
      closeModal();
      setLoadind(false);
    } catch (error) {
      console.log(error);
      setLoadind(false);
    }
  };

  const enterKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      saveTagName(value);
    }
  };

  // rule of hover
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const { target } = event;
    if (target instanceof HTMLElement) {
      if (target.classList.contains("classForMouseEnter")) {
        if (deleteBoxWrap.current) {
          deleteBoxWrap.current.style.background = "";
        }
        const parent = target.parentElement as HTMLElement;
        parent.style.background = "rgba(55, 53, 47, 0.08)";
        if (childrenRef.current) {
          const children = Array.from(
            childrenRef.current.children
          ) as HTMLDivElement[];
          children.forEach((child) => {
            if (child !== parent) {
              child.style.background = "";
            }
          });
        }
      }
    }
  };
  const handleMouseEnterDeleteBlock = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    event.stopPropagation();
    const { target } = event;
    if (target instanceof HTMLElement) {
      const parent = target.parentElement as HTMLElement;
      parent.style.background = "rgba(55, 53, 47, 0.08)";
      if (childrenRef.current) {
        const children = Array.from(
          childrenRef.current.children
        ) as HTMLDivElement[];
        children.forEach((child) => {
          child.style.background = "";
        });
      }
    }
  };
  // end rule of hover

  useEffect(() => {
    setItem(tag);
    setValue(tag.name || "");
  }, [tag]);
  useEffect(() => {
    if (inputElemet.current && openModalOneTag) {
      inputElemet.current.focus();
    }
  }, [inputElemet.current, openModalOneTag]);

  const onClose = () => {
    const input: any = document.getElementById("oneTagInputEdit");
    if (input && input.value && input.value !== item.name) {
      saveTagName(input.value);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <ConfirmModal
        openModal={openModal}
        handleCloseModal={() => setOpenModal(false)}
        setOpenModal={setOpenModal}
        modalTitle={`Do you really want to delete ${tag.name}?`}
        handleAction={deleteTag}
      />
      {openModalOneTag && (
        <Modal
          open={openModalOneTag}
          onClose={onClose}
          sx={{
            "& .MuiModal-backdrop": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Box sx={styleModal} ref={refCallback}>
            <Box className={styles.oneTwrap1}>
              <Box className={styles.oneTwrap2}>
                <Box className={styles.oneTwrap3}>
                  <Box className={styles.oneTwrap4}>
                    <Box className={styles.oneTwrap5}>
                      <Box className={styles.oneTinner1}>
                        <Box className={styles.oneTeditWrap1}>
                          <Box className={styles.oneTeditWrap2}>
                            <Box className={styles.oneTeditWrap3}>
                              <Box className={styles.oneTeditWrap4}>
                                <input
                                  id="oneTagInputEdit"
                                  className={styles.oneTinput}
                                  value={value}
                                  ref={inputElemet}
                                  onChange={onChange}
                                  onKeyDown={enterKeyPress}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      <Box className={styles.oneTinner2}>
                        <Box className={styles.oneTDeleteWrap}>
                          <Box
                            className={styles.oneTDeleteWrap1}
                            ref={deleteBoxWrap}
                            onMouseEnter={handleMouseEnterDeleteBlock}
                          >
                            <Box
                              className={styles.oneTDeleteWrap2}
                              onClick={() => {
                                setOpenModal(true);
                              }}
                            >
                              <Box className={styles.oneTDeleteWrapDel}>
                                <Box className={styles.oneTDeleteWrapDelWrap}>
                                  <DeleteOutlineOutlinedIcon
                                    color="#37352fd9"
                                    width="16px"
                                    height="16px"
                                    // className={styles.oneTDeleteWrapDelIcon}
                                    // fontSize="small"
                                  />
                                </Box>
                              </Box>
                              <Box className={styles.oneTDeleteWrapTex}>
                                <Box className={styles.oneTDeleteWrapTexText}>
                                  Delete
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        <Box className={styles.oneTColorList} ref={childrenRef}>
                          <Box className={styles.oneTColorListName}>
                            <Box className={styles.oneTColorListNameBox}>
                              Colors
                            </Box>
                          </Box>
                          {colorsList.map((color) => (
                            <Box
                              key={color.bgcolor}
                              className={styles.colorInListWrap}
                              onClick={() => changeColor(color.bgcolor)}
                              onMouseEnter={handleMouseEnter}
                            >
                              <Box
                                className={[
                                  styles.colorInListWrap1,
                                  "classForMouseEnter",
                                ].join(" ")}
                              >
                                <Box className={styles.colorInListWrap1Inner1}>
                                  <Box
                                    className={
                                      styles.colorInListWrap1Inner1BoxWithColor
                                    }
                                    sx={{
                                      background: color.bgcolor,
                                      color: color.color,
                                    }}
                                  ></Box>
                                </Box>

                                <Box className={styles.colorInListWrap1Inner2}>
                                  <Box
                                    className={
                                      styles.colorInListWrap1Inner2Text
                                    }
                                  >
                                    {color.name}
                                  </Box>
                                </Box>
                                {item.color === color.bgcolor && (
                                  <Box
                                    className={styles.colorInListWrap1Inner3}
                                  >
                                    <CheckOutlinedIcon
                                      color="rgb(55, 53, 47)"
                                      width="14px"
                                      height="14px"
                                      // className={styles.colorInListWrap1Inner3Icon}
                                      // fontSize="small"
                                    />
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default OneTagModalManage;
