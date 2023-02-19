import { useSession } from "next-auth/react";
import { useState } from "react";

import useUserDelete from "../../lib/hooks/user/useUserDelete";

import UserSettingsBox from "./atom/UserSettingsBox";

const DeleteUser: React.FC = () => {
  const { data: sessionData } = useSession();

  const [showDelete, setShowDelete] = useState(false);

  const mutation = useUserDelete();

  const handleDelete = () => {
    // delete the user
    mutation.mutate({ id: sessionData?.user?.id || "" });
  };

  return (
    <>
      {sessionData ? (
        <UserSettingsBox>
          <div className="flex w-full max-w-xl flex-col gap-6 rounded-xl bg-gray-900 py-8 px-12">
            <UserSettingsBox.Title title="Delete User" />
            <p className="font-bold text-white">This action cannot be undone. All your data will be wiped out of our database. </p>
            <p className="font-bold text-white">Only do this if you are completely sure of what are you doing. </p>
            {showDelete ? (
              <div className="flex w-full flex-wrap gap-6">
                <button className="flex-grow rounded bg-gray-700 p-4 font-bold text-white transition hover:bg-gray-600" onClick={() => setShowDelete(false)}>
                  Cancel
                </button>
                <button className="flex-grow rounded bg-red-700 p-4 font-bold text-white transition hover:bg-red-600" onClick={handleDelete} disabled={mutation.isLoading}>
                  {mutation.isLoading ? "Loading..." : "Confirm"}
                </button>
              </div>
            ) : (
              <div className="w-full">
                <button className="w-full rounded bg-gray-700 p-4 font-bold text-white transition hover:bg-gray-600" onClick={() => setShowDelete(true)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </UserSettingsBox>
      ) : (
        ""
      )}
    </>
  );
};

export default DeleteUser;
