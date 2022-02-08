import { DURATION, PACKAGE_LEVEL } from '@src/constants/package';

const filterPackages = ({
  duration,
  data,
  displayTrialPackage,
  displayBasicPackage,
}) => {
  const packageLevels = [PACKAGE_LEVEL.ADVANCE, PACKAGE_LEVEL.PRO];
  if (displayTrialPackage) packageLevels.push(PACKAGE_LEVEL.TRIAL);
  if (displayBasicPackage) packageLevels.push(PACKAGE_LEVEL.BASIC);

  let packages = [];

  switch (duration) {
    case DURATION.MONTHLY: {
      packages = data.filter(
        (pkg) =>
          pkg.active &&
          pkg.expiresIn !== 365 &&
          packageLevels.includes(pkg.level),
      );
      break;
    }
    case DURATION.YEARLY: {
      packages = data.filter(
        (pkg) =>
          pkg.active &&
          pkg.expiresIn !== 30 &&
          packageLevels.includes(pkg.level),
      );
      break;
    }
    default:
      break;
  }

  return packages;
};

export { filterPackages };
