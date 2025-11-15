'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IconMail, IconPhone, IconMapPin, IconCalendar, IconUser, IconSchool, IconEdit, IconFileText } from '@tabler/icons-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import EditProfileModal from '@/features/profile/components/edit-profile-modal';

// Mock student data
const initialStudentData = {
  id: 'STU-2024-001',
  firstName: 'Jean',
  lastName: 'Dupont',
  email: 'jean.dupont@student.school.fr',
  phone: '+33 6 12 34 56 78',
  dateOfBirth: '2005-03-15',
  address: {
    street: '123 Rue de la République',
    city: 'Paris',
    postalCode: '75001',
    country: 'France'
  },
  academic: {
    level: 'Licence 3',
    program: 'Sciences et Technologies',
    specialization: 'Mathématiques et Physique',
    enrollmentDate: '2022-09-01',
    expectedGraduation: '2025-06-30',
    gpa: 14.5
  },
  emergencyContact: {
    name: 'Marie Dupont',
    relationship: 'Mère',
    phone: '+33 6 98 76 54 32',
    email: 'marie.dupont@email.com'
  },
  documents: [
    {
      id: '1',
      name: 'Carte d\'étudiant',
      type: 'pdf',
      uploadDate: '2024-09-01',
      url: '/documents/student-card.pdf'
    },
    {
      id: '2',
      name: 'Certificat de scolarité',
      type: 'pdf',
      uploadDate: '2024-09-05',
      url: '/documents/certificate.pdf'
    }
  ]
};

export default function ProfilPage() {
  const [studentData, setStudentData] = useState(initialStudentData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const initials = `${studentData.firstName[0]}${studentData.lastName[0]}`;

  const handleSave = (data: {
    phone: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
      email: string;
    };
  }) => {
    // Update the student data with the new values
    setStudentData(prev => ({
      ...prev,
      phone: data.phone,
      address: data.address,
      emergencyContact: data.emergencyContact
    }));
  };

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mon profil</h1>
            <p className="text-muted-foreground">
              Gérez vos informations personnelles et académiques
            </p>
          </div>
          <Button onClick={() => setIsEditModalOpen(true)}>
            <IconEdit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={`${studentData.firstName} ${studentData.lastName}`} />
                  <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold">
                    {studentData.firstName} {studentData.lastName}
                  </h2>
                  <p className="text-muted-foreground">{studentData.academic.level}</p>
                  <Badge className="mt-2">{studentData.id}</Badge>
                </div>
              </div>

              <Separator orientation="vertical" className="hidden md:block" />

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <IconMail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{studentData.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconPhone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Téléphone</p>
                    <p className="text-sm text-muted-foreground">{studentData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconMapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Adresse</p>
                    <p className="text-sm text-muted-foreground">
                      {studentData.address.street}<br />
                      {studentData.address.postalCode} {studentData.address.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <IconCalendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Date de naissance</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(studentData.dateOfBirth).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="academic" className="space-y-4">
          <TabsList className="h-auto bg-transparent p-0 gap-0 border-b border-border rounded-none border-t-0 border-l-0 border-r-0">
            <TabsTrigger 
              value="academic"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              <IconSchool className="h-4 w-4 mr-2" />
              Informations académiques
            </TabsTrigger>
            <TabsTrigger 
              value="contact"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              <IconPhone className="h-4 w-4 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger 
              value="documents"
              className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              <IconFileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="academic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informations académiques</CardTitle>
                <CardDescription>
                  Détails de votre parcours académique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Niveau</p>
                      <p className="text-base font-semibold mt-1">{studentData.academic.level}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Programme</p>
                      <p className="text-base font-semibold mt-1">{studentData.academic.program}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Spécialisation</p>
                      <p className="text-base font-semibold mt-1">{studentData.academic.specialization}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Moyenne générale</p>
                      <p className="text-base font-semibold mt-1">{studentData.academic.gpa} / 20</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date d'inscription</p>
                      <p className="text-base font-semibold mt-1">
                        {new Date(studentData.academic.enrollmentDate).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Diplôme prévu</p>
                      <p className="text-base font-semibold mt-1">
                        {new Date(studentData.academic.expectedGraduation).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact d'urgence</CardTitle>
                <CardDescription>
                  Personne à contacter en cas d'urgence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <IconUser className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Nom</p>
                      <p className="text-base font-semibold mt-1">{studentData.emergencyContact.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconUser className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Relation</p>
                      <p className="text-base font-semibold mt-1">{studentData.emergencyContact.relationship}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconPhone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                      <p className="text-base font-semibold mt-1">{studentData.emergencyContact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <IconMail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="text-base font-semibold mt-1">{studentData.emergencyContact.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  Vos documents académiques et administratifs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom du document</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date d'upload</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentData.documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{doc.type.toUpperCase()}</Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(doc.uploadDate).toLocaleDateString('fr-FR')}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Télécharger
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        initialData={{
          phone: studentData.phone,
          address: studentData.address,
          emergencyContact: studentData.emergencyContact
        }}
        onSave={handleSave}
      />
    </PageContainer>
  );
}
