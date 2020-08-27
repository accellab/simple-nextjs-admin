import Link from 'next/link';

const MENUS = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/',
  },
  // {
  //   id: 2,
  //   name: 'Edit',
  //   path: '/edit',
  // },
];

const SideMenu = () => {
  return (
    <div className=''>
      {MENUS.map((item) => (
        <Link href={item.path} key={item.id}>
          <a>{item.name}</a>
        </Link>
      ))}
    </div>
  );
};

export default SideMenu;
