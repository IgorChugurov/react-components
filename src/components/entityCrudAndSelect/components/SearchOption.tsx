import { Dispatch, SetStateAction, useRef } from "react";
import { IconSearch_inSelect, Icon_clear_search } from "../icon/CustomIcon";
import styles from "../css/searchOption.module.css";
import styles_typography from "../css/global_typography.module.css";
const SearchOption = <T,>({
  setSearchText,
  searchText,
  loading,
  placeholder,
  setCurrentOption,
  setDeleteOption,
  enterKeyPress,
}: {
  setCurrentOption: Dispatch<SetStateAction<T | null>>;
  setDeleteOption: Dispatch<SetStateAction<T | null>>;
  setSearchText: Dispatch<SetStateAction<string>>;
  loading: boolean;
  searchText: string;
  placeholder: string;
  styles?: any;
  enterKeyPress: () => void;
}) => {
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const handleFocus = () => {
    setCurrentOption(null);
    setDeleteOption(null);
  };

  return (
    <div
      className={styles.container}
      onClick={(e) => {
        e.stopPropagation();
        inputSearchRef.current &&
          inputSearchRef.current.focus &&
          inputSearchRef.current?.focus();
      }}
    >
      <IconSearch_inSelect className={styles.iconSearchInSelect} />

      <input
        className={[styles.search_input, styles_typography.body_s_regular].join(
          " "
        )}
        value={searchText}
        disabled={loading}
        onFocus={() => handleFocus()}
        ref={inputSearchRef}
        placeholder={placeholder}
        onChange={(e: any) => {
          e.stopPropagation();
          e.preventDefault();
          setSearchText(e.target.value);
        }}
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            enterKeyPress();
          } else if (e.key !== "Escape") {
            // Prevents autoselecting item while typing (default Select behaviour)
            e.stopPropagation();
          }
        }}
      />
      {searchText !== "" && (
        <Icon_clear_search
          className={styles.iconClose}
          onClick={() => setSearchText("")}
        />
      )}
    </div>
  );
};

export default SearchOption;
