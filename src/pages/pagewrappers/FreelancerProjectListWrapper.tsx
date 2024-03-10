import { useData } from '../../hooks/UseData';

// components
import FreelancerProjectList from '../FreelancerProjectList';

export default function FreelancerProjectLisWrapper() {
  const result = useData('getListProjectOverview');

  if (!result.success) {
    return result.error ? result.error : <p>'Error reading data'</p>;
  }
  return <FreelancerProjectList data={result.data} />;
}
