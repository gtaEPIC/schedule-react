import {open} from 'sqlite';
import {Event} from "./Event";
import * as sqlite3 from "sqlite3";

export class SQLEvents {
    static async getEvent(name: string): Promise<Event> {
        const db = await open({
            filename: 'schedule.db',
            driver: sqlite3.Database
        });
        const result = await db.get('SELECT * FROM schedule WHERE Name = ?', name);
        if (!result) return null;
        return new Event(result.name, result.description, result.start_time, result.end_time, result.location, result.how);
    }

    static async hasEvent(name: string): Promise<boolean> {
        const db = await open({
            filename: 'schedule.db',
            driver: sqlite3.Database
        });
        const result = await db.get('SELECT * FROM schedule WHERE Name = ?', name);
        return result != undefined;
    }

    static async setEvent(event: Event) {
        const db = await open({
            filename: 'schedule.db',
            driver: sqlite3.Database
        });
        let name = event.title
        //if (event.old) name = event.old;
        //else event.old = event.title;

        if (await this.hasEvent(name)) await db.run('UPDATE schedule SET name = ?, description = ?, start_time = ?, end_time = ?, location = ?, how = ? WHERE name = ?',
            event.title, event.description, event.start_time, event.end_time, event.where, event.how);
        else await db.run('INSERT INTO schedule VALUES (?,?,?,?,?,?)',
            event.title, event.description, event.start_time, event.end_time, event.where, event.how);
    }

    static async getAllEvents(): Promise<Array<Event>> {
        const db = await open({
            filename: 'schedule.db',
            driver: sqlite3.Database
        });
        const results = await db.all('SELECT * FROM schedule');
        let final: Array<Event> = [];
        for (const result of results) {
            let event: Event = new Event(result.name, result.description, result.start_time, result.end_time, result.location, result.how);
            final.splice(final.length, 0, event);
        }
        return final;
    }

    static async deleteEvent(name: string) {
        const db = await open({
            filename: 'schedule.db',
            driver: sqlite3.Database
        });
        await db.run(`DELETE FROM schedule WHERE name = ?`, name);
    }
}