import UserController from '../controller/users.controller'; 
import express  from 'express';

const UserRouter = express.Router();

UserRouter.post(
    "/addUser",
    UserController.create
);

UserRouter.get(
    "/getUsers",
    UserController.getUser
);

UserRouter.put(
    "/updateUser:id",
    UserController.editUser
);

UserRouter.delete(
    "/deleteUser",
    UserController.deleteUser
);

export default UserRouter;