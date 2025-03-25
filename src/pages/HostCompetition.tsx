
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompetitionService from "@/services/competition-service";
import CompetitionForm from "@/components/host-competition/CompetitionForm";
import ManagementDashboard from "@/components/host-competition/ManagementDashboard";

const HostCompetition = () => {
  const [activeTab, setActiveTab] = React.useState("create");

  const { data: hostedCompetitions = [], isLoading: isLoadingCompetitions } = useQuery({
    queryKey: ['hostedCompetitions'],
    queryFn: () => CompetitionService.getHostedCompetitions(),
  });

  return (
    <div className="container max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Host a Competition
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="create" id="create-tab">Create Competition</TabsTrigger>
          <TabsTrigger value="manage">Manage Competitions</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-8">
          <CompetitionForm onSuccess={() => setActiveTab("manage")} />
        </TabsContent>

        <TabsContent value="manage" className="space-y-8">
          <ManagementDashboard 
            competitions={hostedCompetitions} 
            isLoading={isLoadingCompetitions} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HostCompetition;
