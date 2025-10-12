import CardView from "@/components/admin/Crad/card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function CustomerDashboard() {
  return (
    <>
      <Card className="mb-6 bg-gradient-to-r from-green-500 to-green-500 text-white">
        <CardHeader>
          <CardTitle>Welcome Back, Customer👋</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Here’s what’s happening with your dashboard today.
          </p>
        </CardContent>
      </Card>
      {/* over view */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardView />
      </div>
    </>
  );
}
