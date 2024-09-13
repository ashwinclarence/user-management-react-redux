import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store"; // Import RootState for proper typing
import noProfile from "../assets/profile.png";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  signOut
} from "../app/user/userSlice";
import { currentUserType } from "../types/type";

const Profile = () => {
  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [formData, setFormData] = useState<currentUserType>({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);

  // handle current user nul
  if (!currentUser) {
    throw new Error('user not found')
  }

  const handleImageUpload = async (image: File) => {
    try {
      const imageRef = ref(storage, `profile_images_${currentUser._id}`);
      const uploadTask = uploadBytesResumable(imageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error("Upload error:", error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setFormData((prevData) => ({
              ...prevData,
              profilePicture: downloadURL,
            }));
          } catch (error) {
            console.error("Error getting download URL:", error);
          }
        }
      );
    } catch (error) {
      console.error("Error in handleImageUpload:", error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      dispatch(updateUserStart());
      let res = await fetch(`/api/user/update-profile/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }

      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error));
      console.error("Error in handleProfileUpdate:", error);
    }
  };



  // function handle signOut of the current user
  const handleSignOut = async() => {
    try {
      await fetch('/api/user/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <div className="flex flex-col items-center mb-4">
          {/* Profile Image */}
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />
          <img
            className="w-24 h-24 rounded-full mb-4 object-cover"
            src={
              formData.profilePicture || currentUser.profilePicture || noProfile
            }
            alt="Profile"
            onClick={() => fileRef.current?.click()}
          />
          {uploadProgress > 0 && uploadProgress < 100 ? (
            <b className="text-green-700">
              uploading in progress {uploadProgress} %
            </b>
          ) : (
            ""
          )}
          {/* Name */}
          <h2 className="text-2xl font-semibold mb-2">{currentUser.name}</h2>
          {/* Email */}
          <p className="text-gray-500">{currentUser.email}</p>
        </div>
        {/* any error */}
        <b className="text-red-600"> {error}</b>
        {/* Update Profile Button */}
        <button
          onClick={handleProfileUpdate}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-all disabled:opacity-50"
        >
          {loading ? "updating..." : " Update Profile"}
        </button>
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="bg-red-500 text-white px-4 py-2 mt-5 rounded-lg w-full hover:bg-red-600 transition-all disabled:opacity-50"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Profile;
