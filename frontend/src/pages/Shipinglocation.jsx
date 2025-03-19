import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ShippingLocations({ userData }) {
  // State variables for User Address
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  // Function to handle save address
  const handleSaveAddress = async () => {
    // Validate input fields
    if (
      !firstName ||
      !lastName ||
      !city ||
      !postalCode ||
      !country ||
      !address
    ) {
      alert("All fields are required. Please fill out all fields.");
      return;
    }

    try {
      // Send POST request to save address endpoint
      const response = await fetch("http://localhost:3001/save-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          city,
          postalCode,
          country,
          address,
          phone,
          age,
        }),
      });

      if (response.ok) {
        // If address is saved successfully, update state
        window.alert("Address saved successfully");
      } else {
        // If save address fails, display error message
        const errorData = await response.json();
        console.error(errorData.message);
        if (errorData.saveAddressStatus === false) {
          alert("Address save failed. Please check your details.");
        }
      }
    } catch (error) {
      // Log any errors
      console.error(error);
    }
  };

  const ShippingLocations = () => (
    <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
      <div className="pt-4">
        <h1 className="py-2 text-2xl font-semibold">Shipping Locations</h1>
        <p className="text-slate-600">Manage your shipping address details</p>
      </div>
      <hr className="mt-4 mb-8" />

      <p className="py-2 text-xl font-semibold">Current Shipping Address</p>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="text-gray-600">
          {userData.shippingLocations ? (
            <div>
              <p>
                <strong>
                  {userData.shippingLocations.firstName}{" "}
                  {userData.shippingLocations.lastName}
                </strong>
              </p>
              <p>
                {userData.shippingLocations.city},{" "}
                {userData.shippingLocations.postalCode}
              </p>
              <p>{userData.shippingLocations.country}</p>
            </div>
          ) : (
            <p className="text-gray-600">No shipping address set</p>
          )}
        </div>
        <button className="inline-flex text-sm font-semibold text-blue-600 underline mt-2 sm:mt-0">
          Edit Address
        </button>
      </div>

      <hr className="mt-4 mb-8" />
      <p className="py-2 text-xl font-semibold">Add New Shipping Address</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="first-name" className="block text-sm text-gray-500">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            className="w-full rounded-md border-2 border-gray-300 py-2 px-4 text-gray-700 focus:border-blue-600 focus:outline-none"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm text-gray-500">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            className="w-full rounded-md border-2 border-gray-300 py-2 px-4 text-gray-700 focus:border-blue-600 focus:outline-none"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm text-gray-500">
            City
          </label>
          <input
            type="text"
            id="city"
            className="w-full rounded-md border-2 border-gray-300 py-2 px-4 text-gray-700 focus:border-blue-600 focus:outline-none"
            placeholder="New York"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="postal-code" className="block text-sm text-gray-500">
            Postal Code
          </label>
          <input
            type="text"
            id="postal-code"
            className="w-full rounded-md border-2 border-gray-300 py-2 px-4 text-gray-700 focus:border-blue-600 focus:outline-none"
            placeholder="10001"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone-number" className="block text-sm text-gray-500">
            Phone Number
          </label>
          <input
            type="number"
            id="phone-number"
            className="w-full rounded-md border-2 border-gray-300 py-2 px-4 text-gray-700 focus:border-blue-600 focus:outline-none"
            placeholder="1234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm text-gray-500">
            Age
          </label>
          <input
            type="number"
            id="age"
            className="w-full rounded-md border-2 border-gray-300 py-2 px-4 text-gray-700 focus:border-blue-600 focus:outline-none"
            placeholder="18"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="country" className="block text-sm text-gray-500">
            Country
          </label>
          <input
            type="text"
            id="country"
            className="w-full rounded-md border-2 border-gray-300 py-2 px-4 text-gray-700 focus:border-blue-600 focus:outline-none"
            placeholder="United States"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-sm text-gray-500">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="w-full rounded-md border-2 border-gray-300 py-2 px-4 text-gray-700 focus:border-blue-600 focus:outline-none"
            placeholder="123 Main St"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end my-4">
        <button
          onClick={handleSaveAddress}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 transition-colors"
        >
          Save Address
        </button>
      </div>
    </div>
  );

  return (
    <div className="card rounded-lg shadow-md mt-5 mx-10 bg-white">
      <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
        <h1 className="border-b py-6 text-4xl font-semibold">Settings</h1>
        <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
          <div className="col-span-2 hidden sm:block">
            <ul className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-2">
                <NavLink
                  to="/SettingUser"
                  className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold"
                >
                  Accounts
                </NavLink>
                <NavLink
                  to="/ShippingLocations"
                  className="mt-5 cursor-pointer border-l-2 border-l-blue-700 px-2 py-2 font-semibold text-blue-700 transition hover:border-l-blue-700 hover:text-blue-700"
                >
                  Shipping Address
                </NavLink>
              </div>
            </ul>
          </div>
          <ShippingLocations />
        </div>
      </div>
    </div>
  );
}
