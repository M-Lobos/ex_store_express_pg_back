import { findActiveRecordById, findAllActiveRecords, findRecordByFilter } from "./GET/getActiveRecords.js";
import { createRecord } from "./POST/postActiveRecord.js";
import { updateRecord } from "./PUT/putActiveRecords.js";
import { permaDeleteRecord, softDeteleRecord } from "./DELETE/deleteActiveRecods.js";

export {
    findActiveRecordById,
    findAllActiveRecords,
    findRecordByFilter,
    createRecord,
    updateRecord,
    permaDeleteRecord,
    softDeteleRecord,
}

