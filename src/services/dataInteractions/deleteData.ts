export default function deleteData(dataName: string, dataId: number) { async () => {
  await fetch(`http://localhost:3000/${dataName}/${dataId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  }).catch((err) => {
      console.log(`Error while deleteing ${dataName} with deteleData`);
      console.log(err.message)
    });
}}