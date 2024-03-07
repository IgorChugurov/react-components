import { useEffect, useMemo, useRef, useState, KeyboardEvent } from "react";
import { IApiService, IEntity } from "./model/ApiService";
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styles from "./css/select.module.css";
import styles_typography from "./css/global_typography.module.css";
import {
  Icon_Cancel_inSelect,
  Icon_Delete_inSelect,
  Icon_Done_inSelect,
  Icon_Edit_inSelect,
} from "./icon/CustomIcon";
import EditCurrentOption from "./components/EditOption";
import LabelBlock from "./components/LabelBlock";
import SearchOption from "./components/SearchOption";
import AddNewOption from "./components/AddNewOption";

const EntityCrudAndSelect = <T extends IEntity>({
  dataService,
  placeholder,
  label,
  required,
  disabled,
  name,
  selectedValue,
  setSelectedValue,
  submitted,
  sx,
  filteredFieldKey,
  filteredFieldValue,
  helperText,
  container50,

  errorText = "Please select",
}: {
  dataService: IApiService<T>;
  placeholder: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  name: string;
  submitted?: boolean;
  selectedValue: string;
  setSelectedValue: (v: string) => void;
  sx?: any;
  filteredFieldKey?: string;
  filteredFieldValue?: string;
  helperText?: string;
  errorText?: string;
  container50?: boolean;
}) => {
  const [value, setValue] = useState("none");
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [searchText, setSearchText] = useState("");

  const selectRef = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const emptyOption = { _id: "none", name: placeholder } as T;
  const [optioinsWithEmpty, setOptioinsWithEmpty] = useState<T[]>([
    emptyOption,
  ]);

  const [isInvalid, setIsInvalid] = useState(value === "none" && submitted);
  //console.log(isInvalid);

  const [loading, setLoading] = useState(false);

  const [currentOption, setCurrentOption] = useState<T | null>(null);
  const [deleteOption, setDeleteOption] = useState<T | null>(null);
  const [activeOption, setActiveOption] = useState<T | null>(null);

  // ************************** incon in select **********************************************************************

  // ************************************************************************************************

  //   const sxForSelect = {
  //     outline: 0,
  //     "& .MuiSelect-select": {
  //       paddingTop: "11px",
  //       paddingBottom: "11px",
  //     },
  //   };

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const clearValue = () => {
    setValue("none");
    setSelectedValue("");
  };

  const onChange = (event: SelectChangeEvent<string>) => {
    const { target } = event;
    setValue(target.value);
    setSelectedValue(target.value);
  };

  const displayAddNewOption = useMemo(
    () =>
      searchText !== "" &&
      (optioinsWithEmpty.length === 0 ||
        !optioinsWithEmpty.find(
          (o) =>
            o.name === searchText &&
            (filteredFieldKey
              ? o[filteredFieldKey] === filteredFieldValue
              : true)
        )),
    [searchText, optioinsWithEmpty]
  );

  const enterKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateData();
    }
  };
  const enterKeyPressInSearch = () => {
    if (activeOption) {
      setValue(activeOption._id);
      setAnchorEl(null);
      setActiveOption(null);
    } else {
      createNewOption();
    }
  };

  const createNewOption = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (searchText === "") {
      return;
    }
    try {
      const newOption = { _id: "newOption", name: searchText } as any;
      if (filteredFieldKey && filteredFieldValue) {
        newOption[filteredFieldKey] = filteredFieldValue;
      }
      setOptioinsWithEmpty([
        ...optioinsWithEmpty.slice(0, 1),
        newOption,
        ...optioinsWithEmpty.slice(1),
      ]);

      const newItem: any = { name: searchText };

      if (filteredFieldKey && filteredFieldValue) {
        newItem[filteredFieldKey] = filteredFieldValue;
      }
      const res = await dataService.create(newItem);
      setOptioinsWithEmpty((prev) =>
        prev.map((opt) => (opt._id === "newOption" ? res : opt))
      );

      setValue(res._id);
    } catch (err: any) {
      setOptioinsWithEmpty((prev) =>
        prev.filter((opt) => opt._id !== "newOption")
      );
      console.log(err);
    } finally {
      setLoading(false);
      setDeleteOption(null);
      setCurrentOption(null);
      setSearchText("");
    }
  };

  const updateData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (!currentOption || currentOption.name === "") {
      return;
    }
    try {
      const res = await dataService.update(currentOption);
      setOptioinsWithEmpty((prev) =>
        prev.map((option) =>
          option._id === currentOption._id ? { ...res } : option
        )
      );
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
      setDeleteOption(null);
      setCurrentOption(null);
    }
  };
  const deleteData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (!deleteOption || !deleteOption._id) {
      return;
    }
    const index = optioinsWithEmpty.findIndex(
      (opt) => opt._id === deleteOption._id
    );
    try {
      setOptioinsWithEmpty((prev) =>
        prev.filter((option) => option._id !== deleteOption._id)
      );
      await dataService.deleteOne(deleteOption._id);

      //console.log(name, selectedValue, deleteOption._id);
      if (value === deleteOption._id) {
        setValue("none");
      }
    } catch (err: any) {
      console.log(err);
      setOptioinsWithEmpty([
        ...optioinsWithEmpty.slice(0, index),
        deleteOption,
        ...optioinsWithEmpty.slice(index),
      ]);
    } finally {
      setLoading(false);
      setDeleteOption(null);
      setCurrentOption(null);
    }
  };

  const setEditableOption = (item: T | null) => {
    if (loading) {
      return;
    }
    setCurrentOption(item);
    setTimeout(() => {
      const element = document.getElementById(`input_${item?._id}`);
      if (element) {
        element.focus();
      }
    }, 100);
  };
  const setDeletableOption = (item: T | null) => {
    if (loading) {
      return;
    }
    setDeleteOption(item);
  };

  const getOptions = async () => {
    return dataService.getAll().then((options) => {
      //console.log(options);
      setTimeout(() => setLoadingOptions(false), 200);

      setOptioinsWithEmpty([emptyOption, ...options]);
    });
  };

  useEffect(() => {
    if (!anchorEl) {
      setCurrentOption(null);
      setDeleteOption(null);
      setSearchText("");
    }
  }, [anchorEl]);
  useEffect(() => {
    getOptions().then(() => {
      setTimeout(() => updateColors(), 300);
    });
  }, []);
  useEffect(() => {
    if (submitted && value === "none" && required) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [submitted, value]);

  const displayOrNotOption = (option: T) => {
    let display =
      option._id === "none" ||
      !option.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (filteredFieldKey &&
        filteredFieldValue &&
        option[filteredFieldKey as string] !== filteredFieldValue)
        ? false
        : true;
    return display;
  };

  const updateColors = () => {
    //console.log(selectRef);
    const borderColor = isInvalid
      ? "var(--system-error,#ff453a)"
      : disabled
      ? "var(--grey-50,#f8f8f8)"
      : anchorEl
      ? "var(--primary-600,#0768fd)"
      : "var(--grey-200,#dcdcdc)";
    if (selectRef.current) {
      const el = selectRef.current as HTMLElement;
      el.style.setProperty("--border-color", borderColor);
    }
  };

  useEffect(() => {
    updateColors();
  }, [isInvalid, disabled, anchorEl]);
  useEffect(() => {
    let optionColor =
      value === "none" ? "var(--grey-600)" : "var(--grey-black)";
    setTimeout(() => {
      const selectedOption = document.getElementById(`selectedOption${name}`);
      selectedOption?.style.setProperty("--option-color", optionColor);
    });
  }, [value]);
  useEffect(() => {
    if (filteredFieldValue) {
      setValue("none");
    }
  }, [filteredFieldValue]);

  useEffect(() => {
    setActiveOption(
      searchText
        ? optioinsWithEmpty.find(
            (option) =>
              option.name.toLowerCase().includes(searchText.toLowerCase()) &&
              option._id !== "none"
          ) || null
        : null
    );

    // if (searchText) {
    //   const opt = optioinsWithEmpty.find((option) =>
    //     option.name.toLowerCase().includes(searchText.toLowerCase())
    //   );
    //   if (opt) {
    //     setActiveOption(opt);
    //   } else {
    //     setActiveOption(null);
    //   }
    // } else {
    //   setActiveOption(null);
    // }
  }, [searchText]);
  useEffect(() => {
    //initialization
    //console.log(loadingOptions, selectedValue, value);
    if (!loadingOptions && selectedValue && selectedValue !== value) {
      setValue(selectedValue);
    }
  }, [selectedValue, loadingOptions]);

  return (
    <>
      <Box className={container50 ? styles.container50 : styles.container}>
        <LabelBlock
          required={required}
          label={label}
          value={value}
          clearValue={clearValue}
          isInvalid={isInvalid}
          disabled={disabled}
          anchorEl={anchorEl}
        />

        <Box className={styles.inputBox} sx={sx}>
          <Select
            style={{ borderColor: "var(--border-color)" }}
            ref={selectRef}
            className={[styles.custom_select, disabled ? "disabled" : ""].join(
              " "
            )}
            disabled={disabled}
            value={value}
            onChange={onChange}
            onOpen={handleMenuOpen}
            onClose={handleMenuClose}
            MenuProps={{
              // Disables auto focus on MenuItems and allows TextField to be in focus
              autoFocus: false,
              anchorEl: anchorEl,
              open: Boolean(anchorEl),
              onClose: handleMenuClose,
              PaperProps: {
                className: styles.menuPaper,
                sx: {
                  ...(displayAddNewOption ? { paddingBottom: 0 } : {}),
                },
                style: {
                  marginTop: "-6px",
                },
              },
            }}
            renderValue={(selValue) => {
              const selectedOption = optioinsWithEmpty.find(
                (option) => option._id === selValue
              );
              return (
                <span
                  id={`selectedOption${name}`}
                  style={{ color: "var(--option-color)" }}
                  className={styles_typography.body_s_regular}
                >
                  {selectedOption ? selectedOption.name : ""}
                </span>
              );
            }}
          >
            <div
              className={styles.searchOption}
              onClick={(e) => e.stopPropagation()}
            >
              <SearchOption<T>
                loading={loading}
                setSearchText={setSearchText}
                searchText={searchText}
                placeholder={`Add/Search ${name}`}
                setCurrentOption={setCurrentOption}
                setDeleteOption={setDeleteOption}
                enterKeyPress={enterKeyPressInSearch}
              />
            </div>
            {optioinsWithEmpty.filter(displayOrNotOption).length === 0 &&
              searchText === "" && (
                <div
                  className={styles.wrapEmptyOption}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span
                    className={[
                      styles.textForEmptyList,
                      styles_typography.body_s_regular,
                    ].join(" ")}
                  >
                    List is empty
                  </span>
                </div>
              )}

            {optioinsWithEmpty.map((r, i: number) => (
              <MenuItem
                key={r._id}
                autoFocus={false}
                value={r._id}
                style={{
                  display: displayOrNotOption(r) ? "flex" : "none",
                  ...(activeOption && activeOption._id === r._id
                    ? { backgroundColor: "var(--primary-50, #eef7ff)" }
                    : {}),
                }}
                className={
                  currentOption && currentOption._id === r._id
                    ? styles.menuItemEdit
                    : styles.menuItem
                }
              >
                {currentOption && currentOption._id === r._id ? (
                  <EditCurrentOption<T>
                    enterKeyPress={enterKeyPress}
                    loading={loading}
                    currentOption={currentOption}
                    setCurrentOption={setCurrentOption}
                    updateData={updateData}
                    setEditableOption={setEditableOption}
                    option={r}
                  />
                ) : (
                  <>
                    <span
                      className={[
                        styles.textInMenuItem,
                        styles_typography.body_s_regular,
                        deleteOption && deleteOption._id === r._id
                          ? styles.strikethrough
                          : "",
                        //r._id === "" ? "colorGrey500" : "colorGreyBlack",
                      ].join(" ")}
                    >
                      {r.name}
                    </span>
                    {deleteOption && deleteOption._id === r._id ? (
                      <div className={styles.iconWrapper}>
                        <Icon_Done_inSelect
                          className={styles.iconConfirm}
                          onClick={() => {
                            deleteData();
                          }}
                        />
                        <Icon_Cancel_inSelect
                          className={styles.iconCancel}
                          onClick={() => {
                            if (loading) {
                              return;
                            }
                            setDeleteOption(null);
                          }}
                        />
                      </div>
                    ) : (
                      <div className={styles.iconWrapper}>
                        <Icon_Edit_inSelect
                          className={styles.iconStyleEditAndDelete}
                          hoverColor="var(--Primary-500)"
                          onClick={(e) => {
                            setEditableOption(r);
                          }}
                        />
                        <Icon_Delete_inSelect
                          className={styles.iconStyleEditAndDelete}
                          hoverColor="var(--Primary-500)"
                          onClick={(e) => {
                            setDeletableOption(r);
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </MenuItem>
            ))}

            {loadingOptions && (
              <Box className={styles.loadingBox}>
                <CircularProgress />
              </Box>
            )}
            {displayAddNewOption && (
              <div
                className={styles.addNewOption}
                onClick={(e) => {
                  e.stopPropagation();
                  createNewOption();
                }}
              >
                <AddNewOption
                  newOptionName={searchText}
                  createNewOption={createNewOption}
                />
              </div>
            )}
          </Select>

          {helperText && !isInvalid && (
            <span className={styles.helperText}>{helperText}</span>
          )}

          {isInvalid && required && (
            <span className={styles.errorText}>{errorText}</span>
          )}
        </Box>
      </Box>
    </>
  );
};

export default EntityCrudAndSelect;
