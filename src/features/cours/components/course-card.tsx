'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Course } from '../types';
import { IconUser, IconCalendar, IconBook, IconMail } from '@tabler/icons-react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl">{course.name}</CardTitle>
              <Badge variant="outline">{course.code}</Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {course.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Teacher Info */}
        <div className="flex items-center gap-2 text-sm">
          <IconUser className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{course.teacher}</span>
          <a
            href={`mailto:${course.teacherEmail}`}
            className="ml-auto text-muted-foreground hover:text-foreground"
          >
            <IconMail className="h-4 w-4" />
          </a>
        </div>

        {/* Schedule */}
        <div className="space-y-1">
          {course.schedule.map((schedule, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
              <IconCalendar className="h-4 w-4" />
              <span>
                {schedule.day} {schedule.startTime} - {schedule.endTime}
              </span>
              <span className="ml-auto">Salle {schedule.room}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <IconBook className="h-4 w-4 text-muted-foreground" />
            <span>{course.credits} crédits</span>
          </div>
          <div className="flex items-center gap-1">
            <IconUser className="h-4 w-4 text-muted-foreground" />
            <span>{course.enrolledStudents}/{course.maxStudents} étudiants</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

