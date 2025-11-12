import { mockUsers } from '@/features/users/mock-data';
import { UserTable } from './user-tables';
import { columns } from './user-tables/columns';

type UserListingPage = {};

export default async function UserListingPage({}: UserListingPage) {
  const users = mockUsers;
  const totalUsers = users.length;

  return (
    <UserTable
      data={users}
      totalItems={totalUsers}
      columns={columns}
    />
  );
}

