import { useSelector } from 'react-redux';

const Feature = ({ name, children }) => {
  const { featureFlags } = useSelector((state) => state.featureFlag);

  const feature = featureFlags.find((featureFlag) => featureFlag.name === name);
  if (feature && feature.active) return children;

  return null;
};

export default Feature;
