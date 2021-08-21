async function saveData(data) {
    return new Promise(function (resolve, reject) {
        resolve({status: data.status });
    });
}

export default {
  saveData
};