import { Building2, BookOpen, GraduationCap, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useColleges } from "@/context/CollegesContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { colleges } = useColleges();
  const totalColleges = colleges.length;
  const totalCourses = colleges.reduce((acc, college) => acc + college.courses.length, 0);
  const totalSemesters = colleges.reduce(
    (acc, college) =>
      acc + college.courses.reduce((sum, course) => sum + course.semesters.length, 0),
    0
  );
  const totalLocations = new Set(colleges.map((c) => c.location)).size;

  const stats = [
    {
      title: "Total Colleges",
      value: totalColleges,
      description: "Partner institutions",
      icon: Building2,
      gradient: "gradient-primary",
      shadow: "shadow-magenta",
    },
    {
      title: "Total Courses",
      value: totalCourses,
      description: "Available courses",
      icon: BookOpen,
      gradient: "gradient-secondary",
      shadow: "shadow-pink",
    },
    {
      title: "Total Semesters",
      value: totalSemesters,
      description: "Semester programs",
      icon: GraduationCap,
      gradient: "gradient-accent",
      shadow: "shadow-orange",
    },
    {
      title: "Locations",
      value: totalLocations,
      description: "Different cities",
      icon: TrendingUp,
      gradient: "gradient-primary",
      shadow: "shadow-magenta",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Overview of your college and course management
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover-glow border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-lg ${stat.gradient} flex items-center justify-center ${stat.shadow}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">System initialized</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Colleges data loaded</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover-glow">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link to="/admin/colleges">
                <Button variant="outline" className="w-full justify-between group hover:border-primary">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Manage Colleges
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/admin/courses">
                <Button variant="outline" className="w-full justify-between group hover:border-secondary">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Manage Courses
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

