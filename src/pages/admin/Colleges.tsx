import { useState, useMemo } from "react";
import { Building2, Plus, Search, Edit, Trash2, MapPin } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { College } from "@/data/collegesData";

const Colleges = () => {
  const { colleges, addCollege, updateCollege, deleteCollege } = useColleges();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState<College | null>(null);
  const [deletingCollege, setDeletingCollege] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", location: "" });

  const filteredColleges = useMemo(
    () =>
      colleges.filter(
        (college) =>
          college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          college.location.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [colleges, searchQuery]
  );

  const handleOpenDialog = (college?: College) => {
    if (college) {
      setEditingCollege(college);
      setFormData({ name: college.name, location: college.location });
    } else {
      setEditingCollege(null);
      setFormData({ name: "", location: "" });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCollege(null);
    setFormData({ name: "", location: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.location.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (editingCollege) {
      // Check if name changed and conflicts with existing
      if (editingCollege.name !== formData.name.trim()) {
        const nameExists = colleges.some(
          (c) => c.name === formData.name.trim() && c.name !== editingCollege.name
        );
        if (nameExists) {
          toast({
            title: "Error",
            description: "A college with this name already exists",
            variant: "destructive",
          });
          return;
        }
      }

      updateCollege(editingCollege.name, {
        ...editingCollege,
        name: formData.name.trim(),
        location: formData.location.trim(),
      });
      toast({
        title: "Success",
        description: "College updated successfully",
      });
    } else {
      // Check if college already exists
      const nameExists = colleges.some((c) => c.name === formData.name.trim());
      if (nameExists) {
        toast({
          title: "Error",
          description: "A college with this name already exists",
          variant: "destructive",
        });
        return;
      }

      addCollege({
        name: formData.name.trim(),
        location: formData.location.trim(),
        courses: [],
      });
      toast({
        title: "Success",
        description: "College added successfully",
      });
    }
    handleCloseDialog();
  };

  const handleDeleteClick = (collegeName: string) => {
    setDeletingCollege(collegeName);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deletingCollege) {
      deleteCollege(deletingCollege);
      toast({
        title: "Success",
        description: "College deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      setDeletingCollege(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Colleges Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage partner institutions and their details
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="gradient-primary text-white hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add College
        </Button>
      </div>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>College Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredColleges.length > 0 ? (
                  filteredColleges.map((college) => (
                    <TableRow key={college.name} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-4 h-4 text-white" />
                          </div>
                          <span>{college.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{college.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="gradient-secondary text-white">
                          {college.courses.length} {college.courses.length === 1 ? "course" : "courses"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(college)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(college.name)}
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      {searchQuery ? "No colleges found matching your search" : "No colleges found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              {editingCollege ? "Edit College" : "Add New College"}
            </DialogTitle>
            <DialogDescription>
              {editingCollege
                ? "Update the college information below"
                : "Enter the details for the new college"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">College Name</Label>
              <Input
                id="name"
                placeholder="Enter college name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-primary text-white">
                {editingCollege ? "Update" : "Add"} College
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{deletingCollege}" and all its courses. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingCollege(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
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

export default Colleges;
