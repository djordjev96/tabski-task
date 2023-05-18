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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("@/services/user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saveMock = {
    id: "e8c474dc-db7b-4198-90b6-24b64044413e",
    name: "AuthorName",
    email: "test@test.com",
    createdAt: "2023-05-18T09:11:06.675Z",
    updatedAt: "2023-05-18T09:11:23.253Z",
    password: "3219dno1u3n2i1jdni1o1",
};
const userMock = {
    id: "e8c474dc-db7b-4198-90b6-24b64044413e",
    name: "AuthorName",
    email: "test@test.com",
    createdAt: "2023-05-18T09:11:06.675Z",
    updatedAt: "2023-05-18T09:11:23.253Z",
};
describe("UserService", () => {
    let userService;
    let userRepository;
    beforeAll(() => {
        userRepository = {};
        userService = new user_service_1.UserService(userRepository);
    });
    describe("createUser", () => {
        it("should return created user without a password field", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.create = jest.fn().mockReturnValue({});
            userRepository.save = jest.fn().mockReturnValue(saveMock);
            const password = "pass12345";
            bcrypt_1.default.hash = jest.fn().mockReturnValue("hashed-password");
            const result = yield userService.createUser(saveMock.name, saveMock.email, password);
            expect(result).toEqual(userMock);
            expect(userRepository.create).toHaveBeenCalledWith({
                name: saveMock.name,
                email: saveMock.email,
                password: "hashed-password",
            });
        }));
    });
    describe("getAllUsers", () => {
        it("should return all users", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.find = jest.fn().mockReturnValue([userMock]);
            const result = yield userService.getAllUsers();
            expect(result).toEqual([userMock]);
            expect(userRepository.find).toHaveBeenCalledWith({});
        }));
    });
    describe("getUser", () => {
        it("should return user with specified id", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(userMock);
            const result = yield userService.getUser(userMock.id);
            expect(result).toEqual(userMock);
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: { id: userMock.id },
            });
        }));
        it("should throw an error if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(userService.getUser("not-found-id")).rejects.toThrow("User not found");
        }));
    });
    describe("updateUser", () => {
        it("should throw an error if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(userService.updateUser("not-found-id", { name: "name2" })).rejects.toThrow("User not found");
        }));
        it("should update the user with specified id", () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedFields = { name: "UpdatedName" };
            userRepository.findOne = jest.fn().mockReturnValue(userMock);
            userRepository.save = jest
                .fn()
                .mockReturnValue(Object.assign(Object.assign({}, userMock), updatedFields));
            const result = yield userService.updateUser(userMock.id, updatedFields);
            expect(result).toEqual(Object.assign(Object.assign({}, userMock), updatedFields));
            expect(userRepository.findOne).toBeCalledWith({
                where: { id: userMock.id },
            });
        }));
        it("should hash the password if its in updated columns", () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedFields = { password: "newPassword" };
            userRepository.findOne = jest.fn().mockReturnValue(userMock);
            userRepository.save = jest.fn().mockReturnValue(userMock);
            bcrypt_1.default.hash = jest.fn().mockReturnValue("hashed-password");
            yield userService.updateUser(userMock.id, updatedFields);
            expect(bcrypt_1.default.hash).toBeCalled();
        }));
    });
    describe("deleteUser", () => {
        it("should throw an error if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(userService.deleteUser("not-found-id")).rejects.toThrow("User not found");
        }));
        it("should delete user with specified id and return that user", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(userMock);
            userRepository.remove = jest.fn().mockReturnValue(userMock);
            const result = yield userService.deleteUser(userMock.id);
            expect(result).toEqual(userMock);
            expect(userRepository.findOne).toBeCalledWith({
                where: { id: userMock.id },
            });
            expect(userRepository.remove).toBeCalledWith(userMock);
        }));
    });
});
