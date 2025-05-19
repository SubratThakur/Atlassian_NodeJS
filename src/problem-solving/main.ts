import rl from "../utils/readInputFromUser";
import { MostPopular } from "./MostPopular";
import { PopularContent } from "./popularContent";

async function readLine(question?: string) {
    const data:string = await new Promise(resolve => {
        rl.question(question, resolve);
    });
    return data;
}

async function main() {

        //var a = await readLine("Enter First Input: ");
        //var b = await readLine("Enter Second Input: ");;
        /**String to array
        const aArr = a.split(' ');
        **/
        const obj: MostPopular = new PopularContent();
        obj.increasePopularity('abc');
        obj.increasePopularity('abc');
        obj.increasePopularity('xyz');
        obj.increasePopularity('xyz');
        obj.increasePopularity('xyz');
        console.log(obj.mostPopular());
        obj.decreasePopularity('xyz');
        obj.decreasePopularity('xyz');
        console.log(obj.mostPopular());
}

main();