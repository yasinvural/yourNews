import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@material-ui/core";
import { getCategories } from "../../services/CategoryService";
import { useNewsValue } from "../../context/NewsContext";

const CategoryTabComponent = () => {
  const [tabValue, setTabValue] = useState(0);
  const [categories, setCategories] = useState([]);
  const [{}, dispatch] = useNewsValue();

  useEffect(() => {
    async function fetchCategoriesData() {
      try {
        const result = await getCategories();
        setCategories(result.data);
        dispatch({
          type: "set_selectedCategory",
          payload: result.data[0].name
        });
      } catch (err) {
        console.warn(err);
      }
    }
    fetchCategoriesData();
  }, []);

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
    const tabName = event.currentTarget.id;
    dispatch({
      type: "set_selectedCategory",
      payload: tabName
    });
  };

  const renderTab = () => {
    return categories.map(category => (
      <Tab key={category.id} label={category.name} id={category.name} />
    ));
  };

  return (
    <>
      <Tabs
        value={tabValue}
        variant="scrollable"
        indicatorColor="primary"
        onChange={handleTabValueChange}
      >
        {renderTab()}
      </Tabs>
    </>
  );
};

export default CategoryTabComponent;
