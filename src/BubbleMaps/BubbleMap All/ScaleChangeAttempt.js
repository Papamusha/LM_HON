import { useData } from "../../Data/useData";
import { mean } from "d3";

export function dataScale(data) {

    var slice1 = data.slice(0, 19);
    var slice2 = data.slice(20, 39);
    var slice3 = data.slice(40, 59);
    var slice4 = data.slice(60, 79);
    var slice5 = data.slice(80, 99);

    var slice1Result = slice1.map(d => d['hashtagCount']);
    var slice2Result = slice2.map(d => d['hashtagCount']);
    var slice3Result = slice3.map(d => d['hashtagCount']);
    var slice4Result = slice4.map(d => d['hashtagCount']);
    var slice5Result = slice5.map(d => d['hashtagCount']);

    var dataSlice1Av = Math.round(mean(slice1Result));
    var dataSlice2Av = Math.round(mean(slice2Result));
    var dataSlice3Av = Math.round(mean(slice3Result));
    var dataSlice4Av = Math.round(mean(slice4Result));
    var dataSlice5Av = Math.round(mean(slice5Result));

    console.log('Data Slice 1: ' + dataSlice1Av);
    console.log('Data Slice 2: ' + dataSlice2Av);
    console.log('Data Slice 3: ' + dataSlice3Av);
    console.log('Data Slice 4: ' + dataSlice4Av);
    console.log('Data Slice 5: ' + dataSlice5Av);

}
