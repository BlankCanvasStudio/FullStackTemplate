"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPronouns = exports.query_plzController = void 0;
const get_1 = require("../../queries/users/get");
const query_plzController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, get_1.query_plz)();
        res.status(200).json({ query: 'was made' });
    }
    catch (error) {
        throw error;
    }
});
exports.query_plzController = query_plzController;
const userPronouns = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pronouns = yield (0, get_1.user_pronouns)(req.params.username);
        res.status(200).json({ pronouns: pronouns });
    }
    catch (error) {
        throw error;
    }
});
exports.userPronouns = userPronouns;
{ }
