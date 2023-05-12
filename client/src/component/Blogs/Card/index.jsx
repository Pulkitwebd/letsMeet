import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./Card.module.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const BlogCard = (props) => {
  const { blogId, title } = useParams();
  const navigate = useNavigate();

  // to pass props.title to path here converting to owercase replcae spacebetween with -
  const pathTitle = props.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .trim();

  function handleCardClick(pathTitle) {
    navigate(`/blog/${pathTitle}`, { state: {blogId : props.id} });
  }

  return (
    <div
      onClick={() => handleCardClick(pathTitle)}
      style={{ textDecoration: "none" }}
    >
      <Card className={classes.card} blogId={blogId} sx={{ maxWidth: 345 }}>
        <div className={classes.imageBox}>
          <img src={props.imageUrl} alt="" />
          <div className={classes.category}>{props.category}</div>
        </div>

        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="div"
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
    </div>
  );
};

export default BlogCard;
