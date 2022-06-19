import { useCallback, useMemo } from "react";
import { Cell, Coordinates } from "../../types/Game";

interface Props {
  data: Cell;
  coords: Coordinates;
  onClick: (data: Cell, coords: Coordinates) => void;
}

const Column = ({ data, coords, onClick }: Props) => {
  const text = useMemo(() => {
    if (data.isOpen) {
      return data.isBomb ? "Bomb" : data.countOfBombs;
    }
    return "[ ]";
  }, [data]);

  const handleClick = useCallback(
    () => onClick(data, coords),
    [data, coords, onClick]
  );

  return <div onClick={handleClick}>{text}</div>;
};

export default Column;
