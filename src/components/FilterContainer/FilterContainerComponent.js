import React, { useState, useEffect } from "react";
import { Checkbox, Popover, Button, Typography } from "@material-ui/core";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import { getCategories } from "../../services/CategoryService";

const FilterContainerComponent = () => {
  const [categories, setCategories] = useState([]);
  const [categoryAnchor, setCategoryAnchor] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

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
      </div>
    </>
  );
};

export default FilterContainerComponent;
