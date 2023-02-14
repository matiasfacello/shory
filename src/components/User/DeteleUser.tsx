import { useSession } from "next-auth/react";
import { useState } from "react";
import useUserDelete from "../../lib/hooks/user/useUserDelete";

const DeleteUser: React.FC = () => {
  const { data: sessionData } = useSession();

  const [showDelete, setShowDelete] = useState(false);

  const mutation = useUserDelete();

  const handleDelete = () => {
    // delete the user
    mutation.mutate({ id: sessionData?.user.id || "" });
  };

  return (
    <div className="my-4 flex flex-wrap justify-center">
      {sessionData ? (
        <div className="flex w-full max-w-xl flex-col gap-6 rounded-xl bg-gray-900 py-8 px-12">
          <h3 className="text-2xl font-bold text-white">Delete User</h3>
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
      ) : (
        ""
      )}
    </div>
  );
};

export default DeleteUser;
