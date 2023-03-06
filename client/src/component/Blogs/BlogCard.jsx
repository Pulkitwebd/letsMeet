import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ClassNames } from "@emotion/react";
import classes from "./Blogs.module.css";
const BlogCard = ({
  title,
  authorName,
  authorEmail,
  lastEdited,
  category,
  creationDateAndTime,
  imageUrl,
  description,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia
        sx={{ height: 140 }}
        imageUrl={imageUrl}
        // title="green iguana"
      /> */}

      <div className={classes.yogaimage}>
        <img src={imageUrl} alt="" />
        <div className={classes.category}>{category}</div>
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <div size="small">{authorName} |</div>
        <div size="small">{creationDateAndTime}</div>
      </CardActions>
      {/* <Button size="small">{category}</Button> */}
    </Card>
  );
};
export default BlogCard;
