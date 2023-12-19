import {EloRange} from "../../models/abstractions/EloRange";

const eloRanges: EloRange[] = [
    { level: 1, min: 1, max: 800 },
    { level: 2, min: 801, max: 950 },
    { level: 3, min: 951, max: 1100 },
    { level: 4, min: 1101, max: 1250 },
    { level: 5, min: 1251, max: 1400 },
    { level: 6, min: 1401, max: 1550 },
    { level: 7, min: 1551, max: 1700 },
    { level: 8, min: 1701, max: 1850 },
    { level: 9, min: 1851, max: 2000 },
    { level: 10, min: 2001, max: Infinity },
];

export { eloRanges };