"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserController = void 0;
const user_service_1 = require("@/services/user.service");
const typedi_1 = require("typedi");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.createUser(req.body.name, req.body.email, req.body.password);
                res.status(201).send(user);
            }
            catch (err) {
                next(err);
            }
        });
        this.getAllUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUsers();
                res.status(200).send(users);
            }
            catch (err) {
                next(err);
            }
        });
        this.getUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getUser(req.params.id);
                res.status(200).send(user);
            }
            catch (err) {
                next(err);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.updateUser(req.params.id, req.body);
                res.status(200).send(user);
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.deleteUser(req.params.id);
                res.status(200).send(user);
            }
            catch (err) {
                next(err);
            }
        });
    }
};
UserController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
