import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./Blogs.module.css";
import { useParams, useNavigate } from "react-router-dom";

const BlogCard = (props) => {
  const { blogId, title } = useParams();
  console.log(blogId);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${blogId}/${title}`);
    console.log("imnavigate");
  };

  return (
    <Card className={classes.card} blogId={blogId} sx={{ maxWidth: 345 }}>
      <div className={classes.imageBox}>
        <img src={props.imageUrl} onClick={handleClick} alt="" />
        <div className={classes.category} onClick={handleClick}>
          {props.category}
        </div>
      </div>

      <CardContent>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="div"
          onClick={handleClick}
        >
          {props.title}
        </Typography>
        <Typography
          className={classes.description}
          variant="body2"
          color="text.secondary"
        >
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <div className={classes.author} size="small">
          {props.authorName} |
        </div>
        <div className={classes.dateAndTime} size="small">
          {props.creationDateAndTime}
        </div>
      </CardActions>
      {/* <Button size="small">{category}</Button> */}
    </Card>
  );
};
export default BlogCard;
