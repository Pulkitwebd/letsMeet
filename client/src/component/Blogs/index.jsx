import * as React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
// import { Classes } from "./Blogs.module.css";
import BlogCard from "./BlogCard";
<<<<<<< HEAD
import card from "./cardJson";
export default function MediaCard(){
=======

export default function MediaCard() {
>>>>>>> a8ce8c0bd9f8a1cbb5f1e32a6694cd4ac566e9bd
  return (
    <Grid
      container
      columnSpacing={{ md: 1 }}
      rowSpacing={2}
      paddingLeft={7}
      marginTop={4}
      marginBottom={4}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Box>
          <BlogCard />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Box>
          <BlogCard />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Box>
          <BlogCard />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Box>
          <BlogCard />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Box>
          <BlogCard />
        </Box>
      </Grid>
    </Grid>
  );
}
