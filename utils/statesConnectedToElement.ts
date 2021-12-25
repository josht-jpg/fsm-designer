const statesConnectedToElement = (id: string) => {
  const states = id.match(/^\d+|\d+\b|\d+(?=\w)/g);
  return {
    originState: parseInt(states?.[0]),
    destinationState: parseInt(states?.[1]),
  };
};

export default statesConnectedToElement;
