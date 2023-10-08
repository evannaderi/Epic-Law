// app/api/upload-model/route.js
import { NextResponse } from 'next/server';
import { File } from 'buffer';

async function POST(request) {
	try {
		const form = await request.formData();
		// const file = form.get('file');
		console.log(form);

		// if (!file)
		// 	return new NextResponse({
		// 		status: 401,
		// 		body: { message: 'No file detected' },
		// 	});

		// const isFile = file instanceof File;

		// if (!isFile)
		// 	return new NextResponse({
		// 		status: 401,
		// 		body: { message: 'File type not of File Type' },
		// 	});

		// const buffer = await file.arrayBuffer();
		// const newName = generateModifiedFilename(file.name);
		// const data = await s3Client.send(
		// 	new PutObjectCommand({
		// 		Bucket: process.env.DO_BUCKET,
		// 		Key: newName,
		// 		Body: Buffer.from(buffer),
		// 	})
		// );
		// console.log(data);

		// const client = await clientPromise;
		// const db = client.db();
		// const fileCollection = db.collection('files');

		// const fileInsert = {
		// 	name: file.name,
		// 	url: getFileURL(newName),
		// 	belongsTo: session.user.email,
		// 	createdAt: new Date(),
		// };
		// const fileResponse = await fileCollection.insertOne(fileInsert);
		// console.log(fileResponse);

		// const insertedFileId = fileResponse.insertedId;

		// const userCollection = db.collection('user');

		// const userUpdateResponse = await userCollection.updateOne(
		// 	{ email: session.user.email },
		// 	{ $push: { files: insertedFileId } }
		// );

		// if (userUpdateResponse.modifiedCount !== 1) {
		// 	console.log('Failed to update user with file information.');
		// }

		return new NextResponse({ status: 200, body: { message: 'success' } });
	} catch (error) {
		console.log(error);
		return new NextResponse({
			status: 500,
			body: { error: error, message: 'Internal server error' },
		});
	}
}

export { POST };
