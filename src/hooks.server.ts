/*
Entrypoint for the server API. Initializes all DB connections.
 */
import mongoose from 'mongoose';
import { DB_URI } from '$env/static/private';

// The `strictQuery` option will be switched to `false` by default in Mongoose 7.
mongoose.set('strictQuery', false);

// Connect to MongoDB using the URI provided in .env
console.log('Connecting to Mongo...');
mongoose.connect(DB_URI).then(() => {
	console.log('Mongo connected');
});
