import { model, Schema } from 'mongoose';

/** Represents a user of NewzLife. */
export interface IUser {
	/** The user's username. */
	username: string;

	/** The user's password. */
	password: string;

	/** Whether the user can interact socially. */
	socialInteraction: boolean;

	/** The comments the user has made. */
	comments: Schema.Types.ObjectId[];

	/** The comments the user has liked. */
	likedComments: Schema.Types.ObjectId[];

	/** The details the user has liked. */
	likedDetails: Schema.Types.ObjectId[];

	/** The user's bookmarked details. */
	bookmarks: Schema.Types.ObjectId[];
}

/** The User schema in Mongo. */
const userSchema = new Schema<IUser>(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		socialInteraction: { type: Boolean, default: false },
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}
		],
		likedComments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}
		],
		likedDetails: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Detail'
			}
		],
		bookmarks: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Detail'
			}
		]
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
export const createUser = async (user: AtLeast<IUser, 'username' | 'password'>) =>
	userModel.create(user);

// Read
/** Find all users. */
export const findUsers = async () => userModel.find();

/** Find the user with the given ID */
export const findUserById = async (id: string) => userModel.findById(id);

/** Find the user with the supplied username */
export const findUserByUsername = async (username: string) =>
	userModel.findOne({ username: username });

/** Find the users who liked the comment */
export const findUsersByLikedComment = async (cid: string) =>
	userModel.find({ likedComments: cid });

/** Find the user with the supplied credentials */
export const findUserByCredentials = async (username: string, password: string) =>
	userModel.findOne({ username: username, password: password });

// Update
/** Update a user in the database. */
export const updateUser = async (uid: string, user: Partial<IUser>) =>
	await userModel.updateOne({ _id: uid }, { $set: user });

// Delete
/** Remove a user from the database. */
export const deleteUser = async (uid: string) => await userModel.deleteOne({ _id: uid });
