import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./Blogs.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const { blogId, title } = useParams();

  return (
    <Card className={classes.card} blogId={blogId} sx={{ maxWidth: 345 }}>
      <div className={classes.imageBox}>
        <img src={props.imageUrl} alt="" />
        <div className={classes.category}>{props.category}</div>
      </div>

      <CardContent>
        <Link to={`/blogs/${props.id}`} style={{ textDecoration: "none" }}>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="div"
          >
            {props.title}
          </Typography>
        </Link>
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
