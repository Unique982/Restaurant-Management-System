"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function AboutPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
        About Page
      </h1>

      {/* Flex container: side-by-side on desktop, stacked on mobile */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Form Card */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>Add About</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input id="title" placeholder="Enter title" />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea name="" cols={2} rows={5}></Textarea>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                Save
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* View Card */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle className="text-center">About Details ..</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <h2 className="font-semibold">Lorem ipsum dolor sit amet.</h2>
            <p className="text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
              veritatis illum quos exercitationem ullam, itaque possimus cumque
              doloremque adipisci laboriosam!Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Nulla veritatis illum quos
              exercitationem ullam, itaque possimus cumque doloremque adipisci
              laboriosam!Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Nulla veritatis illum quos exercitationem ullam, itaque
              possimus cumque doloremque adipisci laboriosam!
            </p>
            <Button className="text-center">View More</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
