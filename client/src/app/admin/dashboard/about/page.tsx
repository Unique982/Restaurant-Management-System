"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IAbout, IAboutPost } from "@/lib/store/admin/about/aboutSlice.type";
import {
  aboutAdd,
  aboutFetch,
  addAbout,
} from "@/lib/store/admin/about/aboutSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import toast from "react-hot-toast";

export default function AboutPage() {
  const dispatch = useAppDispatch();
  const aboutState = useAppSelector((state) => state.about);

  useEffect(() => {
    dispatch(aboutFetch());
  }, [dispatch]);
  useEffect(() => {
    if (aboutState.about.length > 0) {
      const data: IAbout = aboutState.about[0]; // assuming single record
      setAbout({
        aboutTitle: data.aboutTitle,
        aboutDescription: data.aboutDescription,
        aboutImage: data.aboutImage || null,
      });
    }
  }, [aboutState.about]);
  const [about, setAbout] = useState<IAboutPost>({
    aboutTitle: "",
    aboutDescription: "",
    aboutImage: null,
  });
  const changeHandle = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value, files } = e.target as HTMLInputElement;

    setAbout({
      ...about,
      [name]: type === "file" && files ? files[0] : value,
    });
  };
  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result: any = await dispatch(aboutAdd(about));
    if (result.success) {
      toast.success("About Abbed success");
    } else {
      toast.error(result?.message || "Something went wrong!");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
        About Page
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Form Card */}
        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>About Edit</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submitHandle} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="Enter title"
                  name="aboutTitle"
                  value={about.aboutTitle}
                  onChange={changeHandle}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  name="aboutDescription"
                  rows={5}
                  value={about.aboutDescription}
                  onChange={changeHandle}
                  placeholder="Enter description"
                />
              </div>

              <div className="space-y-2">
                <Label>Image</Label>
                <Input
                  name="aboutImage"
                  type="file"
                  accept="image/*"
                  onChange={changeHandle}
                />

                {/* ✅ Existing image preview */}
                {about.aboutImage && (
                  <img
                    src={
                      about.aboutImage instanceof File
                        ? URL.createObjectURL(about.aboutImage)
                        : about.aboutImage
                    }
                    alt="About Image"
                    className="mt-3 w-full h-40 object-cover rounded-md border"
                  />
                )}
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
            <CardTitle className="text-center">About Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <h2 className="font-semibold">{about.aboutTitle}</h2>
            <p className="text-gray-600">{about.aboutDescription}</p>
            {about.aboutImage && typeof about.aboutImage === "string" && (
              <img
                src={about.aboutImage}
                alt="About"
                className="w-full rounded"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
