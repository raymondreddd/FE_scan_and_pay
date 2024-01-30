import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// call back
const createCategory = (name: string) => {
  return () => {
    fetch("http://localhost:3000/api/v1/products/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
  };
};

export function CategoryForm2() {
  const [createText, setCreateText] = useState([]);
  const createCategoryMutation = useMutation(createCategory(createText), {
    onSuccess: () => {
      console.log("Successfuly created category");
    },
    onError: (error) => {
      console.log("Error in creating category:", error);
    },
  });

  return (
    <div className="flex flex-col justify-around items-center p-4 m-4">
      <div>
        <Card className="w-[290px]">
          <CardHeader>
            <CardTitle>Create Category</CardTitle>
            <CardDescription>Write the name of NEW category.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Name of your project"
                    value={createText}
                    onChange={(e) => setCreateText(createText)}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => createCategoryMutation.mutate()}>
              Done
            </Button>
          </CardFooter>
        </Card>
      </div>
      {/* end: CREATE CATEGORY */}

      <div>
        <Card className="w-[290px]">
          <CardHeader>
            <CardTitle>Rename Category</CardTitle>
            <CardDescription>Update name of category.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Select category to Rename</Label>
                  <Select>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Click to Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="New Name of Category" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Done</Button>
          </CardFooter>
        </Card>
      </div>
      {/* end: update category CATEGORY */}
    </div>
  );
}
