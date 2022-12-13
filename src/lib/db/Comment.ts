import { model, Schema } from 'mongoose';

/** Represents a comment on NewzLife. */
export interface IComment {
	/** The comment's body. */
	body: string;

	/** The comment's date. */
	date: Date;

	/** The comment's author. */
	author: Schema.Types.ObjectId;

	/** The users that likes this comment. */
	likes: Schema.Types.ObjectId[];
}

/** The Comment schema in Mongo. */
const commentSchema = new Schema<IComment>(
	{
		body: { type: String, required: true },
		date: { type: Date, required: true, default: Date.now() },
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		]
	},
	{ collection: 'comment' }
);

/** The model representing the User document in Mongo. */
const commentModel = model<IComment>('Comment', commentSchema);

/*******************************************
 ** CRUD actions for the Comment document. **
 *******************************************/
// Create
/** Create a comment and save it in the database. */
export const createComment = async (user: AtLeast<IComment, 'body' | 'author'>) =>
	commentModel.create(user);

// Read
/** Find all comments. */
export const findComments = async () => commentModel.find();

// Update
/** Update a comment in the database. */
export const updateComment = async (did: number, comment: Partial<IComment>) =>
	await commentModel.updateOne({ _id: did }, { $set: comment });

// Delete
/** Remove a comment from the database. */
export const deleteComment = async (cid: number) => await commentModel.deleteOne({ _id: cid });
