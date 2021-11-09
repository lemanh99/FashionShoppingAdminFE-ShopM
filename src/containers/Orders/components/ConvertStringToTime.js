export const ConvertIOStoDate = (string) => {
  var times = new Date(string);
  return (
    times.getHours() +
    ":" +
    times.getMinutes() +
    "\t" +
    times.getDate() +
    "/" +
    times.getMonth() +
    "/" +
    times.getFullYear()
  );
};
