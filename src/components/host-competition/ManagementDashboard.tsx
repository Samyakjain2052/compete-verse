
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ManagementDashboardProps = {
  competitions: any[];
  isLoading: boolean;
}

const ManagementDashboard = ({ competitions = [], isLoading }: ManagementDashboardProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading your competitions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Competitions</CardTitle>
        </CardHeader>
        <CardContent>
          {competitions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                You haven't created any competitions yet.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => document.getElementById("create-tab")?.click()}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Competition
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Participants</th>
                    <th className="px-4 py-3 text-left">Submissions</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {competitions.map((competition) => (
                    <tr key={competition.id} className="border-b">
                      <td className="px-4 py-3">
                        <span className="font-medium">{competition.title}</span>
                      </td>
                      <td className="px-4 py-3">{competition.participants || 0}</td>
                      <td className="px-4 py-3">{competition.submissions?.length || 0}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {new Date(competition.endDate) > new Date() ? "Active" : "Closed"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/competitions/${competition.id}`}>
                            Manage
                          </a>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {competitions.length > 0 && (
        <DashboardStatistics competitions={competitions} />
      )}
    </div>
  );
};

type DashboardStatisticsProps = {
  competitions: any[];
}

const DashboardStatistics = ({ competitions }: DashboardStatisticsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Submission Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold">
              {competitions.reduce((acc, comp) => acc + (comp.submissions?.length || 0), 0)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Total Submissions
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-semibold">
                {competitions.reduce((acc, comp) => {
                  const todaySubmissions = (comp.submissions || []).filter(s => {
                    const subDate = new Date(s.dateSubmitted);
                    const today = new Date();
                    return subDate.getDate() === today.getDate() && 
                           subDate.getMonth() === today.getMonth() && 
                           subDate.getFullYear() === today.getFullYear();
                  }).length;
                  return acc + todaySubmissions;
                }, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Today's Submissions
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">
                {competitions.reduce((acc, comp) => acc + (comp.participants || 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Unique Participants
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Age Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-2xl font-semibold text-green-600">-</div>
              <p className="text-xs text-muted-foreground mt-1">Verified</p>
            </div>
            <div>
              <div className="text-2xl font-semibold text-yellow-600">-</div>
              <p className="text-xs text-muted-foreground mt-1">Pending</p>
            </div>
            <div>
              <div className="text-2xl font-semibold text-red-600">-</div>
              <p className="text-xs text-muted-foreground mt-1">Rejected</p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm" className="w-full">
              Review Pending Verifications
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Forum Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Recent Posts</p>
              <ul className="mt-2 space-y-2">
                <li className="text-sm text-muted-foreground">
                  No forum posts yet
                </li>
              </ul>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Moderate Forum
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagementDashboard;
