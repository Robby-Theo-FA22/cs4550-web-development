import { model, Schema } from 'mongoose';

/** Represents a user of NewzLife. */
export interface IDetail {
	/** The detail's title. */
	title: string;

	/** The detail's date. */
	date: Date;

	/** The detail's sourceID. */
	sourceID: string;

	/** The users that likes this detail. */
	likes: Schema.Types.ObjectId[];

	/** The comments on this detail. */
	comments: Schema.Types.ObjectId[];
}

/** The Detail schema in Mongo. */
const detailSchema = new Schema<IDetail>(
	{
		title: { type: String, required: true },
		date: { type: Date, required: true },
		sourceID: { type: String, required: true },
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment'
			}
		]
	},
	{ collection: 'detail' }
);

/** The model representing the User document in Mongo. */
const detailModel = model<IDetail>('Detail', detailSchema);

/*****************************************
 ** CRUD actions for the Detail document. **
 *****************************************/
// Create
/** Create a detail and save it in the database. */
export const createDetail = async (user: AtLeast<IDetail, 'title' | 'date' | 'sourceID'>) =>
	detailModel.create(user);

// Read
/** Find all details. */
export const findDetails = async () => detailModel.find();

// Update
/** Update a detail in the database. */
export const updateDetail = async (did: number, detail: Partial<IDetail>) =>
	await detailModel.updateOne({ _id: did }, { $set: detail });

// Delete
/** Remove a detail from the database. */
export const deleteDetail = async (did: number) => await detailModel.deleteOne({ _id: did });
