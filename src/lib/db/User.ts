import { model, Schema } from 'mongoose';

/** Represents a user of NewzLife. */
interface IUser {
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
export const findUsers = async () => userModel.find();

/** Find the user with the supplied username */
export const findUserByUsername = async (username: string) => {
	userModel.findOne({ username: username });
};

// Update
/** Update a user in the database. */
export const updateUser = (uid: number, user: IUser) =>
	userModel.updateOne({ _id: uid }, { $set: user });

// Delete
/** Remove a user from the database. */
export const deleteUser = (uid: number) => userModel.deleteOne({ _id: uid });
