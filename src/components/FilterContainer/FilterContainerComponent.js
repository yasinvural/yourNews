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
import { debounce } from "../../utils/debounce";

const styles = {
  background: "aliceblue"
};

const FilterContainerComponent = () => {
  const [categories, setCategories] = useState([]);
  const [tagName, setTagName] = useState("");
  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const [{ selectedCategories, tagNameList }, dispatch] = useNewsValue();
  const [isFixed, setIsFixed] = useState(false);
  /*
  useEffect(() => {
    async function fetchCategoriesData() {
      try {
        const result = await getCategories();
        setCategories(result);
      } catch (err) {
        console.warn(err);
      }
    }
    fetchCategoriesData();
  }, []);
  */

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

  const openCategory = Boolean(categoryAnchor);

  const containerClass = () => {
    if (isFixed) {
      return "flex p1 fixed";
    } else {
      return "flex p1";
    }
  };

  return (
    <>
      <div style={styles} className={containerClass()}>
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
            <div
              key={category.id}
              id={category.id}
              className="flex align-center"
            >
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
          onChange={e => handleChangeSearchText(e.target.value)}
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
