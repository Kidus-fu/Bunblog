import { useState } from "react";
import { Button, Input, Textarea, Card, Spinner, Spacer } from "@nextui-org/react"; // Correct imports
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userinfoActions } from "../store/store";
import api from "../api";

function UserProfilePage() {
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Ethiopia");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.userinfo.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("profile_picture", profilePicture);
    formData.append("birthdate", birthdate);
    formData.append("phone_number", phoneNumber);
    formData.append("address_line1", addressLine1);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("postal_code", postalCode);
    formData.append("country", country);
    formData.append("website", website);

    // Send data to the backend
    api
      .post("http://localhost:8000/api/userprofile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for FormData
        },
      })
      .then((response) => {
        setIsLoading(false);
        setSuccess("Profile updated successfully!");
        dispatch(userinfoActions.login());
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Failed to update profile. Please try again.");
      });
  };

  return (
    <div className=" flex justify-center items-center p-5   bg-gray-100">
      <Card className={`w-full max-w-md p-6 bg-white shadow-lg  ${isLoading ? "pointer-events-none" : ""}`}>
        <div className="text-center">
          <h2 className="font-semibold text-gray-700 mb-4">Update Profile</h2>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        {isLoading && (
          <div className="absolute flex justify-center items-center mt-5 mb-5">
            <Spinner size="xl" />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              aria-label="Write something about yourself"
              rows={4}
              fullWidth
              placeholder="Write something about yourself"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <Input
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              fullWidth
              accept="image/*"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Birthdate</label>
            <Input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              fullWidth
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
            <Input
              type="text"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              fullWidth
            />
          </div>
          <div className="flex gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <Input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
            />
          </div>

          </div>
        <div className="flex gap-4">
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <Input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              fullWidth
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <Input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              fullWidth
            />
          </div>
        </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <Input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              fullWidth
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 mt-4 bg-gray-500 text-white rounded-lg hover:bg-blue-700"
            disabled={isLoading}
          >
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default UserProfilePage;
