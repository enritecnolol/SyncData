export default function splitArray(array, perArray) {
    return array.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perArray);
        if (!resultArray [chunkIndex]) {
            resultArray [chunkIndex] = []; // start a new chunk
        }
        resultArray [chunkIndex].push(item);
        return resultArray;
    }, []);
}