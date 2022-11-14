const blockEnter=((event) => {
  console.log("je bloque enter")
  if (event.key == "Enter") {
    event.preventDefault();
  }
})

export {blockEnter};
