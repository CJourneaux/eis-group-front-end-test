export function customEventHandler(callback) {
  return (event) => {
    event.preventDefault();
    event.stopPropagation();
    callback(event);
  };
}
