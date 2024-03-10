import { useParams } from 'react-router-dom';
import { useData } from '../../hooks/UseData';
// components

import FProjectOverviewPage from '../FreelancerProjectDetails';

export default function FProjectOverviewPageWrapper() {
  const { projectId } = useParams();

  const result = useData('getProjectOverview', projectId);

  if (!result.success) {
    return result.error ? result.error : <p>'Error reading data'</p>;
  }

  return <FProjectOverviewPage data={result.data} />;
}
