"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeas = getTeas;
const teasDataFs_1 = require("./fs/teasDataFs");
function getTeas() {
    return teasDataFs_1.teaProducts;
}
