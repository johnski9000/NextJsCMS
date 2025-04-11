"use client";

import React, { useEffect, useState } from "react";

import { Button, Paper } from "@mantine/core";
import { FaUpload } from "react-icons/fa";
function ProfileScreen() {
  const user = null;
  // Initial state from user data or defaults
  const [profileData, setProfileData] = useState({
    firstName: user?.userData?.firstName || "",
    lastName: user?.userData?.lastName || "",
    email: user?.userData?.email || "",
    profilePhotoUrl: user?.userData?.profilePhotoUrl || "",
    addressStreet: user?.userData?.addressStreet || "",
    addressCity: user?.userData?.addressCity || "",
    addressCounty: user?.userData?.addressCounty || "",
    addressPostcode: user?.userData?.addressPostcode || "",
    mobileNumber: user?.userData?.mobileNumber || "",
  });
  useEffect(() => {
    setProfileData({
      firstName: user?.userData?.firstName || "",
      lastName: user?.userData?.lastName || "",
      email: user?.userData?.email || "",
      profilePhotoUrl: user?.userData?.profilePhotoUrl || "",
      addressStreet: user?.userData?.addressStreet || "",
      addressCity: user?.userData?.addressCity || "",
      addressCounty: user?.userData?.addressCounty || "",
      addressPostcode: user?.userData?.addressPostcode || "",
      mobileNumber: user?.userData?.mobileNumber || "",
    });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", profileData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Paper
      className="w-full min-h-screen mx-auto"
      shadow="md"
      radius="xl"
      p="lg"
    >
      {/* Header section with cover image and profile photo */}
      <section className="relative pt-40 pb-8">
        <img
          className="w-full h-60 bg-indigo-100 absolute top-0 left-0 z-0 rounded-t-xl"
          src="/coaches/team-title-img.jpg"
        />

        <div className="w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
            <div className="relative">
              <img
                src={""}
                alt="Coach profile"
                className="w-32 h-32 border-4 border-solid border-white rounded-full object-cover"
              />
              <Button
                component="label"
                role={undefined}
                variant="contained"
                size="small"
                className="absolute bottom-0 right-0"
                tabIndex={-1}
              ></Button>
            </div>
          </div>

          <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
            <div className="block">
              <h3 className="font-bold text-3xl text-gray-900 mb-1 max-sm:text-center">
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p className="font-normal text-base leading-7 text-gray-500 max-sm:text-center">
                {profileData.addressCity && <> · {profileData.addressCity}</>}
                {profileData.addressCounty && (
                  <>, {profileData.addressCounty}</>
                )}
              </p>
            </div>

            <Button
              variant="contained"
              type="submit"
              form="profile-form"
              className="py-3 px-5 rounded-full bg-indigo-600 hover:bg-indigo-700"
            >
              <FaUpload className="mr-2" />
              <span className="font-semibold">Save Profile</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Form section */}
      <div className="w-full max-w-7xl mx-auto ">
        <form
          id="profile-form"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="Your first name"
                value={profileData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="Your last name"
                value={profileData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="your.email@example.com"
              value={profileData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="mobileNumber"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
              placeholder="Your mobile number"
              value={profileData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Address Information
            </h3>

            <div>
              <label
                htmlFor="addressStreet"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Street Address
              </label>
              <input
                type="text"
                id="addressStreet"
                name="addressStreet"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                placeholder="Street address"
                value={profileData.addressStreet}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label
                  htmlFor="addressCity"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  City
                </label>
                <input
                  type="text"
                  id="addressCity"
                  name="addressCity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="City"
                  value={profileData.addressCity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="addressCounty"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  County
                </label>
                <input
                  type="text"
                  id="addressCounty"
                  name="addressCounty"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="County"
                  value={profileData.addressCounty}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="addressPostcode"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Postcode
              </label>
              <input
                type="text"
                id="addressPostcode"
                name="addressPostcode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full md:w-1/3 p-2.5"
                placeholder="Postcode"
                value={profileData.addressPostcode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </form>
      </div>
    </Paper>
  );
}

export default ProfileScreen;
