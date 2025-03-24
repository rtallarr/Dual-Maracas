import { FormControl } from "@angular/forms";

export interface TaskData {
    id: string;
    name: string;
    weight: number;
    chance?: number;
    statusControl?: FormControl;
    prevStatus?: string;
}

export interface TaskReq {
    name: string;
    slayer: number;
    combat: number;
    unlockable: boolean;
    quests: string[];
    magic?: number;
}

export interface Quest {
    name: string;
    completed: boolean;
}

export interface PointArray {
    normal: number[];
    diary?: number[];
}

export interface SlayerMaster {
    id: number;
    name: string;
    tasks: any[];
    zone: string;
    points: PointArray;
}