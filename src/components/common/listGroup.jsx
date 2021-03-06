import React from "react";

const ListGroup = (props) => {
  const {
    items,
    onGenreSelect,
    textProperty,
    valueProperty,
    selectedGenre,
  } = props;
  return (
    <ul className="list-group">
      {items.map((item) => {
        return (
          <li
            key={item[valueProperty]}
            className={
              item === selectedGenre
                ? " list-group-item active"
                : " list-group-item"
            }
            style={{ cursor: "pointer" }}
            onClick={() => onGenreSelect(item)}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
