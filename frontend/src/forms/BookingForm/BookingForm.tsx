//@ts-nocheck
import { useForm } from "react-hook-form";
import {  HotelType, UserType } from "../../../../backend/src/shared/types";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import axios from "axios";

type Props = {
  currentUser: UserType;
  hotel: HotelType;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
};

const BookingForm = ({ currentUser, hotel }: Props) => {

  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const total = `${hotel.pricePerDay}`

  
  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error saving booking", type: "ERROR" });
      },
    }
  );


  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
    },
  });


  const onSubmit =async (formData: BookingFormData) =>{
    bookRoom({...formData})

    setLoading(true);

    console.log(currentUser.firstName, mobile, total)

    const data = {
      name:currentUser.firstName, 
      mobile: mobile, 
      amount: total,
      MUID:"MUDUS" + Date.now(),
      transactionId: "S" + Date.now()
  }

  await axios.post("http://localhost:7000/order", data).then((response)=>{
    if (response.data && response.data.data.instrumentResponse.redirectInfo.url) {
        window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
    }
}).catch((error)=>{
    console.log(error)
})


  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
        <label htmlFor="name" className="text-gray-700 text-sm font-bold flex-1">
          Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            id='name'
                        name='name'
                        required
                        value={currentUser.firstName}
                        disabled
                        placeholder='Enter your Name'
          />
        </label>

        <label htmlFor="number" className="text-gray-700 text-sm font-bold flex-1">
          Phone Number
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="number"
            id='number'
            name='number'
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder='Enter your Number'
          />
        </label>

      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-emerald-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: ₹{`${hotel.pricePerDay} per day `}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
      <label className="text-gray-700 text-sm font-bold flex-1">
          Amount to be Paid: ₹
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            id='amount'
            type='number'
            name='amount'
            value={total}
            disabled
                      />
        </label>
      </div>


      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-emerald-600 text-white p-2 font-bold hover:bg-emerald-500 text-md disabled:bg-gray-500"
        > 
         {isLoading ? "Saving..." : "Confirm Booking"}   
  </button>
      </div>
    </form>
  );
};

export default BookingForm;