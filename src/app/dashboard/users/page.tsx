import PageContainer from '@/components/layout/page-container';
import UserListingPage from '@/features/users/components/user-listing';
import { searchParamsCache } from '@/lib/searchparams';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard: Users'
};

export default async function Page() {
  searchParamsCache.parse({});

  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col gap-4'>
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={7} rowCount={10} filterCount={0} />
          }
        >
          <UserListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}

