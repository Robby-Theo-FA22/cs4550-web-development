import { model, Schema } from 'mongoose';

/** Represents a user of NewzLife. */
export interface IUser {
	/** The user's username. */
	username: string;

	/** The user's password. */
	password: string;
}

/** The User schema in Mongo. */
const userSchema = new Schema<IUser>(
	{
		username: { type: String, required: true },
		password: { type: String, required: true }
	},
	{ collection: 'user' }
);

/** The model representing the User document in Mongo. */
const userModel = model<IUser>('User', userSchema);

/*****************************************
 ** CRUD actions for the User document. **
 *****************************************/
// Create
/** Create a user and save it in the database. */
export const createUser = async (user: IUser) => userModel.create(user);

// Read
/** Find all users. */
export const findUsers = async () => await userModel.find();

/** Find the user with the supplied username */
export const findUserByUsername = async (username: string) =>
	userModel.findOne({ username: username });

/** Find the user with the supplied credentials */
export const findUserByCredentials = async (username: string, password: string) =>
	userModel.findOne({ username: username, password: password });

// Update
/** Update a user in the database. */
export const updateUser = async (uid: number, user: IUser) =>
	await userModel.updateOne({ _id: uid }, { $set: user });

// Delete
/** Remove a user from the database. */
export const deleteUser = async (uid: number) => await userModel.deleteOne({ _id: uid });
