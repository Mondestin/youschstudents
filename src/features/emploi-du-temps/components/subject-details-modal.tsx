'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarEvent } from '@/types/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { IconClock, IconMapPin, IconUser, IconClipboardCheck, IconEdit } from '@tabler/icons-react';
import SignatureModal from './signature-modal';

interface SubjectDetailsModalProps {
  event: CalendarEvent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAttendanceUpdate?: (eventId: string, status: CalendarEvent['attendanceStatus']) => void;
}

const getAttendanceBadge = (status?: CalendarEvent['attendanceStatus']) => {
  switch (status) {
    case 'present':
      return <Badge className="bg-green-600">Présent</Badge>;
    case 'absent':
      return <Badge variant="destructive">Absent</Badge>;
    case 'late':
      return <Badge variant="secondary">En retard</Badge>;
    case 'excused':
      return <Badge className="bg-blue-600">Justifié</Badge>;
    case 'not_signed':
      return <Badge variant="outline">Non signé</Badge>;
    default:
      return <Badge variant="outline">Non signé</Badge>;
  }
};

const getAttendanceLabel = (status?: CalendarEvent['attendanceStatus']) => {
  switch (status) {
    case 'present':
      return 'Vous étiez présent à ce cours';
    case 'absent':
      return 'Vous étiez absent à ce cours';
    case 'late':
      return 'Vous êtes arrivé en retard';
    case 'excused':
      return 'Votre absence est justifiée';
    case 'not_signed':
      return 'Vous n\'avez pas encore signé l\'assiduité';
    default:
      return 'Statut d\'assiduité non disponible';
  }
};

export default function SubjectDetailsModal({
  event,
  open,
  onOpenChange,
  onAttendanceUpdate
}: SubjectDetailsModalProps) {
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

  if (!event) return null;

  const eventDate = new Date(event.date);
  const isNotSigned = event.attendanceStatus === 'not_signed';

  const handleSign = () => {
    if (onAttendanceUpdate) {
      onAttendanceUpdate(event.id, 'present');
    }
    setIsSignatureModalOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{event.title}</DialogTitle>
          <DialogDescription>
            {format(eventDate, 'EEEE d MMMM yyyy', { locale: fr })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Time */}
          {event.time && (
            <div className="flex items-center gap-3">
              <IconClock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Heure</p>
                <p className="text-sm text-muted-foreground">{event.time}</p>
              </div>
            </div>
          )}

          {/* Teacher */}
          {event.teacher && (
            <div className="flex items-center gap-3">
              <IconUser className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Enseignant</p>
                <p className="text-sm text-muted-foreground">{event.teacher}</p>
              </div>
            </div>
          )}

          {/* Location */}
          {event.location && (
            <div className="flex items-center gap-3">
              <IconMapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Lieu</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
            </div>
          )}

          {/* Attendance Status */}
          <div className="flex items-center gap-3 pt-2 border-t">
            <IconClipboardCheck className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1">
                    <p className="text-sm font-medium mb-2">Statut d'assiduité</p>
              <div className="flex items-center gap-2 mb-3">
                {getAttendanceBadge(event.attendanceStatus)}
                <p className="text-sm text-muted-foreground">
                  {getAttendanceLabel(event.attendanceStatus)}
                </p>
              </div>
              {isNotSigned && (
                <Button
                  onClick={() => setIsSignatureModalOpen(true)}
                  className="w-full"
                >
                  <IconEdit className="h-4 w-4 mr-2" />
                  Signer l'assiduité
                </Button>
              )}
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="pt-2 border-t">
              <p className="text-sm font-medium mb-1">Description</p>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>
          )}
        </div>
      </DialogContent>

      <SignatureModal
        open={isSignatureModalOpen}
        onOpenChange={setIsSignatureModalOpen}
        onSign={handleSign}
        subjectTitle={event.title}
      />
    </Dialog>
  );
}

