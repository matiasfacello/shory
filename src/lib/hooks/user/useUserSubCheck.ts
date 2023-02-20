import { useEffect, useState } from "react";
import { api } from "~/utils/api";

interface Plan {
  name: string;
  title: string;
  linkQuota: number;
  starts?: Date;
  ends?: Date;
}

const useUserSubCheck = (id: string) => {
  const [info, setInfo] = useState<Plan>();

  const subscription = api.subscription.get.useQuery({ userId: id });

  const response = api.subscription.getPlan.useQuery({ name: "tier0" });

  useEffect(() => {
    //Checks if user has active subscription
    if (subscription.data) {
      setInfo({
        name: subscription.data.plans.name,
        title: subscription.data.plans.title,
        linkQuota: subscription.data.plans.linkQuota,
        starts: subscription.data.startDate,
        ends: subscription.data.endDate,
      });
    }
    // else returns free plan
    else if (response.data) {
      setInfo({
        name: response.data.name,
        title: response.data.title,
        linkQuota: response.data.linkQuota,
      });
    }
  }, [response.data, subscription.data]);

  return info;
};

export default useUserSubCheck;
