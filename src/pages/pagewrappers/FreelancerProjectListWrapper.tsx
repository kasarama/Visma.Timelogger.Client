import React from 'react';

import { useData } from '../../hooks/UseData';

// components
import FreelancerProjectList from '../FreelancerProjectList';

export default function FreelancerProjectLisWrapper() {
  const result = useData('getListProjectOverview');
  
  if (!result.success) {
    return result.error ? result.error : 'Error reading data';
  }
  return <FreelancerProjectList data={result.data} />;
}
