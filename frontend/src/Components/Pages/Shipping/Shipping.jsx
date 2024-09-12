import React, { useState } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import MetaData from '../../layout/MetaData';
import CheckoutSteps from "../../layout/CheckoutSteps.jsx"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInformation } from '../../../features/cartSlice';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const [shippingDetails, setShippingDetails] = useState({
    // fullName: shippingInfo.fullName,
    // phoneNo: shippingInfo.phoneNo,
    // address: shippingInfo.address,
    // country: shippingInfo.country,
    // state: shippingInfo.state,
    // city: shippingInfo.city,
    // zipCode: shippingInfo.zipCode,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCountryChange = (selectedCountry) => {
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      country: selectedCountry,
      state: null,
      city: null,
    }));
  };

  const handleStateChange = (selectedState) => {
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      state: selectedState,
      city: null,
    }));
  };

  const handleCityChange = (selectedCity) => {
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      city: selectedCity,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (shippingDetails.phoneNo.length < 10 || shippingDetails.phoneNo.length > 10) {
      toast.error("Phone No Length Must be 10 digits");
      return;
    }
    dispatch(saveShippingInformation(shippingDetails));
    navigate("/order/confirm");
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = shippingDetails.country
    ? State.getStatesOfCountry(shippingDetails.country.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cityOptions = shippingDetails.state
    ? City.getCitiesOfState(shippingDetails.country.value, shippingDetails.state.value).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    : [];

  return (
    <>
      <MetaData title={"Shipping Information"} />
      <CheckoutSteps activeStep={1} />
      <div className="flex justify-center items-center w-full p-6">
        <div className="w-full max-w-2xl border border-black p-8 rounded bg-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={shippingDetails.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Phone No</label>
                <input
                  type="number"
                  name="phoneNo"
                  value={shippingDetails.phoneNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                  required
                  maxLength={10}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Country</label>
                <Select
                  options={countryOptions}
                  value={shippingDetails.country}
                  onChange={handleCountryChange}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">State/Province</label>
                <Select
                  options={stateOptions}
                  value={shippingDetails.state}
                  onChange={handleStateChange}
                  className="w-full"
                  isDisabled={!shippingDetails.country}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">City</label>
              <Select
                options={cityOptions}
                value={shippingDetails.city}
                onChange={handleCityChange}
                className="w-full"
                isDisabled={!shippingDetails.state}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">ZIP/Postal Code</label>
              <input
                type="text"
                name="zipCode"
                value={shippingDetails.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
</div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 bg-black text-white rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Shipping;
