import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserAvatarProfileProps {
  className?: string;
  showInfo?: boolean;
  showEmail?: boolean;
  showStudentNumber?: boolean;
  user: {
    imageUrl?: string;
    fullName?: string | null;
    studentNumber?: string;
    emailAddresses: Array<{ emailAddress: string }>;
  } | null;
}

export function UserAvatarProfile({
  className,
  showInfo = false,
  showEmail = true,
  showStudentNumber = false,
  user
}: UserAvatarProfileProps) {
  return (
    <div className='flex items-center gap-2'>
      <Avatar className={className}>
        <AvatarImage src={user?.imageUrl || ''} alt={user?.fullName || ''} />
        <AvatarFallback className={className?.includes('rounded-full') ? 'rounded-full' : 'rounded-lg'}>
          {user?.fullName?.slice(0, 2)?.toUpperCase() || 'CN'}
        </AvatarFallback>
      </Avatar>

      {showInfo && (
        <div className='grid flex-1 text-left text-sm leading-tight'>
          <span className='truncate font-semibold'>{user?.fullName || ''}</span>
          {showStudentNumber && user?.studentNumber && (
            <span className='truncate text-xs text-muted-foreground'>
              {user.studentNumber}
            </span>
          )}
          {showEmail && !showStudentNumber && (
            <span className='truncate text-xs'>
              {user?.emailAddresses[0].emailAddress || ''}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
