import React, { useState } from "react";
import classes from "../Homepage.module.css";
import { HiCheck } from "react-icons/hi";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);

  const handleCategorySelection = (category) => {
    if (!selectedCategory.includes(category)) {
      setSelectedCategory([...selectedCategory, category]);
    } else {
      setSelectedCategory(
        selectedCategory.filter((element) => element !== category)
      );
    }
  };

  return (
    <div className={classes.category}>
      <h1>Category</h1>
      <button
        onClick={() => handleCategorySelection("cricket")}
        className={
          selectedCategory.includes("cricket")
            ? classes.includes
            : classes.notIncludes
        }
      >
        {selectedCategory.includes("cricket") ? <HiCheck /> : "+"} Cricket
      </button>

      <button
        onClick={() => handleCategorySelection("chess")}
        className={
          selectedCategory.includes("chess")
            ? classes.includes
            : classes.notIncludes
        }
      >
        {selectedCategory.includes("chess") ? <HiCheck /> : "+"} Chess
      </button>

      <button
        onClick={() => handleCategorySelection("Badminton")}
        className={
          selectedCategory.includes("Badminton")
            ? classes.includes
            : classes.notIncludes
        }
      >
        {selectedCategory.includes("Badminton") ? <HiCheck /> : "+"} Badminton
      </button>

      <button
        onClick={() => handleCategorySelection("Travel")}
        className={
          selectedCategory.includes("Travel")
            ? classes.includes
            : classes.notIncludes
        }
      >
        {selectedCategory.includes("Travel") ? <HiCheck /> : "+"} Travel
      </button>

      <button
        onClick={() => handleCategorySelection("hello")}
        className={
          selectedCategory.includes("hello")
            ? classes.includes
            : classes.notIncludes
        }
      >
        {selectedCategory.includes("hello") ? <HiCheck /> : "+"} Hello
      </button>
      <button
        onClick={() => handleCategorySelection("cool")}
        className={
          selectedCategory.includes("cool")
            ? classes.includes
            : classes.notIncludes
        }
      >
        {selectedCategory.includes("cool") ? <HiCheck /> : "+"}
        Cool
      </button>
    </div>
  );
};

export default Category;
