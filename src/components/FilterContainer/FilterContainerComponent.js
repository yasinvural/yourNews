import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Popover,
  Button,
  Typography,
  OutlinedInput,
  InputAdornment,
  TextField,
  Chip
} from "@material-ui/core";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import SearchIcon from "@material-ui/icons/Search";
import { getCategories } from "../../services/CategoryService";
import { useNewsValue } from "../../context/NewsContext";

const FilterContainerComponent = () => {
  const [categories, setCategories] = useState([]);
  const [tagName, setTagName] = useState("");
  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const [
    { searchText, selectedCategories, tagNameList }, 
    dispatch
  ] = useNewsValue();

  useEffect(() => {
    const result = getCategories();
    result.then(data => {
      setCategories(data);
    });
  }, []);

  const handleOpenCategories = e => {
    setCategoryAnchor(e.currentTarget);
  };
  const handleCloseCategories = () => {
    setCategoryAnchor(null);
  };
  const handleSelectCategory = id => {
    if (selectedCategories.indexOf(id) === -1) {
      dispatch({
        type: "set_selectedCategories",
        payload: [...selectedCategories, id]
      });
    } else {
      const filteredSelectedCategories = selectedCategories.filter(
        category => category !== id
      );
      dispatch({
        type: "set_selectedCategories",
        payload: filteredSelectedCategories
      });
    }
  };
  const handleChangeSearchText = e => {
    const searchText = e.target.value;
    dispatch({
      type: "set_searchText",
      payload: searchText
    });
  };
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

  const openCategory = Boolean(categoryAnchor);
  return (
    <>
      <div className="flex p1">
        <Button
          color="primary"
          onClick={handleOpenCategories}
          className="flex1"
        >
          Categories <KeyboardArrowDownOutlinedIcon />
        </Button>
        <Popover
          open={openCategory}
          anchorEl={categoryAnchor}
          onClose={handleCloseCategories}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {categories.map(category => (
            <div id={category.id} className="flex align-center">
              <Checkbox
                color="primary"
                onChange={() => handleSelectCategory(category.id)}
              />
              <Typography variant="subtitle2">{category.name}</Typography>
            </div>
          ))}
        </Popover>
        <OutlinedInput
          placeholder="Type to search"
          className="flex1"
          value={searchText}
          onChange={handleChangeSearchText}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <div className="flex align-center flex1">
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
