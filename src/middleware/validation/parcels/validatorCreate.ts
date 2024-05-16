import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreateParcel = (req: Request, res: Response, next: NextFunction) => {
  let { name, description, pickupDate } = req.body;
  const errorsValidation: ErrorValidation[] = [];

    name = !name ? '' : name;
    description = !description ? '' : description;
    pickupDate = !pickupDate ? '' : pickupDate;

  if (validator.isEmpty(name)) {
    errorsValidation.push({ name: 'Parcel name is required' });
  }

  if (validator.isEmpty(description)) {
    errorsValidation.push({ description: 'Parcel description is required' });
  } 
  
  if (!validator.isLength(description, { max: 255 })) {
    errorsValidation.push({ description: 'Parcel description cannot exceed 255 characters' });
  }

  if (!pickupDate) {
    errorsValidation.push({ pickupDate: 'Pickup date is required' });
  }
  
  if (!validator.isDate(pickupDate.toString())) {
    errorsValidation.push({ pickupDate: 'Invalid pickup date format. Please use YYYY-MM-DD' });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Parcel creation validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }

  return next();
};
