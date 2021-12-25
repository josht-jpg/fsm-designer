const preventHightlight = (
  e: any // MouseEvent | React.MouseEvent<SVGCircleElement, MouseEvent> -- Not sure why that won't work
) => {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
};

export default preventHightlight;
