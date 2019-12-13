import React, { useState, useEffect } from "react";
import {
  OutlinedInput,
  InputAdornment,
  TextField,
  Chip
} from "@material-ui/core"; 
import SearchIcon from "@material-ui/icons/Search";
import { useNewsValue } from "../../context/NewsContext";
import { debounce } from "../../utils/debounce";

const styles = {
  background: "aliceblue"
};

const FilterContainerComponent = () => {
  const [tagName, setTagName] = useState("");
  const [{ tagNameList }, dispatch] = useNewsValue();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  });

  const handleOnScroll = () => {
    let scroll =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (scroll >= 100) setIsFixed(true);
    else setIsFixed(false);
  };

  const handleChangeSearchText = debounce(searchText => {
    dispatch({
      type: "set_searchText",
      payload: searchText
    });
  }, 500);

  const handleTagNameChange = e => {
    const tagName = e.target.value;
    setTagName(tagName);
  };

  const handleTagNameKeyPress = e => {
    if (e.key === "Enter") {
      if (tagNameList.indexOf(tagName) === -1) {
        dispatch({
          type: "set_tagNameList",
          payload: [...tagNameList, tagName]
        });
        setTagName("");
      }
    }
  };
  const handleDeleteTag = tag => {
    const filteredTagNameList = tagNameList.filter(tagName => tagName !== tag);
    dispatch({
      type: "set_tagNameList",
      payload: filteredTagNameList
    });
  };
  const renderTagList = () => {
    if (tagNameList.length > 3) {
      return <div>See filtered tags({tagNameList.length})</div>;
    } else {
      return (
        <div>
          {tagNameList.map(tag => (
            <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)} />
          ))}
        </div>
      );
    }
  };

  const containerClass = () => {
    if (isFixed) {
      return "flex padding-1 fixed";
    } else {
      return "flex padding-1";
    }
  };

  return (
    <>
      <div style={styles} className={containerClass()}>
        <OutlinedInput
          placeholder="Type to search"
          className="flex-1"
          onChange={e => handleChangeSearchText(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <div className="flex align-center flex-1">
          <TextField
            placeholder="Enter tag name"
            value={tagName}
            onChange={handleTagNameChange}
            onKeyPress={handleTagNameKeyPress}
          />
          {renderTagList()}
        </div>
      </div>
    </>
  );
};

export default FilterContainerComponent;
