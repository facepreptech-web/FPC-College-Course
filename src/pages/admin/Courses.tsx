import { useState, useMemo } from "react";
import { BookOpen, Plus, Search, Edit, Trash2, Building2, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useColleges } from "@/context/CollegesContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Course, SemesterTopic } from "@/data/collegesData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CourseWithCollege extends Course {
  collegeName: string;
  collegeLocation: string;
}

const Courses = () => {
  const { colleges, addCourse, updateCourse, deleteCourse, addSemester, updateSemester, deleteSemester } = useColleges();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollege, setSelectedCollege] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSemesterDialogOpen, setIsSemesterDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [editingCourse, setEditingCourse] = useState<CourseWithCollege | null>(null);
  const [editingSemester, setEditingSemester] = useState<{ course: CourseWithCollege; semester?: SemesterTopic } | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<{ collegeName: string; courseName: string } | null>(null);
  const [deletingSemester, setDeletingSemester] = useState<{ collegeName: string; courseName: string; semesterNumber: number } | null>(null);
  const [formData, setFormData] = useState({ name: "", collegeName: "" });
  const [semesterFormData, setSemesterFormData] = useState({ semester: 1, topics: "" });

  // Flatten all courses with their college info
  const allCourses = useMemo(
    () =>
      colleges.flatMap((college) =>
        college.courses.map((course) => ({
          ...course,
          collegeName: college.name,
          collegeLocation: college.location,
        }))
      ),
    [colleges]
  );

  const filteredCourses = useMemo(
    () =>
      allCourses.filter((course) => {
        const matchesSearch =
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.collegeName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCollege =
          selectedCollege === "all" || course.collegeName === selectedCollege;
        return matchesSearch && matchesCollege;
      }),
    [allCourses, searchQuery, selectedCollege]
  );

  const handleOpenDialog = (course?: CourseWithCollege) => {
    if (course) {
      setEditingCourse(course);
      setFormData({ name: course.name, collegeName: course.collegeName });
    } else {
      setEditingCourse(null);
      setFormData({ name: "", collegeName: colleges.length > 0 ? colleges[0].name : "" });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCourse(null);
    setFormData({ name: "", collegeName: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.collegeName) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const college = colleges.find((c) => c.name === formData.collegeName);
    if (!college) return;

    if (editingCourse) {
      // Check if name changed and conflicts with existing
      if (editingCourse.name !== formData.name.trim()) {
        const nameExists = college.courses.some(
          (c) => c.name === formData.name.trim() && c.name !== editingCourse.name
        );
        if (nameExists) {
          toast({
            title: "Error",
            description: "A course with this name already exists in this college",
            variant: "destructive",
          });
          return;
        }
      }

      updateCourse(editingCourse.collegeName, editingCourse.name, {
        ...editingCourse,
        name: formData.name.trim(),
        semesters: editingCourse.semesters,
      });
      toast({
        title: "Success",
        description: "Course updated successfully",
      });
    } else {
      // Check if course already exists
      const nameExists = college.courses.some((c) => c.name === formData.name.trim());
      if (nameExists) {
        toast({
          title: "Error",
          description: "A course with this name already exists in this college",
          variant: "destructive",
        });
        return;
      }

      addCourse(formData.collegeName, {
        name: formData.name.trim(),
        semesters: [],
      });
      toast({
        title: "Success",
        description: "Course added successfully",
      });
    }
    handleCloseDialog();
  };

  const handleOpenSemesterDialog = (course: CourseWithCollege, semester?: SemesterTopic) => {
    if (semester) {
      setEditingSemester({ course, semester });
      setSemesterFormData({ semester: semester.semester, topics: semester.topics });
    } else {
      const nextSemester = course.semesters.length > 0 
        ? Math.max(...course.semesters.map(s => s.semester)) + 1 
        : 1;
      setEditingSemester({ course });
      setSemesterFormData({ semester: nextSemester, topics: "" });
    }
    setIsSemesterDialogOpen(true);
  };

  const handleCloseSemesterDialog = () => {
    setIsSemesterDialogOpen(false);
    setEditingSemester(null);
    setSemesterFormData({ semester: 1, topics: "" });
  };

  const handleSemesterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!semesterFormData.topics.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter semester topics",
        variant: "destructive",
      });
      return;
    }

    if (!editingSemester || !editingSemester.course) {
      toast({
        title: "Error",
        description: "Please select a course first",
        variant: "destructive",
      });
      return;
    }

    const semesterData: SemesterTopic = {
      semester: semesterFormData.semester,
      topics: semesterFormData.topics.trim(),
    };

    if (editingSemester.semester) {
      // Update existing semester
      updateSemester(
        editingSemester.course.collegeName,
        editingSemester.course.name,
        editingSemester.semester.semester,
        semesterData
      );
      toast({
        title: "Success",
        description: "Semester updated successfully",
      });
    } else {
      // Add new semester
      addSemester(editingSemester.course.collegeName, editingSemester.course.name, semesterData);
      toast({
        title: "Success",
        description: "Semester added successfully",
      });
    }
    handleCloseSemesterDialog();
  };

  const handleDeleteClick = (collegeName: string, courseName: string) => {
    setDeletingCourse({ collegeName, courseName });
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingCourse) {
      deleteCourse(deletingCourse.collegeName, deletingCourse.courseName);
      toast({
        title: "Success",
        description: "Course deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setDeletingCourse(null);
    }
  };

  const handleDeleteSemesterClick = (collegeName: string, courseName: string, semesterNumber: number) => {
    setDeletingSemester({ collegeName, courseName, semesterNumber });
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSemesterConfirm = () => {
    if (deletingSemester) {
      deleteSemester(
        deletingSemester.collegeName,
        deletingSemester.courseName,
        deletingSemester.semesterNumber
      );
      toast({
        title: "Success",
        description: "Semester deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setDeletingSemester(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Courses Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage courses and their semester curriculum
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="gradient-primary text-white hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Course
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCollege} onValueChange={setSelectedCollege}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by college" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colleges</SelectItem>
                {colleges.map((college) => (
                  <SelectItem key={college.name} value={college.name}>
                    {college.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Semesters</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course, index) => (
                    <>
                      <TableRow key={`${course.collegeName}-${course.name}-${index}`} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg gradient-secondary flex items-center justify-center flex-shrink-0">
                              <BookOpen className="w-4 h-4 text-white" />
                            </div>
                            <span>{course.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span>{course.collegeName}</span>
                          </div>
                        </TableCell>
                        <TableCell>{course.collegeLocation}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="gradient-accent text-white">
                            {course.semesters.length} {course.semesters.length === 1 ? "semester" : "semesters"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setExpandedCourse(expandedCourse === `${course.collegeName}-${course.name}` ? null : `${course.collegeName}-${course.name}`)}
                              className="hover:bg-accent/10 hover:text-accent"
                            >
                              {expandedCourse === `${course.collegeName}-${course.name}` ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenDialog(course)}
                              className="hover:bg-primary/10 hover:text-primary"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(course.collegeName, course.name)}
                              className="hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedCourse === `${course.collegeName}-${course.name}` && (
                        <TableRow>
                          <TableCell colSpan={5} className="bg-muted/30">
                            <div className="space-y-3 py-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-accent" />
                                  Semesters ({course.semesters.length})
                                </h4>
                                <Button
                                  size="sm"
                                  onClick={() => handleOpenSemesterDialog(course)}
                                  className="gradient-accent text-white"
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add Semester
                                </Button>
                              </div>
                              {course.semesters.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {course.semesters
                                    .sort((a, b) => a.semester - b.semester)
                                    .map((semester) => (
                                      <Card key={semester.semester} className="border-2">
                                        <CardHeader className="pb-3">
                                          <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm">
                                              Semester {semester.semester}
                                            </CardTitle>
                                            <div className="flex gap-1">
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7"
                                                onClick={() => handleOpenSemesterDialog(course, semester)}
                                              >
                                                <Edit className="w-3 h-3" />
                                              </Button>
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
                                                onClick={() => handleDeleteSemesterClick(course.collegeName, course.name, semester.semester)}
                                              >
                                                <Trash2 className="w-3 h-3" />
                                              </Button>
                                            </div>
                                          </div>
                                        </CardHeader>
                                        <CardContent>
                                          <p className="text-xs text-muted-foreground whitespace-pre-line line-clamp-3">
                                            {semester.topics}
                                          </p>
                                        </CardContent>
                                      </Card>
                                    ))}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                  No semesters added yet. Click "Add Semester" to get started.
                                </p>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      {searchQuery || selectedCollege !== "all"
                        ? "No courses found matching your criteria"
                        : "No courses found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Course Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {editingCourse ? "Edit Course" : "Add New Course"}
            </DialogTitle>
            <DialogDescription>
              {editingCourse
                ? "Update the course information below"
                : "Enter the details for the new course"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="course-name">Course Name</Label>
              <Input
                id="course-name"
                placeholder="Enter course name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-college">College</Label>
              <Select
                value={formData.collegeName}
                onValueChange={(value) => setFormData({ ...formData, collegeName: value })}
                disabled={!!editingCourse}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select college" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map((college) => (
                    <SelectItem key={college.name} value={college.name}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-primary text-white">
                {editingCourse ? "Update" : "Add"} Course
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Semester Dialog */}
      <Dialog open={isSemesterDialogOpen} onOpenChange={setIsSemesterDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {editingSemester?.semester ? "Edit Semester" : "Add New Semester"}
            </DialogTitle>
            <DialogDescription>
              {editingSemester?.semester
                ? "Update the semester information below"
                : editingSemester
                ? `Add a new semester to ${editingSemester.course.name}`
                : "Enter semester details"}
            </DialogDescription>
          </DialogHeader>
          {editingSemester && (
            <form onSubmit={handleSemesterSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="semester-number">Semester Number</Label>
                <Input
                  id="semester-number"
                  type="number"
                  min="1"
                  value={semesterFormData.semester}
                  onChange={(e) =>
                    setSemesterFormData({
                      ...semesterFormData,
                      semester: parseInt(e.target.value) || 1,
                    })
                  }
                  required
                  disabled={!!editingSemester.semester}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester-topics">Topics & Curriculum</Label>
                <Textarea
                  id="semester-topics"
                  placeholder="Enter semester topics, curriculum, and certifications..."
                  value={semesterFormData.topics}
                  onChange={(e) =>
                    setSemesterFormData({ ...semesterFormData, topics: e.target.value })
                  }
                  rows={8}
                  required
                />
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <Button type="button" variant="outline" onClick={handleCloseSemesterDialog}>
                  Cancel
                </Button>
                <Button type="submit" className="gradient-accent text-white">
                  {editingSemester.semester ? "Update" : "Add"} Semester
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {deletingCourse
                ? `This will permanently delete "${deletingCourse.courseName}" and all its semesters. This action cannot be undone.`
                : deletingSemester
                ? `This will permanently delete Semester ${deletingSemester.semesterNumber}. This action cannot be undone.`
                : "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDeletingCourse(null);
                setDeletingSemester(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deletingCourse ? handleDeleteConfirm : handleDeleteSemesterConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Courses;
