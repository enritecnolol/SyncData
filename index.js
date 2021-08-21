import fs from "fs";
import splitArray from "./src/lib/splitArray";
import setTimeOutPromise from "./src/lib/setTimeOutPromise";
import DataServices from "./src/Services/DataServices";


function saveFailsRow(failData) {
    console.log(failData);
    fs.writeFile("./src/Json/failsData.json", JSON.stringify(failData), "utf8", (err) => console.log("error json fails entities: ", err));
}

async function executeSync() {
    try {
        const jsonData = fs.readFileSync("./src/Json/data.json");
        const dataLists = splitArray(JSON.parse(jsonData), 5);
        let failsEntities = [];
        for (const indexList in dataLists) {
            for (const indexData in dataLists [indexList]) {
                const requestStatus = await DataServices.saveData(dataLists [indexList][indexData]);
                if (requestStatus.status === 400) {
                    failsEntities.push(dataLists [indexList][indexData]);
                }
            }
            await setTimeOutPromise(10000);
        }
        saveFailsRow(failsEntities);
    } catch (error) {
        console.log("Error Al sync", error);
    }
}

executeSync();