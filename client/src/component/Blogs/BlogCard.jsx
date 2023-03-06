import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./Blogs.module.css";


const BlogCard = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <div className={classes.imageBox}>
        <img src={props.imageUrl} alt="" />
        <div className={classes.category}>{props.category}</div>
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <div size="small">{props.authorName} |</div>
        <div size="small">{props.creationDateAndTime}</div>
      </CardActions>
      {/* <Button size="small">{category}</Button> */}
    </Card>
  );
};
export default BlogCard;
