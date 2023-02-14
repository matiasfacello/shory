import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import useUserNameChange from "../../lib/hooks/user/useUserNameChange";
import useUserNameCheck from "../../lib/hooks/user/useUserNameCheck";
import useUserNameCheckTime from "../../lib/hooks/user/useUserNameCheckTime";

import Label from "../Links/atom/Label";
import type { FormEvent } from "react";

interface UserNameChange {
  newName: string;
  confirmNewName: string;
}

const ChangeUsername: React.FC = () => {
  const { data: sessionData } = useSession();

  const [formName, setFormName] = useState<UserNameChange>({ newName: "", confirmNewName: "" });

  const [formErrorShort, setFormErrorShort] = useState(true);
  const [formErrorSpaces, setFormErrorSpaces] = useState(true);
  const [formErrorMatch, setFormErrorMatch] = useState(true);

  const nameCheck = useUserNameCheck(formName.newName);
  const timeCheck = useUserNameCheckTime(sessionData?.user.id || "");

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setFormName({ ...formName, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleChangeName = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setFormName({ ...formName, [event.currentTarget.name]: event.currentTarget.value });
    nameCheck.refetch();
  };

  useEffect(() => {
    timeCheck.refetch();

    if (formName.newName.length < 6 || formName.newName.length > 24) {
      setFormErrorShort(true);
    } else setFormErrorShort(false);

    if (/\s/g.test(formName.newName)) {
      setFormErrorSpaces(true);
    } else setFormErrorSpaces(false);

    if (formName.newName !== formName.confirmNewName) {
      setFormErrorMatch(true);
    } else setFormErrorMatch(false);
  }, [formName.newName, formName.confirmNewName, nameCheck, timeCheck]);

  const mutation = useUserNameChange();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formErrorShort || formErrorSpaces || formErrorMatch || nameCheck.data || timeCheck.data) {
      return;
    }

    mutation.mutate({ id: sessionData?.user.id || "", name: formName.newName, oldName: sessionData?.user.name || "" });
  };

  return (
    <div className="flex flex-wrap justify-center">
      {sessionData ? (
        <form
          className="flex w-full max-w-xl flex-col gap-6 rounded-xl bg-gray-900 py-8 px-12"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="text-2xl font-bold text-white">Change Name</h3>
          <div className="text-white">
            Requirements:
            <p className={formErrorShort ? "text-red-400" : "text-green-400"}>- Between 6 and 24 characters</p>
            <p className={formErrorSpaces ? "text-red-400" : "text-green-400"}>- No spaces allowed</p>
            <p className={formErrorMatch ? "text-red-400" : "text-green-400"}>- Names in the form must match</p>
            <p className={nameCheck.data ? "text-red-400" : "text-green-400"}>- Name is already in use</p>
            <p className={timeCheck.data ? "text-red-400" : "text-green-400"}>- Can only change name every 7 days</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label for="actualName" name="Actual Name" className="text-white" />
            <input type="text" name="actualName" id="actualName" value={sessionData.user.name || "-"} className="border-0 bg-transparent text-white" readOnly />
          </div>
          <div className="flex flex-col gap-2">
            <Label for="newName" name="New Name" className="text-white" />
            <input onChange={handleChangeName} value={formName.newName} required type="text" name="newName" minLength={6} maxLength={24} id="newName" placeholder="New Name" className="p-2" />
          </div>
          <div className="flex flex-col gap-2">
            <Label for="confirmNewName" name="Confirm new Name" className="text-white" />
            <input
              onChange={handleChange}
              value={formName.confirmNewName}
              required
              type="text"
              name="confirmNewName"
              minLength={6}
              maxLength={24}
              id="confirmNewName"
              placeholder="Confirm New Name"
              className="p-2"
            />
          </div>
          <button className="rounded bg-gray-700 p-4 font-bold text-white transition hover:bg-gray-600" type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Loading" : "Change"}
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChangeUsername;
