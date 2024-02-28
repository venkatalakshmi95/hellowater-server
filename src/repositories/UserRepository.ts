import User from "../models/UserModel";
import bcrypt from 'bcrypt';
const saltRounds = 8
interface IUserRepository {
  save(user: User): Promise<User>;
  retrieveAll(): Promise<User[]>;

}

class UserRepository implements IUserRepository {
  async findone(user: User): Promise<User> {

    try {

      return await User.scope("withPassword").findOne({
        where: {
          userName: user.userName
        }
      }
      ) || new User();
    } catch (err) {
      throw new Error("Failed to create User!" + err);
    }
  }

  async save(user: User): Promise<User> {
    try {
      user.password = await bcrypt.hash(user.password ? user.password : '', saltRounds);
      return await User.create({
        userName: user.userName,
        userRole: user.userRole,
        email:user.email,
        password: user.password
      });
    } catch (err) {
      throw new Error("Failed to create User!" + err);
    }
  }


  async retrieveAll(): Promise<User[]> {
    try {

      return await User.findAll();
    } catch (error) {
      throw new Error("Failed to retrieve Users!" + error);
    }
  }

}



export default new UserRepository();
