export default class Event {
    title: string;
    description: string;
    start_time: number;
    end_time: number;
    where: string;
    how: string;
    old: string;

    constructor(title: string, description: string, start_time: number, end_time: number, where: string, how: string, old: string) {
        this.title = title;
        this.description = description;
        this.start_time = start_time;
        this.end_time = end_time
        this.where = where;
        this.how = how;
        this.old = old;
    }
}