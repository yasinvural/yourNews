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

const FilterContainerComponent = () => {
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [tagName, setTagName] = useState("");
  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tagNameList, setTagNameList] = useState([]);

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
      setSelectedCategories(c => [...c, id]);
    } else {
      const filteredSelectedCategories = selectedCategories.filter(
        category => category !== id
      );
      setSelectedCategories(filteredSelectedCategories);
    }
  };
  const handleChangeSearchText = e => {
    const searchText = e.target.value;
    setSearchText(searchText);
  };
  const handleTagNameChange = e => {
    const tagName = e.target.value;
    setTagName(tagName);
  };
  const handleTagNameKeyPress = e => {
    if (e.key === "Enter") {
      if (tagNameList.indexOf(tagName) === -1) {
        setTagNameList(t => [...t, tagName]);
        setTagName("");
      }
    }
  };
  const handleDeleteTag = tag => {
    const filteredTagNameList = tagNameList.filter(tagName => tagName !== tag);
    setTagNameList(filteredTagNameList);
  };
  const renderTagList = () => {
    if (tagNameList.length > 3) {
      return <>See filtered tags({tagNameList.length})</>;
    } else {
      return tagNameList.map(tag => (
        <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)} />
      ));
    }
  };

  const openCategory = Boolean(categoryAnchor);
  return (
    <>
      <div className="flex justify-center p1">
        <Button color="primary" onClick={handleOpenCategories}>
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
          value={searchText}
          onChange={handleChangeSearchText}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <div>
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
