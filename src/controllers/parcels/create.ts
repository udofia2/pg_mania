import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { User } from '../../orm/entities/users/User';
import { Parcel } from '../../orm/entities/parcels/Parcel';
import { ParcelStatus } from '../../consts/ConstsPercel';
import {updatePackageStatus} from './update'

export const createParcel = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, pickupDate } = req.body;

  const userRepository = dataSource.getRepository(User);
  const parcelRepository = dataSource.getRepository(Parcel);

  try {
    
    const userId = req.jwtPayload.id

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      const customError = new CustomError(400, 'General', 'User not found.', []);
      return next(customError);
    }

    const newParcel = new Parcel();
    newParcel.name = name;
    newParcel.description = description;
    newParcel.pickupDate = pickupDate;
    newParcel.user = user;

    try {
      await parcelRepository.save(newParcel);
      setTimeout(() => updatePackageStatus(newParcel.id, ParcelStatus.IN_TRANSIT), 120000); // 2 minutes
      setTimeout(() => updatePackageStatus(newParcel.id, ParcelStatus.DELIVERED), 240000); // 4 minutes
      // setTimeout(() => updatePackageStatus(newParcel.id, 'Delivered'), 360000); // 6 minutes

      res.customSuccess(201, 'Parcel successfully created.');
    } catch (err) {
      const customError = new CustomError(400, 'Raw', 'Error creating parcel.', null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
