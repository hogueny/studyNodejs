"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class RepositoryAbstract {
    constructor(type) {
        this.repo = typeorm_1.getManager().getRepository(type);
    }
}
exports.RepositoryAbstract = RepositoryAbstract;
//# sourceMappingURL=RepositoryAbstract.js.map