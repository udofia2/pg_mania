import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { Parcel } from '../../orm/entities/parcels/Parcel';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const parcelId = parseInt(req.params.id, 10);

  const userId = req.jwtPayload.id;

  const userRepository = dataSource.getRepository(User);
  const parcelRepository = dataSource.getRepository(Parcel);

  try {
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      const customError = new CustomError(400, 'General', 'User not found.', []);
      return next(customError);
    }
    const parcel = await parcelRepository.findOne({
      select: { user: { id: true, email: true, username: true } },
      relations: { user: true },
      where: {
        id: parcelId,
        user: {
          id: user.id,
        },
      },
    });

    if (!parcel) {
      const customError = new CustomError(404, 'General', 'Parcel not found.', []);
      return next(customError);
    }

    res.customSuccess(200, 'Parcel details', parcel);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error getting parcel.', null, err);
    return next(customError);
  }
};
