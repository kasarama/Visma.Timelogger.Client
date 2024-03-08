import { useParams } from 'react-router-dom';
import { useData } from '../../hooks/UseData';
import FProjectOverviewPage from '../FreelancerProjectDetails';

export default function FProjectOverviewPageWrapper() {
  const { projectId } = useParams();

  const result = useData('getProjectOverview', projectId);

  if (result.error) {
    return result.error;
  }

  if (result.data) {
    return <FProjectOverviewPage data={result.data} />;
  }
}
