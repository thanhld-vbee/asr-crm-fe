import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import moment from 'moment';
import { Button } from '@mui/material';

import ProcessHandler from '@src/components/ProcessHandler';
import { DURATION, PACKAGE_LEVEL, PACKAGE_TYPE } from '@src/constants/package';
import api from '@src/apis';
import { filterPackages } from '@src/services/package';

import PackageItem from './PackageItem';
import { StyledPackages } from './index.style';

const Packages = () => {
  const [packageType, setPackageType] = useState(PACKAGE_TYPE.STUDIO);
  const [packageDuration, setPackageDuration] = useState(DURATION.MONTHLY);
  const [packages, setPackages] = useState([]);
  const [currentPackages, setCurrentPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const { usingPackage } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  const handleChangePackageType = (type) => {
    setPackageType(type);
    setPackageDuration(DURATION.MONTHLY);
  };

  const handleSetCurrentPackages = (duration, allPackages) => {
    const isExpiredPackage =
      user.packageExpiryDate && moment().isAfter(user.packageExpiryDate, 'day');

    const displayTrialPackage = !usingPackage.id;
    const displayBasicPackage =
      isExpiredPackage || usingPackage.level === PACKAGE_LEVEL.BASIC;

    const displayPackages = filterPackages({
      duration,
      data: allPackages,
      displayTrialPackage,
      displayBasicPackage,
    });
    setCurrentPackages(displayPackages);
  };

  const fetchPackages = async () => {
    setLoading(true);
    const { status, result } = await api.packages.getPackages({
      type: packageType,
    });
    setLoading(false);
    if (status) setPackages(result.packages);
  };

  useEffect(() => {
    fetchPackages();
  }, [packageType]);

  useEffect(() => {
    handleSetCurrentPackages(packageDuration, packages);
  }, [usingPackage, packageDuration, packages]);

  return (
    <StyledPackages num={currentPackages.length}>
      <div className="tabs-header">
        <div className="tabs-item">
          <Button
            className={classNames('tab', {
              'tab-active': packageType === PACKAGE_TYPE.STUDIO,
              'tab-inactive': packageType !== PACKAGE_TYPE.STUDIO,
            })}
            onClick={() => handleChangePackageType(PACKAGE_TYPE.STUDIO)}
          >
            VBEE STUDIO
          </Button>
          <Button
            className={classNames('tab', {
              'tab-active': packageType === PACKAGE_TYPE.API,
              'tab-inactive': packageType !== PACKAGE_TYPE.API,
            })}
            onClick={() => handleChangePackageType(PACKAGE_TYPE.API)}
          >
            VBEE API
          </Button>
        </div>
      </div>

      <div className="duration-header">
        <div className="duration-item">
          <Button
            className={classNames('duration ', {
              'duration-inactive': packageDuration !== DURATION.MONTHLY,
            })}
            onClick={() => setPackageDuration(DURATION.MONTHLY)}
          >
            {t('payByMonthly')}
          </Button>
          <Button
            className={classNames('duration ', {
              'duration-inactive': packageDuration !== DURATION.YEARLY,
            })}
            onClick={() => setPackageDuration(DURATION.YEARLY)}
          >
            {t('payByYearly')}
          </Button>
        </div>
      </div>

      <div className="packages-wrapper">
        <ProcessHandler loading={loading} mt="30px" mb="30px" align="center">
          <div className="packages">
            {currentPackages.map((pkg) => (
              <PackageItem data={pkg} duration={packageDuration} />
            ))}
          </div>
        </ProcessHandler>
      </div>
    </StyledPackages>
  );
};

export default Packages;
