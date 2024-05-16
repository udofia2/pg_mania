import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../../orm/dbCreateConnection';

import { User } from 'orm/entities/users/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { Parcel } from '../../orm/entities/parcels/Parcel';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.jwtPayload.id;

  const userRepository = dataSource.getRepository(User);
  const parcelRepository = dataSource.getRepository(Parcel);

  try {
    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
      const customError = new CustomError(400, 'General', 'User not found.', []);
      return next(customError);
    }
    const parcel = await parcelRepository.find({
      select: { id:true, name: true, description: true, status: true, pickupDate: true, user: { id: true, email: true, name: true } },
      relations: { user: true },
      where: {
        user: {
          id: user.id,
        },
      },
    });

    if (!parcel) {
      const customError = new CustomError(404, 'General', 'Parcel not found.', []);
      return next(customError);
    }

    res.customSuccess(200, 'List of Parcels.', parcel);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Can"t retrieve list of Parcels', null, err);
    return next(customError);
  }
};

//To demonstrate authorization, you can only view the list of parcels you are created/sent