export interface MostPopular {

    increasePopularity (contentId: string):void;

    mostPopular():string;

    decreasePopularity(contentId:string):void;

}