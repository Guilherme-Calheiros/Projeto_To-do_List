import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";

const StrictModeDroppable = ({ children, droppableId}) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable droppableId={droppableId}>{children}</Droppable>;
};

export default StrictModeDroppable;