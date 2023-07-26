"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";

import { FormState, SessionInterface } from "@/common.types";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "./CustomMenu";
import Button from "./Button";
import { HiOutlinePlusCircle } from "react-icons/hi";

type ProjectFormProps = {
  type: string;
  session: SessionInterface;
};

const ProjectForm = ({ type, session }: ProjectFormProps) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    image: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an Image file.");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center justify-start flex-col w-full lg:pt-24 pt-12 gap-10 text-lg max-w-5xl mx-auto"
    >
      <div className="flex items-center justify-start form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project."}
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            alt="image"
            fill
            className="sm:p-10 object-contain z-20"
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Portfoolio"
        setState={(value) => handleStateChange("title", value)}
      />

      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://SanjeebPadhi.com"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/Sanjeeb96"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            submitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={submitting ? "" : " /plus.svg"}
          submitting={submitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
