import { dataSource } from '../../orm/dbCreateConnection';

import { Parcel } from '../../orm/entities/parcels/Parcel';
import { ParcelStatus } from '../../consts/ConstsPercel';


export const updatePackageStatus = async (packageId: number, newStatus: ParcelStatus) => {
  const parcelRepository = dataSource.getRepository(Parcel);

  const packageToUpdate = await parcelRepository.findOne({ where: { id: packageId } });
  if (packageToUpdate) {
    packageToUpdate.status = newStatus;
    await parcelRepository.save(packageToUpdate);
  }
};