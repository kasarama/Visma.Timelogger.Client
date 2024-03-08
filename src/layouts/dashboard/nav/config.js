// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const roleNavConfig = {
  freelancer: [
    {
      title: 'Projects',
      path: '/freelancer_projects',
      icon: icon('ic_prodoverview'),
    },
    {
      title: 'Some Page',
      path: '/freelancer_somepage',
      icon: icon('ic_catalog'),
    },
  ],
  customer: [
    {
      title: 'Projects',
      path: '/customer_projects',
      icon: icon('ic_prodoverview'),
    },
    {
      title: 'Some Page',
      path: '/customer_somepage',
      icon: icon('ic_catalog'),
    },
  ],
};

const navConfig = (roles) => {
  let links = [];
  roles.sort();

  roles.forEach((r) => {
    links = links.concat(roleNavConfig[r.toLowerCase()]);
  });
  return links;
};
export default navConfig;
