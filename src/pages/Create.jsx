import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRef, useState } from "react";
import { db, storage } from "../firebase/firebase";
import { useFireStore } from "../hooks/useFireStore";
import { useAuthContext } from "../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { currentUser } = useAuthContext();

  // states to handle creation status
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // state to hold text inputs
  const [formInput, setFormInput] = useState({
    groupName: "",
    groupDescription: "",
  });

  const navigate = useNavigate();

  // handle changes in text inputs
  const handleChange = (e) => {
    setFormInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const imageInputRef = useRef(null);
  // handles cover image upload to firebase storage bucket, returns the ref to the image
  const handleImageUpload = async (image) => {
    const imageRef = ref(
      storage,
      `images/group-${formInput.groupName}-cover.png`
    );

    await uploadBytes(imageRef, image);

    let url = await getDownloadURL(imageRef);

    return url;
  };

  const { writeDoc } = useFireStore("groups");
  const { get } = useFireStore("users");
  const { setDocWithId } = useFireStore("messages");

  // group creation logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // ref to current user
    try {
      const user = await get(currentUser.uid);
      const imageRef = await handleImageUpload(imageInputRef.current.files[0]);
      const data = {
        ...formInput,
        coverImageRef: imageRef,
        members: [{ ...user, role: "admin" }],
        requests: [],
      };
      const groupRef = await writeDoc(data);
      await setDocWithId(groupRef.id, { messages: [] });
      setLoading(false);
      toast.success("Group was created successfully");
      navigate(`/dashboard/groups/${groupRef.id}`);
    } catch (err) {
      setLoading(false);
      toast.error("An error occurred, couldn't create group");
    }
  };

  return (
    <div className="p-16 text-blue">
      <Toaster />
      <h2 className="text-3xl">Create new group</h2>
      <form
        className="mt-24 flex flex-col gap-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="groupCoverPhoto" className="">
            Group Cover Photo
          </label>
          <input
            type="file"
            name="groupCoverPhoto"
            className="cursor-pointer"
            onChange={handleImageUpload}
            ref={imageInputRef}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="groupName" className="">
            Group Name
          </label>
          <input
            type="text"
            name="groupName"
            className="p-3 bg-transparent border-2 rounded-md border-blue"
            value={formInput.groupName}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="groupDescription">Group Description</label>
          <input
            type="text"
            name="groupDescription"
            className="p-3 bg-transparent border-2 rounded-md border-blue"
            value={formInput.groupDescription}
            onChange={(e) => handleChange(e)}
          />
        </div>
        {!loading && (
          <button
            type="submit"
            className="mt-8 bg-blue text-veryLightBlue rounded-md shadow-sm p-4"
          >
            Create Group
          </button>
        )}
        {loading && (
          <button
            type="submit"
            disabled
            className="mt-8 opacity-50 bg-blue text-veryLightBlue rounded-md shadow-sm p-4"
          >
            Create Group
          </button>
        )}
      </form>
    </div>
  );
};

export default Create;
