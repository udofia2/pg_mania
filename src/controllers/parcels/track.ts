import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { Parcel } from '../../orm/entities/parcels/Parcel';

export const trackParcel = async (req: Request, res: Response, next: NextFunction) => {
  const parcelId = parseInt(req.params.id, 10);

  const userId = req.jwtPayload.id;

  const parcelRepository = dataSource.getRepository(Parcel);

  try {
    const parcel = await parcelRepository.findOne({
      where: {
        id: parcelId,
        userId,
      },
      select: {
        name: true,
        status: true
      }
    });

    if (!parcel) {
      const customError = new CustomError(404, 'General', 'Parcel not found.', []);
      return next(customError);
    }

    res.customSuccess(200, 'Parcel Tracking', parcel);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error getting parcel.', null, err);
    return next(customError);
  }
};

