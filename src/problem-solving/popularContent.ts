import { MostPopular } from "./MostPopular";

export class PopularContent implements MostPopular {
    private contentIdFreqMap: Map<string, number>;
    private frequencyMap: Map<number, string[]>;
    private maxFrequency: number;
    constructor(){
        this.contentIdFreqMap = new Map<string, number>();
        this.frequencyMap = new Map<number, string[]>();
        this.maxFrequency = 0;
    }
    increasePopularity(contentId: string): void {
        if(this.contentIdFreqMap.has(contentId)){
            const currCount= this.contentIdFreqMap.get(contentId) || 0;
            const newCount =currCount+1;
            this.maxFrequency = Math.max(newCount, this.maxFrequency);
            const currFrequencyList = this.frequencyMap.get(currCount) || [];
            const oldContentList = currFrequencyList.filter((content)=> content !==contentId);
            if(oldContentList.length>0){
                this.frequencyMap.set(currCount, oldContentList);
            } else {
                this.frequencyMap.delete(currCount);   
            }
            const newFrequencyList = this.frequencyMap.get(newCount) || [];
            this.frequencyMap.set(newCount, newFrequencyList.concat(contentId));
            this.contentIdFreqMap.set(contentId, newCount);
        } else {
            this.contentIdFreqMap.set(contentId, 1);
            this.maxFrequency = Math.max(1, this.maxFrequency);
            const newFrequencyList = this.frequencyMap.get(1) || [];
            this.frequencyMap.set(1, newFrequencyList.concat(contentId));
        }
    }
    mostPopular(): string {
        if(this.contentIdFreqMap.size>0 && this.maxFrequency>0){
            const maxPopularContents = this.frequencyMap.get(this.maxFrequency) || [];
            return maxPopularContents[0] || '-1';
        }
        return '-1';
    }
    decreasePopularity(contentId: string): void {
        if(this.contentIdFreqMap.has(contentId)){
            const currCount= this.contentIdFreqMap.get(contentId) || 0;
            const newCount =currCount-1;
            // List of content
            const currFrequencyList = this.frequencyMap.get(currCount) || [];
            const oldContentList = currFrequencyList.filter((content)=> content !==contentId);
            if(oldContentList.length>0){
                this.frequencyMap.set(currCount, oldContentList);
            } else {
                this.frequencyMap.delete(currCount);   
            }
            if(this.maxFrequency === currCount){
                const maxPopularContent:string[] = this.frequencyMap.get(currCount) || [];
                if(maxPopularContent.length===1){
                    this.maxFrequency = newCount;
                }
            }
            const newFrequencyList = this.frequencyMap.get(newCount) || [];
            this.frequencyMap.set(newCount, newFrequencyList.concat(contentId));
            if(newCount>1){
                this.contentIdFreqMap.set(contentId, newCount);
            } else {
                this.contentIdFreqMap.delete(contentId);
            }
        }
    }
    
}