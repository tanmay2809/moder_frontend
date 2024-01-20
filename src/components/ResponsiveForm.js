import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

     
function ResponsiveForm() {
  const [formData, setFormData] = useState({
    email: "",
    amount: "",
  });
      const toast = useToast();

  const handleSubmit = async (e) => {

    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            
            const { data } = await axios.post(
              "https://modernbacke.netlify.app/.netlify/functions/api/submit-form",
              formData,
              config
            );
            console.log(data)
            handleReset();
            toast({
                title: "Message Sent",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        }
    
  
  };
  const handleReset = () => {
    setFormData({
      email: "",
      amount: "",
    });
  };


  const handleChange = (e) => {
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full shadow rounded p-4 bg-white mx-auto"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Your Information
        </h2>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6 flex flex-col">
          <label
            htmlFor="amount"
            className="block text-gray-700 font-bold mb-2"
          >
            Amount
          </label>
          <input
            type="string"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ResponsiveForm;
