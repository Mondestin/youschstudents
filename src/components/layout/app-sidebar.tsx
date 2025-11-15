'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { UserAvatarProfile } from '@/components/user-avatar-profile';
import { navItems } from '@/constants/data';
import { Badge } from '@/components/ui/badge';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '../icons';
import Image from 'next/image';

// Mock student data - replace with your own user management
const mockStudent = {
  fullName: 'Jean Dupont',
  studentNumber: 'STU-2024-001',
  emailAddresses: [{ emailAddress: 'jean.dupont@student.school.fr' }],
  imageUrl: undefined
};

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible='icon' variant='inset'>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              className='w-full cursor-default'
            >
              <UserAvatarProfile
                className='h-8 w-8 rounded-full'
                showInfo
                showStudentNumber={true}
                user={mockStudent}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='overflow-x-hidden'>
        <SidebarGroup className='pt-4'>
          <SidebarGroupLabel>Tableau de bord</SidebarGroupLabel>
          <SidebarMenu className='gap-2'>
            {navItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              const hasChildren = item.items && item.items.length > 0;
              const isActive = pathname === item.url || (item.items?.some(subItem => pathname === subItem.url) ?? false);

              if (hasChildren) {
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    defaultOpen={isActive}
                    className='group/collapsible'
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={isActive}
                          className='text-base [&>svg]:size-5 p-2.5'
                        >
                          {item.icon && <Icon />}
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge className='ml-auto rounded-full px-1 py-0 text-xs'>
                              {item.badge}
                            </Badge>
                          )}
                          <IconChevronRight className='ml-auto size-5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => {
                            const SubIcon = subItem.icon ? Icons[subItem.icon] : null;
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                  className='text-base [&>svg]:size-5 px-2.5'
                                >
                                  <Link href={subItem.url}>
                                    {SubIcon && <SubIcon />}
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    className='text-base [&>svg]:size-5 p-2.5'
                  >
                    <Link href={item.url}>
                      {item.icon && <Icon />}
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge className='ml-auto rounded-full px-1 py-0 text-xs'>
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="w-full cursor-default"
            >
              <div className="flex aspect-square size-24 items-center justify-center rounded-lg group-data-[state=collapsed]/sidebar-wrapper:size-12">
                <Image
                  src="/logo.png"
                  alt="YouSch Logo"
                  width={96}
                  height={96}
                  className="size-24 object-contain group-data-[state=collapsed]/sidebar-wrapper:size-12"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]/sidebar-wrapper:hidden">
                <span className="truncate font-semibold">Yousch</span>
                <span className="truncate text-xs text-muted-foreground">Etudiant</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
