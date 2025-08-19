import { ObjectId } from "mongodb";

const generateId = () => new ObjectId();

export default generateId;
