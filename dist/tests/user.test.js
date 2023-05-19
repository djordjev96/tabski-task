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
const user_mock_1 = require("./__mocks__/user.mock");
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
            userRepository.save = jest.fn().mockReturnValue(user_mock_1.saveUserMock);
            const password = "pass12345";
            bcrypt_1.default.hash = jest.fn().mockReturnValue("hashed-password");
            const result = yield userService.createUser(user_mock_1.saveUserMock.name, user_mock_1.saveUserMock.email, password);
            expect(result).toEqual(user_mock_1.userMock);
            expect(userRepository.create).toHaveBeenCalledWith({
                name: user_mock_1.saveUserMock.name,
                email: user_mock_1.saveUserMock.email,
                password: "hashed-password",
            });
        }));
    });
    describe("getAllUsers", () => {
        it("should return all users", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.find = jest.fn().mockReturnValue([user_mock_1.userMock]);
            const result = yield userService.getAllUsers();
            expect(result).toEqual([user_mock_1.userMock]);
            expect(userRepository.find).toHaveBeenCalledWith({});
        }));
    });
    describe("getUser", () => {
        it("should return user with specified id", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(user_mock_1.userMock);
            const result = yield userService.getUser(user_mock_1.userMock.id);
            expect(result).toEqual(user_mock_1.userMock);
            expect(userRepository.findOne).toHaveBeenCalledWith({
                where: { id: user_mock_1.userMock.id },
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
            userRepository.findOne = jest.fn().mockReturnValue(user_mock_1.userMock);
            userRepository.save = jest
                .fn()
                .mockReturnValue(Object.assign(Object.assign({}, user_mock_1.userMock), updatedFields));
            const result = yield userService.updateUser(user_mock_1.userMock.id, updatedFields);
            expect(result).toEqual(Object.assign(Object.assign({}, user_mock_1.userMock), updatedFields));
            expect(userRepository.findOne).toBeCalledWith({
                where: { id: user_mock_1.userMock.id },
            });
        }));
        it("should hash the password if its in updated columns", () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedFields = { password: "newPassword" };
            userRepository.findOne = jest.fn().mockReturnValue(user_mock_1.userMock);
            userRepository.save = jest.fn().mockReturnValue(user_mock_1.userMock);
            bcrypt_1.default.hash = jest.fn().mockReturnValue("hashed-password");
            yield userService.updateUser(user_mock_1.userMock.id, updatedFields);
            expect(bcrypt_1.default.hash).toBeCalled();
        }));
    });
    describe("deleteUser", () => {
        it("should throw an error if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(userService.deleteUser("not-found-id")).rejects.toThrow("User not found");
        }));
        it("should delete user with specified id and return that user", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(user_mock_1.userMock);
            userRepository.remove = jest.fn().mockReturnValue(user_mock_1.userMock);
            const result = yield userService.deleteUser(user_mock_1.userMock.id);
            expect(result).toEqual(user_mock_1.userMock);
            expect(userRepository.findOne).toBeCalledWith({
                where: { id: user_mock_1.userMock.id },
            });
            expect(userRepository.remove).toBeCalledWith(user_mock_1.userMock);
        }));
    });
});
