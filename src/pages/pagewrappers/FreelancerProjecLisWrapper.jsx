// components
import { useData } from '../../hooks/UseData';
import FreelancerProjecLis from '../FreelancerProjecLis';

export default function FreelancerProjecLisWrapper() {
  const result = useData('getListProjectOverview');

  if (result.error) {
    return result.error;
  }

  if (result.data) {
    return <FreelancerProjecLis data={result.data} />;
  }
}
