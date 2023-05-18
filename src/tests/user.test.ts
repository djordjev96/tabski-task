import { User } from "@/entities/user.entity";
import { UserService } from "@/services/user.service";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { userMock, saveUserMock } from "./__mocks__/user.mock";

describe("UserService", () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeAll(() => {
    userRepository = {} as Repository<User>;
    userService = new UserService(userRepository);
  });

  describe("createUser", () => {
    it("should return created user without a password field", async () => {
      userRepository.create = jest.fn().mockReturnValue({});
      userRepository.save = jest.fn().mockReturnValue(saveUserMock);

      const password = "pass12345";
      (bcrypt.hash as jest.Mock) = jest.fn().mockReturnValue("hashed-password");

      const result = await userService.createUser(
        saveUserMock.name,
        saveUserMock.email,
        password
      );

      expect(result).toEqual(userMock);
      expect(userRepository.create).toHaveBeenCalledWith({
        name: saveUserMock.name,
        email: saveUserMock.email,
        password: "hashed-password",
      });
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      userRepository.find = jest.fn().mockReturnValue([userMock]);

      const result = await userService.getAllUsers();

      expect(result).toEqual([userMock]);
      expect(userRepository.find).toHaveBeenCalledWith({});
    });
  });

  describe("getUser", () => {
    it("should return user with specified id", async () => {
      userRepository.findOne = jest.fn().mockReturnValue(userMock);

      const result = await userService.getUser(userMock.id);

      expect(result).toEqual(userMock);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: userMock.id },
      });
    });

    it("should throw an error if user is not found", async () => {
      userRepository.findOne = jest.fn().mockReturnValue(undefined);

      expect(userService.getUser("not-found-id")).rejects.toThrow(
        "User not found"
      );
    });
  });

  describe("updateUser", () => {
    it("should throw an error if user is not found", async () => {
      userRepository.findOne = jest.fn().mockReturnValue(undefined);

      expect(
        userService.updateUser("not-found-id", { name: "name2" })
      ).rejects.toThrow("User not found");
    });

    it("should update the user with specified id", async () => {
      const updatedFields = { name: "UpdatedName" };
      userRepository.findOne = jest.fn().mockReturnValue(userMock);
      userRepository.save = jest
        .fn()
        .mockReturnValue({ ...userMock, ...updatedFields });

      const result = await userService.updateUser(userMock.id, updatedFields);

      expect(result).toEqual({ ...userMock, ...updatedFields });
      expect(userRepository.findOne).toBeCalledWith({
        where: { id: userMock.id },
      });
    });
    it("should hash the password if its in updated columns", async () => {
      const updatedFields = { password: "newPassword" };

      userRepository.findOne = jest.fn().mockReturnValue(userMock);
      userRepository.save = jest.fn().mockReturnValue(userMock);
      (bcrypt.hash as jest.Mock) = jest.fn().mockReturnValue("hashed-password");

      await userService.updateUser(userMock.id, updatedFields);

      expect(bcrypt.hash).toBeCalled();
    });
  });

  describe("deleteUser", () => {
    it("should throw an error if user is not found", async () => {
      userRepository.findOne = jest.fn().mockReturnValue(undefined);

      expect(userService.deleteUser("not-found-id")).rejects.toThrow(
        "User not found"
      );
    });
    it("should delete user with specified id and return that user", async () => {
      userRepository.findOne = jest.fn().mockReturnValue(userMock);
      userRepository.remove = jest.fn().mockReturnValue(userMock);

      const result = await userService.deleteUser(userMock.id);

      expect(result).toEqual(userMock);
      expect(userRepository.findOne).toBeCalledWith({
        where: { id: userMock.id },
      });
      expect(userRepository.remove).toBeCalledWith(userMock);
    });
  });
});
