import React from "react";
import classes from "../Homepage.module.css";

const Localities = () => {
  return (
    <div className={classes.localities}>
      <h1>Localities</h1>
      <div>
        <form action="/action_page.php">
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label htmlFor="vehicle1"> I have a bike</label>
          <br />
          <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
          <label htmlFor="vehicle2"> I have a car</label>
          <br />
          <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
          <label htmlFor="vehicle3"> I have a boat</label>
          <br />
        </form>
      </div>
      <form>
        <input
          type="text"
          placeholder="Search More Localities"
          name="search2"
        />
      </form>

      <div>
        <p>Search Result 1</p>
        <p>Search Result 2</p>
      </div>
    </div>
  );
};

export default Localities;
