import * as React from "react";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
// import { Classes } from "./Blogs.module.css";
import BlogCard from "./BlogCard";

export default function MediaCard() {
  //const classes = useStyles();
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
