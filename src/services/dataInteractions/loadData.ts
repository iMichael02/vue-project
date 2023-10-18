export default function loadData(dataName: string) { async () => {
  var returnData = [{}];
  await fetch(`http://localhost:3000/${dataName}`)
    .then((res) => res.json())
    .then((data) => {
      returnData = data;
    })
    .catch((err) => {
      console.log(`Error while getting ${dataName} with loadData`);
      console.log(err.message)
    });
  return returnData;
}}