import { MenuItemComponent } from "./MenuItemComponent";
import "./App.css";
import { Col, Row } from "react-bootstrap";

export const MenuComponent = (props: { itemSelected: any }) => {
  const title1: string = "Historia danych";
  const title2: string = "Sprawdź pozwolenie na kartę";

  return (
    <div className="menu">
      <Row>
        <MenuItemComponent
          title={title1}
          itemSelected={() => props.itemSelected("history")}
        />
        <MenuItemComponent
          title={title2}
          itemSelected={() => props.itemSelected("card")}
        />
      </Row>
    </div>
  );
};
