import { MongoClient } from 'mongodb';

export async function connectDB() {
  const client = await MongoClient.connect(
    `mongodb+srv://test1234:test1234@cluster0.gvoli.mongodb.net/events?retryWrites=true&w=majority`
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export const getAllDocuments = async (
  client,
  collection,
  sort,
  filter = {}
) => {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter) // this changed - we use the "filter" parameter!
    .sort(sort)
    .toArray();

  return documents;
};
