import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import User from '../models/nosql/mongoDB_user';
dotenv.config();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).send('Please login again');
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const { userId } = decoded.userId;
        const user = await User.findOne({userId})
        if(!user) return res.status(400).json({msg: 'This userId does not exits.'})
        next();
    } catch (err) {
        res.status(401).send('Please authenticate');
    }
};