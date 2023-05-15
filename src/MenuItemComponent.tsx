import { Col } from "react-bootstrap";
import "./App.css";
import { Button } from "@mui/material";

export const MenuItemComponent = (props: {
  title: string;
  itemSelected: any;
}) => {
  return (
    <Col>
      <Button
        className="col-md-6 col-sm-6"
        color="primary"
        variant="outlined"
        type="button"
        onClick={props.itemSelected}
      >
        {props.title}
      </Button>
    </Col>
  );
};
