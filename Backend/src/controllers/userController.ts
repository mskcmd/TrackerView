import { Request, Response } from 'express';
import { uploadFiles } from "../middleware/multer";
import Video from '../models/videoModel';

export const uploadFile = async (req: Request, res: Response) => {
    try {
        const { name, videoNumber, heading, description, percentage } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const existingVideo = await Video.findOne({ videoNumber });

        if (existingVideo) {
            res.json({ message: 'Video number already exists' });
            return
        }

        const fileUrl = await uploadFiles(req.file);

        const newVideo = new Video({
            name,
            videoNumber,
            videoFile: fileUrl,
            heading,
            description,
            percentage
        });

        const result = await newVideo.save();
        return res.status(200).json({ message: 'File uploaded successfully', url: fileUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ message: 'Failed to upload file' });
    }
};

export const getModuleOne = async (req: Request, res: Response) => {
    try {
        const moduleOne = await Video.findOne({ videoNumber: 1 })
        if (!moduleOne) {
            return res.status(400).json({ message: "Module Not find" })
        }
        res.status(200).json(moduleOne)
    } catch (error) {
        console.log(error);
    }
}

export const getModuleTwo = async (req: Request, res: Response) => {
    try {
        const moduleTwo = await Video.findOne({ videoNumber: 2 })
        if (!moduleTwo) {
            return res.status(400).json({ message: "Module Not find" })
        }
        res.status(200).json(moduleTwo)
    } catch (error) {
        console.log(error);
    }
}

export const getModuleThree = async (req: Request, res: Response) => {
    try {
        const moduleThree = await Video.findOne({ videoNumber: 3 })
        if (!moduleThree) {
            return res.status(400).json({ message: "Module Not find" })
        }
        res.status(200).json(moduleThree)
    } catch (error) {
        console.log(error);
    }
}

export const fechHeding = async (req: Request, res: Response) => {
    try {
        let { videoNumber } = req.query;
        const videoNum = parseInt(videoNumber as string, 10) + 1;
        const heading = await Video.findOne({ videoNumber: videoNum });
        if (!heading) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json(heading?.heading);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

