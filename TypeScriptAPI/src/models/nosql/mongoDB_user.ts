import mongoose, { Document, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    userName: { 
        type: String, 
        required: true,
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
});

export interface IUser extends Document {
    userName: string;
    password: string;
}

const User = mongoose.model<IUser>('User', UserSchema);

export default User;